import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import AudioPlayer from "./components/AudioPlayer";
import useAudio from "../hooks/useAudio.js";
import ShowDetail from './components/ShowDetail';
import Favorites from './components/Favorites';
import "./styles/App.css";

export default function App() {
  // =========================
  // 🎧 AUDIO & EPISODE STATE
  // =========================
  const [currentAudioSrc, setCurrentAudioSrc] = useState('');
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const audioRef = useAudio(currentAudioSrc); // custom hook to handle play/pause/reset

  // ===============================
  // 📡 DATA FETCHING STATE
  // ===============================
  const [podcastData, setPodcastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // ===============================
  // 🔍 SEARCH / FILTER / SORT STATE
  // ===============================
  const [searchLetters, setSearchLetters] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [sortOrder, setSortOrder] = useState("Newest");

  // ===============================
  // 📄 PAGINATION STATE
  // ===============================
  const [currentPage, setCurrentPage] = useState(1);
  const podcastsPerPage = 12;

  // ===================================================
  // 🧠 LOAD SESSION DATA (for filters + page restore)
  // ===================================================
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

  // ================================
  // 🛰️ FETCH PODCAST DATA FROM API
  // ================================
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

  // ===============================
  // 🔍 FILTER PODCASTS BY SEARCH
  // ===============================
  let filteredData = podcastData.filter(podcast =>
    podcast.title.toLowerCase().includes(searchLetters.toLowerCase())
  );

  // ⬅️ Reset to first page on new search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchLetters]);

  // 🎭 Filter by genre
  if (selectedGenre !== "All Genres") {
    const genreId = Number(selectedGenre);
    filteredData = filteredData.filter(podcast =>
      podcast.genres.includes(genreId)
    );
  }

  // ⬇️ Sort by selected order
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

  // ====================================
  // 📄 PAGINATION - CURRENT PAGE SETUP
  // ====================================
  const totalPages = Math.ceil(filteredData.length / podcastsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * podcastsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + podcastsPerPage);

  // ================================
  // 🎬 RENDER JSX
  // ================================
  return (
    <>
      <Header
        searchLetters={searchLetters}
        setSearchLetters={setSearchLetters}
      />

      <Routes>
        {/* Home route with podcast grid */}
        <Route
          path="/"
          element={
            <Main
              podcastData={paginatedData}
              loading={loading}

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
          element={<Favorites />}
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
          <p className='loading-text'>Loading...</p>
        </div>
      }

      {/* Global audio player at bottom */}
      <AudioPlayer audioRef={audioRef} episode={currentEpisode} />
    </>
  );
}
