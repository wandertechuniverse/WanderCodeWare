import { Link } from 'react-router-dom';
import { X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { cart, removeFromCart } = useApp();
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-6 text-center">
        <ShoppingBag size={40} className="text-luxury-200 dark:text-luxury-800" />
        <div>
          <p className="font-serif text-xl text-luxury-900 dark:text-luxury-50 mb-2">Your bag is empty</p>
          <p className="text-sm font-light text-luxury-500">Add something beautiful to get started.</p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 border border-luxury-300 dark:border-luxury-700 px-8 py-3 text-[11px] tracking-widest uppercase text-luxury-900 dark:text-luxury-50"
        >
          Continue Shopping <ArrowRight size={13} />
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-12 max-w-3xl">
      <h1 className="font-serif text-4xl text-luxury-900 dark:text-luxury-50 mb-10">Your Bag</h1>

      <ul className="border-t border-luxury-200 dark:border-luxury-800">
        {cart.map((item) => (
          <li
            key={`${item.id}-${item.selectedSize}`}
            className="flex gap-5 py-6 border-b border-luxury-200 dark:border-luxury-800"
          >
            <div className="w-20 h-24 shrink-0 overflow-hidden bg-luxury-100 dark:bg-luxury-900 border border-luxury-200 dark:border-luxury-800">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] tracking-widest uppercase text-luxury-400 mb-1">{item.category}</p>
              <p className="font-serif text-base text-luxury-900 dark:text-luxury-50 mb-1">{item.name}</p>
              <p className="text-xs text-luxury-500 mb-1">Size: {item.selectedSize} · Qty: {item.quantity}</p>
              <p className="text-sm font-light text-luxury-900 dark:text-luxury-50">${item.price * item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id, item.selectedSize)}
              aria-label="Remove"
              className="text-luxury-400 hover:text-luxury-900 dark:hover:text-luxury-50 transition-colors mt-1 self-start"
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-6 border-t border-luxury-200 dark:border-luxury-800">
        <div className="flex justify-between items-baseline mb-8">
          <p className="text-[11px] tracking-widest uppercase text-luxury-500">Total</p>
          <p className="font-serif text-2xl text-luxury-900 dark:text-luxury-50">${total}</p>
        </div>
        <button className="w-full py-4 bg-luxury-900 dark:bg-luxury-50 text-luxury-50 dark:text-luxury-900 text-[11px] tracking-widest uppercase">
          Proceed to Checkout
        </button>
        <Link
          to="/shop"
          className="block text-center mt-4 text-[11px] tracking-widest uppercase text-luxury-500 hover:text-luxury-900 dark:hover:text-luxury-50 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
