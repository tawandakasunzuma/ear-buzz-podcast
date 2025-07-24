import '../styles/ThemeToggle.css'
import { useTheme } from '../contexts/ThemeContext';
import lightModeIcon from '../assets/images/light-mode-icon.svg'
import darkModeIcon from '../assets/images/dark-mode-icon.svg'

export default function ThemeToggle() {

  const { theme, toggleTheme } = useTheme();

  return (
    <img 
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className='theme-icon'
        src={theme === 'dark' ? lightModeIcon : darkModeIcon} 
        alt={theme === 'dark' ? "Dark mode button" : "Light mode button"} 
    />
  );
}
