import { FileText } from 'lucide-react';

interface ExecutiveSummaryProps {
  summary: string;
}

export default function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-8 border-l-4 border-blue-600">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="text-blue-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">Executive Summary</h2>
      </div>
      <p className="text-lg text-gray-700 leading-relaxed">{summary}</p>
    </div>
  );
}
