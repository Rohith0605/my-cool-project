import SongCard from '../components/SongCard';

export default function FavoritesPage({ favorites, onPlay, currentSong, onFavorite, onAddPlaylist }) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold">Your Favorites</h3>
      {favorites.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              onPlay={onPlay}
              isActive={currentSong?.id === song.id}
              onFavorite={onFavorite}
              isFavorite
              onAddPlaylist={onAddPlaylist}
            />
          ))}
        </div>
      ) : (
        <p className="text-slate-400">No favorites yet.</p>
      )}
    </section>
  );
}
