import { SpeakerSummary } from '@/lib/transcriptTypes';
import { Users, MessageSquare } from 'lucide-react';

interface SpeakerStatsProps {
  speakers: SpeakerSummary[];
}

export default function SpeakerStats({ speakers }: SpeakerStatsProps) {
  // Sort speakers by word count descending
  const topSpeakers = [...speakers]
    .sort((a, b) => b.word_count - a.word_count)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-primary" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Top Speakers by Word Count</h2>
      </div>

      <div className="space-y-4">
        {topSpeakers.map((speaker, idx) => {
          const totalWords = speakers.reduce((sum, s) => sum + s.word_count, 0);
          const percentage = ((speaker.word_count / totalWords) * 100).toFixed(1);
          
          return (
            <div key={speaker.speaker} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <span className="font-semibold text-gray-800">{speaker.speaker}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">
                    <MessageSquare size={14} className="inline mr-1" />
                    {speaker.segment_count} segments
                  </span>
                  <span className="font-bold text-primary">
                    {speaker.word_count.toLocaleString()} words
                  </span>
                </div>
              </div>
              
              {/* Progress Bar - FIXED WITH VISIBLE COLORS */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${percentage}%`,
                    background: 'linear-gradient(to right, #003378, #0055CC)'
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-right">{percentage}% of total</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
