import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FeaturedProducts } from './components/FeaturedProducts';
import { FashionSplitBanner, FragranceCampaignBanner } from './components/EditorialPromos';
import { NewArrivalsCarousel } from './components/NewArrivalsCarousel';
import { BrandStorySection, NewsletterSection } from './components/BrandStoryAndNewsletter';
import { ShopCatalogView } from './components/ShopCatalogView';
import { ProductDetailView } from './components/ProductDetailView';
import { WishlistView } from './components/WishlistView';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { QuickViewModal } from './components/QuickViewModal';
import { InfoModals } from './components/InfoModals';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';

const StorefrontContent: React.FC = () => {
  const { view } = useStore();

  return (
    <div className="flex min-h-screen flex-col bg-[#F4EFE5] text-[#292D2C]">
      <Header />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {view.page === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <HeroSection />
              <CategoryShowcase />
              <FeaturedProducts />
              <FashionSplitBanner />
              <NewArrivalsCarousel />
              <FragranceCampaignBanner />
              <BrandStorySection />
              <NewsletterSection />
            </motion.div>
          )}

          {view.page === 'shop' && (
            <motion.div
              key={`shop-${view.category}-${view.preset ?? 'all'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ShopCatalogView initialCategory={view.category} preset={view.preset} />
              <NewsletterSection />
            </motion.div>
          )}

          {view.page === 'product' && (
            <motion.div
              key={`product-${view.productId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductDetailView productId={view.productId} />
              <NewsletterSection />
            </motion.div>
          )}

          {view.page === 'wishlist' && (
            <motion.div
              key="wishlist-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <WishlistView />
              <NewsletterSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Global Interactive Overlays & Drawers */}
      <CartDrawer />
      <SearchOverlay />
      <QuickViewModal />
      <InfoModals />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <StorefrontContent />
    </StoreProvider>
  );
}

export default App;
