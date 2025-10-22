'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TranscriptHeader from '../components/TranscriptHeader';
import TranscriptFilters from '../components/TranscriptFilters';
import SegmentCard from '../components/SegmentCard';
import SpeakerStats from '../components/SpeakerStats';
import Navigation from '../components/Navigation';
import { useDataContext } from '../context/DataContext';
import { TranscriptData } from '@/lib/transcriptTypes';

export default function TranscriptPage() {
  const router = useRouter();
  const { getTranscriptFileName } = useDataContext();
  const [data, setData] = useState<TranscriptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for filters
  const [selectedSpeaker, setSelectedSpeaker] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('All');
  const [selectedIssue, setSelectedIssue] = useState('All');

  // Load data dynamically
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fileName = getTranscriptFileName();
        const response = await fetch(`/data/${fileName}`);
        
        if (!response.ok) {
          throw new Error(`Data file not found: ${fileName}`);
        }
        
        const jsonData = await response.json();
        setData(jsonData as TranscriptData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [getTranscriptFileName]);

  // Filter segments
  const filteredSegments = useMemo(() => {
    if (!data) return [];
    return data.segments.filter((segment) => {
      const matchesSpeaker =
        selectedSpeaker === 'All' || segment.speaker === selectedSpeaker;
      
      const matchesSearch =
        searchQuery === '' ||
        segment.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        segment.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        segment.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTerm =
        selectedTerm === 'All' ||
        segment.matched_terms.some(term => term.term === selectedTerm);
      
      const matchesIssue =
        selectedIssue === 'All' ||
        segment.negotiable_issues.some(issue => issue.negotiable_issue_text === selectedIssue);

      return matchesSpeaker && matchesSearch && matchesTerm && matchesIssue;
    });
  }, [data, selectedSpeaker, searchQuery, selectedTerm, selectedIssue]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
          <p className="text-xl text-gray-600">Loading transcript data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-100 text-red-800 rounded-lg p-6 mb-4">
            <h2 className="text-xl font-bold mb-2">Data Not Found</h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <TranscriptHeader metadata={data.metadata} />

      <main className="container mx-auto px-6 py-8">
        {/* Speaker Stats */}
        <SpeakerStats speakers={data.speakers_summary} />

        {/* Main Content: Filters + Segments */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:col-span-1">
            <TranscriptFilters
              speakers={data.metadata.speakers}
              selectedSpeaker={selectedSpeaker}
              searchQuery={searchQuery}
              selectedTerm={selectedTerm}
              selectedIssue={selectedIssue}
              terms={data.terms_index}
              issues={data.negotiable_issues_index}
              onSpeakerChange={setSelectedSpeaker}
              onSearchChange={setSearchQuery}
              onTermChange={setSelectedTerm}
              onIssueChange={setSelectedIssue}
            />
          </div>

          {/* Segments */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Transcript Segments ({filteredSegments.length})
              </h2>
            </div>

            {filteredSegments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">No segments match your filters.</p>
                <p className="text-gray-400 mt-2">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredSegments.map((segment) => (
                  <SegmentCard key={segment.segment_id} segment={segment} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            Transcript Analysis Dashboard • AI-Powered Insights
          </p>
        </div>
      </footer>
    </div>
  );
}
