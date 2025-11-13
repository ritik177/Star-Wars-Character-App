import React, { useState, useEffect, useMemo } from 'react';
import { fetchCharacters, fetchHomeworld, fetchFilm, fetchSpecies } from './services/api';
import {
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  setupTokenRefresh,
} from './services/auth';
import CharacterCard from './components/CharacterCard';
import CharacterDetails from './components/CharacterDetails';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import Error from './components/Error';
import Footer from './components/Footer';
import Search from './components/Search';
import Filters from './components/Filters';
import ActiveFilters from './components/ActiveFilters';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [loginError, setLoginError] = useState(null);
  const [user, setUser] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentUrl, setCurrentUrl] = useState('https://swapi.dev/api/people/?format=json');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    homeworld: '',
    film: '',
    species: '',
  });
  const [filterOptions, setFilterOptions] = useState({
    homeworlds: [],
    films: [],
    species: [],
  });

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    setUser(null);
    // Clear all app state
    setSearchQuery('');
    setFilters({
      homeworld: '',
      film: '',
      species: '',
    });
    setSelectedCharacter(null);
  };

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
      if (authenticated) {
        setUser(getCurrentUser());
      }
      setAuthLoading(false);
    };

    checkAuth();

    // Setup token refresh
    const cleanup = setupTokenRefresh(
      (newToken) => {
        console.log('Token refreshed successfully');
        // Token refreshed, user remains authenticated
      },
      () => {
        // Token refresh failed, logout
        handleLogout();
      }
    );

    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadCharacters(currentUrl);
  }, [currentUrl]);

  // Build filter options from current characters
  useEffect(() => {
    const buildFilterOptions = async () => {
      if (characters.length === 0) {
        setFilterOptions({ homeworlds: [], films: [], species: [] });
        return;
      }

      // Extract unique URLs
      const homeworldUrls = [...new Set(characters.map((c) => c.homeworld).filter(Boolean))];
      const filmUrls = [...new Set(characters.flatMap((c) => c.films || []))];
      const speciesUrls = [...new Set(characters.flatMap((c) => c.species || []))];

      // Fetch names for each URL
      const [homeworlds, films, species] = await Promise.all([
        Promise.all(
          homeworldUrls.map(async (url) => {
            try {
              const data = await fetchHomeworld(url);
              return { url, name: data.name };
            } catch {
              return { url, name: 'Unknown' };
            }
          })
        ),
        Promise.all(
          filmUrls.map(async (url) => {
            try {
              const data = await fetchFilm(url);
              return { url, name: data.title };
            } catch {
              return { url, name: 'Unknown' };
            }
          })
        ),
        Promise.all(
          speciesUrls.map(async (url) => {
            try {
              const data = await fetchSpecies(url);
              return { url, name: data.name };
            } catch {
              return { url, name: 'Unknown' };
            }
          })
        ),
      ]);

      setFilterOptions({
        homeworlds: homeworlds.sort((a, b) => a.name.localeCompare(b.name)),
        films: films.sort((a, b) => a.name.localeCompare(b.name)),
        species: species.sort((a, b) => a.name.localeCompare(b.name)),
      });
    };

    buildFilterOptions();
  }, [characters]);

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
      // Clear filters when changing pages
      handleClearFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (previousUrl) {
      setCurrentUrl(previousUrl);
      setCurrentPage((prev) => prev - 1);
      // Clear filters when changing pages
      handleClearFilters();
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

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleClearFilters = (specificFilter = null) => {
    if (specificFilter) {
      setFilters((prev) => ({
        ...prev,
        ...specificFilter,
      }));
    } else {
      setFilters({
        homeworld: '',
        film: '',
        species: '',
      });
    }
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setFilters({
      homeworld: '',
      film: '',
      species: '',
    });
  };

  const handleLogin = async (username, password) => {
    try {
      setLoginError(null);
      const result = await login(username, password);
      setIsAuth(true);
      setUser(result.user);
    } catch (err) {
      setLoginError(err.message || 'Login failed');
      throw err;
    }
  };

  // Filter characters based on search query and filters
  const filteredCharacters = useMemo(() => {
    let filtered = [...characters];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(query)
      );
    }

    // Apply homeworld filter
    if (filters.homeworld) {
      filtered = filtered.filter(
        (character) => character.homeworld === filters.homeworld
      );
    }

    // Apply film filter
    if (filters.film) {
      filtered = filtered.filter((character) =>
        character.films && character.films.includes(filters.film)
      );
    }

    // Apply species filter
    if (filters.species) {
      filtered = filtered.filter((character) =>
        character.species && character.species.includes(filters.species)
      );
    }

    return filtered;
  }, [characters, searchQuery, filters]);

  // Show login if not authenticated
  if (authLoading) {
    return <Loading />;
  }

  if (!isAuth) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-black border-b border-cyan-500 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex-1"></div>
            <div className="flex justify-center items-center flex-1">
              <img
                src="/StarWarImage.png"
                alt="Star Wars Logo"
                className="h-16 md:h-20 object-contain"
              />
            </div>
            <div className="flex-1 flex justify-end">
              <LogoutButton onLogout={handleLogout} username={user?.username} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error message={error} onRetry={handleRetry} />
        ) : (
          <>
            {/* Search Component */}
            <Search
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onClear={handleClearSearch}
            />

            {/* Filters Component */}
            <Filters
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />

            {/* Active Filters Indicator */}
            <ActiveFilters
              searchQuery={searchQuery}
              filters={filters}
              filterOptions={filterOptions}
              onClearSearch={handleClearSearch}
              onClearFilters={handleClearFilters}
              onClearAll={handleClearAll}
              resultCount={filteredCharacters.length}
              totalCount={characters.length}
            />

            {/* Character Grid or No Results */}
            {filteredCharacters.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-300 text-lg">
                  {searchQuery || filters.homeworld || filters.film || filters.species
                    ? 'No characters found matching your criteria.'
                    : 'No characters found.'}
                </p>
                {(searchQuery || filters.homeworld || filters.film || filters.species) && (
                  <div className="mt-4 flex gap-4 justify-center">
                    {searchQuery && (
                      <button
                        onClick={handleClearSearch}
                        className="text-cyan-400 hover:text-cyan-300 underline"
                      >
                        Clear search
                      </button>
                    )}
                    {(filters.homeworld || filters.film || filters.species) && (
                      <button
                        onClick={handleClearFilters}
                        className="text-cyan-400 hover:text-cyan-300 underline"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Character Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredCharacters.map((character) => (
                    <CharacterCard
                      key={character.url}
                      character={character}
                      onClick={() => handleCharacterClick(character)}
                    />
                  ))}
                </div>

                {/* Pagination - Only show when not searching or filtering */}
                {!searchQuery && !filters.homeworld && !filters.film && !filters.species && (
                  <Pagination
                    currentPage={currentPage}
                    hasNext={!!nextUrl}
                    hasPrevious={!!previousUrl}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                  />
                )}
              </>
            )}
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

