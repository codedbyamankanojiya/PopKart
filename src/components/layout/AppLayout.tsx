import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import WishlistDrawer from '../wishlist/WishlistDrawer';
import { useUiStore } from '../../stores/uiStore';
import { Heart, Home, ShoppingCart } from 'lucide-react';

import Footer from './Footer';

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isWishlistOpen = useUiStore((s) => s.isWishlistOpen);
  const openWishlist = useUiStore((s) => s.openWishlist);
  const closeWishlist = useUiStore((s) => s.closeWishlist);

  return (
    <div className="min-h-dvh bg-background text-foreground pk-ambient pk-grid pk-surface pk-noise">
      <Navbar />
      <main key={location.pathname} className="pk-page pk-bottom-safe">
        <Outlet />
      </main>
      <Footer />

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/85 px-4 py-2 backdrop-blur md:hidden">

        <div className="mx-auto grid w-full max-w-[92rem] grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="pk-btn pk-btn-outline h-11 w-full flex-col gap-1 text-[11px]"
            aria-label="Go to top"
          >
            <Home className="h-4 w-4" />
            Home
          </button>

          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="pk-btn pk-btn-primary pk-btn-shine h-11 w-full flex-col gap-1 text-[11px]"
            aria-label="Go to cart"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
          </button>
          <button
            type="button"
            onClick={() => navigate('/wishlist')}
            className="pk-btn pk-btn-outline h-11 w-full flex-col gap-1 text-[11px]"
            aria-label="Open wishlist"
          >
            <Heart className="h-4 w-4" />
            Wishlist
          </button>
        </div>
      </div>

      <WishlistDrawer open={isWishlistOpen} onOpenChange={(open) => (open ? openWishlist() : closeWishlist())} />
    </div>
  );
}
