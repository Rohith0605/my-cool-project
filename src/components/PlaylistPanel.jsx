export default function PlaylistPanel({ playlist, onPlay, onRemove }) {
  if (!playlist.length) {
    return <p className="rounded-xl border border-dashed border-slate-700 p-6 text-slate-400">Your playlist is empty.</p>;
  }

  return (
    <div className="space-y-2">
      {playlist.map((song) => (
        <div key={song.id} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-2">
          <img src={song.cover} alt={song.title} className="h-12 w-12 rounded-md object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-white">{song.title}</p>
            <p className="truncate text-xs text-slate-400">{song.artist}</p>
          </div>
          <button onClick={() => onPlay(song)} className="rounded bg-brand-500 px-2 py-1 text-xs text-black">Play</button>
          <button onClick={() => onRemove(song.id)} className="rounded bg-slate-800 px-2 py-1 text-xs">Remove</button>
        </div>
      ))}
    </div>
  );
}
