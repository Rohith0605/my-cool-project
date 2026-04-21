export const keys = {
  favorites: 'pulseify:favorites',
  playlist: 'pulseify:playlist',
  recent: 'pulseify:recent',
  customSongs: 'pulseify:customSongs',
};

export const readStorage = (key, fallback = []) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
