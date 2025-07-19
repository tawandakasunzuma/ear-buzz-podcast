import '../styles/Seasons.css'
import learnMoreIcon from '../assets/images/learn-more-icon.svg'
import { useState } from 'react'

export default function Seasons ({seasons}) {

    // Create state for opened season
    const [openSeason,setOpenSeason] = useState({})

    /**
     * Displays a list of seasons with episodes that can be shown or hidden.
     * 
     * @param {Object} props
     * @param {Array} props.seasons - List of seasons to display.
     * @returns JSX element showing seasons and episodes.
     */
    function toggleSeason (index) {
        setOpenSeason(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    // Create list of seasons
    const seasonsList = seasons.map((season,index) => (
        <div key={index}>
            <div 
                className="seasons-container"
            >
                {/* Seasons title */}
                <h4 className="season-title">
                    Season {index + 1}
                    {season.title !== null && !season.title.toLowerCase().includes("season")
                        ? ` - ${season.title}`
                        : ""
                    }
                </h4>
                
                <div className='right-side-season'>
                
                    {/* Number episodes */}
                    <span className="season-length">
                        {season.episodes?.length || 0} Episodes
                    </span>
                
                    {/* Learn more icon */}
                    <img 
                        className='learn-more-icon' 
                        src={learnMoreIcon} 
                        alt="Learn more icon" 
                        onClick={() => toggleSeason(index)}
                        />
                </div>
            </div>
            
            {/* Expanded season */}
            {openSeason[index] && (
                <div className='episode-list'>
                    {season.episodes.map((episode,index) => (
                        <div key={index} className='episode-item'>

                            {/* Episode title and description */}
                            <div className='top-episode'>
                                <h5 className='episode-title'>Episode {episode.episode} - {episode.title}</h5>
                                <p className='episode-description'>{(episode.description?.slice(0, 200) + "...") || "No description available..."}</p>
                            </div>

                            <div className='bottom-episode'>
                                {/* Episode image */}
                                <img
                                    className='episode-image' 
                                    src={season.image} 
                                    alt={`Episode ${episode.title} cover`}
                                    loading='lazy'
                                />                                
                            </div>
                        </div>
                    ))}
            </div>)}
        </div>
    ))
    
    return (
        <>
            {seasonsList}
        </>
    )
}