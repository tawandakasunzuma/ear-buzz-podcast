import { useState, useEffect } from 'react';
import '../styles/AudioPlayer.css';
import darkPodcastIcon from '../assets/images/podcast-icon.svg'
import lightPodcastIcon from '../assets/images/light-podcast-icon.svg'
import altPlayIcon from '../assets/images/alt-play-icon.svg';
import altPauseIcon from '../assets/images/alt-pause-icon.svg';
import fastForward from '../assets/images/fast-forward-icon.svg';
import fastRewind from '../assets/images/fast-rewind-icon.svg';
import { useTheme } from '../contexts/ThemeContext';

export default function AudioPlayer ({ audioRef, episode }) {

    // State to track where audio is playing or not
    const [isPlaying,setIsPlaying] = useState (false);

    // State for playback progress
    const [progress,setProgress] = useState(0)

    // useEffect to handle audio playback when a new episode is selected
    useEffect(() => {
      const audio = audioRef.current;
      if (!episode || !episode.file) return;

      audio.pause(); // Stop any current audio
      setIsPlaying(false);

      audio.src = episode.file;
      audio.load();
      audio.currentTime = 0;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.warn("Autoplay blocked:", err);
            setIsPlaying(false);
          });
      }
    }, [episode, audioRef]);


    /**
     * Converts a number of seconds into MM:SS format
     *
     * @param {number} [sec=0] - Time in seconds.
     * @returns {string} Formatted time string in MM:SS format.
    */
    function formatTime(sec = 0) {
        const m = Math.floor(sec / 60).toString().padStart(2, '0')
        const s = Math.floor(sec % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    }

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
     * Seeks the audio playback by a given number of seconds
     *
     * @param {number} offset - The number of seconds to move forward or backward.
    */
    function seek(offset) {
      const audio = audioRef.current;
      if (audio && audio.src) {
        audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + offset));
      }
    }

    // Warn the user before leaving the page if audio is playing
    useEffect(() => {
      // Handler for the browser's beforeunload event
      const handleBeforeUnload = (e) => {
        if (isPlaying && audioRef.current?.src) {
          e.preventDefault();
          // Show a confirmation message to prevent accidental leaving
          e.returnValue = 'Are you sure you want to leave? Your audio will stop.';
        }
      };

      // Add event listener when component mounts or dependencies change
      window.addEventListener('beforeunload', handleBeforeUnload);

      // Clean up the event listener on unmount or dependency change
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isPlaying, audioRef]);
    
    // useEffect to track audio playback progress and update the progress bar
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      // Update progress as audio plays
      function updateProgress() {
        if (audio.duration) {
          const percent = (audio.currentTime / audio.duration) * 100;
          setProgress(percent);
        }
      }

      // Attach and clean up the event listener
      audio.addEventListener('timeupdate', updateProgress);
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }, [audioRef]);

    const { theme } = useTheme();
    const podcastIcon = theme === 'dark' ? lightPodcastIcon : darkPodcastIcon;

    return (
        <div className='audio-player-section'>

            {/* Left side: actual episode details */}
            <div className='left-side-audio-section'>
              <img
                className='audio-player-episode-image'
                src={episode?.image || podcastIcon}
                alt={episode?.title || ''}
              />
              <div className='audio-player-details-container'>
                <h4 className='audio-player-episode-title'>
                  {episode?.title || 'No episode selected'}
                </h4>
                <p className='audio-player-podcast-title'>
                  {episode?.showTitle || 'Podcast App'}
                </p>
              </div>
            </div>

            {/* Middle of audio player */}
            <div className='play-buttons-container'>
              {/* Rewind button */}
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
              {/* Play/Pause button */}
              <button 
                  aria-label={isPlaying ? "Pause audio" : "Play audio"}
                  onClick={togglePlay}
                  className='pause-and-play-btn'>
                      <img 
                          src={isPlaying ? altPauseIcon : altPlayIcon} 
                          alt="playback icon"
                      />
              </button>
              {/* Fast forward button */}
              <button 
                  aria-label="Fast forward 10 seconds"
                  className='fast-forward-and-fast-rewind-btn'
                  onClick={() => seek(10)}
              >
                  <img src={fastForward} alt="fast forward icon" />
              </button>
            </div>

            {/* Right side audio player */}
            { episode?.file && (
                <div className='right-side-audio-section'>
                    <div className="progress-container">
                        <p className='time-stamp'>
                            {formatTime(audioRef.current?.currentTime)}
                        </p>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={e => {
                            const percentage = e.target.value;
                            audioRef.current.currentTime = (percentage/100) * audioRef.current.duration;
                            }}
                        />
                        <p className='time-stamp'>
                            {formatTime(audioRef.current?.duration)}
                        </p>
                    </div>
                </div>
            )}

        </div>
    )
}