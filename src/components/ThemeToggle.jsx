import '../styles/ThemeToggle.css'
import { useTheme } from '../contexts/ThemeContext';
import lightModeIcon from '../assets/images/light-mode-icon.svg'
import darkModeIcon from '../assets/images/dark-mode-icon.svg'

/**
 * ThemeToggle renders an icon that switches between light and dark themes.
 *
 * @returns {JSX.Element} - An <img> element acting as a toggle button.
 */
export default function ThemeToggle() {

  // Get current theme and function to toggle it from context
  const { theme, toggleTheme } = useTheme();

  // Choose which icon and alt text to show based on the current theme
  const iconSrc = theme === 'dark' ? lightModeIcon : darkModeIcon;
  const altText = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <img
      // When clicked change between light and dark
      onClick={toggleTheme}

      // Accessible label
      aria-label="Toggle theme"

      className="theme-icon"
      src={iconSrc}
      alt={altText}
    />
  );
}
