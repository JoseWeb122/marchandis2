import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import {
  CartItem,
  CategoryFilter,
  InfoModalType,
  Product,
  ToastMessage,
  ViewState,
} from '../types/store';
import { getProductById, PRODUCTS } from '../data/products';

const CART_STORAGE_KEY = 'wandas_cart_v1';
const WISHLIST_STORAGE_KEY = 'wandas_wishlist_v1';

interface StoreContextValue {
  view: ViewState;
  navigateHome: () => void;
  navigateShop: (category?: CategoryFilter, preset?: 'new' | 'bestsellers') => void;
  navigateProduct: (productId: string) => void;
  navigateWishlist: () => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (
    product: Product,
    options?: { quantity?: number; variantLabel?: string; size?: string; openDrawer?: boolean }
  ) => void;
  updateCartQuantity: (key: string, quantity: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: string[];
  wishlistProducts: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;

  // Overlays & Modals
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  infoModal: InfoModalType;
  setInfoModal: (modal: InfoModalType) => void;

  // Toasts
  toasts: ToastMessage[];
  pushToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const safeReadStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState<ViewState>({ page: 'home' });

  const [cart, setCart] = useState<CartItem[]>(() =>
    safeReadStorage<CartItem[]>(CART_STORAGE_KEY, [])
  );

  const [wishlist, setWishlist] = useState<string[]>(() =>
    safeReadStorage<string[]>(WISHLIST_STORAGE_KEY, ['santal-velours-edp', 'oslo-cashmere-crewneck'])
  );

  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [infoModal, setInfoModal] = useState<InfoModalType>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage quota errors
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore storage quota errors
    }
  }, [wishlist]);

  // Keyboard shortcut Cmd+K / Ctrl+K for search, Escape to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setCartOpen(false);
        setQuickViewProduct(null);
        setInfoModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    const hasOverlay = isCartOpen || isSearchOpen || !!quickViewProduct || !!infoModal;
    document.body.style.overflow = hasOverlay ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen, isSearchOpen, quickViewProduct, infoModal]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = useCallback(() => {
    setView({ page: 'home' });
    scrollToTop();
  }, []);

  const navigateShop = useCallback(
    (category: CategoryFilter = 'all', preset?: 'new' | 'bestsellers') => {
      setView({ page: 'shop', category, preset });
      scrollToTop();
    },
    []
  );

  const navigateProduct = useCallback((productId: string) => {
    setQuickViewProduct(null);
    setSearchOpen(false);
    setView({ page: 'product', productId });
    scrollToTop();
  }, []);

  const navigateWishlist = useCallback(() => {
    setSearchOpen(false);
    setCartOpen(false);
    setView({ page: 'wishlist' });
    scrollToTop();
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev.slice(-2), { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  }, []);

  const addToCart = useCallback(
    (
      product: Product,
      options?: { quantity?: number; variantLabel?: string; size?: string; openDrawer?: boolean }
    ) => {
      const qty = options?.quantity ?? 1;
      const defaultVariant = product.variants?.[0]?.label;
      const selectedVariant = options?.variantLabel ?? defaultVariant;
      const selectedSize = options?.size ?? product.sizes?.[1] ?? product.sizes?.[0];

      const matchedVariant = product.variants?.find((v) => v.label === selectedVariant);
      const unitPrice = product.price + (matchedVariant?.priceDelta ?? 0);
      const key = `${product.id}__${selectedVariant ?? 'default'}__${selectedSize ?? 'onesize'}`;

      setCart((prev) => {
        const existing = prev.find((item) => item.key === key);
        if (existing) {
          return prev.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + qty } : item
          );
        }
        return [
          ...prev,
          {
            key,
            productId: product.id,
            quantity: qty,
            selectedVariant,
            selectedSize,
            unitPrice,
          },
        ];
      });

      if (options?.openDrawer) {
        setCartOpen(true);
      } else {
        const metaParts = [selectedVariant, selectedSize ? `Size ${selectedSize}` : null].filter(
          Boolean
        );
        pushToast({
          title: `Added to Bag`,
          subtitle: `${product.name}${metaParts.length ? ` · ${metaParts.join(', ')}` : ''}`,
          actionLabel: 'View Bag',
          onAction: () => setCartOpen(true),
        });
      }
    },
    [pushToast]
  );

  const updateCartQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.key !== key));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        const exists = prev.includes(product.id);
        if (exists) {
          pushToast({
            title: 'Removed from Wishlist',
            subtitle: product.name,
          });
          return prev.filter((id) => id !== product.id);
        }
        pushToast({
          title: 'Saved to Wishlist',
          subtitle: product.name,
          actionLabel: 'View Wishlist',
          onAction: () => {
            setView({ page: 'wishlist' });
            scrollToTop();
          },
        });
        return [product.id, ...prev];
      });
    },
    [pushToast]
  );

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () =>
      cart.reduce((acc, item) => {
        const prod = getProductById(item.productId);
        const price = item.unitPrice ?? prod?.price ?? 0;
        return acc + price * item.quantity;
      }, 0),
    [cart]
  );

  const wishlistProducts = useMemo(
    () =>
      wishlist
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
    [wishlist]
  );

  const value: StoreContextValue = {
    view,
    navigateHome,
    navigateShop,
    navigateProduct,
    navigateWishlist,
    cart,
    cartCount,
    cartSubtotal,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    wishlist,
    wishlistProducts,
    toggleWishlist,
    isWishlisted,
    isCartOpen,
    setCartOpen,
    isSearchOpen,
    setSearchOpen,
    quickViewProduct,
    setQuickViewProduct,
    infoModal,
    setInfoModal,
    toasts,
    pushToast,
    dismissToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
};
