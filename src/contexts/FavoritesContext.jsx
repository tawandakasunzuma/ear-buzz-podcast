import { createContext, useContext, useState, useEffect } from 'react';

/* ====================
  CREATE CONTEXT
==================== */

// Create a context for favorites
const FavoritesContext = createContext();

/**
 * FavoritesProvider to wrap app or part of it
 * Provides favorite-item functionality via React Context.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The child components that can access favorites.
 */

export function FavoritesProvider({ children }) {

  /* ====================
    STATE
  ==================== */

  // State to hold the list of favorite items
  const [favorites, setFavorites] = useState([]);

  /* ====================
    EFFECTS
  ==================== */

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        const arr = JSON.parse(stored);
        if (Array.isArray(arr)) setFavorites(arr);
      } catch {
        // If JSON is invalid, ignore
      }
    }
  }, []);

  /// Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]); // Runs whenever favorites state updates

  /* ====================
    FUNCTIONS
  ==================== */

   /**
   * Add a new item to the favorites list.
   *
   * @param {object} fav - The favorite item to add. Should have an ID.
   */
  function add(fav) {
    setFavorites(prev => [...prev, fav]);
  }

  /**
   * Remove an item from favorites by its ID.
   *
   * @param {string|number} id - The unique identifier of the item to remove.
   */
  function remove(id) {
    setFavorites(prev => prev.filter(f => f.id !== id));
  }

  /**
   * Check if an item is in the favorites list.
   *
   * @param {string|number} id - The unique identifier to check.
   * @returns {boolean} True if the item is favorited, false if it isn't favorited.
   */
  function isFavourited(id) {
    return favorites.some(f => f.id === id);
  }

  /**
   * Clear all favorites and remove them from localStorage.
   */
  function clearAll() {
    setFavorites([]);
    localStorage.removeItem("favorites");
  }

  /* ====================
    * RETURN *
  ==================== */

  // Provide favorites and helper functions to children
  return (
    <FavoritesContext.Provider
      value={{ favorites, add, remove, isFavourited, clearAll }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

/* ====================
   CUSTOM HOOK: useFavorites
==================== */

/**
 * Custom hook to access the favorites context.
 *
 * @returns {{
 *   favorites: object[],
 *   add: (fav: object) => void,
 *   remove: (id: string|number) => void,
 *   isFavourited: (id: string|number) => boolean,
 *   clearAll: () => void
 * }}
 */
export function useFavorites() {
  return useContext(FavoritesContext);
}
