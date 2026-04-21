import SearchBar from './SearchBar';

export default function Header({ query, setQuery, source }) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 p-4 backdrop-blur md:px-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Premium Music</p>
          <h2 className="text-xl font-semibold text-white">Discover your next vibe</h2>
        </div>
        <SearchBar query={query} setQuery={setQuery} />
      </div>
      <p className="mt-2 text-xs text-slate-400">Data source: <span className="capitalize text-slate-300">{source}</span></p>
    </header>
  );
}
