import { useState } from 'react';
import '../styles/AudioPlayer.css';
import podcastIcon from '../assets/images/podcast-icon.svg'
import playIcon from '../assets/images/play-icon.svg';
import altPlayIcon from '../assets/images/alt-play-icon.svg';
import pauseIcon from '../assets/images/pause-icon.svg';
import fastForward from '../assets/images/fast-forward-icon.svg';
import fastRewind from '../assets/images/fast-rewind-icon.svg';

export default function AudioPlayer () {

    const [isPlaying,setIsPlaying] = useState (false);

    function handleChange () {
        setIsPlaying(prev => !prev);
    };
    
    return (
        <div className='audio-player-section'>
            <div className='left-side-audio-section'>
                <img src={podcastIcon} alt="podcast icon" />
                <p className='completion-status'>Completed</p>
            </div>
            <div className='play-buttons-container'>
                <button className='fast-forward-and-fast-rewind-btn'>
                    <img src={fastRewind} alt="fast rewind icon" />
                </button>
                <button 
                    onClick={handleChange}
                    className='pause-and-play-btn'>
                        <img 
                            src={isPlaying ? pauseIcon : altPlayIcon} 
                            alt="playback icon"
                        />
                </button>
                <button className='fast-forward-and-fast-rewind-btn'>
                    <img src={fastForward} alt="fast forward icon" />
                </button>
            </div>
            <div className='right-side-audio-section'>
                <input type="range" className='progress-bar' />
            </div>
        </div>
    )
}