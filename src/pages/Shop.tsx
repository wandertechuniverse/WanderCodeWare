import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';
import { products, categories, type Category } from '../data/products';

type SortKey = 'default' | 'price-asc' | 'price-desc';

export default function Shop() {
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [sort, setSort] = useState<SortKey>('default');

  const displayed = [...products]
    .filter((p) => filter === 'all' || p.category === filter)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="px-6 md:px-12 py-12 space-y-8">
      {/* Header + controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-serif text-4xl md:text-5xl text-luxury-900 dark:text-luxury-50">
          The Collection
        </h1>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Category filter */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {categories.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`shrink-0 px-4 py-2 rounded-full text-[11px] tracking-widest uppercase border transition-all ${
                  filter === value
                    ? 'bg-luxury-900 dark:bg-luxury-50 text-luxury-50 dark:text-luxury-900 border-luxury-900 dark:border-luxury-50'
                    : 'border-luxury-200 dark:border-luxury-800 text-luxury-500 hover:border-luxury-400 dark:hover:border-luxury-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-luxury-500 hover:text-luxury-900 dark:hover:text-luxury-50 transition-colors">
              <ArrowUpDown size={14} /> Sort
            </button>
            <div className="absolute right-0 mt-2 w-44 bg-luxury-50 dark:bg-luxury-900 border border-luxury-200 dark:border-luxury-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
              {([
                ['default', 'Newest'],
                ['price-asc', 'Price: Low to High'],
                ['price-desc', 'Price: High to Low'],
              ] as [SortKey, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSort(key)}
                  className={`block w-full text-left px-4 py-2.5 text-xs hover:bg-luxury-100 dark:hover:bg-luxury-800 transition-colors ${
                    sort === key ? 'text-luxury-900 dark:text-luxury-50 font-semibold' : 'text-luxury-500'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
        {displayed.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group block">
            <div className="aspect-[3/4] overflow-hidden mb-3 relative bg-luxury-100 dark:bg-luxury-900 border border-luxury-200 dark:border-luxury-800">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {product.isNew && (
                <span className="absolute top-3 left-3 bg-luxury-900 dark:bg-luxury-50 text-luxury-50 dark:text-luxury-900 text-[9px] tracking-widest uppercase px-2 py-1">
                  New
                </span>
              )}
            </div>
            <p className="text-[10px] tracking-widest uppercase text-luxury-400 mb-1">{product.category}</p>
            <h3 className="font-serif text-base leading-snug text-luxury-900 dark:text-luxury-50 mb-1">{product.name}</h3>
            <p className="text-sm font-light text-luxury-500">${product.price}</p>
          </Link>
        ))}
      </div>

      {displayed.length === 0 && (
        <p className="text-center py-24 text-sm text-luxury-400">No items in this category yet.</p>
      )}
    </div>
  );
}
