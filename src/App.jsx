import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import ShowDetail from './components/ShowDetail';

import "./styles/App.css"

export default function App() {

  // State for fetch logic
  const [podcastData,setPodcastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError,setHasError] = useState(false);

  // State for search, filter, sort, page state
  const [searchLetters,setSearchLetters] = useState("");
  const [selectedGenre,setSelectedGenre] = useState("All Genres");
  const [sortOrder,setSortOrder] = useState("Newest");
  const [currentPage,setCurrentPage] = useState(1);

  // Set filters and state if it is saved in sessionStorage
  useEffect(() => {
  
    const savedSearch = sessionStorage.getItem('searchLetters');
    if (savedSearch !== null && savedSearch !== "undefined") {
      setSearchLetters(savedSearch);
    }

    const savedGenre = sessionStorage.getItem('selectedGenre');
    if (savedGenre !== null && savedGenre !== "undefined") {
      setSelectedGenre(savedGenre);
    }

    const savedSort = sessionStorage.getItem('sortOrder');
    if (savedSort !== null && savedSort !== "undefined") {
      setSortOrder(savedSort);
    }

    const savedPage = sessionStorage.getItem('currentPage');
    const pageNum = Number(savedPage);
    setCurrentPage(pageNum);
  }, []);

  useEffect(() => {

    //Fetch data from API
    fetch("https://podcast-api.netlify.app/shows")

      // If response is OK, parse from JSON into a JS object
      .then(response => {
        if (!response.ok) throw new Error("Data failed to be fetched");
        return response.json();
      })

      // Set podcast data to data fetched
      .then(data => {
        setPodcastData(data);
      })
  
      // Show error in console and on the UI
      .catch(error => {
        console.error("Error:", error);
        setHasError(true);
      })
  
      // Stop loading
      .finally(() => {
        setLoading(false)
      })
  },[])

  // Filter by title in search bar
  let filteredData = podcastData.filter(podcast => (
    podcast.title.toLowerCase().includes(searchLetters.toLowerCase())
  ));

  // Go back to page 1 when letters typed
  useEffect(() => {
    setCurrentPage(1)
  },[searchLetters]);

  // Filter by genre
  if (selectedGenre !== "All Genres") {
    const genreId = Number(selectedGenre);
    filteredData = filteredData.filter(podcast => (
      podcast.genres.includes(genreId)
    ))
  }

  // Sort in order
  filteredData.sort((a,b) => {
    if (sortOrder === "Newest") {
      return new Date (b.updated) - new Date(a.updated);
    } else if (sortOrder === "Oldest") {
      return new Date (a.updated) - new Date(b.updated);
    } else if (sortOrder === "TitleAsc") {
      return a.title.localeCompare(b.title);      
    } else if (sortOrder === "TitleDesc") {
      return b.title.localeCompare(a.title);
    }
  });
  
  // Podcasts displayed per page
  const podcastsPerPage = 12;
  
  // Copy of filtered list
  const processedData = [...filteredData];

  // How may pages we need
  const totalPages = Math.ceil(processedData.length / podcastsPerPage);

  // Reset page back to Page 1 after changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  },[totalPages,currentPage])

  // Get podcasts for current page
  const startIndex = (currentPage - 1) * podcastsPerPage;
  const endIndex = startIndex + podcastsPerPage;
  const paginatedData = processedData.slice(startIndex,endIndex);

  return (
    <>
      
        <Header 
          searchLetters={searchLetters} 
          setSearchLetters={setSearchLetters}
        />
        
        <Routes>

        {/* Homepage route */}
        <Route 
          path='/' 
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
        >
        </Route>

        {/* Show details route */}
        <Route
          path='/show/:id'
          element={<ShowDetail />}
        >
        </Route>
      </Routes>

        {/* Show error if no data fetched */}
        {hasError && 
          <div className='error-container'>
            <p className='error-msg'>
              Data could not be fetched
            </p>
          </div>
        }

        {/* Show loading info */}
        {loading && 
          <div className='loading-container'>
            <div className='loading-circle'></div>
            <p className='loading-text'>Loading...</p>
          </div>
        }
    </>
  )
}