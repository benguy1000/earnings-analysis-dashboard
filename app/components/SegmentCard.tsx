import { TranscriptSegment } from '@/lib/transcriptTypes';
import { User, Hash, Tag, AlertTriangle, TrendingUp, Package } from 'lucide-react';

interface SegmentCardProps {
  segment: TranscriptSegment;
}

function getScoreColor(score: number): string {
  if (score >= 0.6) return 'bg-green-100 text-green-800 border-green-300';
  if (score >= 0.55) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  return 'bg-orange-100 text-orange-800 border-orange-300';
}

export default function SegmentCard({ segment }: SegmentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden">
      {/* Header */}
      <div className="bg-purple-50 px-6 py-4 border-b border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {segment.segment_id}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <User size={16} className="text-purple-600" />
                {segment.speaker}
              </h3>
              <p className="text-sm text-gray-600">{segment.word_count} words</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Transcript Text */}
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-400">
          <p className="text-gray-700 leading-relaxed">{segment.text}</p>
        </div>

        {/* Topics */}
        {segment.topics.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
              <Hash size={14} />
              Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {segment.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Metrics */}
        {segment.key_metrics.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
              <TrendingUp size={14} className="text-green-600" />
              Key Metrics
            </h4>
            <div className="flex flex-wrap gap-2">
              {segment.key_metrics.map((metric, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Matched Terms */}
        {segment.matched_terms.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Tag size={16} className="text-blue-600" />
              Matched Terms ({segment.matched_terms.length})
            </h4>
            <div className="space-y-2">
              {segment.matched_terms.map((term, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{term.term}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getScoreColor(term.score)}`}>
                    Score: {(term.score * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Negotiable Issues */}
        {segment.negotiable_issues.length > 0 && (
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-600" />
              Negotiable Issues ({segment.negotiable_issues.length})
            </h4>
            <div className="space-y-2">
              {segment.negotiable_issues.map((issue, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{issue.negotiable_issue_text}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getScoreColor(issue.score)}`}>
                    Score: {(issue.score * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Business Themes & Supply Chain Concepts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {segment.business_themes.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-600 mb-2">Business Themes</h4>
              <div className="flex flex-wrap gap-1">
                {segment.business_themes.map((theme, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          )}
          {segment.supply_chain_concepts.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                <Package size={12} />
                Supply Chain Concepts
              </h4>
              <div className="flex flex-wrap gap-1">
                {segment.supply_chain_concepts.map((concept, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-purple-200 text-purple-700 rounded text-xs"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
