import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Search', to: '/search' },
  { label: 'Favorites', to: '/favorites' },
  { label: 'Playlist', to: '/playlist' },
  { label: 'Admin', to: '/admin' },
];

export default function Sidebar() {
  return (
    <aside className="w-full border-b border-slate-800 bg-slate-950/90 p-4 backdrop-blur md:h-screen md:w-64 md:border-b-0 md:border-r md:p-6">
      <h1 className="mb-4 text-2xl font-bold tracking-tight text-white md:mb-10">Pulseify</h1>
      <nav className="flex gap-2 overflow-x-auto md:flex-col">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-xl px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-500/15 text-brand-500 shadow-glow'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
