import { useRef } from 'react';

/**
 * Create audio element
 */
export default function useAudio() {
  const audioRef = useRef(new Audio());
  return audioRef;
}