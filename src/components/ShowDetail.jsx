import he from 'he'
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import '../styles/ShowDetail.css'
// import backIcon from '../assets/images/back-icon.svg'
import yellowFavIcon from '../assets/images/yellow-fav-icon.png'
import emptyFavIcon from '../assets/images/empty-fav-icon.png'
import calenderIcon from '../assets/images/calender-icon.svg'
import Seasons from "./Seasons";

export default function ShowDetail () {

    // Create state for card details, loading and errors
    const [cardDetails, setCardDetails] = useState(null);
    const [loading,setLoading] = useState(true);
    const [hasError,setError] = useState(false);

    // Get ID of card clicked
    const { id } = useParams();

    // Create state for favorites
    const [isFav,setIsFav] = useState(false);

    useEffect(() => {

        // Get favorites saved in localStorage
        const storedFavorites = localStorage.getItem("favorites");

        // Create favorites array 
        let favArray = [];

        try {
            // Convert stored string into array, or nothing if none found
            const parsedArray = storedFavorites ? JSON.parse(storedFavorites) : [];
            // Set array to favorites array if parsedArray is an array, else empty array
            favArray = Array.isArray(parsedArray) ? parsedArray : [];
        } catch (error) {
            // Notify there are invalid favorites
            console.warn ("Invalid favorites in localStorage",error);
            favArray = []
        }

        // Check if current card is in favorites
        if (cardDetails?.id) {
            setIsFav(favArray.includes(cardDetails.id));
        };

    },[cardDetails?.id]);

    /* Add or remove card from favorites */
    function toggleFav () {

        // Get current favorites
        const storedFavorites = localStorage.getItem("favorites");
        // Create favorites array 
        let favArray = [];

        try {
            // Convert stored string into array, or nothing if none found
            const parsedArray = storedFavorites ? JSON.parse(storedFavorites) : [];
            // Set array to favorites array if parsedArray is an array, else empty array
            favArray = Array.isArray(parsedArray) ? parsedArray : [];
        } catch (error) {
            // Notify there are invalid favorites
            console.warn ("Invalid favorites in localStorage",error);
            favArray = []
        }

        let updatedFavorites;

        if (isFav) {
            // Remove the card from favorites
            updatedFavorites = favArray.filter(id => id !== cardDetails.id);
        } else {
            // Add the card to favorites
            updatedFavorites = [...favArray, cardDetails.id];
        }

        // Save updated list back to localStorage
        localStorage.setItem('favorites',updatedFavorites);

        // Update the state
        setIsFav(prev => !prev);
    }

    // Fetch data when card clicked 
    useEffect(() => {

        fetch(`https://podcast-api.netlify.app/id/${id}`)

            // Throw error if data could not be fetched and convert data
            .then(response => {
                if (!response.ok) throw new Error ("Page was not found");
                return response.json();
            })

            // Set card details to parsed data
            .then (data => {
                setCardDetails(data);
            })

            // Show error in console and change error state
            .catch(error => {
                console.error("Error: ",error);
                setError(true);
            })

            // Stop loading
            .finally(() => {
                setLoading(false);
            })
    },[id])

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
    const formattedDate = cardDetails ? getDate(cardDetails) : null;
    
    /**
     * Converts a list of genre names into span tags that display.
     *
     * @param {string[]} genreNames - An array of genre names.
     * @returns {JSX.Element[]} An array of JSX <span> elements for each genre.
     */
    function createGenreTags(genreNames) {
        return genreNames.map(name => (
            <span key={name} className="podcast-genre-item">
                {name}
            </span>
        ));
    }
    const genreTags = cardDetails?.genres ? createGenreTags(cardDetails.genres) : "-";

    return (
        <>
            {cardDetails &&
        
                <div className="podcast-details">

                    {/* Header section*/}
                    <div className="heading-section">
                        {/*<img className="heading-icon" src={backIcon} alt="Back icon" />*/}
                        <div></div>
                        <h3 className="podcast-heading-title">{he.decode(cardDetails.title)}</h3>
                        <img 
                            className="heading-icon" 
                            src={isFav ? yellowFavIcon : emptyFavIcon} 
                            alt="Favorite icon" 
                            onClick={toggleFav}/>
                    </div>

                    {/* Main section */}
                    <div className="main-section">

                        {/* Image */}
                        <div className="podcast-details-left">
                            <img className="podcast-preview-image" src={cardDetails.image} />
                        </div>

                        <div className="podcast-details-right">

                            {/* Description */}
                            <div className="description-container">
                                <h4 className="container-heading">Description</h4>
                                <p className="podcast-description">{cardDetails.description}</p>
                            </div>

                            {/* Genres */}
                            <div className="genre-container">
                                <h4 className="container-heading">Genres</h4>
                                <div className="podcast-genre-container">
                                    {genreTags}
                                </div>
                            </div>

                            {/* Last updated */}
                            <div className="last-updated-container">
                                <h4 className="container-heading">Last Updated</h4>
                                <div className="calender-container">
                                    <img
                                    className="calender-icon"
                                    src={calenderIcon}
                                    alt="Calender icon"
                                    />
                                    <p className="podcast-last-updated">{formattedDate}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="bottom-section">
                        <Seasons seasons={cardDetails.seasons} />
                    </div>
                </div>
            }

            {/* Show loading info */}
            {loading && 
            <div className='loading-container'>
                <div className='loading-circle'></div>
                <p className='loading-text'>Loading...</p>
            </div>
            }

            {/* Show no podcasts displayed */}
            {hasError && !loading && (
                <div className="no-podcasts-container">
                <p className="no-podcasts-text">Podcast has no details</p>
                </div>
            )}   

            {/* Show no details available */}
            {!cardDetails && !loading && (
                <div className="no-podcasts-container">
                    <p className="no-podcasts-text">No details available</p>
                </div>
            )}   
        </>
    )
}