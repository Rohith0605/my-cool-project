import SongCard from '../components/SongCard';

export default function SearchPage({ songs, loading, error, onPlay, currentSong, onFavorite, favorites, onAddPlaylist }) {
  if (loading) return <p className="text-slate-400">Loading songs...</p>;
  if (error) return <p className="text-amber-300">API unavailable, showing fallback tracks.</p>;

  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold">Search Results</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onPlay={onPlay}
            isActive={currentSong?.id === song.id}
            onFavorite={onFavorite}
            isFavorite={favorites.some((fav) => fav.id === song.id)}
            onAddPlaylist={onAddPlaylist}
          />
        ))}
      </div>
    </section>
  );
}
