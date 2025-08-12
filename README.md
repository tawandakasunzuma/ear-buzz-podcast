# Ear Buzz Podcast App

> A polished and responsive React podcast platform that allows users to explore, play, and favourite episodes with seamless navigation and theme personalization.

[![Live Demo on Vercel](https://img.shields.io/badge/Live_Demo-Vercel-000?logo=vercel&logoColor=white&style=flat)](https://ear-buzz-podcast.vercel.app/)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![GitHub Stars](https://img.shields.io/github/stars/tawandakasunzuma/ear-buzz-podcast?style=social)](https://github.com/tawandakasunzuma/ear-buzz-podcast/stargazers)  
[![GitHub Issues](https://img.shields.io/github/issues/tawandakasunzuma/ear-buzz-podcast)](https://github.com/tawandakasunzuma/ear-buzz-podcast/issues)

---

## 📝 Overview

**Ear Buzz Podcast App** lets users:

- 🔍 Browse, search, and filter podcast shows  
- 🔊 Play episodes with a global audio player that persists across pages  
- ❤️ Mark episodes as favourites and view them on a dedicated page  
- 🎠 Discover new content via a recommended shows carousel  
- 🌗 Switch between light and dark themes, with preference saved in `localStorage`

Designed for seamless navigation and responsive layouts.

---

## 🧰 Tech Stack

- **React** (v18)
- **React Router** (v6)
- **CSS** (normal CSS)
- **LocalStorage** (favourites & theme persistence)
- **Git & GitHub** (version control)
- **Vercel** (deployment)

---

## 🚀 Key Features

- 🔊 Global audio player fixed at the bottom of the screen  
- ⏯️ Playback controls including play, pause, seek, and progress tracking  
- ⚠️ Confirmation prompt on page reload or close while audio is playing  
- ⭐ Mark episodes as favourites and view them on a dedicated page  
- 🎠 Recommended shows carousel with horizontal scrolling  
- 🌗 Light/dark theme toggle with preference persistence in localStorage

---

## 🛠️ Getting Started

**Requirements:** Node.js v14+ and npm or Yarn

1. **Clone the repo**

   ```bash
   git clone https://github.com/tawandakasunzuma/ear-buzz-podcast.git
   cd ear-buzz-podcast
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the app locally**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Build for production**

   ```bash
   npm run build
   # or
   yarn build
   ```

---

## 💡 Usage Guide

### 🔊 Global Audio Player
- The audio player is fixed at the bottom of the screen and continues playback across all pages.
- Controls include play, pause, seek, and progress display.
- A confirmation prompt appears if you try to reload or close the page while audio is playing.

### ❤️ Favouriting Episodes
- Click the star icon to mark or unmark episodes as favourites.
- Favourites are saved in `localStorage` and persist across sessions.
- Visit the **Favourites** page to view saved episodes grouped by show.
- Episodes can be sorted by title or date added.

### 🎠 Recommended Shows Carousel
- Browse shows via a horizontally scrollable carousel on the home page.
- Each card displays the show’s image, title, and genre tags.
- Use swipe or arrow controls to browse.
- Click a show to navigate to its detail page.

### 🌗 Theme Toggle
- Use the toggle in the header to switch between light and dark modes.
- Your preference is saved in `localStorage` and applied throughout the app.

---

## 📖 Code Structure & Quality

The project employs a component-driven React architecture with routing:

- `src/components/` — Contains components like audio player, show detail, seasons list, favourites page, and carousel.  
- `src/hooks/` — Custom hooks to manage audio playback and other logic.  
- `src/App.jsx` — Root component managing routes and global state.  
- `src/index.js` — Application entry point.  

Uses React Router for page navigation.  
CSS files follow a modular, scoped approach.  
Persistent states such as favourites and theme are stored in `localStorage`.  
Code is clean, modular, and well-documented to ease maintenance and future enhancements.

---

## 🧩 Contributing

Contributions are welcome! To get started:

1. **Fork** the repository

2. **Create a new branch:**

   ```git checkout -b feature/your-feature```

3. **Commit your changes:**

   ```git commit -m "Add your feature"```

4. **Push to your branch:**

   ```git push origin feature/your-feature```

5. **Open a Pull Request** on GitHub

---

## 📬 Contact

For questions, feedback, or collaboration, please reach out to:

**Tawanda Kasunzuma**  
📧 tskasunzuma@gmail.com  
🔗 https://github.com/tawandakasunzuma  
🔗 https://www.linkedin.com/in/tawanda-kasunzuma/
