import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import WishlistDrawer from '../wishlist/WishlistDrawer';
import { useUiStore } from '../../stores/uiStore';


import Footer from './Footer';

export default function AppLayout() {
  const location = useLocation();

  const isWishlistOpen = useUiStore((s) => s.isWishlistOpen);
  const openWishlist = useUiStore((s) => s.openWishlist);
  const closeWishlist = useUiStore((s) => s.closeWishlist);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground pk-ambient pk-surface pk-noise">
      <Navbar />
      <main key={location.pathname} className="pk-page flex-1 flex flex-col w-full">
        <Outlet />
      </main>
      <Footer />

      <WishlistDrawer open={isWishlistOpen} onOpenChange={(open) => (open ? openWishlist() : closeWishlist())} />
    </div>
  );
}
