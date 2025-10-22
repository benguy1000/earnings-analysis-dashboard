'use client';

import { Search, Filter } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  selectedUrgency: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onUrgencyChange: (urgency: string) => void;
  onSearchChange: (query: string) => void;
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  selectedUrgency,
  searchQuery,
  onCategoryChange,
  onUrgencyChange,
  onSearchChange,
}: FilterSidebarProps) {
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
          Search
        </label>
        <input
          type="text"
          placeholder="Search opportunities..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Urgency Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Urgency Level
        </label>
        <select
          value={selectedUrgency}
          onChange={(e) => onUrgencyChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="All">All Levels</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
