import { TranscriptMetadata } from '@/lib/transcriptTypes';
import { formatDate } from '@/lib/utils';
import { Users, MessageSquare, Tag, AlertTriangle } from 'lucide-react';

interface TranscriptHeaderProps {
  metadata: TranscriptMetadata;
}

export default function TranscriptHeader({ metadata }: TranscriptHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-primary to-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold mb-4">Earnings Call Transcript Analysis</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={20} />
              <span className="text-sm font-medium">Total Segments</span>
            </div>
            <p className="text-2xl font-bold">{metadata.total_segments}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Users size={20} />
              <span className="text-sm font-medium">Speakers</span>
            </div>
            <p className="text-2xl font-bold">{metadata.speakers.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <Tag size={20} />
              <span className="text-sm font-medium">Unique Terms</span>
            </div>
            <p className="text-2xl font-bold">{metadata.unique_terms_count}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={20} />
              <span className="text-sm font-medium">Negotiable Issues</span>
            </div>
            <p className="text-2xl font-bold">{metadata.unique_issues_count}</p>
          </div>
        </div>
        <div className="mt-4 text-sm text-blue-100">
          <span className="font-semibold">{metadata.company_symbol}</span> • {metadata.quarter} •
          Generated: {formatDate(metadata.generated_at.split('T')[0])} •
          {metadata.total_words.toLocaleString()} words
        </div>
      </div>
    </div>
  );
}
