import { Table } from 'lucide-react';
import { SummaryTableRow } from '@/lib/types';
import { getUrgencyColor } from '@/lib/utils';

interface SummaryTableProps {
  summaryData: SummaryTableRow[];
}

export default function SummaryTable({ summaryData }: SummaryTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <Table className="text-blue-600" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Summary Table</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Opportunity Area
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Primary Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Urgency
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Source Chunks
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {summaryData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {row.opportunity_area}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {row.primary_contact}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(
                      row.urgency
                    )}`}
                  >
                    {row.urgency}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {row.chunk_ids.length} chunks
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
