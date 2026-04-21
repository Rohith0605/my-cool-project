import AdminPanel from '../components/AdminPanel';

export default function AdminPage({ customSongs, setCustomSongs }) {
  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold">Admin Upload Panel</h3>
      <p className="mb-4 text-sm text-slate-400">Upload local songs, edit metadata, and manage custom tracks.</p>
      <AdminPanel customSongs={customSongs} setCustomSongs={setCustomSongs} />
    </section>
  );
}
