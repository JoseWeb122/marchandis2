export type ProductCategory =
  | 'fragrances'
  | 'electronics'
  | 'fashion'
  | 'accessories';

export type CategoryFilter = 'all' | ProductCategory;

export type SortOption =
  | 'featured'
  | 'best-selling'
  | 'newest'
  | 'price-asc'
  | 'price-desc';

export interface ProductVariant {
  id: string;
  label: string;
  swatchHex?: string;
  priceDelta?: number;
}

export interface FragranceDetails {
  concentration: string;
  genderProfile: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: number; // 1-5
  sillage: number; // 1-5
  perfumerNote: string;
}

export interface ElectronicsDetails {
  specs: { label: string; value: string }[];
  features: string[];
  inTheBox: string[];
  warranty: string;
}

export interface ApparelDetails {
  material: string;
  fit: string;
  modelInfo: string;
  care: string[];
  sizes: string[];
}

export interface AccessoriesDetails {
  material: string;
  dimensions: string;
  craftsmanship: string;
  features: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Best Seller' | 'New Arrival' | 'Sale' | 'Limited Edition';
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  releaseOrder: number; // higher = newer
  salesRank: number; // lower = better selling
  images: string[];
  shortDescription: string;
  description: string;
  variants?: ProductVariant[];
  variantLabel?: string; // e.g., "Size", "Finish", "Bottle Size", "Colorway"
  sizes?: string[]; // apparel sizes e.g., XS, S, M, L, XL
  tags: string[];
  fragranceDetails?: FragranceDetails;
  electronicsDetails?: ElectronicsDetails;
  apparelDetails?: ApparelDetails;
  accessoriesDetails?: AccessoriesDetails;
}

export interface CartItem {
  key: string; // unique composite: productId__variant__size
  productId: string;
  quantity: number;
  selectedVariant?: string;
  selectedSize?: string;
  unitPrice: number;
}

export type ViewState =
  | { page: 'home' }
  | { page: 'shop'; category: CategoryFilter; preset?: 'new' | 'bestsellers' }
  | { page: 'product'; productId: string }
  | { page: 'wishlist' };

export type InfoModalType = 'shipping' | 'returns' | 'contact' | 'account' | null;

export interface ToastMessage {
  id: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}
