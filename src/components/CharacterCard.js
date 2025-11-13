import React from 'react';

/**
 * Get a color based on species (or default if no species)
 * @param {Array} species - Array of species URLs
 * @returns {string} Tailwind color class
 */
const getSpeciesColor = (species) => {
  if (!species || species.length === 0) {
    return 'bg-gradient-to-br from-cyan-400 to-cyan-600'; // Default human color
  }
  
  // Use species count to determine color (simple hash-based approach)
  const speciesCount = species.length;
  const colors = [
    'bg-gradient-to-br from-blue-400 to-blue-600',    // Droid
    'bg-gradient-to-br from-green-400 to-green-600',  // Wookiee
    'bg-gradient-to-br from-purple-400 to-purple-600', // Other species
    'bg-gradient-to-br from-red-400 to-red-600',      // Sith
    'bg-gradient-to-br from-indigo-400 to-indigo-600', // Jedi
  ];
  
  return colors[speciesCount % colors.length];
};

/**
 * Get random image URL from Picsum Photos based on character name
 * @param {string} name - Character name
 * @returns {string} Image URL
 */
const getRandomImage = (name) => {
  // Use character name to generate a consistent seed
  const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `https://picsum.photos/seed/${seed}/400/500`;
};

const CharacterCard = ({ character, onClick }) => {
  const speciesColor = getSpeciesColor(character.species);
  const imageUrl = getRandomImage(character.name);

  return (
    <div
      onClick={onClick}
      className={`${speciesColor} rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl`}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={character.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x500?text=No+Image';
          }}
        />
      </div>
      <div className="p-4 bg-gray-900 bg-opacity-95">
        <h3 className="text-xl font-bold text-cyan-400 truncate">{character.name}</h3>
        <p className="text-sm text-gray-300 mt-1">
          {character.birth_year !== 'unknown' ? `Born: ${character.birth_year}` : 'Birth year unknown'}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;

