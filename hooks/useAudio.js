import { useEffect, useRef } from 'react';

export default function useAudio (initialSrc = '') {

    // Create one audio player and keep it between rerenders
    const audioRef = useRef (new Audio(initialSrc));

    // Update the audio element when initialSrc changes
    useEffect (() => {
        // If audio source is valid update the src
        if (initialSrc) {
            audioRef.current.src = initialSrc;
            audioRef.current.load();
        };
    },[initialSrc]);

    // Return audio reference to use in my components
    return audioRef;
}