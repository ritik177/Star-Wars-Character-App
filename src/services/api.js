const BASE_URL = 'https://swapi.dev/api';

/**
 * Fetches data from a URL
 * @param {string} url - The URL to fetch from
 * @returns {Promise<Object>} The JSON response
 */
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};

/**
 * Fetches characters from SWAPI with pagination
 * @param {string} url - The URL to fetch characters from
 * @returns {Promise<Object>} Object containing count, next, previous, and results
 */
export const fetchCharacters = async (url = `${BASE_URL}/people/?format=json`) => {
  return await fetchData(url);
};

/**
 * Fetches a single character by URL
 * @param {string} url - The character URL
 * @returns {Promise<Object>} Character data
 */
export const fetchCharacter = async (url) => {
  return await fetchData(url);
};

/**
 * Fetches homeworld details
 * @param {string} url - The homeworld URL
 * @returns {Promise<Object>} Homeworld data
 */
export const fetchHomeworld = async (url) => {
  return await fetchData(url);
};

/**
 * Fetches species details
 * @param {string} url - The species URL
 * @returns {Promise<Object>} Species data
 */
export const fetchSpecies = async (url) => {
  return await fetchData(url);
};

/**
 * Fetches film details
 * @param {string} url - The film URL
 * @returns {Promise<Object>} Film data
 */
export const fetchFilm = async (url) => {
  return await fetchData(url);
};

