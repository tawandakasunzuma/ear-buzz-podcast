import { useState, useMemo } from "react";
import { useFavorites } from '../contexts/FavoritesContext';
import he from 'he';
import "../styles/FavoritesPage.css";
import podcastIcon from '../assets/images/podcast-icon.svg'
import yellowFavIcon from '../assets/images/yellow-fav-icon.png'
import playIcon from '../assets/images/play.png'

export default function FavoritesPage({ setAudioSrc, setCurrentEpisode }) {
  const { favorites, remove } = useFavorites();
  const [sortBy, setSortBy] = useState("date-new");
  const [filterShow, setFilterShow] = useState("All Shows");

  // Group the favorite episodes by show title
  const grouped = useMemo(() => {
    return favorites.reduce((acc, fav) => {
      // If the show title doesn't exist, create an empty array and add the favorite episode
      (acc[fav.showTitle] ||= []).push(fav);
      // Return the updated accumulator
      return acc;
    }, {}); // Start with an empty object
  }, [favorites]); // Re-run this code when the favorites array changes

  /**
   * Removes a favorite episode by its ID.
   * 
   * @param {string} id - The ID of the favorite episode to remove.
  */
  function handleRemove(id) {
    remove(id);
  }

  /**
   * Sorts a list of items based on the selected sorting criteria.
   * 
   * @param {Array} list - The list of items to sort.
   * @returns {Array} - The sorted list.
   * 
   * The list is sorted by one of the following criteria:
   * - "title-asc" (A to Z)
   * - "title-desc" (Z to A)
   * - "date-new" (Newest first)
   * - "date-old" (Oldest first)
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
   * @param {string} text - The text to trim.
   * @param {number} [wordLimit=50] - The maximum number of words to return. Defaults to 50.
   * @returns {string} - The first `wordLimit` words of the text followed by an ellipsis.
  */
  function getFirstWords(text, wordLimit = 50) {
    return text?.split(" ").slice(0, wordLimit).join(" ") + "…";
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

  return (
    <div className="favorites">

      <h2 className="favorites-heading">My Favourites</h2>
      <p className="favorites-sub-heading">Your saved episodes from all shows</p>

      {/* Controls to sort */}
      <div className="sorting-container">
        <label className="filter-by-text">Sort:</label>
        <select 
          value={sortBy} 
          onChange={e => setSortBy(e.target.value)}
          className="fav-sort"
        >
          <option value="date-new" selected>Newest Added</option>
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
      
      {/* Display each group */}
      {Object.entries(grouped).map(([showTitle, list]) => (
        (filterShow === "All Shows" || filterShow === showTitle) && (
          <section key={showTitle} className="show-group">
            
            {/* Favorite podcast heading */}
            <div className="fav-podcast-title-container">
              <img className="fav-podcast-icon" src={podcastIcon} alt="Podcast icon" />
              <h3 className="group-heading">{he.decode(showTitle)}</h3>
              <p className="fav-num-episodes">({list.length} {list.length === 1 ? 'episode' : 'episodes'})</p>
            </div>

            {/*  */}
            {sortList(list).map((fav, index) => (
              <div key={index} className="fav-item">

                {/* Left side favorite */}
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

                {/* Right side favorite */}
                <div className="fav-right-side">
                  <img 
                    className="fav-icon" 
                    src={yellowFavIcon} 
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
    
      {/* Show no details available */}
      {favorites.length < 1 && (
        <div className="no-podcasts-container">
            <p className="no-podcasts-text">No favorites saved</p>
        </div>
      )}
    </div>
  );
}
