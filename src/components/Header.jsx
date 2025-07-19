import "../styles/Header.css"
import accountCircle from '../assets/images/account-circle-icon.svg'
import searchIcon from "../assets/images/search-icon.svg"
import podcastIcon from "../assets/images/podcast-icon.svg"

export default function Header ({searchLetters,setSearchLetters}) {

    return (
        <header>

            {/* Name of podcast website */}
            <div className="header-left">
                <img className="icon-1" src={podcastIcon} alt="Podcast icon" />
                <h1 className="app-name">Podcast App</h1>
            </div>

            <div className="header-right">
                
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

                {/* Profile picture icon */}
                <img
                    className="icon-3"
                    src={accountCircle}
                    alt="Profile picture"
                />
            </div>
        </header>
    )
}