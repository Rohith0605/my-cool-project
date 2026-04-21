import { formatTime } from '../utils/format';

export default function PlayerBar({
  currentSong,
  isPlaying,
  onTogglePlay,
  onPrev,
  onNext,
  progress,
  duration,
  onSeek,
  volume,
  onVolume,
  shuffle,
  repeat,
  onShuffle,
  onRepeat,
}) {
  if (!currentSong) {
    return <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/95 p-4 text-center text-sm text-slate-400">Select a song to start playing.</footer>;
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur md:px-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-3 md:w-1/4">
          <img src={currentSong.cover} alt={currentSong.title} className="h-12 w-12 rounded-md object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{currentSong.title}</p>
            <p className="truncate text-xs text-slate-400">{currentSong.artist}</p>
          </div>
        </div>

        <div className="md:w-2/4">
          <div className="mb-2 flex items-center justify-center gap-2">
            <button onClick={onShuffle} className={`text-xs ${shuffle ? 'text-brand-500' : 'text-slate-300'}`}>🔀</button>
            <button onClick={onPrev}>⏮</button>
            <button onClick={onTogglePlay} className="rounded-full bg-white px-3 py-1 text-black">{isPlaying ? 'Pause' : 'Play'}</button>
            <button onClick={onNext}>⏭</button>
            <button onClick={onRepeat} className={`text-xs ${repeat ? 'text-brand-500' : 'text-slate-300'}`}>🔁</button>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{formatTime(progress)}</span>
            <input type="range" min="0" max={duration || 0} value={Math.min(progress, duration || 0)} onChange={(e) => onSeek(Number(e.target.value))} className="h-1 w-full accent-brand-500" />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:w-1/4 md:justify-end">
          <span className="text-xs text-slate-400">🔊</span>
          <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => onVolume(Number(e.target.value))} className="h-1 w-32 accent-brand-500" />
        </div>
      </div>
    </footer>
  );
}
