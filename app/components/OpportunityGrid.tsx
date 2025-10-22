import { Opportunity } from '@/lib/types';
import OpportunityCard from './OpportunityCard';

interface OpportunityGridProps {
  opportunities: Opportunity[];
}

export default function OpportunityGrid({ opportunities }: OpportunityGridProps) {
  if (opportunities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">No opportunities match your filters.</p>
        <p className="text-gray-400 mt-2">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {opportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.opportunity_id} opportunity={opportunity} />
      ))}
    </div>
  );
}
