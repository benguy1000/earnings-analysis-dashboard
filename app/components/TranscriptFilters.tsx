'use client';

import { Search, Filter, User } from 'lucide-react';

interface TranscriptFiltersProps {
  speakers: string[];
  selectedSpeaker: string;
  searchQuery: string;
  selectedTerm: string;
  selectedIssue: string;
  terms: string[];
  issues: string[];
  onSpeakerChange: (speaker: string) => void;
  onSearchChange: (query: string) => void;
  onTermChange: (term: string) => void;
  onIssueChange: (issue: string) => void;
}

export default function TranscriptFilters({
  speakers,
  selectedSpeaker,
  searchQuery,
  selectedTerm,
  selectedIssue,
  terms,
  issues,
  onSpeakerChange,
  onSearchChange,
  onTermChange,
  onIssueChange,
}: TranscriptFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="text-primary" size={20} />
        <h3 className="text-lg font-bold text-gray-800">Filters</h3>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Search size={16} className="inline mr-2" />
          Search Text
        </label>
        <input
          type="text"
          placeholder="Search transcript..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Speaker Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <User size={16} className="inline mr-2" />
          Speaker
        </label>
        <select
          value={selectedSpeaker}
          onChange={(e) => onSpeakerChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        >
          <option value="All">All Speakers</option>
          {speakers.map((speaker) => (
            <option key={speaker} value={speaker}>
              {speaker}
            </option>
          ))}
        </select>
      </div>

      {/* Term Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Matched Term
        </label>
        <select
          value={selectedTerm}
          onChange={(e) => onTermChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        >
          <option value="All">All Terms</option>
          {terms.map((term) => (
            <option key={term} value={term}>
              {term}
            </option>
          ))}
        </select>
      </div>

      {/* Negotiable Issue Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Negotiable Issue
        </label>
        <select
          value={selectedIssue}
          onChange={(e) => onIssueChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
        >
          <option value="All">All Issues</option>
          {issues.map((issue) => (
            <option key={issue} value={issue}>
              {issue}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
