import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../data/products';

const featured = products.filter((p) => p.isNew);

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden dot-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-luxury-50/60 to-luxury-50 dark:via-luxury-950/60 dark:to-luxury-950 z-10" />
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1600"
          alt="Luxury fashion"
          className="absolute inset-0 w-full h-full object-cover opacity-50 dark:opacity-30"
        />
        <div className="relative z-20 text-center space-y-6 px-6 max-w-2xl">
          <p className="text-[11px] tracking-[0.4em] uppercase text-luxury-500">
            New Collection — 2026
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight text-luxury-900 dark:text-luxury-50">
            Dressed in<br /><em>Silence</em>
          </h1>
          <p className="text-base md:text-lg font-light text-luxury-500 max-w-sm mx-auto leading-relaxed">
            Garments for those who speak through restraint. Crafted with intention.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 border border-luxury-300 dark:border-luxury-700 text-[11px] tracking-widest uppercase text-luxury-900 dark:text-luxury-50 hover:gap-4 transition-all"
          >
            Explore the Collection <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="px-6 md:px-12">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="font-serif text-2xl md:text-3xl text-luxury-900 dark:text-luxury-50">
            New Arrivals
          </h2>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-[11px] tracking-widest uppercase text-luxury-500 hover:text-luxury-900 dark:hover:text-luxury-50 hover:gap-2 transition-all"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featured.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group block">
              <div className="aspect-[3/4] overflow-hidden mb-4 bg-luxury-100 dark:bg-luxury-900 border border-luxury-200 dark:border-luxury-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-luxury-500 mb-1">{product.category}</p>
                  <h3 className="font-serif text-lg text-luxury-900 dark:text-luxury-50">{product.name}</h3>
                </div>
                <p className="text-sm font-light text-luxury-500 mt-1">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand statement */}
      <section className="px-6 md:px-12 py-24 text-center border-t border-b border-luxury-200 dark:border-luxury-800">
        <p className="text-[11px] tracking-[0.4em] uppercase text-luxury-400 mb-6">Our Philosophy</p>
        <blockquote className="font-serif italic text-2xl md:text-4xl leading-relaxed text-luxury-900 dark:text-luxury-50 max-w-2xl mx-auto">
          "Less is not less. Less is the truest form of more."
        </blockquote>
      </section>
    </div>
  );
}
