import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Check,
  Ruler,
  Droplets,
  Cpu,
  Shirt,
  Gem,
} from 'lucide-react';
import { getProductById, PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

interface ProductDetailViewProps {
  productId: string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ productId }) => {
  const {
    navigateHome,
    navigateShop,
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useStore();

  const product = getProductById(productId) ?? PRODUCTS[0];
  const saved = isWishlisted(product.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants?.[0]?.label ?? ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[1] ?? product.sizes?.[0] ?? ''
  );
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Reset local selectors when switching between products
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedVariant(product.variants?.[0]?.label ?? '');
    setSelectedSize(product.sizes?.[1] ?? product.sizes?.[0] ?? '');
    setQuantity(1);
    setShowSizeGuide(false);
    setJustAdded(false);
  }, [product]);

  const activeVariantObj = product.variants?.find((v) => v.label === selectedVariant);
  const unitPrice = product.price + (activeVariantObj?.priceDelta ?? 0);
  const adjustedOriginalPrice = product.originalPrice
    ? product.originalPrice + (activeVariantObj?.priceDelta ?? 0)
    : undefined;

  const relatedProducts = useMemo(() => {
    const sameCat = PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
    const others = PRODUCTS.filter(
      (p) => p.category !== product.category && p.isFeatured
    );
    return [...sameCat, ...others].slice(0, 4);
  }, [product]);

  const handleAddToBag = () => {
    addToCart(product, {
      quantity,
      variantLabel: selectedVariant || undefined,
      size: selectedSize || undefined,
      openDrawer: true,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pb-24"
    >
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-[#DCD2C3]/70 bg-[#FAF8F2]/80">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
          <nav className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.18em] text-[#292D2C]/55 uppercase">
            <button
              type="button"
              onClick={navigateHome}
              className="transition-colors hover:text-[#345B59]"
            >
              Home
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => navigateShop(product.category)}
              className="transition-colors hover:text-[#345B59]"
            >
              {product.category}
            </button>
            <span>/</span>
            <span className="text-[#292D2C]">{product.name}</span>
          </nav>

          <button
            type="button"
            onClick={() => navigateShop(product.category)}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] text-[#345B59] uppercase transition-colors hover:text-[#292D2C]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to {product.category}</span>
          </button>
        </div>
      </div>

      {/* Main Product Showcase Split */}
      <section className="mx-auto max-w-[1440px] px-5 pt-10 sm:px-8 lg:px-12 lg:pt-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: Large Interactive Product Gallery */}
          <div className="lg:col-span-7">
            <div className="flex flex-col-reverse gap-4 sm:flex-row">
              {/* Thumbnail Strip */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto sm:w-22 sm:shrink-0 sm:flex-col">
                  {product.images.map((img, idx) => {
                    const active = idx === activeImageIndex;
                    return (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-[#E7DFD2] transition-all sm:w-full ${
                          active
                            ? 'ring-2 ring-[#345B59] ring-offset-2 ring-offset-[#F4EFE5]'
                            : 'opacity-70 ring-1 ring-[#DCD2C3] hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} view ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Primary Framed Canvas */}
              <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-[2px] bg-[#E8E0D2] ring-1 ring-[#DCD2C3]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={product.images[activeImageIndex]}
                    src={product.images[activeImageIndex]}
                    alt={product.name}
                    initial={{ opacity: 0.3, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.3 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-104"
                  />
                </AnimatePresence>

                {product.badge && (
                  <span className="absolute top-4 left-4 bg-[#FAF8F2]/92 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-[#345B59] uppercase backdrop-blur-md">
                    {product.badge}
                  </span>
                )}

                {product.images.length > 1 && (
                  <div className="absolute right-4 bottom-4 bg-[#292D2C]/60 px-3 py-1 text-[10.5px] font-medium tracking-[0.14em] text-[#FAF8F2] backdrop-blur-md">
                    {activeImageIndex + 1} / {product.images.length}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Sticky Product Purchase Column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-[13px] text-[#292D2C]">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.round(product.rating)
                            ? 'fill-[#6F9290] text-[#6F9290]'
                            : 'text-[#DCD2C3]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{product.rating.toFixed(1)}</span>
                  <span className="text-[#292D2C]/50">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="mt-3 font-editorial text-4xl leading-[1.08] font-normal text-[#292D2C] sm:text-[44px]">
                {product.name}
              </h1>
              <p className="mt-2 text-[14px] text-[#292D2C]/65">{product.subtitle}</p>

              {/* Price Display */}
              <div className="mt-6 flex items-baseline gap-3 border-b border-[#DCD2C3]/80 pb-6">
                <span className="text-2xl font-semibold tracking-tight text-[#292D2C]">
                  ${unitPrice.toFixed(2)}
                </span>
                {adjustedOriginalPrice && (
                  <>
                    <span className="text-base text-[#292D2C]/45 line-through">
                      ${adjustedOriginalPrice.toFixed(2)}
                    </span>
                    <span className="bg-[#345B59]/12 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.12em] text-[#345B59] uppercase">
                      Save ${(adjustedOriginalPrice - unitPrice).toFixed(0)}
                    </span>
                  </>
                )}
              </div>

              {/* Editorial Description */}
              <p className="mt-6 text-[15px] leading-[1.78] text-[#292D2C]/80">
                {product.description}
              </p>

              {/* Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-[#292D2C]/70 uppercase">
                      {product.variantLabel ?? 'Option'}:{' '}
                      <span className="text-[#292D2C]">{selectedVariant}</span>
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {product.variants.map((variant) => {
                      const active = selectedVariant === variant.label;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => setSelectedVariant(variant.label)}
                          className={`inline-flex items-center gap-2.5 border px-4 py-2.5 text-[12.5px] font-medium transition-all ${
                            active
                              ? 'border-[#345B59] bg-[#345B59] text-[#FAF8F2]'
                              : 'border-[#DCD2C3] bg-[#FAF8F2] text-[#292D2C] hover:border-[#6F9290]'
                          }`}
                        >
                          {variant.swatchHex && (
                            <span
                              style={{ backgroundColor: variant.swatchHex }}
                              className="h-3.5 w-3.5 rounded-full ring-1 ring-black/20"
                            />
                          )}
                          <span>{variant.label}</span>
                          {variant.priceDelta ? (
                            <span
                              className={`text-[11px] ${
                                active ? 'text-[#DCD2C3]' : 'text-[#292D2C]/50'
                              }`}
                            >
                              +${variant.priceDelta}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Apparel Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-[#292D2C]/70 uppercase">
                      Size: <span className="text-[#292D2C]">{selectedSize}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowSizeGuide((v) => !v)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.14em] text-[#6F9290] uppercase underline underline-offset-4 hover:text-[#345B59]"
                    >
                      <Ruler className="h-3.5 w-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>

                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {product.sizes.map((size) => {
                      const active = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`border py-2.5 text-center text-[13px] font-medium transition-all ${
                            active
                              ? 'border-[#345B59] bg-[#345B59] text-[#FAF8F2]'
                              : 'border-[#DCD2C3] bg-[#FAF8F2] text-[#292D2C] hover:border-[#6F9290]'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {showSizeGuide && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 overflow-hidden border border-[#DCD2C3] bg-[#FAF8F2] p-4 text-[12px] text-[#292D2C]/80"
                      >
                        <p className="font-semibold tracking-[0.12em] text-[#345B59] uppercase">
                          Measurements (Inches)
                        </p>
                        <div className="mt-2.5 grid grid-cols-4 gap-2 border-b border-[#DCD2C3]/60 pb-1.5 font-semibold">
                          <span>Size</span>
                          <span>Chest</span>
                          <span>Waist</span>
                          <span>Length</span>
                        </div>
                        {[
                          ['XS', '34–36', '26–28', '23.5'],
                          ['S', '36–38', '28–30', '24.5'],
                          ['M', '38–40', '30–32', '25.5'],
                          ['L', '40–43', '32–35', '26.5'],
                          ['XL', '43–46', '35–38', '27.5'],
                        ].map((row) => (
                          <div key={row[0]} className="grid grid-cols-4 gap-2 py-1">
                            <span className="font-medium">{row[0]}</span>
                            <span>{row[1]}</span>
                            <span>{row[2]}</span>
                            <span>{row[3]}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Quantity & Purchase Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {/* Quantity Stepper */}
                <div className="flex items-center justify-between border border-[#DCD2C3] bg-[#FAF8F2] px-2 sm:w-32">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-12 w-9 items-center justify-center text-[#292D2C] transition-colors hover:text-[#345B59]"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[14px] font-semibold text-[#292D2C]">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-12 w-9 items-center justify-center text-[#292D2C] transition-colors hover:text-[#345B59]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={handleAddToBag}
                  className="flex flex-1 items-center justify-center gap-2.5 bg-[#6F9290] px-7 py-4 text-[11.5px] font-semibold tracking-[0.22em] text-[#FAF8F2] uppercase transition-all duration-300 hover:bg-[#345B59]"
                >
                  {justAdded ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Bag — ${(unitPrice * quantity).toFixed(0)}</span>
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  type="button"
                  aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                  onClick={() => toggleWishlist(product)}
                  className={`flex h-[52px] items-center justify-center gap-2 border px-4 transition-colors sm:w-[52px] sm:px-0 ${
                    saved
                      ? 'border-[#345B59] bg-[#345B59]/10 text-[#345B59]'
                      : 'border-[#DCD2C3] bg-[#FAF8F2] text-[#292D2C] hover:border-[#6F9290]'
                  }`}
                >
                  <Heart className={`h-4.5 w-4.5 ${saved ? 'fill-[#6F9290] text-[#6F9290]' : ''}`} />
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase sm:hidden">
                    {saved ? 'Saved' : 'Save'}
                  </span>
                </button>
              </div>

              {/* Retail Trust Promises */}
              <div className="mt-8 grid grid-cols-1 gap-3 border-t border-[#DCD2C3]/80 pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-2.5 text-[12px] text-[#292D2C]/75">
                  <Truck className="h-4 w-4 shrink-0 text-[#6F9290]" />
                  <span>Free shipping $150+</span>
                </div>
                <div className="flex items-center gap-2.5 text-[12px] text-[#292D2C]/75">
                  <RotateCcw className="h-4 w-4 shrink-0 text-[#6F9290]" />
                  <span>30-day easy returns</span>
                </div>
                <div className="flex items-center gap-2.5 text-[12px] text-[#292D2C]/75">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[#6F9290]" />
                  <span>Authenticity guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category-Specific Deep Editorial Specification Panel */}
      <section className="mx-auto mt-16 max-w-[1440px] px-5 sm:px-8 lg:mt-24 lg:px-12">
        <div className="border border-[#DCD2C3] bg-[#FAF8F2] p-7 sm:p-10 lg:p-14">
          {/* FRAGRANCES: Scent Notes & Fragrance Details */}
          {product.fragranceDetails && (
            <div>
              <div className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
                <Droplets className="h-4 w-4" />
                <span>Olfactory Architecture &amp; Fragrance Details</span>
              </div>
              <h2 className="mt-2.5 font-editorial text-3xl font-light text-[#292D2C] sm:text-4xl">
                Scent Pyramid &amp; Composition
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  {
                    tier: 'Top Notes',
                    desc: 'First luminous impression',
                    notes: product.fragranceDetails.topNotes,
                  },
                  {
                    tier: 'Heart Notes',
                    desc: 'The unfolding signature core',
                    notes: product.fragranceDetails.heartNotes,
                  },
                  {
                    tier: 'Base Notes',
                    desc: 'Skin-warm lingering drydown',
                    notes: product.fragranceDetails.baseNotes,
                  },
                ].map((layer) => (
                  <div
                    key={layer.tier}
                    className="border border-[#DCD2C3]/80 bg-[#F4EFE5]/70 p-6"
                  >
                    <p className="text-[10.5px] font-semibold tracking-[0.22em] text-[#345B59] uppercase">
                      {layer.tier}
                    </p>
                    <p className="mt-1 text-[12px] text-[#292D2C]/55">{layer.desc}</p>
                    <ul className="mt-4 space-y-2">
                      {layer.notes.map((note) => (
                        <li
                          key={note}
                          className="flex items-center gap-2.5 font-editorial text-[21px] text-[#292D2C]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#6F9290]" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 border-t border-[#DCD2C3] pt-8 md:grid-cols-12">
                <div className="space-y-4 md:col-span-5">
                  <div>
                    <p className="text-[10.5px] font-semibold tracking-[0.2em] text-[#6F9290] uppercase">
                      Concentration
                    </p>
                    <p className="mt-1 text-[14.5px] font-medium text-[#292D2C]">
                      {product.fragranceDetails.concentration}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10.5px] font-semibold tracking-[0.2em] text-[#6F9290] uppercase">
                      Profile
                    </p>
                    <p className="mt-1 text-[14.5px] font-medium text-[#292D2C]">
                      {product.fragranceDetails.genderProfile}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 md:col-span-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.18em] text-[#292D2C]/75 uppercase">
                      <span>Longevity</span>
                      <span>{product.fragranceDetails.longevity}/5</span>
                    </div>
                    <div className="mt-2 flex gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 flex-1 ${
                            i < product.fragranceDetails!.longevity
                              ? 'bg-[#345B59]'
                              : 'bg-[#DCD2C3]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.18em] text-[#292D2C]/75 uppercase">
                      <span>Sillage / Trail</span>
                      <span>{product.fragranceDetails.sillage}/5</span>
                    </div>
                    <div className="mt-2 flex gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 flex-1 ${
                            i < product.fragranceDetails!.sillage
                              ? 'bg-[#6F9290]'
                              : 'bg-[#DCD2C3]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-l-2 border-[#6F9290] pl-5 md:col-span-4">
                  <p className="text-[10.5px] font-semibold tracking-[0.2em] text-[#6F9290] uppercase">
                    Perfumer&apos;s Note
                  </p>
                  <p className="mt-2 font-editorial text-[21px] leading-snug italic text-[#292D2C]">
                    &ldquo;{product.fragranceDetails.perfumerNote}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ELECTRONICS: Technical Specifications & Product Features */}
          {product.electronicsDetails && (
            <div>
              <div className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
                <Cpu className="h-4 w-4" />
                <span>Engineering &amp; Specifications</span>
              </div>
              <h2 className="mt-2.5 font-editorial text-3xl font-light text-[#292D2C] sm:text-4xl">
                Technical Specifications &amp; Features
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
                {/* Specs Grid */}
                <div className="lg:col-span-7">
                  <div className="divide-y divide-[#DCD2C3]/80 border-y border-[#DCD2C3]/80">
                    {product.electronicsDetails.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-12 sm:gap-4"
                      >
                        <span className="text-[11.5px] font-semibold tracking-[0.16em] text-[#6F9290] uppercase sm:col-span-4">
                          {spec.label}
                        </span>
                        <span className="text-[14px] font-medium text-[#292D2C] sm:col-span-8">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features & In The Box */}
                <div className="space-y-7 lg:col-span-5">
                  <div>
                    <h3 className="font-sans text-[11px] font-semibold tracking-[0.22em] text-[#345B59] uppercase">
                      Signature Features
                    </h3>
                    <ul className="mt-3.5 space-y-2.5">
                      {product.electronicsDetails.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[#292D2C]/80"
                        >
                          <Check className="mt-1 h-4 w-4 shrink-0 text-[#6F9290]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border border-[#DCD2C3] bg-[#F4EFE5]/70 p-5">
                    <h3 className="font-sans text-[11px] font-semibold tracking-[0.22em] text-[#345B59] uppercase">
                      In The Box
                    </h3>
                    <ul className="mt-3 space-y-1.5 text-[13.5px] text-[#292D2C]/75">
                      {product.electronicsDetails.inTheBox.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                    <p className="mt-4 border-t border-[#DCD2C3] pt-3 text-[12px] font-medium text-[#345B59]">
                      {product.electronicsDetails.warranty}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FASHION / APPAREL: Sizes, Material & Fit Information */}
          {product.apparelDetails && (
            <div>
              <div className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
                <Shirt className="h-4 w-4" />
                <span>Atelier Fabric &amp; Tailoring</span>
              </div>
              <h2 className="mt-2.5 font-editorial text-3xl font-light text-[#292D2C] sm:text-4xl">
                Material, Fit &amp; Garment Care
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="border border-[#DCD2C3]/80 bg-[#F4EFE5]/70 p-6">
                  <p className="text-[10.5px] font-semibold tracking-[0.22em] text-[#345B59] uppercase">
                    Material &amp; Yarn
                  </p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#292D2C]">
                    {product.apparelDetails.material}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {product.apparelDetails.sizes.map((s) => (
                      <span
                        key={s}
                        className="border border-[#DCD2C3] bg-[#FAF8F2] px-2.5 py-1 text-[11px] font-medium text-[#292D2C]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-[#DCD2C3]/80 bg-[#F4EFE5]/70 p-6">
                  <p className="text-[10.5px] font-semibold tracking-[0.22em] text-[#345B59] uppercase">
                    Fit &amp; Silhouette
                  </p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[#292D2C]">
                    {product.apparelDetails.fit}
                  </p>
                  <p className="mt-4 border-t border-[#DCD2C3] pt-3 text-[13px] italic text-[#292D2C]/65">
                    {product.apparelDetails.modelInfo}
                  </p>
                </div>

                <div className="border border-[#DCD2C3]/80 bg-[#F4EFE5]/70 p-6">
                  <p className="text-[10.5px] font-semibold tracking-[0.22em] text-[#345B59] uppercase">
                    Garment Care
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {product.apparelDetails.care.map((step) => (
                      <li
                        key={step}
                        className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-[#292D2C]/80"
                      >
                        <Sparkles className="mt-1 h-3.5 w-3.5 shrink-0 text-[#6F9290]" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ACCESSORIES: Craftsmanship & Dimensions */}
          {product.accessoriesDetails && (
            <div>
              <div className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
                <Gem className="h-4 w-4" />
                <span>Craftsmanship &amp; Details</span>
              </div>
              <h2 className="mt-2.5 font-editorial text-3xl font-light text-[#292D2C] sm:text-4xl">
                Materials, Dimensions &amp; Design
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="space-y-5 lg:col-span-6">
                  <div className="border-b border-[#DCD2C3]/80 pb-4">
                    <p className="text-[10.5px] font-semibold tracking-[0.22em] text-[#6F9290] uppercase">
                      Primary Materials
                    </p>
                    <p className="mt-1.5 text-[15px] text-[#292D2C]">
                      {product.accessoriesDetails.material}
                    </p>
                  </div>
                  <div className="border-b border-[#DCD2C3]/80 pb-4">
                    <p className="text-[10.5px] font-semibold tracking-[0.22em] text-[#6F9290] uppercase">
                      Dimensions
                    </p>
                    <p className="mt-1.5 text-[15px] text-[#292D2C]">
                      {product.accessoriesDetails.dimensions}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10.5px] font-semibold tracking-[0.22em] text-[#6F9290] uppercase">
                      Atelier Provenance
                    </p>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-[#292D2C]/78">
                      {product.accessoriesDetails.craftsmanship}
                    </p>
                  </div>
                </div>

                <div className="border border-[#DCD2C3] bg-[#F4EFE5]/70 p-6 lg:col-span-6">
                  <p className="text-[10.5px] font-semibold tracking-[0.22em] text-[#345B59] uppercase">
                    Thoughtful Features
                  </p>
                  <ul className="mt-4 space-y-3">
                    {product.accessoriesDetails.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[#292D2C]/80"
                      >
                        <Check className="mt-1 h-4 w-4 shrink-0 text-[#6F9290]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Shelf */}
      <section className="mx-auto mt-20 max-w-[1440px] px-5 sm:px-8 lg:mt-28 lg:px-12">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.26em] text-[#6F9290] uppercase">
              Pair It With
            </p>
            <h2 className="mt-2 font-editorial text-3xl font-light text-[#292D2C] sm:text-4xl">
              You May Also Love
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((rel, idx) => (
            <ProductCard key={rel.id} product={rel} index={idx} />
          ))}
        </div>
      </section>
    </motion.div>
  );
};
