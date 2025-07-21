import { useState } from 'react';
import '../styles/AudioPlayer.css';
import podcastIcon from '../assets/images/podcast-icon.svg'
// import playIcon from '../assets/images/play-icon.svg';
import altPlayIcon from '../assets/images/alt-play-icon.svg';
import altPauseIcon from '../assets/images/alt-pause-icon.svg';
// import pauseIcon from '../assets/images/pause-icon.svg';
import fastForward from '../assets/images/fast-forward-icon.svg';
import fastRewind from '../assets/images/fast-rewind-icon.svg';
import useAudio from '../../hooks/useAudio';

export default function AudioPlayer () {

    // Get reference to audio element using custom hook
    const audioRef = useAudio();

    // State to track where audio is playing or not
    const [isPlaying,setIsPlaying] = useState (false);

    function togglePlay () {
        // If audio source is not set, do nothing
        if (!audioRef.current.src) {
            return;
        }
        // Pause audio if it's playing, otherwise play ir
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        // Update playing state on button clicks
        setIsPlaying(prev => !prev)
    }
    
    return (
        <div className='audio-player-section'>
            {/* Left side of audio player */}
            <div className='left-side-audio-section'>
                <img src={podcastIcon} alt="podcast icon" />
                <p className='completion-status'>Completed</p>
            </div>
            {/* Middle of audio player */}
            <div className='play-buttons-container'>
                <button className='fast-forward-and-fast-rewind-btn'>
                    <img src={fastRewind} alt="fast rewind icon" />
                </button>
                <button 
                    onClick={togglePlay}
                    className='pause-and-play-btn'>
                        <img 
                            src={isPlaying ? altPauseIcon : altPlayIcon} 
                            alt="playback icon"
                        />
                </button>
                <button className='fast-forward-and-fast-rewind-btn'>
                    <img src={fastForward} alt="fast forward icon" />
                </button>
            </div>
            {/* Right side of audio player */}
            <div className='right-side-audio-section'>
                <input type="range" className='progress-bar' />
            </div>
        </div>
    )
}