import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

export const WishlistView: React.FC = () => {
  const {
    wishlistProducts,
    toggleWishlist,
    addToCart,
    navigateProduct,
    navigateShop,
    setCartOpen,
  } = useStore();

  const handleMoveAllToBag = () => {
    wishlistProducts.forEach((product) => {
      addToCart(product, { quantity: 1 });
    });
    setCartOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pb-24"
    >
      {/* Header */}
      <section className="border-b border-[#DCD2C3] bg-[#FAF8F2]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-5 py-12 sm:flex-row sm:items-end sm:px-8 lg:px-12 lg:py-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
              Personal Curation
            </p>
            <h1 className="mt-2.5 font-editorial text-4xl font-light text-[#292D2C] sm:text-5xl">
              Saved Wishlist
            </h1>
            <p className="mt-3 text-[14.5px] text-[#292D2C]/65">
              {wishlistProducts.length > 0
                ? `${wishlistProducts.length} thoughtfully saved ${
                    wishlistProducts.length === 1 ? 'piece' : 'pieces'
                  } waiting for you.`
                : 'Collect the pieces that catch your eye and revisit them anytime.'}
            </p>
          </div>

          {wishlistProducts.length > 0 && (
            <button
              type="button"
              onClick={handleMoveAllToBag}
              className="inline-flex items-center gap-2.5 self-start bg-[#6F9290] px-7 py-3.5 text-[11px] font-semibold tracking-[0.2em] text-[#FAF8F2] uppercase transition-colors hover:bg-[#345B59] sm:self-auto"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Add All to Bag</span>
            </button>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-5 pt-12 sm:px-8 lg:px-12">
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wishlistProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="flex flex-col border border-[#DCD2C3] bg-[#FAF8F2]"
              >
                <div
                  onClick={() => navigateProduct(product.id)}
                  className="group relative aspect-[4/5] cursor-pointer overflow-hidden bg-[#E7DFD2]"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    aria-label="Remove from wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF8F2]/90 text-[#292D2C]/70 backdrop-blur-md transition-colors hover:bg-[#FAF8F2] hover:text-[#9F4B43]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[#6F9290] uppercase">
                    {product.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => navigateProduct(product.id)}
                    className="mt-1 text-left font-editorial text-[22px] leading-snug text-[#292D2C] transition-colors hover:text-[#345B59]"
                  >
                    {product.name}
                  </button>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-[15px] font-semibold text-[#292D2C]">
                      ${product.price.toFixed(0)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[13px] text-[#292D2C]/45 line-through">
                        ${product.originalPrice.toFixed(0)}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-5">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(product, { quantity: 1, openDrawer: true });
                      }}
                      className="flex w-full items-center justify-center gap-2 bg-[#6F9290] py-3 text-[11px] font-semibold tracking-[0.18em] text-[#FAF8F2] uppercase transition-colors hover:bg-[#345B59]"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-[#DCD2C3] bg-[#FAF8F2] px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4EFE5] text-[#6F9290]">
              <Heart className="h-6 w-6 stroke-[1.5]" />
            </div>
            <h2 className="mt-6 font-editorial text-3xl font-light text-[#292D2C]">
              Your wishlist is currently quiet
            </h2>
            <p className="mx-auto mt-2.5 max-w-md text-[14.5px] text-[#292D2C]/65">
              Tap the heart icon on any fragrance, knit, gadget, or accessory to curate your
              personal favorites here.
            </p>
            <button
              type="button"
              onClick={() => navigateShop('all')}
              className="mt-8 inline-flex items-center gap-2.5 bg-[#6F9290] px-8 py-4 text-[11.5px] font-semibold tracking-[0.22em] text-[#FAF8F2] uppercase transition-colors hover:bg-[#345B59]"
            >
              <span>Explore Collection</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Curated Recommendations Below */}
        <div className="mt-20 border-t border-[#DCD2C3] pt-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
                Curated For You
              </p>
              <h2 className="mt-2 font-editorial text-3xl font-light text-[#292D2C] sm:text-4xl">
                Popular Everyday Finds
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.filter((p) => p.isBestSeller)
              .slice(0, 4)
              .map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
