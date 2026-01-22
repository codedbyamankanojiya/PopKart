import { Heart, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';
import { formatPriceINR } from '../../lib/format';
import { cn } from '../../lib/utils';
import { useCartStore } from '../../stores/cartStore';
import type { Product } from '../../types/product';

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const wishlist = useCartStore((s) => s.wishlist);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <button
          type="button"
          onClick={() => {
            toggleWishlist(product.id);
            toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={cn(
            'absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/80 backdrop-blur transition hover:bg-background',
            isWishlisted && 'border-primary text-primary'
          )}
        >
          <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
        </button>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug">{product.name}</h3>
          <div className="shrink-0 text-sm font-semibold text-primary">{formatPriceINR(product.price)}</div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
            <span>({product.reviews})</span>
          </div>
          {!product.inStock && <span className="rounded-full bg-destructive/10 px-2 py-1 text-destructive">Out of stock</span>}
        </div>

        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => {
            if (!product.inStock) return;
            addToCart(product);
            toast('Added to cart');
          }}
          className={cn(
            'mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60',
          )}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </button>
      </div>
    </div>
  );
}
