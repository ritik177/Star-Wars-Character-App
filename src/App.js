import React, { useState, useEffect } from 'react';
import { fetchCharacters } from './services/api';
import CharacterCard from './components/CharacterCard';
import CharacterDetails from './components/CharacterDetails';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import Error from './components/Error';
import Footer from './components/Footer';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('https://swapi.dev/api/people/?format=json');

  useEffect(() => {
    loadCharacters(currentUrl);
  }, [currentUrl]);

  const loadCharacters = async (url) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCharacters(url);
      setCharacters(data.results || []);
      setNextUrl(data.next);
      setPreviousUrl(data.previous);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (nextUrl) {
      setCurrentUrl(nextUrl);
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (previousUrl) {
      setCurrentUrl(previousUrl);
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const handleRetry = () => {
    loadCharacters(currentUrl);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-black border-b border-cyan-500 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center items-center">
            <img
              src="/StarWarImage.png"
              alt="Star Wars Logo"
              className="h-16 md:h-20 object-contain"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error message={error} onRetry={handleRetry} />
        ) : characters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">No characters found.</p>
          </div>
        ) : (
          <>
            {/* Character Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {characters.map((character) => (
                <CharacterCard
                  key={character.url}
                  character={character}
                  onClick={() => handleCharacterClick(character)}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              hasNext={!!nextUrl}
              hasPrevious={!!previousUrl}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </>
        )}
      </main>

      {/* Character Details Modal */}
      {selectedCharacter && (
        <CharacterDetails
          character={selectedCharacter}
          onClose={handleCloseModal}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

