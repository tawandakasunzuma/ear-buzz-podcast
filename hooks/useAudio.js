import { useEffect, useRef } from 'react';

export default function useAudio(initialSrc = '') {
  const audioRef = useRef(new Audio(initialSrc));

  useEffect(() => {
    const audio = audioRef.current;

    if (initialSrc && audio.src !== initialSrc) {
      audio.src = initialSrc;
      audio.load();
    }

  }, [initialSrc]);

  return audioRef;
}