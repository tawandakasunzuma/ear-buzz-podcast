import { useRef } from 'react';
import { Link } from 'react-router-dom';
import genres from "../assets/genres";
import backArrow from "../assets/images/arrow-back-icon.svg";
import forwardArrow from "../assets/images/arrow-forward-icon.svg";
import '../styles/RecommendedCarousel.css';

/**
 * RecommendedCarousel shows a horizontal list of suggested shows
 * It buttons to scroll left or right.
 *
 * @param {{ recommendedShows: Array }} props
 * @param {Array} props.recommendedShows - Array of show objects to display.
 */
export default function RecommendedCarousel({ recommendedShows }) {
    
    // Reference to the scrollable container div
    const carouselRef = useRef(null);

    /* ====================
        FUNCTIONS
    ==================== */

    /**
     * Scrolls the carousel container by one 'page' left or right.
     *
     * @param {'left'|'right'} direction - Which way to scroll.
     */
    function scroll (direction) {

        // Get a reference to the carousel container
        const container = carouselRef.current;

        // If there's no container, exit the function
        if (!container) return;

        // Get measurements: visible width, total scrollable width, and current scroll position
        const { offsetWidth, scrollWidth, scrollLeft } = container;

        if (direction === 'left') {

            // If at the start, jump to the end (circular scroll)
            if (scrollLeft <= 0) {
                container.scrollLeft = scrollWidth;
            } else {
                // Otherwise, scroll left by one container width
                container.scrollLeft -= offsetWidth;
            }

        } else if (direction === 'right') {

            // If at or past the end, jump back to the start
            if (scrollLeft + offsetWidth >= scrollWidth) {
                container.scrollLeft = 0;
            } else {
                // Otherwise, scroll right by one container width
                container.scrollLeft += offsetWidth;
            }
        }
    };

    /**
     * Look up a genre name by its ID.
     *
     * @param {number} id - Genre id number.
     * @returns {string} - Genre title or empty string if not found.
     */
    function getGenreTitle(id) {
        const match = genres.find(genre => genre.id === id);
        return match ? match.title : '';
    }
    
    /* ====================
        * RETURN *
    ==================== */

    return (
        
        <section className="recommended-carousel">

            {/* Header with title and scroll buttons */}
            <div className='top-carousel'>

                <h2 className="carousel-title">Recommended Shows</h2>
                
                <div className='scroll-buttons'>
                    <img 
                        className="carousel-btn-left" 
                        src={backArrow} alt="Back arrow"
                        onClick={() => scroll('left')} />
                    <img 
                        className="carousel-btn-right" 
                        src={forwardArrow} alt="Forward arrow" 
                        onClick={() => scroll('right')}/>
                </div>

            </div>

            {/* Scrollable list of show cards */}
            <div className="carousel-container" ref={carouselRef}>
                {recommendedShows.map(show => (
                
                <Link to={`/show/${show.id}`} key={show.id} className="carousel-item">
                    
                    <img src={show.image} alt={show.title} loading="lazy" />
                    
                    <h3 className="item-title">{show.title}</h3>
                    
                    <div className="genre-tags">
                    {show.genres.map(id => (
                        <span key={id} className="genre-tag">{getGenreTitle(id)}</span>
                    ))}
                    </div>
                    
                </Link>

                ))}
            </div>

        </section>
    );
}
