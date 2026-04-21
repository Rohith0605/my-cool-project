import { mockSongs } from '../assets/mockSongs';

const JAMENDO_CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID;
const JAMENDO_BASE = 'https://api.jamendo.com/v3.0/tracks';
const DEEZER_PROXY = 'https://corsproxy.io/?';
const DEEZER_BASE = 'https://api.deezer.com/search';

const normalizeDeezer = (track) => ({
  id: `deezer-${track.id}`,
  title: track.title,
  artist: track.artist?.name ?? 'Unknown Artist',
  album: track.album?.title ?? 'Unknown Album',
  cover: track.album?.cover_xl || track.album?.cover_big || track.album?.cover_medium || '',
  preview: track.preview,
  duration: track.duration ?? 0,
});

const normalizeJamendo = (track) => ({
  id: `jamendo-${track.id}`,
  title: track.name,
  artist: track.artist_name ?? 'Unknown Artist',
  album: track.album_name ?? 'Unknown Album',
  cover: track.image || track.album_image || '',
  preview: track.audio || track.audiodownload || '',
  duration: track.duration ?? 0,
});

const requestJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

const jamendoSearch = async (query = '') => {
  if (!JAMENDO_CLIENT_ID) return [];
  const search = encodeURIComponent(query || 'trending');
  const url = `${JAMENDO_BASE}/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=20&include=musicinfo&search=${search}`;
  const data = await requestJson(url);
  const tracks = data?.results ?? [];
  return tracks.map(normalizeJamendo).filter((song) => song.preview);
};

const deezerSearch = async (query = '') => {
  const search = encodeURIComponent(query || 'trending');
  const url = `${DEEZER_PROXY}${encodeURIComponent(`${DEEZER_BASE}?q=${search}&limit=25`)}`;
  const data = await requestJson(url);
  const tracks = data?.data ?? [];
  return tracks.map(normalizeDeezer).filter((song) => song.preview);
};

export const searchSongs = async (query = '') => {
  try {
    const jamendo = await jamendoSearch(query);
    if (jamendo.length) return { songs: jamendo, source: 'jamendo' };
  } catch {
    // fallback below
  }

  try {
    const deezer = await deezerSearch(query);
    if (deezer.length) return { songs: deezer, source: 'deezer' };
  } catch {
    // fallback below
  }

  return {
    songs: mockSongs.filter((song) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return song.title.toLowerCase().includes(q) || song.artist.toLowerCase().includes(q);
    }),
    source: 'mock',
  };
};

export const getTrendingSongs = async () => searchSongs('top hits');
