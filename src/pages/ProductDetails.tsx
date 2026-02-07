import { useMemo, useState, type SyntheticEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BadgeCheck, ChevronRight, Heart, MessageCircleQuestion, PackageCheck, ShoppingCart, Star, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { mockProducts, categoryImages } from '../data/mockProducts';
import { getProductDetails } from '../data/mockProductDetails';
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

  const details = useMemo(() => (product ? getProductDetails(product) : null), [product]);

  const images = details?.images?.length ? details.images : product ? [product.image] : [];

  const relatedProducts = useMemo(() => {
    if (!product) return [] as typeof mockProducts;
    return mockProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 6);
  }, [product?.category, product?.id]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
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

  const activeImage = images[activeImageIdx] ?? product.image;

  const ratingSummary = (() => {
    const r = details?.reviews ?? [];
    const counts = [0, 0, 0, 0, 0];
    for (const item of r) {
      const idx = Math.max(1, Math.min(5, Math.round(item.rating))) - 1;
      counts[idx] += 1;
    }
    const total = r.length;
    const avg = total
      ? counts.reduce((acc, c, i) => acc + c * (i + 1), 0) / total
      : product.rating;
    return { counts, total, avg };
  })();

  return (
    <div className="pk-container py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => navigate(-1)} className="pk-btn pk-btn-ghost h-9 px-3 text-sm">
          Back
        </button>
        <nav className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/" className="truncate hover:text-foreground">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="truncate text-foreground">{product.name}</span>
        </nav>
        <Link to="/" className="pk-btn pk-btn-outline h-9 px-3 text-sm">
          Continue shopping
        </Link>
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <section className="pk-section overflow-hidden p-4 lg:p-6">
          <div className="grid gap-6 lg:grid-cols-[100px_1fr]">
            <div className="order-2 flex gap-3 overflow-x-auto pb-2 lg:order-1 lg:flex-col lg:overflow-visible lg:pb-0 scrollbar-hide">
              {images.map((src, idx) => (
                <button
                  key={`${product.id}-thumb-${idx}`}
                  type="button"
                  onClick={() => {
                    setActiveImageIdx(idx);
                    setIsImgLoaded(false);
                  }}
                  className={cn(
                    'relative shrink-0 overflow-hidden rounded-2xl border bg-muted shadow-sm transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                    idx === activeImageIdx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-70 hover:opacity-100'
                  )}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={src} alt="" className="h-20 w-20 object-cover lg:h-24 lg:w-24" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>

            <div className="order-1 lg:order-2">
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-muted shadow-inner">
                {!isImgLoaded && <div className="absolute inset-0 pk-shimmer" />}
                <img
                  src={activeImage}
                  alt={product.name}
                  loading="eager"
                  decoding="async"
                  onError={handleImgError}
                  onLoad={() => setIsImgLoaded(true)}
                  className={cn(
                    'h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110',
                    !isImgLoaded && 'opacity-0',
                    isImgLoaded && 'opacity-100'
                  )}
                />

                <div className="absolute top-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full">
                    Hover to zoom
                  </div>
                </div>
              </div>

              {details?.highlights?.length ? (
                <div className="mt-6 rounded-3xl border bg-card/40 p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Star className="h-4 w-4 fill-primary" />
                    Highlights
                  </div>
                  <ul className="mt-3 grid gap-3 text-sm text-foreground/80 sm:grid-cols-2">
                    {details.highlights.slice(0, 6).map((h) => (
                      <li key={h} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <aside className="lg:sticky lg:top-[92px] lg:self-start space-y-6">
          <div className="pk-section p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {product.category}
                </span>
                <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">{product.name}</h1>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-2xl font-bold text-primary">{formatPriceINR(product.price)}</div>
                <div className="text-xs text-muted-foreground line-through decoration-destructive/50">
                  {formatPriceINR(product.price * 1.2)}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border bg-muted/50 px-3 py-1 text-sm transition hover:bg-muted">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{ratingSummary.avg.toFixed(1)}</span>
                <span className="text-muted-foreground">({ratingSummary.total || product.reviews} reviews)</span>
              </div>
              {!product.inStock && (
                <span className="inline-flex items-center rounded-full bg-destructive/10 px-3 py-1 text-sm font-semibold text-destructive border border-destructive/20">
                  Out of stock
                </span>
              )}
              {product.inStock && (
                <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-600 border border-green-500/20">
                  In Stock
                </span>
              )}
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Desktop Actions */}
            <div className="mt-8 hidden sm:grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  toggleWishlist(product.id);
                  toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
                }}
                className={cn('pk-btn pk-btn-outline h-12 px-6', isWishlisted && 'border-primary bg-primary/5 text-primary')}
              >
                <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
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
                className="pk-btn pk-btn-primary pk-btn-shine h-12 px-6 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to cart
              </button>
            </div>

            {/* Mobile Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 p-4 backdrop-blur-lg sm:hidden pb-[env(safe-area-inset-bottom)]">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    toggleWishlist(product.id);
                    toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
                  }}
                  className={cn('pk-btn pk-btn-outline h-11', isWishlisted && 'border-primary text-primary')}
                >
                  <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
                  Wishlist
                </button>
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={() => {
                    if (!product.inStock) return;
                    addToCart(product);
                    toast('Added to cart');
                  }}
                  className="pk-btn pk-btn-primary pk-btn-shine h-11"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-3 pk-section p-4 bg-muted/30">
            <div className="flex items-center gap-4 rounded-xl border bg-card p-4 transition hover:shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Free Delivery</div>
                <p className="text-xs text-muted-foreground">On orders above ₹999</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border bg-card p-4 transition hover:shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <PackageCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Easy Returns</div>
                <p className="text-xs text-muted-foreground">7-day replacement policy</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border bg-card p-4 transition hover:shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Warranty</div>
                <p className="text-xs text-muted-foreground">{details?.warranty ?? 'Standard manufacturer warranty'}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <section className="pk-section p-5">
          <h2 className="text-lg font-semibold tracking-tight">Specifications</h2>
          <p className="mt-1 text-sm text-muted-foreground">Technical details and product information.</p>

          <div className="mt-4 overflow-hidden rounded-2xl border">
            <div className="grid divide-y">
              {(details?.specs ?? []).slice(0, 14).map((row) => (
                <div key={row.label} className="grid grid-cols-[1fr_1.2fr] gap-4 p-3 text-sm sm:grid-cols-[1fr_2fr]">
                  <div className="font-semibold text-muted-foreground">{row.label}</div>
                  <div className="text-foreground">{row.value}</div>
                </div>
              ))}
            </div>
          </div>

          {details?.boxContents?.length ? (
            <div className="mt-5 rounded-2xl border bg-card/70 p-4 pk-glass">
              <div className="text-sm font-semibold">In the box</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {details.boxContents.map((item) => (
                  <span key={item} className="rounded-full border bg-background/80 px-3 py-1 text-xs font-semibold">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section className="pk-section p-5">
          <h2 className="text-lg font-semibold tracking-tight">Ratings & reviews</h2>
          <p className="mt-1 text-sm text-muted-foreground">What customers say about this product.</p>

          <div className="mt-4 grid gap-4">
            <div className="rounded-2xl border bg-card/70 p-4 pk-glass">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-3xl font-semibold">{ratingSummary.avg.toFixed(1)}</div>
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{ratingSummary.total || product.reviews} reviews</span>
                  </div>
                </div>
                <div className="w-full max-w-[220px]">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingSummary.counts[star - 1] ?? 0;
                    const pct = ratingSummary.total ? Math.round((count / ratingSummary.total) * 100) : 0;
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <div className="w-6 text-muted-foreground">{star}★</div>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="w-8 text-right text-muted-foreground">{pct}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {(details?.reviews ?? []).slice(0, 4).map((r) => (
                <div key={r.id} className="rounded-2xl border bg-card/70 p-4 pk-glass">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{r.userName}</div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-foreground">{r.rating}</span>
                        </span>
                        <span>{r.createdAt}</span>
                        {r.verifiedPurchase && <span className="rounded-full border bg-background/80 px-2 py-1 font-semibold">Verified</span>}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">Helpful: {r.helpfulCount}</div>
                  </div>
                  <div className="mt-3 text-sm font-semibold">{r.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <section className="pk-section p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Questions & answers</h2>
              <p className="mt-1 text-sm text-muted-foreground">Quick answers from support and buyers.</p>
            </div>
            <div className="pk-btn pk-btn-outline h-9 px-3 text-sm">
              <MessageCircleQuestion className="h-4 w-4" />
              Ask a question
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {(details?.qa ?? []).slice(0, 4).map((qa) => (
              <div key={qa.id} className="rounded-2xl border bg-card/70 p-4 pk-glass">
                <div className="text-sm font-semibold">Q: {qa.question}</div>
                <p className="mt-1 text-sm text-muted-foreground">A: {qa.answer}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  Answered by {qa.answeredBy} · {qa.answeredAt}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pk-section p-5">
          <h2 className="text-lg font-semibold tracking-tight">More like this</h2>
          <p className="mt-1 text-sm text-muted-foreground">Related items in {product.category}.</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group rounded-2xl border bg-card/70 p-3 transition hover:-translate-y-0.5 hover:shadow-md pk-glass"
              >
                <div className="flex gap-3">
                  <div className="h-16 w-20 overflow-hidden rounded-xl bg-muted">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]" />
                  </div>
                  <div className="min-w-0">
                    <div className="line-clamp-2 text-sm font-semibold">{p.name}</div>
                    <div className="mt-1 text-sm font-semibold text-primary">{formatPriceINR(p.price)}</div>
                    <div className="mt-1 text-xs text-muted-foreground">⭐ {p.rating.toFixed(1)} · {p.reviews}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
