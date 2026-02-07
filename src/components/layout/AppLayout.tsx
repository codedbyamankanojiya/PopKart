import { Outlet } from 'react-router-dom';
import AmazonHeader from '../AmazonHeader';
import CartDrawer from '../cart/CartDrawer';
import WishlistDrawer from '../wishlist/WishlistDrawer';
import { useUiStore } from '../../stores/uiStore';
import { ScrollRestoration } from 'react-router-dom';

export default function AppLayout() {
  const isCartOpen = useUiStore((s) => s.isCartOpen);
  const openCart = useUiStore((s) => s.openCart);
  const closeCart = useUiStore((s) => s.closeCart);
  const isWishlistOpen = useUiStore((s) => s.isWishlistOpen);
  const openWishlist = useUiStore((s) => s.openWishlist);
  const closeWishlist = useUiStore((s) => s.closeWishlist);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-[#febd69] selection:text-black flex flex-col">
      <ScrollRestoration />

      <AmazonHeader />

      <main className="flex-1 w-full bg-[#eaeded] pb-10">
        <Outlet />
      </main>

      <CartDrawer open={isCartOpen} onOpenChange={(open) => (open ? openCart() : closeCart())} />
      <WishlistDrawer open={isWishlistOpen} onOpenChange={(open) => (open ? openWishlist() : closeWishlist())} />
    </div>
  );
}
