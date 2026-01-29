import { useMemo, useState, type SyntheticEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';
import { mockProducts, categoryImages } from '../data/mockProducts';
import { formatPriceINR } from '../lib/format';
import { cn } from '../lib/utils';
import { useCartStore } from '../stores/cartStore';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const addToCart = useCartStore((s) => s.addToCart);
  const wishlist = useCartStore((s) => s.wishlist);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);

  const productId = Number(id);
  const product = useMemo(() => mockProducts.find((p) => p.id === productId) ?? null, [productId]);

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const isWishlisted = product ? wishlist.includes(product.id) : false;

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    const fallbacks = [
      product?.category ? categoryImages[product.category] : undefined,
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80',
      'https://via.placeholder.com/800x600/111827/ffffff?text=Product+Image',
    ].filter(Boolean) as string[];

    const currentSrc = target.currentSrc || target.src;
    const idx = fallbacks.findIndex((u) => currentSrc.includes(u));
    const next = idx >= 0 ? fallbacks[idx + 1] : fallbacks[0];
    if (next) {
      target.srcset = '';
      target.src = next;
    }
  };

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="pk-section p-6">
          <div className="text-lg font-semibold">Product not found</div>
          <p className="mt-1 text-sm text-muted-foreground">This product may have been removed or the link is incorrect.</p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => navigate(-1)} className="pk-btn pk-btn-outline h-10 px-4">
              Go back
            </button>
            <Link to="/" className="pk-btn pk-btn-primary pk-btn-shine h-10 px-4">
              Browse products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={() => navigate(-1)} className="pk-btn pk-btn-ghost h-9 px-3 text-sm">
          Back
        </button>
        <Link to="/" className="pk-btn pk-btn-outline h-9 px-3 text-sm">
          Continue shopping
        </Link>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div className="pk-section overflow-hidden p-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
            {!isImgLoaded && <div className="absolute inset-0 pk-shimmer" />}
            <img
              src={product.image}
              alt={product.name}
              loading="eager"
              decoding="async"
              onError={handleImgError}
              onLoad={() => setIsImgLoaded(true)}
              className={cn('h-full w-full object-cover', !isImgLoaded && 'opacity-0', isImgLoaded && 'opacity-100')}
            />
          </div>
        </div>

        <div className="pk-section p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">{product.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">Category: {product.category}</p>
            </div>
            <div className="shrink-0 rounded-full bg-primary/10 px-3 py-1.5 text-base font-semibold text-primary">
              {formatPriceINR(product.price)}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{product.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>
            {!product.inStock && (
              <span className="inline-flex items-center rounded-full bg-destructive/10 px-3 py-1.5 text-sm font-semibold text-destructive">
                Out of stock
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                toggleWishlist(product.id);
                toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
              }}
              className={cn('pk-btn pk-btn-outline h-11 px-4', isWishlisted && 'border-primary text-primary')}
            >
              <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
              {isWishlisted ? 'Wishlisted' : 'Add to wishlist'}
            </button>

            <button
              type="button"
              disabled={!product.inStock}
              onClick={() => {
                if (!product.inStock) return;
                addToCart(product);
                toast('Added to cart');
              }}
              className="pk-btn pk-btn-primary pk-btn-shine h-11 px-4 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to cart
            </button>
          </div>

          <div className="mt-4 rounded-2xl border bg-card/70 p-4 pk-glass">
            <div className="text-sm font-semibold">Delivery & returns</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Fast delivery available. Easy 7-day returns on eligible items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
