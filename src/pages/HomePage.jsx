import SongCard from '../components/SongCard';

export default function HomePage({ songs, onPlay, currentSong, onFavorite, favorites, onAddPlaylist }) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold">Trending</h3>
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
