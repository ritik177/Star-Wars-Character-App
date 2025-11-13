import React from 'react';

const ActiveFilters = ({ searchQuery, filters, filterOptions, onClearSearch, onClearFilters, onClearAll, resultCount, totalCount }) => {
  const hasSearch = searchQuery.trim();
  const hasFilters = filters.homeworld || filters.film || filters.species;
  const hasAnyActive = hasSearch || hasFilters;

  if (!hasAnyActive) return null;

  const getFilterName = (type, url) => {
    const options = filterOptions[type === 'homeworld' ? 'homeworlds' : type === 'film' ? 'films' : 'species'];
    const option = options.find((opt) => opt.url === url);
    return option ? option.name : 'Unknown';
  };

  return (
    <div className="mb-4 p-4 bg-gray-900 border border-gray-700 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-400">Active:</span>
          
          {/* Search Badge */}
          {hasSearch && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-900 border border-cyan-700 rounded-full text-sm text-cyan-300">
              <span>Search: "{searchQuery}"</span>
              <button
                onClick={onClearSearch}
                className="hover:text-cyan-100 transition-colors"
                aria-label="Clear search"
              >
                ×
              </button>
            </span>
          )}

          {/* Homeworld Badge */}
          {filters.homeworld && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-900 border border-cyan-700 rounded-full text-sm text-cyan-300">
              <span>Homeworld: {getFilterName('homeworld', filters.homeworld)}</span>
              <button
                onClick={() => onClearFilters({ homeworld: '' })}
                className="hover:text-cyan-100 transition-colors"
                aria-label="Clear homeworld filter"
              >
                ×
              </button>
            </span>
          )}

          {/* Film Badge */}
          {filters.film && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-900 border border-cyan-700 rounded-full text-sm text-cyan-300">
              <span>Film: {getFilterName('film', filters.film)}</span>
              <button
                onClick={() => onClearFilters({ film: '' })}
                className="hover:text-cyan-100 transition-colors"
                aria-label="Clear film filter"
              >
                ×
              </button>
            </span>
          )}

          {/* Species Badge */}
          {filters.species && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-900 border border-cyan-700 rounded-full text-sm text-cyan-300">
              <span>Species: {getFilterName('species', filters.species)}</span>
              <button
                onClick={() => onClearFilters({ species: '' })}
                className="hover:text-cyan-100 transition-colors"
                aria-label="Clear species filter"
              >
                ×
              </button>
            </span>
          )}

          {/* Result Count */}
          <span className="text-sm text-gray-400 ml-2">
            ({resultCount} {resultCount === 1 ? 'result' : 'results'}{totalCount !== resultCount ? ` of ${totalCount}` : ''})
          </span>
        </div>

        {/* Clear All Button */}
        {(hasSearch && hasFilters) && (
          <button
            onClick={onClearAll}
            className="px-4 py-1.5 text-sm text-cyan-400 hover:text-cyan-300 border border-cyan-500 hover:border-cyan-400 rounded-lg transition-colors whitespace-nowrap"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;

