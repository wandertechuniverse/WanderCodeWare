import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <h2 className="font-serif text-2xl text-luxury-900 dark:text-luxury-50">Product not found</h2>
        <button
          onClick={() => navigate('/shop')}
          className="flex items-center gap-2 text-sm uppercase tracking-widest text-luxury-500 hover:text-luxury-900 dark:hover:text-luxury-50 transition-colors"
        >
          <ArrowLeft size={16} /> Return to Shop
        </button>
      </div>
    );
  }

  function handleAddToCart() {
    if (!selectedSize) return;
    if (!product) return;
    addToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 px-6 md:px-12 py-10">
      <div className="aspect-[3/4] overflow-hidden bg-luxury-100 dark:bg-luxury-900 border border-luxury-200 dark:border-luxury-800">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col justify-center space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="self-start flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-500 hover:text-luxury-900 dark:hover:text-luxury-50 transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-luxury-500 mb-2">
            {product.category}
            {product.isNew && (
              <span className="ml-3 bg-luxury-900 dark:bg-luxury-50 text-luxury-50 dark:text-luxury-900 text-[9px] tracking-widest uppercase px-2 py-0.5">
                New
              </span>
            )}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-luxury-900 dark:text-luxury-50 mb-3">
            {product.name}
          </h1>
          <p className="text-2xl font-light text-luxury-500">${product.price}</p>
        </div>

        <p className="text-sm font-light leading-relaxed text-luxury-500">{product.description}</p>

        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-widest text-luxury-500">Select Size</span>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 border flex items-center justify-center text-xs tracking-wider uppercase transition-all ${
                  selectedSize === size
                    ? 'bg-luxury-900 dark:bg-luxury-50 text-luxury-50 dark:text-luxury-900 border-luxury-900 dark:border-luxury-50'
                    : 'border-luxury-200 dark:border-luxury-800 text-luxury-600 dark:text-luxury-400 hover:border-luxury-500'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedSize}
          className={`w-full py-4 text-sm uppercase tracking-widest transition-all ${
            !selectedSize
              ? 'bg-luxury-100 dark:bg-luxury-900 text-luxury-400 cursor-not-allowed'
              : isAdded
              ? 'bg-luxury-700 dark:bg-luxury-300 text-luxury-50 dark:text-luxury-900'
              : 'bg-luxury-900 dark:bg-luxury-50 text-luxury-50 dark:text-luxury-900 hover:bg-luxury-800 dark:hover:bg-luxury-200'
          }`}
        >
          {isAdded ? (
            <span className="flex items-center justify-center gap-2">
              <Check size={16} /> Added
            </span>
          ) : selectedSize ? (
            'Add to Cart'
          ) : (
            'Select a Size'
          )}
        </button>

        <div className="pt-6 border-t border-luxury-200 dark:border-luxury-800">
          <p className="text-[10px] tracking-widest uppercase text-luxury-500 mb-3">Details</p>
          <ul className="space-y-1.5 list-none p-0 m-0">
            {product.details.map((d) => (
              <li key={d} className="text-sm font-light text-luxury-500">— {d}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
