import { useState, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Home, Info, Mail, Sun, Moon, Grid, BookImage } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/shop', icon: Grid, label: 'Shop' },
  { path: '/lookbook', icon: BookImage, label: 'Lookbook' },
  { path: '/about', icon: Info, label: 'About' },
  { path: '/contact', icon: Mail, label: 'Contact' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { cart, isDarkMode, toggleDarkMode } = useApp();
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleNewsletter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
  }

  return (
    <div className="min-h-screen flex flex-col bg-luxury-50 dark:bg-luxury-950 text-luxury-900 dark:text-luxury-50">
      {/* Desktop header */}
      <header className="hidden md:flex justify-between items-center px-8 py-5 border-b border-luxury-200 dark:border-luxury-800 bg-luxury-50/90 dark:bg-luxury-950/90 backdrop-blur-sm sticky top-0 z-50">
        <Link to="/" className="font-serif text-xl tracking-widest uppercase text-luxury-900 dark:text-luxury-50">
          WanderCodeWare
        </Link>

        <nav className="flex items-center gap-8">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-[11px] tracking-widest uppercase transition-opacity hover:opacity-100 ${
                pathname === path
                  ? 'text-luxury-900 dark:text-luxury-50 font-semibold opacity-100'
                  : 'text-luxury-500 opacity-60'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-full hover:bg-luxury-100 dark:hover:bg-luxury-800 transition-colors text-luxury-500 dark:text-luxury-400"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingBag size={20} className="text-luxury-900 dark:text-luxury-50" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-luxury-900 dark:bg-luxury-50 text-luxury-50 dark:text-luxury-900 text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between px-5 py-4 border-b border-luxury-200 dark:border-luxury-800 bg-luxury-50/95 dark:bg-luxury-950/95 sticky top-0 z-50">
        <Link to="/" className="font-serif text-base tracking-widest uppercase text-luxury-900 dark:text-luxury-50">
          WCW
        </Link>
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} aria-label="Toggle dark mode" className="text-luxury-500 dark:text-luxury-400">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/cart" className="relative" aria-label="Cart">
            <ShoppingBag size={20} className="text-luxury-900 dark:text-luxury-50" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-luxury-900 dark:bg-luxury-50 text-luxury-50 dark:text-luxury-900 text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 pb-24 md:pb-0">{children}</main>

      {/* Newsletter footer — desktop only */}
      <footer className="hidden md:block border-t border-luxury-200 dark:border-luxury-800 bg-luxury-50 dark:bg-luxury-950">
        <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-serif text-2xl text-luxury-900 dark:text-luxury-50 mb-3">
              Stay in the World of WCW
            </p>
            <p className="text-sm font-light text-luxury-500 leading-relaxed max-w-sm">
              New arrivals, editorial stories, and early access — delivered quietly to your inbox.
            </p>
          </div>
          <div>
            {subscribed ? (
              <p className="text-sm font-light text-luxury-500 tracking-wide">
                Thank you. We'll be in touch.
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-0">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-transparent border-b border-luxury-300 dark:border-luxury-700 py-2 text-sm font-light text-luxury-900 dark:text-luxury-50 placeholder:text-luxury-400 dark:placeholder:text-luxury-600 focus:outline-none focus:border-luxury-900 dark:focus:border-luxury-50 transition-colors"
                />
                <button
                  type="submit"
                  className="ml-6 text-[11px] tracking-widest uppercase text-luxury-900 dark:text-luxury-50 border-b border-luxury-900 dark:border-luxury-50 pb-2 hover:opacity-60 transition-opacity whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="border-t border-luxury-200 dark:border-luxury-800 px-8 py-5 flex justify-between items-center max-w-6xl mx-auto">
          <p className="text-[10px] tracking-widest uppercase text-luxury-400">
            © 2026 WanderCodeWare
          </p>
          <p className="text-[10px] tracking-widest uppercase text-luxury-400">
            London
          </p>
        </div>
      </footer>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-luxury-50/97 dark:bg-luxury-950/97 border-t border-luxury-200 dark:border-luxury-800 flex">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-opacity ${
              pathname === path
                ? 'text-luxury-900 dark:text-luxury-50'
                : 'text-luxury-400 opacity-50'
            }`}
          >
            <Icon size={20} strokeWidth={1.5} />
            <span className="text-[10px] tracking-wider uppercase">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
