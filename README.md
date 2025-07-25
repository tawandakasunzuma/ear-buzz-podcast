# 🎧 Podcast App

> A polished React podcast application featuring global audio playback, episode favouriting, a recommended shows carousel, and light/dark theme support.

🌐 [Live Demo on Vercel](https://ear-buzz-podcast.vercel.app/)

---

## 📝 Overview

**Podcast App** is a beginner‑level React project built for university. It enables users to:

- 🔍 Browse, search, and filter podcast shows
- 🔊 Play episodes with a **global audio player** that persists across pages
- ❤️ Mark episodes as **favourites** and view them on a dedicated page
- 🎠 Discover new content via a **recommended shows carousel**
- 🌗 Switch between **light & dark themes**, with preference saved in `localStorage`

---

## 🧰 Tech Stack

- **React** (v18)
- **React Router** (v6)
- **CSS** (normal CSS for styling)
- **LocalStorage** (favourites & theme persistence)
- **Vercel** (deployment)

---

## 🚀 Key Features

- **Global Audio Player**

  - Fixed at bottom, play/pause, seek, and progress tracking
  - Prompts on reload/close while playing

- **Episode Favourites**

  - Click heart icon to add/remove favourites
  - Favourites page grouped by show, sortable by title or date added

- **Recommended Shows Carousel**

  - Horizontally scrollable & looping
  - Displays show image, title, and genre tags
  - Click to navigate to show detail

- **Theme Toggle**
  - Light/dark switch with ☀️/🌙 icons
  - Preference stored in `localStorage`

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v14+
- npm or Yarn

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/tawandakasunzuma/podcast-app.git
   cd podcast-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory and add your API base URL:

   ```env
   REACT_APP_API_BASE_URL=https://api.example.com/episodes
   ```

4. **Run the app locally**

   ```bash
   npm start
   # or
   yarn start
   ```

5. **Build for production**

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

- Click the heart icon to mark or unmark an episode as a favourite.
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

## 🚀 Deployment

This project is ready for deployment using **Vercel**.

### Steps to Deploy:

1. **Push your code to GitHub**  
   Make sure your latest code is committed and pushed to a GitHub repository.

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub and import your repository.

3. **Set environment variables**  
   In the Vercel dashboard, add the same variables from your `.env.local` file to your project settings.

4. **Configure your build settings (optional)**  
   Vercel usually auto-detects the correct settings:

   - Framework: React
   - Build Command: `npm run build`
   - Output Directory: `build`

5. **Add a custom domain (optional)**  
   You can configure a custom domain or use the default Vercel URL.

6. **Enable SPA routing fallback**  
   Add a `vercel.json` file in the root of your project:

   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/" }]
   }
   ```

7. **Add social media preview metadata**  
   Use a tool like [metatags.io](https://metatags.io) to generate Open Graph and Twitter Card tags.  
   Paste the tags into your `public/index.html` inside the `<head>`.

---

## 🗂 Project Structure

podcast-app/
├── public/
│ ├── favicon.ico
│ └── index.html
├── src/
│ ├── assets/
│ ├── components/
│ ├── hooks/
│ ├── pages/
│ ├── styles/
│ ├── App.jsx
│ └── index.js
├── .env.local
├── package.json
└── README.md

Let me know if you'd like the **License**, **Contributing**, or **Contact** section next.

---

## 📬 Contact

For feedback, questions, or collaboration opportunities:

**Tawanda Kasunzuma**  
📧 [tskasunzuma@gmail.com](mailto:tskasunzuma@gmail.com)  
🔗 [GitHub Profile](https://github.com/tawandakasunzuma)
