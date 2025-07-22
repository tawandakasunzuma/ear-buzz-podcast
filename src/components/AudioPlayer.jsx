import { useState, useEffect } from 'react';
import '../styles/AudioPlayer.css';
import podcastIcon from '../assets/images/podcast-icon.svg'
import altPlayIcon from '../assets/images/alt-play-icon.svg';
import altPauseIcon from '../assets/images/alt-pause-icon.svg';
import fastForward from '../assets/images/fast-forward-icon.svg';
import fastRewind from '../assets/images/fast-rewind-icon.svg';

export default function AudioPlayer ({audioRef}) {

    // State to track where audio is playing or not
    const [isPlaying,setIsPlaying] = useState (false);

    // State for playback progress
    const [progress,setProgress] = useState(0)

    /**
     * 
     * @returns 
     */
    function togglePlay () {
        // If audio source is not set, do nothing
        if (!audioRef.current.src) return;
        // Pause audio if it's playing, otherwise play it
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        // Update playing state on button clicks
        setIsPlaying(prev => !prev)
    }

    /**
     * 
     * @param {*} offset 
     */
    function seek(offset) {
      const audio = audioRef.current;
      if (audio && audio.src) {
        audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + offset));
      }
    }

    // update `progress` on every timeupdate event
    useEffect(() => {
      const audio = audioRef.current;
      function onTimeUpdate() {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      }
      audio.addEventListener('timeupdate', onTimeUpdate);
      return () => audio.removeEventListener('timeupdate', onTimeUpdate);
    }, [audioRef]);

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isPlaying && audioRef.current?.src) {
                e.preventDefault();
                e.returnValue = 'Are you sure you want to leave? Your audio will stop.';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isPlaying, audioRef]);

    
    return (
        <div className='audio-player-section'>

            {/* Left side of audio player */}
            <div className='left-side-audio-section'>
                <img src={podcastIcon} alt="podcast icon" />
                <p className='completion-status'>Completed</p>
            </div>

            {/* Middle of audio player */}
            <div className='play-buttons-container'>
                <button 
                    aria-label="Rewind 10 seconds"
                    className='fast-forward-and-fast-rewind-btn'
                    onClick={() => seek(-10)}
                >
                    <img 
                        src={fastRewind} 
                        alt="fast rewind icon" 
                    />
                </button>
                <button 
                    aria-label={isPlaying ? "Pause audio" : "Play audio"}
                    onClick={togglePlay}
                    className='pause-and-play-btn'>
                        <img 
                            src={isPlaying ? altPauseIcon : altPlayIcon} 
                            alt="playback icon"
                        />
                </button>
                <button 
                    aria-label="Fast forward 10 seconds"
                    className='fast-forward-and-fast-rewind-btn'
                    onClick={() => seek(10)}
                >
                    <img src={fastForward} alt="fast forward icon" />
                </button>
            </div>

            {/* Right side of audio player */}
            <div className='right-side-audio-section'>
                <input 
                    type="range" 
                    className='progress-bar' 
                    min="0"
                    max="100"
                    value={progress}
                    onChange={event => {
                        const percentage = event.target.value
                        audioRef.current.currentTime = (percentage / 100) * audioRef.current.duration;
                    }}
                />
            </div>

        </div>
    )
}