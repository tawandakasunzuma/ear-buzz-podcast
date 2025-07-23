import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load once on mount
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        const arr = JSON.parse(stored);
        if (Array.isArray(arr)) setFavorites(arr);
      } catch {}
    }
  }, []);

  // Persist whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  function add(fav) {
    setFavorites(prev => [...prev, fav]);
  }
  function remove(id) {
    setFavorites(prev => prev.filter(f => f.id !== id));
  }
  function isFavourited(id) {
    return favorites.some(f => f.id === id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, isFavourited }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
