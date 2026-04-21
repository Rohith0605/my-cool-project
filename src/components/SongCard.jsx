import { formatTime } from '../utils/format';

export default function SongCard({ song, onPlay, isActive, onFavorite, isFavorite, onAddPlaylist }) {
  return (
    <article className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-3 transition hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-900">
      <div className="relative mb-3 overflow-hidden rounded-xl">
        <img src={song.cover} alt={song.title} className="h-44 w-full object-cover" loading="lazy" />
        <button
          onClick={() => onPlay(song)}
          className="absolute bottom-3 right-3 rounded-full bg-brand-500 p-3 text-sm font-bold text-black opacity-0 transition group-hover:opacity-100"
        >
          {isActive ? '❚❚' : '▶'}
        </button>
      </div>
      <h3 className="truncate text-sm font-semibold text-white">{song.title}</h3>
      <p className="truncate text-xs text-slate-400">{song.artist}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{formatTime(song.duration)}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => onFavorite(song)} className="hover:text-brand-500">{isFavorite ? '♥' : '♡'}</button>
          <button onClick={() => onAddPlaylist(song)} className="rounded bg-slate-800 px-2 py-1 hover:bg-slate-700">+Playlist</button>
        </div>
      </div>
    </article>
  );
}
