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
  const cartItems = useCartStore((s) => s.items);

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const inCart = cartItems.some((item) => item.id === product.id);

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
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/20">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link
          to={`/product/${product.id}`}
          aria-label={`View details for ${product.name}`}
          className="block h-full w-full"
        >
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
              'h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105',
              !isImgLoaded && 'opacity-0',
              isImgLoaded && 'opacity-100'
            )}
          />

          {/* Dark overlay on hover for better contrast if needed, subtle */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />

          {badge && (
            <div className="absolute left-3 top-3 z-10">
              <span className={cn('inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm', badge.className)}>
                {badge.text}
              </span>
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
            toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
          }}
          className={cn(
            'absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200',
            isWishlisted
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-muted-foreground backdrop-blur-sm hover:bg-white hover:text-red-500'
          )}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
        </button>

        {/* Quick Add Button (Desktop) - Simply appears, no flashy animation */}
        {!inCart && (
          <button
            type="button"
            disabled={!product.inStock}
            onClick={(e) => {
              e.stopPropagation();
              if (!product.inStock) {
                toast('Out of stock');
                return;
              }
              addToCart(product);
              toast('Added to cart');
            }}
            className="absolute bottom-4 right-4 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-primary/90"
            title="Quick Add"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 min-h-[2.5rem]">
          <Link
            to={`/product/${product.id}`}
            className="line-clamp-2 text-sm font-medium leading-relaxed text-foreground hover:text-primary hover:underline"
            aria-label={`Open ${product.name}`}
          >
            {product.name}
          </Link>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="text-base font-bold text-foreground">{formatPriceINR(product.price)}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
