export default function SearchBar({ query, setQuery }) {
  return (
    <div className="w-full md:w-80">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search songs, artists..."
        className="w-full rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white outline-none transition focus:border-brand-500"
      />
    </div>
  );
}
