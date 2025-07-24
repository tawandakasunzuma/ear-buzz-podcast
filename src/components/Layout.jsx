// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import AudioPlayer from '../components/AudioPlayer';

export default function Layout({ audioRef, currentEpisode }) {
  return (
    <>
      <Header />
      <main style={{ paddingBottom: '4rem' }}>
        <Outlet />
      </main>
      <AudioPlayer audioRef={audioRef} episode={currentEpisode} />
    </>
  );
}
