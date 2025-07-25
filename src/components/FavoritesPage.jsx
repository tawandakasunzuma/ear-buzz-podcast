import { useState, useMemo } from "react";
import { useFavorites } from '../contexts/FavoritesContext';
import he from 'he';
import "../styles/FavoritesPage.css";
import podcastIcon from '../assets/images/podcast-icon.svg'
import deleteIcon from '../assets/images/delete-icon.svg'
import playIcon from '../assets/images/play.png'

/**
 * Displays and manages the user's saved episodes.
 *
 * @param {{ setAudioSrc: function, setCurrentEpisode: function }} props
 * @param {function} props.setAudioSrc - Sets the audio source URL.
 * @param {function} props.setCurrentEpisode - Sets the current episode object.
 */
export default function FavoritesPage({ setAudioSrc, setCurrentEpisode }) {

  // Get favorites array and helper functions from context
  const { favorites, remove, clearAll } = useFavorites();

  /* ====================
     STATE
  ==================== */

  const [sortBy, setSortBy] = useState("date-new");
  const [filterShow, setFilterShow] = useState("All Shows");

  /* ====================
    GROUPED FAVORITES
  ==================== */

  // Group the favorite episodes by show title
  const grouped = useMemo(() => {

    return favorites.reduce((acc, fav) => {

      // If the show title doesn't exist, create an empty array and add the favorite episode
      (acc[fav.showTitle] ||= []).push(fav);

      // Return the updated accumulator
      return acc;

    }, {}); // Start with an empty object
  }, [favorites]); // Re-run this code when the favorites array changes

  /* ====================
     FUNCTION
  ==================== */

  /**
   * Removes a favorite episode by its ID.
   * 
   * @param {string} id - The ID of the favorite episode to remove.
  */
  function handleRemove(id) {
    remove(id);
  }

  /**
   * Sort list according to sortBy state.
   * @param {Array} list - Array of favorite objects.
   * @returns {Array} - New sorted array.
   */
  function sortList(list) {
    return [...list].sort((a, b) => {
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      if (sortBy === "date-new") return new Date(b.addedAt) - new Date(a.addedAt);
      if (sortBy === "date-old") return new Date(a.addedAt) - new Date(b.addedAt);
      return 0;
    });
  }

  /**
   * Formats a date string into a readable "Added on" format.
   * 
   * @param {string} dateString - The date to format.
   * @returns {string} - The formatted date and time, e.g., "Added on Jan 01, 2022 | 14:30".
  */
  function formatAddedAt(dateString) {
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `Added on ${datePart} | ${timePart}`;
  }

  /**
   * Returns the first few words of a given text.
   * 
   * @param {string} text - Full description text.
   * @param {number} [wordLimit=50] - Max words to include. Default is 50.
   * @returns {string} - Truncated text.
  */
  function getFirstWords(text, wordLimit = 50) {
    if (!text || text.trim() === "") return "";
    const words = text.trim().split(" ");
    const sliced = words.slice(0, wordLimit).join(" ");
    return words.length > wordLimit ? sliced + "…" : sliced;
  }

  /**
   * Sets the current episode and audio source to play.
   * 
   * @param {Object} fav - The favorite episode object.
   * @param {string} fav.file - The file URL of the episode to play.
  */
  function handlePlay(fav) {
    setCurrentEpisode(fav);
    setAudioSrc(fav.file);
  }

  /* ====================
    * RETURN *
  ==================== */

  return (
    <div className="favorites">

      {/* Top header with title and clear-all button */}
      <div className="top-fav-page">

        <div className="top-title-heading-and-sub">
          <h2 className="favorites-heading">My Favourites</h2>
          <p className="favorites-sub-heading">Your saved episodes from all shows</p>
        </div>

        <button 
          className="clear-fav-btn" 
            onClick={() => {
              if (window.confirm("Are you sure you want to delete all favorites?")) {
                clearAll();
              }
            }}
        >
          Remove All Favorites
        </button>

      </div>

      {/* Sort & filter controls */}
      <div className="sorting-container">
        
        <label className="filter-by-text">Sort & FIlter:</label>
        
        <select 
          value={sortBy} 
          onChange={e => setSortBy(e.target.value)}
          className="fav-sort"
        >
          <option value="date-new">Newest Added</option>
          <option value="date-old">Oldest Added</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
        </select>
        
        <select
          value={filterShow}
          onChange={e => setFilterShow(e.target.value)}
          className="fav-sort"
        >
          <option value="All Shows">All Shows</option>
          {Object.keys(grouped).map(showTitle => (
            <option key={showTitle} value={showTitle}>
              {he.decode(showTitle)}
            </option>
          ))}
        </select>
      
      </div>
      
      <p className="sort-note">* Sorting applies within each podcast *</p>
      
      {/* Groups of favorites by show */}
      {Object.entries(grouped).map(([showTitle, list]) => (
        (filterShow === "All Shows" || filterShow === showTitle) && (
          <section key={showTitle} className="show-group">
            
            {/* Show header */}
            <div className="fav-podcast-title-container">
              <img className="fav-podcast-icon" src={podcastIcon} alt="Podcast icon" />
              <h3 className="group-heading">{he.decode(showTitle)}</h3>
              <p className="fav-num-episodes">({list.length} {list.length === 1 ? 'episode' : 'episodes'})</p>
            </div>

            {/* Each favorite item */}
            {sortList(list).map((fav, index) => (
              <div key={index} className="fav-item">
                <div className="fav-left-side">

                  <img className="fav-img" src={fav.image} alt={fav.title} />

                  <div className="fav-info">
                    <p className="fav-title">
                      Episode {fav.episodeNumber} - {fav.title}
                    </p>

                    <span className="fav-season-num">
                      • Season {fav.seasonNumber} •
                    </span>

                    <p className="fav-description">
                      {getFirstWords(fav.description)}
                    </p>

                    <small className="fav-added-on">
                      {formatAddedAt(fav.addedAt)}
                    </small>

                  </div>
                </div>

                {/* Right side: remove & play */}
                <div className="fav-right-side">
                  <img 
                    className="fav-icon" 
                    src={deleteIcon} 
                    alt="Remove favorite"
                    onClick={() => handleRemove(fav.id)} />
                  <img 
                    className="fav-play-btn" 
                    onClick={() => handlePlay(fav)}
                    src={playIcon} alt="play-icon" 
                  />
                </div>

              </div>
            ))}
          </section>
        )
      ))}
    
      {/* Show when no favorites exist */}
      {favorites.length < 1 && (
        <div className="no-podcasts-container">
            <p className="no-podcasts-text">No favorites saved</p>
        </div>
      )}
      
    </div>
  );
}
