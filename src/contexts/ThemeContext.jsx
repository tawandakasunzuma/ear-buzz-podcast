import React, { createContext, useContext, useEffect, useState } from 'react';

/* ====================
  CREATE CONTEXT
==================== */

// Create a context for theme management
const ThemeContext = createContext();

/**
 * ThemeProvider wraps app or part of it
 * Manages light/dark mode preferences.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The child components that can access theme.
 */
export function ThemeProvider({ children }) {

  /* ====================
     CONSTANTS & STATE
  ==================== */
  
  // Key for storing user's theme choice
  const STORAGE_KEY = 'themePreference';

  // State to hold current theme, default is 'light'
  const [theme, setTheme] = useState('light');

  /* ====================
    EFFECTS
  ==================== */

  // Check saved theme or system preference on mount
  useEffect(() => {

    const saved = localStorage.getItem(STORAGE_KEY);
    
    // Check if the user’s system prefers dark mode
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use saved value if present, otherwise use system setting
    const initialTheme = saved || (systemDark ? 'dark' : 'light');
    setTheme(initialTheme);

    // Apply the theme to the root "html" via a data attribute
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  // Whenever theme changes, save it and re-apply to "html"
  useEffect(() => {

    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]); // Runs whenever theme changes

  /* ====================
     FUNCTIONS
  ==================== */

  /**
   * Toggle between 'light' and 'dark' themes.
   */

  function toggleTheme () {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }

  /* ====================
    * RETURN *
  ==================== */

  return (
    <ThemeContext.Provider 
      value={{ theme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/* ====================
   CUSTOM HOOK: useTheme
==================== */

/**
 * Custom hook to access theme context.
 *
 * @returns {{
 *   theme: 'light' | 'dark',
 *   toggleTheme: () => void
 * }}
 */
export function useTheme() {
  return useContext(ThemeContext);
}