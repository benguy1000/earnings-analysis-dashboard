'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, User, TrendingUp, Lightbulb } from 'lucide-react';
import { Opportunity } from '@/lib/types';
import { getUrgencyColor, getCategoryIcon } from '@/lib/utils';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 flex-1">
            {getCategoryIcon(opportunity.category)} {opportunity.title}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getUrgencyColor(
              opportunity.urgency
            )}`}
          >
            {opportunity.urgency}
          </span>
        </div>
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {opportunity.category}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Description</h4>
          <p className="text-gray-700 leading-relaxed">{opportunity.description}</p>
        </div>

        {/* Evidence Section - Collapsible */}
        <div className="border-t pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            <span className="flex items-center gap-2">
              <User size={16} />
              Evidence & Insights ({opportunity.evidence.length})
            </span>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {isExpanded && (
            <div className="mt-4 space-y-4">
              {opportunity.evidence.map((evidence, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-400"
                >
                  <p className="text-gray-700 italic mb-2">&ldquo;{evidence.statement}&rdquo;</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <User size={14} />
                    <span className="font-medium">{evidence.speaker}</span>
                    <span className="text-gray-400">—</span>
                    <span>{evidence.speaker_role}</span>
                  </div>
                  {evidence.metrics && evidence.metrics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {evidence.metrics.map((metric, mIdx) => (
                        <span
                          key={mIdx}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Impact */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <TrendingUp size={16} className="text-blue-600" />
            Estimated Impact
          </h4>
          <p className="text-gray-700">{opportunity.estimated_impact}</p>
        </div>

        {/* Recommended Approach */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Lightbulb size={16} className="text-green-600" />
            Recommended Approach
          </h4>
          <p className="text-gray-700">{opportunity.recommended_approach}</p>
        </div>
      </div>
    </div>
  );
}
