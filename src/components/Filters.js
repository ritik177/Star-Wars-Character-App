import React from 'react';

const Filters = ({ filters, filterOptions, onFilterChange, onClearFilters }) => {
  const hasActiveFilters = filters.homeworld || filters.film || filters.species;

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between">
        <div className="flex flex-wrap gap-4 flex-1">
          {/* Homeworld Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Homeworld
            </label>
            <select
              value={filters.homeworld || ''}
              onChange={(e) => onFilterChange('homeworld', e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">All Homeworlds</option>
              {filterOptions.homeworlds.map((hw) => (
                <option key={hw.url} value={hw.url}>
                  {hw.name}
                </option>
              ))}
            </select>
          </div>

          {/* Film Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Film
            </label>
            <select
              value={filters.film || ''}
              onChange={(e) => onFilterChange('film', e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">All Films</option>
              {filterOptions.films.map((film) => (
                <option key={film.url} value={film.url}>
                  {film.name}
                </option>
              ))}
            </select>
          </div>

          {/* Species Filter */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Species
            </label>
            <select
              value={filters.species || ''}
              onChange={(e) => onFilterChange('species', e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">All Species</option>
              {filterOptions.species.map((spec) => (
                <option key={spec.url} value={spec.url}>
                  {spec.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="w-full md:w-auto">
            <div className="h-[1.625rem] md:h-0"></div>
            <button
              onClick={onClearFilters}
              className="w-full md:w-auto px-4 py-2 text-cyan-400 hover:text-cyan-300 border border-cyan-500 hover:border-cyan-400 rounded-lg transition-colors mt-6 md:mt-0"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;

