// Helps catch potential problems during development
import { StrictMode } from 'react';
// Start rendering the React app in the browser
import { createRoot } from 'react-dom/client';
// Enables page navigation (routing) in the app
import { BrowserRouter } from 'react-router-dom';
// Gives access to the favorites feature across the app
import { FavoritesProvider } from './contexts/FavoritesContext';
// Manages light/dark mode across the app
import { ThemeProvider } from './contexts/ThemeContext';
// Global CSS styles for the entire app
import './index.css';
// Main App component that contains your entire app logic
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <FavoritesProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </FavoritesProvider>
    </StrictMode>
  </BrowserRouter>
)
