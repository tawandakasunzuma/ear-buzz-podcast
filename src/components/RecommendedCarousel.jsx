import { useRef } from 'react';
import { Link } from 'react-router-dom';
import genres from "../assets/genres";
import backArrow from "../assets/images/arrow-back-icon.svg";
import forwardArrow from "../assets/images/arrow-forward-icon.svg";
import '../styles/RecommendedCarousel.css';

export default function RecommendedCarousel({ recommendedShows }) {
    
    const carouselRef = useRef(null);

    /**
     * Scrolls the carousel left or right when the user clicks an arrow button.
     * 
     * @param {*} direction - The direction to scroll: either 'left' or 'right'
    */
    function scroll (direction) {

        // Get a reference to the carousel container
        const container = carouselRef.current;

        // If there's no container, exit the function
        if (!container) return;

        // Destructure useful values from the container
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

    // Get genre tags
    const getGenreTitle = (id) => {
        const match = genres.find(g => g.id === id);
        return match ? match.title : '';
    };

    return (
        
        <section className="recommended-carousel">

            {/* Top carousel */}
            <div className='top-carousel'>
                <h2 className="carousel-title">Recommended Shows</h2>
                <div className='scroll-buttons'>
                    <img 
                        className="carousel-btn" 
                        src={backArrow} alt="Back arrow"
                        onClick={() => scroll('left')} />
                    <img 
                        className="carousel-btn" 
                        src={forwardArrow} alt="Forward arrow" 
                        onClick={() => scroll('right')}/>
                </div>
            </div>

            {/* Bottom carousal */}
            <div className="carousel-container" ref={carouselRef}>
                {recommendedShows.map(show => (
                <Link to={`/show/${show.id}`} key={show.id} className="carousel-item">
                    <img src={show.image} alt={show.title} />
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
