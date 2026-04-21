import PlaylistPanel from '../components/PlaylistPanel';

export default function PlaylistPage({ playlist, onPlay, onRemove }) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold">My Playlist</h3>
      <PlaylistPanel playlist={playlist} onPlay={onPlay} onRemove={onRemove} />
    </section>
  );
}
