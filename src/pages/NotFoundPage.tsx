import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <p className="font-serif text-8xl text-luxury-200 dark:text-luxury-800 select-none mb-6">
        404
      </p>
      <h1 className="font-serif text-2xl text-luxury-900 dark:text-luxury-50 mb-3">
        Page Not Found
      </h1>
      <p className="text-sm font-light text-luxury-500 max-w-xs mb-10">
        The page you're looking for has moved, or perhaps it never existed.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 border border-luxury-300 dark:border-luxury-700 px-8 py-3 text-[11px] tracking-widest uppercase text-luxury-900 dark:text-luxury-50 hover:bg-luxury-900 hover:text-luxury-50 dark:hover:bg-luxury-50 dark:hover:text-luxury-900 transition-colors"
      >
        <ArrowLeft size={13} /> Return Home
      </Link>
    </div>
  );
}
