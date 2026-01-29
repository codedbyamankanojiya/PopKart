import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { mockProducts } from '../data/mockProducts';
import ProductCard from '../components/products/ProductCard';
import { useCartStore } from '../stores/cartStore';

export default function Wishlist() {
  const wishlistIds = useCartStore((s) => s.wishlist);
  const removeFromWishlist = useCartStore((s) => s.removeFromWishlist);
  const clearWishlist = useCartStore((s) => s.clearWishlist);
  const addToCart = useCartStore((s) => s.addToCart);

  const products = useMemo(() => {
    const set = new Set(wishlistIds);
    return mockProducts.filter((p) => set.has(p.id));
  }, [wishlistIds]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Wishlist</h1>
          <p className="mt-1 text-sm text-muted-foreground">Saved items you can buy later.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/" className="pk-btn pk-btn-outline h-10 px-4 text-sm">
            Continue shopping
          </Link>
          <button
            type="button"
            disabled={products.length === 0}
            onClick={() => {
              clearWishlist();
              toast('Wishlist cleared');
            }}
            className="pk-btn pk-btn-outline h-10 px-4 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mt-6 pk-section p-6">
          <div className="flex items-start gap-3">
            <div className="pk-btn pk-btn-outline h-10 w-10 rounded-full">
              <Heart className="h-4 w-4" />
            </div>
            <div>
              <div className="text-base font-semibold">Your wishlist is empty</div>
              <p className="mt-1 text-sm text-muted-foreground">Browse products and tap the heart to save items.</p>
              <Link to="/" className="pk-btn pk-btn-primary pk-btn-shine mt-4 h-10 px-4 text-sm">
                Explore products
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 pk-section p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product);
                      toast('Added to cart');
                    }}
                    className="pk-btn pk-btn-primary pk-btn-shine h-10 flex-1 px-4 text-sm"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      removeFromWishlist(product.id);
                      toast('Removed from wishlist');
                    }}
                    className="pk-btn pk-btn-outline h-10 px-4 text-sm"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
