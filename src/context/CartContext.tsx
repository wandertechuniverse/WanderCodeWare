import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import { products, type Product } from '../data/products';

/**
 * Persisted cart entries are normalized references — never full product
 * snapshots. Prices/images are resolved against the catalog at render time,
 * so catalog updates are always reflected.
 */
export interface CartEntry {
  productId: string;
  size: string;
  quantity: number;
}

/** A cart entry resolved against the current catalog. */
export interface CartItem extends CartEntry {
  product: Product;
}

type CartAction =
  | { type: 'ADD'; productId: string; size: string }
  | { type: 'REMOVE'; productId: string; size: string }
  | { type: 'CLEAR' };

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;
  count: number;
  total: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'wcw_cart_v3';
/** Older keys that persisted full product snapshots. Migrated then removed. */
const LEGACY_KEYS = ['wcw_cart_v2', 'wcw_cart'] as const;

function isValidEntry(value: unknown): value is CartEntry {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.productId === 'string' &&
    typeof v.size === 'string' &&
    typeof v.quantity === 'number' &&
    Number.isInteger(v.quantity) &&
    v.quantity > 0
  );
}

function sanitize(entries: unknown): CartEntry[] {
  if (!Array.isArray(entries)) return [];
  return entries
    .filter(isValidEntry)
    .map(({ productId, size, quantity }) => ({ productId, size, quantity }));
}

/** Best-effort migration from legacy snapshot-shaped carts. */
function migrateLegacy(): CartEntry[] {
  for (const key of LEGACY_KEYS) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed: unknown = JSON.parse(raw);
      // v2 shape: Array<Product & { quantity, selectedSize }>
      // v1 shape: { items: Array<{ product, size, quantity }> }
      const list: unknown[] = Array.isArray(parsed)
        ? parsed
        : Array.isArray((parsed as { items?: unknown[] })?.items)
          ? (parsed as { items: unknown[] }).items
          : [];
      const entries = list
        .map((item): CartEntry | null => {
          if (typeof item !== 'object' || item === null) return null;
          const v = item as Record<string, unknown>;
          const productId =
            typeof v.id === 'string'
              ? v.id
              : typeof (v.product as Record<string, unknown> | undefined)?.id === 'string'
                ? ((v.product as Record<string, unknown>).id as string)
                : null;
          const size =
            typeof v.selectedSize === 'string'
              ? v.selectedSize
              : typeof v.size === 'string'
                ? v.size
                : null;
          const quantity =
            typeof v.quantity === 'number' && Number.isInteger(v.quantity) && v.quantity > 0
              ? v.quantity
              : null;
          if (!productId || !size || !quantity) return null;
          return { productId, size, quantity };
        })
        .filter((e): e is CartEntry => e !== null);
      if (entries.length > 0) return entries;
    } catch {
      // corrupt legacy data — ignore
    }
  }
  return [];
}

function loadCart(): CartEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return sanitize(JSON.parse(raw));
    return migrateLegacy();
  } catch {
    return [];
  }
}

function cartReducer(state: CartEntry[], action: CartAction): CartEntry[] {
  switch (action.type) {
    case 'ADD': {
      const idx = state.findIndex(
        (e) => e.productId === action.productId && e.size === action.size
      );
      if (idx >= 0) {
        const next = [...state];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...state, { productId: action.productId, size: action.size, quantity: 1 }];
    }
    case 'REMOVE':
      return state.filter((e) => !(e.productId === action.productId && e.size === action.size));
    case 'CLEAR':
      return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [entries, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      for (const key of LEGACY_KEYS) localStorage.removeItem(key);
    } catch {
      // best-effort persistence
    }
  }, [entries]);

  const value = useMemo<CartContextValue>(() => {
    // Resolve entries against the catalog; drop entries whose product no
    // longer exists rather than rendering stale snapshots.
    const items: CartItem[] = entries.flatMap((entry) => {
      const product = products.find((p) => p.id === entry.productId);
      return product ? [{ ...entry, product }] : [];
    });
    return {
      items,
      addToCart: (product, size) => dispatch({ type: 'ADD', productId: product.id, size }),
      removeFromCart: (productId, size) => dispatch({ type: 'REMOVE', productId, size }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      total: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    };
  }, [entries]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
