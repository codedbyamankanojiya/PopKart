import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import CartDrawer from '../cart/CartDrawer';
import WishlistDrawer from '../wishlist/WishlistDrawer';
import { useUiStore } from '../../stores/uiStore';
import { Heart, Home, Search, ShoppingCart } from 'lucide-react';
import { scrollToId } from '../../lib/scroll';
import { cn } from '../../lib/utils';

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isCartOpen = useUiStore((s) => s.isCartOpen);
  const openCart = useUiStore((s) => s.openCart);
  const closeCart = useUiStore((s) => s.closeCart);
  const isWishlistOpen = useUiStore((s) => s.isWishlistOpen);
  const openWishlist = useUiStore((s) => s.openWishlist);
  const closeWishlist = useUiStore((s) => s.closeWishlist);

  return (
    <div className="min-h-dvh bg-background text-foreground pk-ambient pk-grid pk-surface pk-noise">
      <Navbar />
      <main key={location.pathname} className="pk-page pk-bottom-safe">
        <Outlet />
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/40 bg-background/80 px-2 py-2 backdrop-blur-xl md:hidden safe-area-bottom">
        <div className="mx-auto grid w-full max-w-md grid-cols-4 gap-1">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={cn(
              "pk-btn pk-btn-ghost h-12 w-full flex-col gap-1 rounded-2xl text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground",
              location.pathname === '/' && "text-primary bg-primary/5"
            )}
            aria-label="Go to top"
          >
            <Home className="h-5 w-5" />
            Home
          </button>
          <button
            type="button"
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/', { state: { scrollTo: 'shop' } });
                return;
              }
              scrollToId('shop');
            }}
            className="pk-btn pk-btn-ghost h-12 w-full flex-col gap-1 rounded-2xl text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Go to shop"
          >
            <Search className="h-5 w-5" />
            Shop
          </button>
          <button
            type="button"
            onClick={() => openCart()}
            className="pk-btn pk-btn-ghost h-12 w-full flex-col gap-1 rounded-2xl text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground relative"
            aria-label="Open cart"
          >
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {/* Cart badge handled in icon logic if needed, or we can add a dot here */}
            </div>
            Cart
          </button>
          <button
            type="button"
            onClick={() => navigate('/wishlist')}
            className={cn(
              "pk-btn pk-btn-ghost h-12 w-full flex-col gap-1 rounded-2xl text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground",
              location.pathname === '/wishlist' && "text-primary bg-primary/5"
            )}
            aria-label="Open wishlist"
          >
            <Heart className="h-5 w-5" />
            Wishlist
          </button>
        </div>
      </div>

      <CartDrawer open={isCartOpen} onOpenChange={(open) => (open ? openCart() : closeCart())} />
      <WishlistDrawer open={isWishlistOpen} onOpenChange={(open) => (open ? openWishlist() : closeWishlist())} />
    </div>
  );
}
