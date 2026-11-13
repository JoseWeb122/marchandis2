import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types/store';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  index?: number;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  compact = false,
}) => {
  const {
    navigateProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setQuickViewProduct,
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const saved = isWishlisted(product.id);
  const secondaryImage = product.images[1];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, { quantity: 1 });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const badgeStyles: Record<string, string> = {
    Sale: 'bg-[#345B59] text-[#FAF8F2]',
    'New Arrival': 'bg-[#FAF8F2]/95 text-[#345B59] border border-[#DCD2C3]',
    'Best Seller': 'bg-[#292D2C]/88 text-[#FAF8F2]',
    'Limited Edition': 'bg-[#6F9290] text-[#FAF8F2]',
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col"
    >
      {/* Editorial Product Frame */}
      <div
        onClick={() => navigateProduct(product.id)}
        className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[2px] bg-[#EAE3D5] ring-1 ring-[#DCD2C3]/60 transition-shadow duration-500 group-hover:shadow-[0_18px_40px_rgba(41,45,44,0.08)]"
      >
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-cover transition-all duration-700 ease-out ${
            isHovered && secondaryImage
              ? 'scale-105 opacity-0'
              : isHovered
              ? 'scale-105 opacity-100'
              : 'scale-100 opacity-100'
          }`}
        />

        {/* Secondary Crossfade Image on Hover */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
              isHovered ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
            }`}
          />
        )}

        {/* Subtle Bottom Vignette on Hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#292D2C]/35 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

        {/* Top Left Badge */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {product.badge && (
            <span
              className={`px-2.5 py-1 text-[9.5px] font-semibold tracking-[0.18em] uppercase backdrop-blur-sm ${
                badgeStyles[product.badge] ?? 'bg-[#FAF8F2] text-[#292D2C]'
              }`}
            >
              {product.badge === 'Sale' && discountPercent
                ? `Save ${discountPercent}%`
                : product.badge}
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ${
            saved
              ? 'bg-[#FAF8F2] text-[#345B59] shadow-sm'
              : 'bg-[#FAF8F2]/85 text-[#292D2C]/80 hover:bg-[#FAF8F2] hover:text-[#345B59] lg:opacity-0 lg:group-hover:opacity-100'
          }`}
        >
          <Heart
            className={`h-4 w-4 transition-transform duration-200 active:scale-90 ${
              saved ? 'fill-[#6F9290] text-[#6F9290]' : 'stroke-[1.7]'
            }`}
          />
        </button>

        {/* Quick Actions Overlay Strip (Desktop hover + Mobile subtle bottom bar) */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 transition-all duration-300 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <button
            type="button"
            onClick={handleQuickView}
            className="flex flex-1 items-center justify-center gap-1.5 bg-[#FAF8F2]/95 px-3 py-2.5 text-[10.5px] font-medium tracking-[0.15em] text-[#292D2C] uppercase backdrop-blur-md transition-colors hover:bg-[#FAF8F2] hover:text-[#345B59]"
          >
            <Eye className="h-3.5 w-3.5 stroke-[1.7]" />
            <span>Quick View</span>
          </button>
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex flex-1 items-center justify-center gap-1.5 bg-[#6F9290] px-3 py-2.5 text-[10.5px] font-medium tracking-[0.15em] text-[#FAF8F2] uppercase transition-colors hover:bg-[#345B59]"
          >
            <ShoppingBag className="h-3.5 w-3.5 stroke-[1.7]" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Product Typography & Metadata */}
      <div className={`flex flex-1 flex-col ${compact ? 'pt-3.5' : 'pt-4'}`}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-medium tracking-[0.2em] text-[#6F9290] uppercase">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-[11.5px] text-[#292D2C]/80">
            <Star className="h-3 w-3 fill-[#6F9290] text-[#6F9290]" />
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-[#292D2C]/45">({product.reviewCount})</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigateProduct(product.id)}
          className="mt-1.5 text-left font-editorial text-[21px] leading-[1.2] font-medium text-[#292D2C] transition-colors group-hover:text-[#345B59]"
        >
          {product.name}
        </button>

        {!compact && (
          <p className="mt-1 line-clamp-1 text-[12.5px] text-[#292D2C]/65">
            {product.subtitle}
          </p>
        )}

        {/* Bottom Price + Color Swatches Row */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[15px] font-semibold tracking-tight text-[#292D2C]">
              ${product.price.toFixed(0)}
            </span>
            {product.originalPrice && (
              <span className="text-[13px] text-[#292D2C]/45 line-through">
                ${product.originalPrice.toFixed(0)}
              </span>
            )}
          </div>

          {product.variants && product.variants.some((v) => v.swatchHex) && (
            <div className="flex items-center gap-1.5" aria-label="Available finishes">
              {product.variants.slice(0, 4).map((variant) =>
                variant.swatchHex ? (
                  <span
                    key={variant.id}
                    title={variant.label}
                    style={{ backgroundColor: variant.swatchHex }}
                    className="h-3 w-3 rounded-full ring-1 ring-[#292D2C]/20"
                  />
                ) : null
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};
