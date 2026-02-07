import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { mockProducts } from '../data/mockProducts';
import ProductCard from '../components/products/ProductCard';
import { Heart } from 'lucide-react';

export default function Wishlist() {
  const wishlistIds = useCartStore((s) => s.wishlist);

  const wishlistProducts = mockProducts.filter(p => wishlistIds.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="pk-container py-12">
        <div className="rounded-3xl border bg-card/70 p-12 text-center shadow-sm backdrop-blur pk-glass">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">Start adding items you love to your wishlist.</p>
          <Link
            to="/"
            className="pk-btn pk-btn-primary pk-btn-shine mt-6 h-11 px-8"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pk-container py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">My Wishlist</h1>
          <p className="mt-2 text-muted-foreground">{wishlistProducts.length} items saved for later</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
