import { useState, useEffect, useRef } from 'react';

export default function useAudio () {

    // Create state for audio link
    const [audioSrc,setAudioSrc] = useState(null);
    
    // Create one audio player and keep it between rerenders
    const audioRef = useRef (new Audio());

    useEffect(() => {

        // Fetch audio from API
        fetch('https://podcast-api.netlify.app/audio/1')
        
            .then (response => {
                // If response is not okay, throw an error
                if (!response.ok) throw new Error ("Audio could not be fetched");
                // Parse the JSON response
                return response.json();
            })

            .then (data => {
                // Assign audio url to state
                setAudioSrc(data.url);
                // Set audio url as source of audio player
                audioRef.current.src = data.url;
            })

            // Log any error that occurred during fetching
            .catch((error) => {
                console.error('Error: ',error);
            })
    },[])

    // Return audio reference for later use
    return audioRef;
}