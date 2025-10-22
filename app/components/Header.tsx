import { Building2, Calendar, Database } from 'lucide-react';
import { OpportunityData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface HeaderProps {
  data: OpportunityData;
}

export default function Header({ data }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-primary to-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Supply Chain Consulting Opportunities
            </h1>
            <div className="flex items-center gap-6 text-blue-100 flex-wrap">
              <div className="flex items-center gap-2">
                <Building2 size={18} />
                <span className="font-semibold">{data.company_symbol}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{data.quarter}</span>
              </div>
              <div className="flex items-center gap-2">
                <Database size={18} />
                <span>{data.source_chunks} source chunks analyzed</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-200">Analysis Date</p>
            <p className="font-semibold">{formatDate(data.analysis_date)}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
