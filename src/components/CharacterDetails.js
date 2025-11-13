import React, { useState, useEffect } from 'react';
import { fetchHomeworld } from '../services/api';

const CharacterDetails = ({ character, onClose }) => {
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHomeworld = async () => {
      if (!character.homeworld) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchHomeworld(character.homeworld);
        setHomeworld(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHomeworld();
  }, [character.homeworld]);

  /**
   * Format date from ISO string to dd-MM-yyyy
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!character) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-gray-900 border border-cyan-500 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-black">{character.name}</h2>
            <button
              onClick={onClose}
              className="text-black hover:text-gray-800 text-2xl font-bold transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 bg-gray-900">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Height</p>
              <p className="text-lg font-semibold text-cyan-400">
                {character.height !== 'unknown' ? `${character.height} cm` : 'Unknown'}
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Mass</p>
              <p className="text-lg font-semibold text-cyan-400">
                {character.mass !== 'unknown' ? `${character.mass} kg` : 'Unknown'}
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Birth Year</p>
              <p className="text-lg font-semibold text-cyan-400">{character.birth_year}</p>
            </div>
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Gender</p>
              <p className="text-lg font-semibold text-cyan-400 capitalize">
                {character.gender !== 'n/a' ? character.gender : 'N/A'}
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Number of Films</p>
              <p className="text-lg font-semibold text-cyan-400">
                {character.films ? character.films.length : 0}
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-400">Date Added</p>
              <p className="text-lg font-semibold text-cyan-400">
                {formatDate(character.created)}
              </p>
            </div>
          </div>

          {/* Homeworld Section */}
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Homeworld</h3>
            {loading && (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500"></div>
                <p className="text-gray-300 mt-2">Loading homeworld details...</p>
              </div>
            )}
            {error && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-4">
                <p className="text-red-300">Failed to load homeworld: {error}</p>
              </div>
            )}
            {!loading && !error && homeworld && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="text-lg font-semibold text-cyan-400">{homeworld.name}</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Terrain</p>
                  <p className="text-lg font-semibold text-cyan-400">{homeworld.terrain || 'N/A'}</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Climate</p>
                  <p className="text-lg font-semibold text-cyan-400">{homeworld.climate || 'N/A'}</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Population</p>
                  <p className="text-lg font-semibold text-cyan-400">
                    {homeworld.population !== 'unknown' ? homeworld.population : 'Unknown'}
                  </p>
                </div>
              </div>
            )}
            {!loading && !error && !homeworld && (
              <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                <p className="text-gray-300">No homeworld information available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;

