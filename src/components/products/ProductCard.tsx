import { useState, type SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';
import { formatPriceINR } from '../../lib/format';
import { cn } from '../../lib/utils';
import { useCartStore } from '../../stores/cartStore';
import type { Product } from '../../types/product';
import { categoryImages } from '../../data/mockProducts';

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
      categoryImages[product.category],
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80',
      'https://via.placeholder.com/800x600/111827/ffffff?text=Product+Image',
    ];

    const currentSrc = target.currentSrc || target.src;
    const idx = fallbacks.findIndex((u) => currentSrc.includes(u));
    const next = idx >= 0 ? fallbacks[idx + 1] : fallbacks[0];
    if (next) {
      target.srcset = '';
      target.src = next;
    }
  };

  const withWidth = (url: string, w: number) => {
    try {
      const u = new URL(url);
      u.searchParams.set('w', String(w));
      return u.toString();
    } catch {
      const hasW = /([?&])w=\d+/i.test(url);
      if (hasW) return url.replace(/([?&])w=\d+/i, `$1w=${w}`);
      const joiner = url.includes('?') ? '&' : '?';
      return `${url}${joiner}w=${w}`;
    }
  };

  const srcSet = `${withWidth(product.image, 400)} 400w, ${withWidth(product.image, 800)} 800w, ${withWidth(product.image, 1200)} 1200w`;
  const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-transparent bg-card/80 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/10 dark:hover:border-white/10 pk-glass">
      <Link
        to={`/product/${product.id}`}
        aria-label={`View details for ${product.name}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-muted"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {!isImgLoaded && <div className="absolute inset-0 pk-shimmer" />}
        {badge && (
          <div className="absolute left-3 top-3 z-10">
            <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md', badge.className)}>
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
            'h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110',
            !isImgLoaded && 'opacity-0',
            isImgLoaded && 'opacity-100'
          )}
        />
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
          toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
        }}
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className={cn(
          'pk-btn pk-btn-ghost absolute right-3 top-3 h-10 w-10 rounded-full bg-black/20 text-white backdrop-blur-md hover:bg-black/40 hover:text-white',
          isWishlisted && 'bg-primary text-primary-foreground hover:bg-primary/90'
        )}
      >
        <Heart className={cn('h-5 w-5 transition-transform duration-300', isWishlisted && 'fill-current scale-110')} />
      </button>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <Link
              to={`/product/${product.id}`}
              className="line-clamp-2 text-sm font-semibold leading-relaxed tracking-tight text-foreground transition-colors hover:text-primary"
              aria-label={`Open ${product.name}`}
            >
              {product.name}
            </Link>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{product.category}</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-foreground/80">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="font-medium">{product.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="text-lg font-bold text-foreground tracking-tight">
            {formatPriceINR(product.price)}
          </div>

          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => {
              if (!product.inStock) return;
              addToCart(product);
              toast.success('Added to cart');
            }}
            className={cn(
              'pk-btn pk-btn-primary pk-btn-shine h-10 px-5 text-sm shadow-md transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-50',
            )}
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
