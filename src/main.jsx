import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from './contexts/FavoritesContext';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </StrictMode>
  </BrowserRouter>
)
