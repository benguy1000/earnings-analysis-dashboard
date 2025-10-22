'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import ExecutiveSummary from '../components/ExecutiveSummary';
import StatsCards from '../components/StatsCards';
import FilterSidebar from '../components/FilterSidebar';
import OpportunityGrid from '../components/OpportunityGrid';
import SummaryTable from '../components/SummaryTable';
import ExportButton from '../components/ExportButton';
import { useDataContext } from '../context/DataContext';
import { OpportunityData } from '@/lib/types';

export default function OpportunitiesPage() {
  const router = useRouter();
  const { getAnalysisFileName } = useDataContext();
  const [data, setData] = useState<OpportunityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUrgency, setSelectedUrgency] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Load data dynamically
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fileName = getAnalysisFileName();
        const response = await fetch(`/data/${fileName}`);
        
        if (!response.ok) {
          throw new Error(`Data file not found: ${fileName}`);
        }
        
        const jsonData = await response.json();
        setData(jsonData as OpportunityData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [getAnalysisFileName]);

  // Get unique categories
  const categories = useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.opportunities.map(o => o.category)));
  }, [data]);

  // Filter opportunities
  const filteredOpportunities = useMemo(() => {
    if (!data) return [];
    return data.opportunities.filter(opp => {
      const matchesCategory =
        selectedCategory === 'All' || opp.category === selectedCategory;
      const matchesUrgency =
        selectedUrgency === 'All' || opp.urgency === selectedUrgency;
      const matchesSearch =
        searchQuery === '' ||
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesUrgency && matchesSearch;
    });
  }, [data, selectedCategory, selectedUrgency, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
          <p className="text-xl text-gray-600">Loading opportunities data...</p>
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
      <Header data={data} />

      <main className="container mx-auto px-6 py-8">
        {/* Executive Summary */}
        <ExecutiveSummary summary={data.executive_summary} />

        {/* Stats Cards */}
        <div className="mt-8">
          <StatsCards opportunities={data.opportunities} />
        </div>

        {/* Main Content: Filters + Opportunities */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Sidebar with Filters */}
          <div className="lg:col-span-1">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              selectedUrgency={selectedUrgency}
              searchQuery={searchQuery}
              onCategoryChange={setSelectedCategory}
              onUrgencyChange={setSelectedUrgency}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Opportunities Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Opportunities ({filteredOpportunities.length})
              </h2>
              <ExportButton />
            </div>
            <OpportunityGrid opportunities={filteredOpportunities} />
          </div>
        </div>

        {/* Summary Table */}
        <SummaryTable summaryData={data.summary_table} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            Supply Chain Consulting Opportunities Dashboard • Powered by AI Analysis
          </p>
        </div>
      </footer>
    </div>
  );
}
