# Pulseify — Spotify-style Premium Music Player

A production-grade frontend music player built with **React + Tailwind CSS + JavaScript**.

## Features
- Spotify-inspired dark UI with responsive layout
- Sidebar navigation + sticky bottom player
- Home, Search, Favorites, Playlist, and Admin pages
- Jamendo-first API service with Deezer fallback and guaranteed mock fallback
- Play/Pause, Next/Prev, seek, volume, shuffle, repeat, and auto-next
- Favorites, Playlist, Recently Played, and Custom uploads stored in localStorage
- Upload local songs and metadata from Admin page

## API priority and reliability
The app tries sources in this order:
1. **Jamendo API** (`VITE_JAMENDO_CLIENT_ID` required)
2. **Deezer API** via CORS proxy
3. **Mock data fallback** (always works for demos)

## Quick start
```bash
npm install
npm run dev
```

## Optional environment variable
Create `.env`:
```bash
VITE_JAMENDO_CLIENT_ID=your_client_id_here
```

## Build
```bash
npm run build
npm run preview
```
