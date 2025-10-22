export function getUrgencyColor(urgency: string): string {
  switch (urgency) {
    case 'High':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Low':
      return 'bg-green-100 text-green-800 border-green-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}

export function getCategoryIcon(category: string): string {
  const icons: { [key: string]: string } = {
    'Cost Management': '💰',
    'Supply Chain': '🔗',
    'Operations': '⚙️',
    'Technology': '💻',
    'Strategy': '🎯',
    'Risk Management': '⚠️',
  };
  return icons[category] || '📊';
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
