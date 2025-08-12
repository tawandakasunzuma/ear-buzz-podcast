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

### Prerequisites

- Node.js v14+
- npm or Yarn

### Installation

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

Once the app is running, here’s how to use the key features:

### 🔊 Global Audio Player

- The player is fixed at the bottom of the screen.
- It remains active and continues playback across all pages.
- Includes controls for play, pause, seek, and displays current progress.
- A confirmation prompt appears if the user tries to reload or close the page while audio is playing.

### ❤️ Favouriting Episodes

- Click the star icon to mark or unmark an episode as a favourite.
- Favourites are saved in `localStorage` and persist across sessions.
- Visit the **Favourites** page to see saved episodes, grouped by show.
- Episodes can be sorted by title or date added.

### 🎠 Recommended Shows Carousel

- A horizontally scrollable carousel appears on the home page.
- Each card displays a show’s image, title, and genre tags.
- Use swipe or arrow controls to browse.
- Clicking a show navigates to its detail page.

### 🌗 Theme Toggle

- Use the toggle in the header to switch between light and dark mode.
- Your preference is saved in `localStorage` and applied across the app.

---

## 🧩 Contributing

Contributions are welcome! To get started:

1. **Fork** the repository

2. **Create a new branch**

```bash
git checkout -b feature/your-feature
```

3. **Commit your changes**

```bash
git commit -m "Add your feature"
```

4. **Push to your branch**

```bash
git push origin feature/your-feature
```

5. **Open a Pull Request** on Github

---

## 📬 Contact

For feedback, questions, or collaboration opportunities:

**Tawanda Kasunzuma**  
📧 [tskasunzuma@gmail.com](mailto:tskasunzuma@gmail.com)  
🔗 [GitHub Profile](https://github.com/tawandakasunzuma)
