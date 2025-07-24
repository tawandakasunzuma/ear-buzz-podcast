import "../styles/Header.css"
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Link } from 'react-router-dom'; 
import searchIcon from "../assets/images/search-icon.svg"
import podcastIcon from "../assets/images/ear-buzz-logo.png"
import ThemeToggle from "./ThemeToggle"
import favoriteIcon from '../assets/images/yellow-fav-icon.png'
import accountCircle from '../assets/images/account-circle-icon.svg'
import darkCloseBtn from '../assets/images/dark-close-btn.svg'
import darkHamburgerIcon from '../assets/images/dark-hamburger-icon.svg'
import lightCloseBtn        from '../assets/images/light-close-btn.svg'
import lightHamburgerIcon   from '../assets/images/light-hamburger-icon.svg'

export default function Header ({searchLetters,setSearchLetters}) {

    const [menuOpen,setMenuOpen] = useState(false);
    const { theme } = useTheme();

    function toggleMenu () {
        setMenuOpen(prev => !prev)
    }

    return (
        <header>

            {/* Name of podcast website */}
            <Link to="/" className="home-link">
               <img className="icon-1" src={podcastIcon} alt="Podcast icon" />
               <h1 className="app-name">Ear Buzz</h1>
            </Link>

            <button 
              className="hamburger-btn" 
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <img 
                src={
                  menuOpen
                    ? (theme === 'dark' ? lightCloseBtn : darkCloseBtn)
                    : (theme === 'dark' ? lightHamburgerIcon : darkHamburgerIcon)
                } 
                alt=""
              />
            </button>

            {/* Overlay behind the menu */}
            {menuOpen && <div className="menu-overlay" onClick={toggleMenu} />}

            {/* The sliding menu */}
            <div className={`header-right${menuOpen ? " open" : ""}`}>
                
                {/* Theme toggle */}
                <ThemeToggle/>

                {/* Search bar */}
                <input 
                    className="search-bar" 
                    type="text" 
                    placeholder="Search..."
                    value={searchLetters}
                    onChange={event => setSearchLetters(event.target.value)} />

                {/* Search icon image */}
                <img
                    className="search-icon icon-2"
                    src={searchIcon}
                    alt="Search icon"
                />

                {/* Favorites icon */}
                <Link to="/favorites" className="fav-link">
                    <img
                        className="header-fav-icon"
                        src={favoriteIcon}
                        alt="Go to Favorites"
                    />
                </Link>    

                {/* Account icon */}
                <img className="icon-3" src={accountCircle} alt="Profile picture" />            
            </div>
        </header>
    )
}