import { useState, useEffect, useMemo  } from 'react';
import { Routes, Route } from 'react-router-dom';
import useAudio from '../hooks/useAudio.js';
import Header from './components/Header';
import Main from './components/Main';
import AudioPlayer from "./components/AudioPlayer";
import ShowDetail from './components/ShowDetail';
import FavoritesPage from './components/FavoritesPage';
import RecommendedCarousel from './components/RecommendedCarousel.jsx';
import "./styles/App.css";

/**
 * Root component of the podcast.
 * It handles:
 *  - Audio playback state
 *  - Fetching and filtering podcast data
 *  - Pagination
 *  - Routing between Home, ShowDetail, and Favorites pages
 */
export default function App() {

  /* ====================
    STATE
  ==================== */

  // Audio & Episode state
  const [currentAudioSrc, setCurrentAudioSrc] = useState('');
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const audioRef = useAudio(); // Custom hook to control <audio> element
  // Data fetching state
  const [podcastData, setPodcastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  // Search, filter, sort state
  const [searchLetters, setSearchLetters] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [sortOrder, setSortOrder] = useState("Newest");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const podcastsPerPage = 12;

  /* ====================
    EFFECTS
  ==================== */
  
  // Load session data
  useEffect(() => {
    const savedSearch = sessionStorage.getItem('searchLetters');
    if (savedSearch && savedSearch !== "undefined") setSearchLetters(savedSearch);

    const savedGenre = sessionStorage.getItem('selectedGenre');
    if (savedGenre && savedGenre !== "undefined") setSelectedGenre(savedGenre);

    const savedSort = sessionStorage.getItem('sortOrder');
    if (savedSort && savedSort !== "undefined") setSortOrder(savedSort);

    const savedPage = Number(sessionStorage.getItem('currentPage'));
    if (!isNaN(savedPage)) setCurrentPage(savedPage);
  }, []);

  // Fetch podcast data from API
  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then(response => {
        if (!response.ok) throw new Error("Data failed to be fetched");
        return response.json();
      })
      .then(data => {
        setPodcastData(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ====================
    FILTER PODCASTS BY SEARCH
  ==================== */
  
  let filteredData = podcastData.filter(podcast =>
    podcast.title.toLowerCase().includes(searchLetters.toLowerCase())
  );

  // Reset to first page on new search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchLetters]);

  // Filter by genre, if not selected 'All Genres'
  if (selectedGenre !== "All Genres") {
    const genreId = Number(selectedGenre);
    filteredData = filteredData.filter(podcast =>
      podcast.genres.includes(genreId)
    );
  }

  // Sort by selected order
  filteredData.sort((a, b) => {
    switch (sortOrder) {
      case "Newest":
        return new Date(b.updated) - new Date(a.updated);
      case "Oldest":
        return new Date(a.updated) - new Date(b.updated);
      case "TitleAsc":
        return a.title.localeCompare(b.title);
      case "TitleDesc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  /* ====================
    PAGINATION - CURRENT PAGE SETUP
  ==================== */

  const totalPages = Math.ceil(filteredData.length / podcastsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * podcastsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + podcastsPerPage);

  /* ====================
    RANDOM RECOMMENDED SHOWS (10 items)
  ==================== */

  const recommendedShows = useMemo(() => {

    // If no podcasts found in API, do nothing
    if (podcastData.length === 0) return [];

    // Make a copy of the original data
    const copied = [...podcastData];

    // Shuffle the copy
    for (let i = copied.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }

    // Take the first 10 items from the shuffled list
    return copied.slice(0, 10);
  }, [podcastData])

  /* ====================
    * RETURN *
  ==================== */

  return (
    <>
      {/* Header */}
      <Header
        searchLetters={searchLetters}
        setSearchLetters={setSearchLetters}
      />

      <Routes>

        {/* Home route with podcast grid */}
        <Route
          path="/"
          element={
            <>
              {!loading && (
              
              // Recommended Carousel
              <RecommendedCarousel 
                recommendedShows={recommendedShows}
              />

              )}
              {!loading && (

                // Main component
                <Main
                  podcastData={paginatedData}
                  loading={loading}
                  hasError={hasError}

                  searchLetters={searchLetters}
                  selectedGenre={selectedGenre}
                  setSelectedGenre={setSelectedGenre}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}

                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  podcastsPerPage={podcastsPerPage}
                  totalPages={totalPages}
                />
              )}
            </>
          }
        />

        {/* Show detail route */}
        <Route
          path="/show/:id"
          element={
            <ShowDetail
              setAudioSrc={setCurrentAudioSrc}
              setCurrentEpisode={setCurrentEpisode}
              audioRef={audioRef}
            />
          }
        />

        {/* Favorites page */}
        <Route
          path="/favorites"
          element={<FavoritesPage
            setAudioSrc={setCurrentAudioSrc}
            setCurrentEpisode={setCurrentEpisode}
          />}
        />
      </Routes>

      {/* Error message if fetch fails */}
      {hasError &&
        <div className='error-container'>
          <p className='error-msg'>Data could not be fetched</p>
        </div>
      }

      {/* Loading screen */}
      {loading &&
        <div className='loading-container'>
          <div className='loading-circle'></div>
        </div>
      }

      {/* Global audio player */}
      <AudioPlayer audioRef={audioRef} episode={currentEpisode} />
    </>
  );
}
