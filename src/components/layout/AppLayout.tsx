import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import CartDrawer from '../cart/CartDrawer';
import WishlistDrawer from '../wishlist/WishlistDrawer';
import { useUiStore } from '../../stores/uiStore';

export default function AppLayout() {
  const isCartOpen = useUiStore((s) => s.isCartOpen);
  const openCart = useUiStore((s) => s.openCart);
  const closeCart = useUiStore((s) => s.closeCart);
  const isWishlistOpen = useUiStore((s) => s.isWishlistOpen);
  const openWishlist = useUiStore((s) => s.openWishlist);
  const closeWishlist = useUiStore((s) => s.closeWishlist);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <main>
        <Outlet />
      </main>

      <CartDrawer open={isCartOpen} onOpenChange={(open) => (open ? openCart() : closeCart())} />
      <WishlistDrawer open={isWishlistOpen} onOpenChange={(open) => (open ? openWishlist() : closeWishlist())} />
    </div>
  );
}
