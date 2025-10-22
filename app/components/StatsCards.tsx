import { TrendingUp, AlertCircle, Layers } from 'lucide-react';
import { Opportunity } from '@/lib/types';

interface StatsCardsProps {
  opportunities: Opportunity[];
}

export default function StatsCards({ opportunities }: StatsCardsProps) {
  const totalOpportunities = opportunities.length;
  const highUrgency = opportunities.filter(o => o.urgency === 'High').length;
  const categories = new Set(opportunities.map(o => o.category)).size;

  const stats = [
    {
      label: 'Total Opportunities',
      value: totalOpportunities,
      icon: TrendingUp,
      color: 'bg-primary',
    },
    {
      label: 'High Urgency',
      value: highUrgency,
      icon: AlertCircle,
      color: 'bg-red-500',
    },
    {
      label: 'Categories',
      value: categories,
      icon: Layers,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="text-white" size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
