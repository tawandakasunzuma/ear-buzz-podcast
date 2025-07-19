import he from 'he';
import "../styles/Card.css";
import seasonsIcon from '../assets/images/seasons-icon.svg';
import genreList from "../assets/genres";
import { Link } from "react-router-dom"

export default function Card ({ podcastData, searchLetters, selectedGenre, sortOrder, currentPage }) {

    /**
     * Makes genre tags using genre ID numbers.
     *
     * @param {number[]} genreIds - A list of genre IDs
     * @returns {JSX.Element[]} A list of <span> elements with genre names
     */
    function createGenreTags(genreIds) {
        return genreIds.map(id => {
            const genre = genreList.find(genre => genre.id === id);
            if (!genre) return null;
            return (
                <span key={id} className="genre-name">
                    {genre.title}
                </span>
            );
        });
    }
    const genreTags = createGenreTags(podcastData.genres);

    /**
     * Turns a date string into a human-readable format.
     *
     * @param {Object} data - The object that has the date.
     * @param {string} data.updated - The date string (ISO format).
     * @returns {string} A readable date string.
     */
    function getDate (data) {
        const date = new Date (data.updated);
        const day = String(date.getDate()).padStart(2, "0"); // Get day of month
        const month = date.toLocaleString("en", { month: "long" }); // Get the full month
        const year = date.getFullYear(); // Get full year
        const fullDate = `${day} ${month} ${year}`;
        return fullDate;
    }
    const formattedDate = getDate(podcastData);

    // Format title to change '&amp;' to '&'
    const decodedTitle = he.decode(podcastData.title);

    /**
     * Save current filters and state to sessionStorage
     */
    function handleClick() {
        if (searchLetters) {
            sessionStorage.setItem('searchLetters', searchLetters);
        }
        if (selectedGenre && selectedGenre !== "All Genres") {
            sessionStorage.setItem('selectedGenre', selectedGenre);
        }
        if (sortOrder && sortOrder !== "Newest") {
            sessionStorage.setItem('sortOrder', sortOrder);
        }
        // Only save page if it is page 2 up 
        if (currentPage > 1) {
            sessionStorage.setItem('currentPage', currentPage.toString());
        }
    }

    return (
        <>
           <Link 
            to={`/show/${podcastData.id}`} 
            onClick={handleClick}
            className="link"
           >
                <article className="podcast-container">
                    
                    {/* Image container */}
                    <div className="image-container">
                        <img className="podcast-image" src={podcastData.image} alt={`${decodedTitle} cover image`} loading="lazy" />
                        <p className="podcast-cover-title">{decodedTitle}</p>
                    </div>
                    
                    {/* Podcast title */}
                    <h3 className="podcast-title">{decodedTitle}</h3>
                    
                    {/* Seasons section */}
                    <div className="seasons-section">
                        <img className="seasons-icon" src={seasonsIcon} alt="Seasons icon" />
                        <p className="num-seasons">{`${podcastData.seasons} seasons`}</p>
                    </div>

                    {/* Genre section */}
                    <div className="genre-section">
                        {genreTags}
                    </div>

                    {/* Last updated section */}
                    <p className="updated-status">
                        {formattedDate}
                    </p>
                </article>
            </Link>
        </>
    )
}