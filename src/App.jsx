import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PlayerBar from './components/PlayerBar';
import Sidebar from './components/Sidebar';
import { useDebounce } from './hooks/useDebounce';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import AdminPage from './pages/AdminPage';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';
import SearchPage from './pages/SearchPage';
import { getTrendingSongs, searchSongs } from './services/musicService';
import { keys } from './utils/storage';

export default function App() {
  const audioRef = useRef(null);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('mock');

  const [favorites, setFavorites] = useLocalStorageState(keys.favorites, []);
  const [playlist, setPlaylist] = useLocalStorageState(keys.playlist, []);
  const [recentlyPlayed, setRecentlyPlayed] = useLocalStorageState(keys.recent, []);
  const [customSongs, setCustomSongs] = useLocalStorageState(keys.customSongs, []);

  const librarySongs = useMemo(() => {
    const all = [...customSongs, ...songs];
    const unique = new Map();
    all.forEach((song) => unique.set(song.id, song));
    return Array.from(unique.values());
  }, [customSongs, songs]);

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = debouncedQuery ? await searchSongs(debouncedQuery) : await getTrendingSongs();
        setSongs(data.songs);
        setSource(data.source);
        setError(data.source === 'mock' ? 'fallback' : null);
      } catch {
        setError('failed');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTime = () => setProgress(audio.currentTime || 0);
    const handleMeta = () => setDuration(audio.duration || currentSong?.duration || 0);
    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    audio.addEventListener('timeupdate', handleTime);
    audio.addEventListener('loadedmetadata', handleMeta);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', handleTime);
      audio.removeEventListener('loadedmetadata', handleMeta);
      audio.removeEventListener('ended', handleEnded);
    };
  });

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setRecentlyPlayed((prev) => [song, ...prev.filter((item) => item.id !== song.id)].slice(0, 25));
  };

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    audioRef.current.src = currentSong.preview;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentSong, isPlaying]);

  const playNext = () => {
    if (!librarySongs.length) return;
    if (!currentSong) return playSong(librarySongs[0]);
    if (shuffle) {
      const random = librarySongs[Math.floor(Math.random() * librarySongs.length)];
      return playSong(random);
    }
    const idx = librarySongs.findIndex((song) => song.id === currentSong.id);
    const next = librarySongs[(idx + 1) % librarySongs.length];
    return playSong(next);
  };

  const playPrev = () => {
    if (!librarySongs.length || !currentSong) return;
    const idx = librarySongs.findIndex((song) => song.id === currentSong.id);
    const prev = librarySongs[(idx - 1 + librarySongs.length) % librarySongs.length];
    playSong(prev);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleFavorite = (song) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === song.id) ? prev.filter((fav) => fav.id !== song.id) : [song, ...prev]
    );
  };

  const addPlaylist = (song) => {
    setPlaylist((prev) => (prev.some((item) => item.id === song.id) ? prev : [...prev, song]));
  };

  const removePlaylist = (id) => setPlaylist((prev) => prev.filter((song) => song.id !== id));

  const seek = (value) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100 md:flex">
      <Sidebar />
      <div className="flex-1 pb-32">
        <Header query={query} setQuery={setQuery} source={source} />
        <main className="space-y-8 p-4 md:p-8">
          {!!recentlyPlayed.length && (
            <section>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Recently Played</h3>
              <div className="flex gap-2 overflow-x-auto">
                {recentlyPlayed.slice(0, 10).map((song) => (
                  <button key={song.id} onClick={() => playSong(song)} className="whitespace-nowrap rounded-full bg-slate-800 px-3 py-1 text-xs hover:bg-slate-700">{song.title}</button>
                ))}
              </div>
            </section>
          )}

          <Routes>
            <Route path="/" element={<HomePage songs={librarySongs} onPlay={playSong} currentSong={currentSong} onFavorite={toggleFavorite} favorites={favorites} onAddPlaylist={addPlaylist} />} />
            <Route path="/search" element={<SearchPage songs={librarySongs} loading={loading} error={error} onPlay={playSong} currentSong={currentSong} onFavorite={toggleFavorite} favorites={favorites} onAddPlaylist={addPlaylist} />} />
            <Route path="/favorites" element={<FavoritesPage favorites={favorites} onPlay={playSong} currentSong={currentSong} onFavorite={toggleFavorite} onAddPlaylist={addPlaylist} />} />
            <Route path="/playlist" element={<PlaylistPage playlist={playlist} onPlay={playSong} onRemove={removePlaylist} />} />
            <Route path="/admin" element={<AdminPage customSongs={customSongs} setCustomSongs={setCustomSongs} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <audio ref={audioRef} preload="metadata" />
      <PlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onPrev={playPrev}
        onNext={playNext}
        progress={progress}
        duration={duration}
        onSeek={seek}
        volume={volume}
        onVolume={setVolume}
        shuffle={shuffle}
        repeat={repeat}
        onShuffle={() => setShuffle((v) => !v)}
        onRepeat={() => setRepeat((v) => !v)}
      />
    </div>
  );
}
