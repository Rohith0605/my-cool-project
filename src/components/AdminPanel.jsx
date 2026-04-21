import { useState } from 'react';

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function AdminPanel({ customSongs, setCustomSongs }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [cover, setCover] = useState('');
  const [audioData, setAudioData] = useState('');

  const handleAudioUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const data = await fileToDataUrl(file);
    setAudioData(data);
  };

  const handleCoverUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const data = await fileToDataUrl(file);
    setCover(data);
  };

  const addSong = () => {
    if (!title || !artist || !audioData) return;
    setCustomSongs((prev) => [
      {
        id: `local-${Date.now()}`,
        title,
        artist,
        album: 'Uploaded Tracks',
        cover: cover || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=500&q=80',
        preview: audioData,
        duration: 0,
      },
      ...prev,
    ]);
    setTitle('');
    setArtist('');
    setCover('');
    setAudioData('');
  };

  const deleteSong = (id) => setCustomSongs((prev) => prev.filter((song) => song.id !== id));

  return (
    <section className="space-y-4">
      <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 md:grid-cols-2">
        <input className="rounded-lg bg-slate-800 px-3 py-2 text-sm" placeholder="Song title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="rounded-lg bg-slate-800 px-3 py-2 text-sm" placeholder="Artist name" value={artist} onChange={(e) => setArtist(e.target.value)} />
        <label className="rounded-lg border border-slate-700 p-2 text-xs">Upload cover<input type="file" accept="image/*" className="mt-1 block" onChange={handleCoverUpload} /></label>
        <label className="rounded-lg border border-slate-700 p-2 text-xs">Upload MP3<input type="file" accept="audio/*" className="mt-1 block" onChange={handleAudioUpload} /></label>
        <button onClick={addSong} className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-black md:col-span-2">Add / Update Song</button>
      </div>

      <div className="space-y-2">
        {customSongs.map((song) => (
          <div key={song.id} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-3">
            <div>
              <p className="text-sm text-white">{song.title}</p>
              <p className="text-xs text-slate-400">{song.artist}</p>
            </div>
            <button onClick={() => deleteSong(song.id)} className="rounded bg-red-500/20 px-3 py-1 text-xs text-red-300">Delete</button>
          </div>
        ))}
      </div>
    </section>
  );
}
