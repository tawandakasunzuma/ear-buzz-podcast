import '../styles/Seasons.css'
import learnMoreIcon from '../assets/images/learn-more-icon.svg'
import yellowFavIcon from '../assets/images/yellow-fav-icon.png'
import playIcon from '../assets/images/play.png'
import emptyFavIcon from '../assets/images/empty-fav-icon.png'
import darkModeWhiteStar from '../assets/images/dark-mode-white-star.svg'
import { useFavorites } from '../contexts/FavoritesContext';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react'

export default function Seasons({ seasons, onEpisodeClick, showTitle }) {
  const [openSeason, setOpenSeason] = useState({});

  const { add, remove, isFavourited } = useFavorites();

  const { theme } = useTheme();

  function toggleSeason(index) {
    setOpenSeason(prev => ({ ...prev, [index]: !prev[index] }))
  };

  const emptyFav = theme === 'dark' ? darkModeWhiteStar : emptyFavIcon; 

  return (
    <>
      {seasons.map((season, si) => (
        <div key={si}>
          <div className="seasons-container">
            <h4 className="season-title">
              Season {si + 1}
              {season.title &&
                !season.title.toLowerCase().includes('season') &&
                ` - ${season.title}`}
            </h4>
            <div className="right-side-season">
              <span className="season-length">
                {season.episodes?.length || 0} Episodes
              </span>
              <img
                className="learn-more-icon"
                src={learnMoreIcon}
                alt="Learn more"
                onClick={() => toggleSeason(si)}
              />
            </div>
          </div>

          {openSeason[si] && (
            <div className="episode-list">
              {season.episodes.map(episode => {
                  
                  const uniqueId = `${showTitle.replace(/\s+/g,'_')}-S${si+1}-E${episode.episode}`;
                  const favourited = isFavourited(uniqueId);

                  function toggleFav() {
                    if (favourited) {
                      remove(uniqueId)
                    } else {
                      add({
                        id: uniqueId,
                        title: episode.title,
                        showTitle,
                        seasonNumber: si + 1,
                        episodeNumber: episode.episode,
                        description: episode.description || '',
                        image: season.image || '',
                        file: episode.file || '',
                        addedAt: new Date().toISOString()
                      });
                    }
                  }

                return (
                  <div key={`s${si}-e${episode.episode}`} className="episode-item">
                    <div className="top-episode">
                      <img
                        onClick={toggleFav} 
                        className="favorite-btn"
                        src={favourited ? yellowFavIcon : emptyFav}
                        alt={favourited ? 'Unfavourite' : 'Favourite'}
                      />
                      <h5 className="episode-title">
                        Episode {episode.episode} – {episode.title}
                      </h5>
                      <p className="episode-description">
                        {episode.description
                          ? episode.description.slice(0, 200) + '…'
                          : ''}
                      </p>
                    </div>

                    <div className="bottom-episode">
                      <img
                        className="blue-play-icon"
                        src={playIcon}
                        alt="Play episode"
                        onClick={() => onEpisodeClick(episode)}
                      />
                      <img
                        className="episode-image"
                        src={season.image}
                        alt={`${episode.title} cover`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </>
  )
}
