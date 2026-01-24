import { useState, type SyntheticEvent } from 'react';
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

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const badge = (() => {
    if (!product.inStock) return { text: 'Out of Stock', className: 'bg-destructive text-destructive-foreground' };
    if (product.rating >= 4.8 && product.reviews >= 500)
      return { text: 'Best Seller', className: 'bg-primary text-primary-foreground' };
    if (product.rating >= 4.7 && product.reviews >= 100)
      return { text: 'New', className: 'bg-emerald-500 text-white' };
    return null;
  })();

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    const fallbacks = [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80',
      'https://via.placeholder.com/800x600/111827/ffffff?text=Product+Image',
    ];

    const currentSrc = target.currentSrc || target.src;
    const idx = fallbacks.findIndex((u) => currentSrc.includes(u));
    const next = idx >= 0 ? fallbacks[idx + 1] : fallbacks[0];
    if (next) target.src = next;
  };

  const withWidth = (url: string, w: number) => {
    const joiner = url.includes('?') ? '&' : '?';
    return `${url}${joiner}w=${w}`;
  };

  const srcSet = `${withWidth(product.image, 400)} 400w, ${withWidth(product.image, 800)} 800w, ${withWidth(product.image, 1200)} 1200w`;
  const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-0 transition duration-300 group-hover:opacity-100" />
        {!isImgLoaded && <div className="absolute inset-0 pk-shimmer" />}
        {badge && (
          <div className="absolute left-3 top-3 z-10">
            <span className={cn('inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold', badge.className)}>
              {badge.text}
            </span>
          </div>
        )}
        <img
          src={product.image}
          srcSet={srcSet}
          sizes={sizes}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={handleImgError}
          onLoad={() => setIsImgLoaded(true)}
          className={cn(
            'h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]',
            !isImgLoaded && 'opacity-0',
            isImgLoaded && 'opacity-100'
          )}
        />
        <button
          type="button"
          onClick={() => {
            toggleWishlist(product.id);
            toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={cn(
            'absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/80 backdrop-blur transition hover:bg-background active:scale-[0.98]',
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
            'mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60',
          )}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </button>
      </div>
    </div>
  );
}
