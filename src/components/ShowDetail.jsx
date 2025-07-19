import he from 'he'
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import '../styles/ShowDetail.css'
import backIcon from '../assets/images/back-icon.svg'
import favoriteIcon from '../assets/images/favorite-icon.svg'
import calenderIcon from '../assets/images/calender-icon.svg'
import Seasons from "./Seasons";

export default function ShowDetail () {

    // Create state for card details, loading and errors
    const [cardDetails, setCardDetails] = useState(null);
    const [loading,setLoading] = useState(true);
    const [hasError,setError] = useState(false);

    // Get ID of card clicked
    const { id } = useParams();

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
                        <img className="heading-icon" src={backIcon} alt="Back icon" />
                        <h3 className="podcast-heading-title">{he.decode(cardDetails.title)}</h3>
                        <img className="heading-icon" src={favoriteIcon} alt="Favorite icon" />
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