import { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';
import { categories, categoryImages, mockProducts } from '../data/mockProducts';
import { formatPriceINR } from '../lib/format';
import { categorySectionId } from '../lib/slug';
import { scrollToId } from '../lib/scroll';
import ProductCard from '../components/products/ProductCard';
import { type SortBy, useCatalogStore } from '../stores/catalogStore';
import { useCartStore } from '../stores/cartStore';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const addToCart = useCartStore((s) => s.addToCart);
  const wishlist = useCartStore((s) => s.wishlist);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);

  const currentCategory = useCatalogStore((s) => s.currentCategory);
  const setCurrentCategory = useCatalogStore((s) => s.setCurrentCategory);
  const searchTerm = useCatalogStore((s) => s.searchTerm);
  const setSearchTerm = useCatalogStore((s) => s.setSearchTerm);
  const sortBy = useCatalogStore((s) => s.sortBy);
  const setSortBy = useCatalogStore((s) => s.setSortBy);

  const products = mockProducts;

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    const target = state?.scrollTo;
    if (!target) return;

    let cancelled = false;

    const waitForElement = async (id: string, timeoutMs: number) => {
      const started = Date.now();
      while (!cancelled && Date.now() - started < timeoutMs) {
        const el = document.getElementById(id);
        if (el) return el;
        await new Promise((r) => setTimeout(r, 50));
      }
      return null;
    };

    const doScroll = () => {
      if (target === '__top__') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollToId(target);
      }
    };

    (async () => {
      requestAnimationFrame(() => {
        setTimeout(async () => {
          if (cancelled) return;
          if (target !== '__top__') {
            await waitForElement(target, 1200);
          }
          if (cancelled) return;
          doScroll();
          navigate('.', { replace: true, state: null });
        }, 0);
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [location.state, navigate]);

  const filteredSorted = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const base = q ? products.filter((p) => p.name.toLowerCase().includes(q)) : products;

    const sorted = [...base].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'relevance':
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchTerm, sortBy]);

  const categorizedProducts = useMemo(() => {
    const map: Record<string, typeof filteredSorted> = {};
    for (const p of filteredSorted) {
      if (!map[p.category]) map[p.category] = [];
      map[p.category].push(p);
    }
    return map;
  }, [filteredSorted]);

  const visibleCategories = useMemo(() => {
    return categories.filter((c) => currentCategory === 'All' || c === currentCategory);
  }, [currentCategory]);

  const hasVisibleProducts = useMemo(() => {
    for (const c of visibleCategories) {
      const list = categorizedProducts[c] ?? [];
      if (list.length > 0) return true;
    }
    return false;
  }, [categorizedProducts, visibleCategories]);

  const isSearching = useMemo(() => searchTerm.trim().length > 0, [searchTerm]);

  const featuredProducts = useMemo(() => {
    return [...products]
      .filter((p) => p.inStock)
      .sort((a, b) => b.rating + b.reviews / 1000 - (a.rating + a.reviews / 1000))
      .slice(0, 6);
  }, [products]);

  return (
    <div className="pb-16 pk-mesh pk-aurora pk-noise">
      <section className="relative overflow-hidden border-b border-border/40 pk-hero-bg">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-40 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl pk-float opacity-50" />
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl pk-float opacity-50" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/2 h-64 w-full -translate-x-1/2 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative pk-container py-16 lg:py-24 pk-fade-in">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm mb-6">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                New Collection Live
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
                Elevate your <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-sky-400">
                  digital lifestyle.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
                Experience a curated collection of premium tech, fashion, and everyday essentials.
                Designed for those who appreciate quality and aesthetics.
              </p>

              <div className="mt-8 flex flex-col w-full sm:w-auto sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => scrollToId('shop')}
                  className="pk-btn pk-btn-primary pk-btn-shine h-12 px-8 text-base shadow-lg shadow-primary/25"
                >
                  Start Shopping
                </button>
                <button
                  type="button"
                  onClick={() => scrollToId('categories')}
                  className="pk-btn pk-btn-outline h-12 px-8 text-base bg-background/50 hover:bg-background/80"
                >
                  Explore Categories
                </button>
              </div>

              <div className="mt-10 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <span className="font-medium text-foreground">Trusted by 10,000+ shoppers</span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:max-w-full pk-slide-in-right hidden md:block">
              <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square max-h-[600px] w-full">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/20 to-indigo-500/20 blur-3xl" />
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-card/30 shadow-2xl backdrop-blur-xl pk-glass">
                  <img
                    src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1000&q=80"
                    alt="Hero Showcase"
                    className="h-full w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                  />

                  <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-white/80">Featured drop</p>
                        <p className="text-sm font-bold text-white">Premium Electronics</p>
                      </div>
                      <button onClick={() => scrollToId('shop')} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black transition hover:bg-white/90">
                        Shop
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -right-6 top-12 rounded-2xl border border-white/10 bg-card/80 p-3 shadow-xl backdrop-blur-md pk-float" style={{ animationDelay: '1.5s' }}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                      <ShoppingCart className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Sales</p>
                      <p className="text-sm font-bold">+24%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0">
          <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-32 top-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>
        <div className="relative pk-container py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Featured picks</h2>
              <p className="mt-2 text-sm text-muted-foreground">Top rated items loved by customers.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setCurrentCategory('All');
                scrollToId('shop');
              }}
              className="pk-btn pk-btn-outline pk-btn-shine hidden h-9 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
            >
              Browse all
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="scroll-mt-24 pk-backdrop-fashion">
        <div className="pk-container py-12">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Explore categories</h2>
              <p className="mt-2 text-sm text-muted-foreground">Browse by category and find your next favorite product.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setCurrentCategory('All');
                scrollToId('shop');
              }}
              className="pk-btn pk-btn-outline pk-btn-shine h-10 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Show all products
            </button>
          </div>

          <div className="mt-6 pk-section p-4 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="group relative overflow-hidden rounded-2xl border bg-card/70 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pk-glass"
                  onClick={() => {
                    setCurrentCategory(category);
                    scrollToId(categorySectionId(category));
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={categoryImages[category]}
                      alt={category}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-semibold">{category}</div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <div className="text-sm text-muted-foreground">Tap to view</div>
                      <div className="rounded-full border bg-background/80 px-2 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
                        {(categorizedProducts[category]?.length ?? 0).toString()} items
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="shop" className="scroll-mt-24 pk-backdrop-tech">
        <div className="pk-container pb-4 pt-4">
          <div className="rounded-3xl border bg-card/70 p-4 shadow-sm backdrop-blur pk-glass">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <div className="text-sm font-semibold">Shop</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {filteredSorted.length} products · Browse by category, then refine by search & sort.
                </div>
              </div>

              {(searchTerm.trim() || currentCategory !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentCategory('All');
                  }}
                  className="pk-btn pk-btn-outline h-10 px-4 text-sm"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="mt-4 grid gap-2 lg:grid-cols-[220px_220px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="pk-select w-full"
                aria-label="Sort products"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="name">Name</option>
              </select>

              <select
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value)}
                className="pk-select w-full"
                aria-label="Filter by category"
              >
                <option value="All">Category: All</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="pk-container pb-12 pt-4">
          <div className="pk-section p-4 sm:p-6">
            {!hasVisibleProducts ? (
              <div className="rounded-3xl border bg-card/70 p-6 text-center pk-glass">
                <div className="text-base font-semibold">No products found</div>
                <p className="mt-1 text-sm text-muted-foreground">Try clearing filters or searching with a different keyword.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setCurrentCategory('All');
                  }}
                  className="pk-btn pk-btn-primary pk-btn-shine mt-4 h-10 px-4 text-sm"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <>
                {isSearching ? (
                  <section className="scroll-mt-24">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight">Search results</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{filteredSorted.length} items</p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {filteredSorted.map((product) => {
                        const isWishlisted = wishlist.includes(product.id);
                        return (
                          <div
                            key={product.id}
                            className="rounded-3xl border bg-card/70 p-3 shadow-sm backdrop-blur transition hover:border-primary/30 hover:shadow-md pk-glass"
                          >
                            <div className="grid gap-3 sm:grid-cols-[180px_1fr]">
                              <div className="relative overflow-hidden rounded-2xl border bg-muted">
                                <Link to={`/product/${product.id}`} className="block" aria-label={`View ${product.name}`}>
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => {
                                      e.currentTarget.src =
                                        categoryImages[product.category] ??
                                        'https://via.placeholder.com/800x600/111827/ffffff?text=Product+Image';
                                    }}
                                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                                  />
                                </Link>
                              </div>

                              <div className="flex min-w-0 flex-col justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                      <Link
                                        to={`/product/${product.id}`}
                                        className="line-clamp-2 text-sm font-semibold leading-snug hover:underline"
                                      >
                                        {product.name}
                                      </Link>
                                      <div className="mt-1 text-xs text-muted-foreground">{product.category}</div>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        toggleWishlist(product.id);
                                        toast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
                                      }}
                                      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                                      className={
                                        'pk-btn pk-btn-outline h-9 w-9 rounded-full bg-background/70 backdrop-blur ' +
                                        (isWishlisted ? 'border-primary text-primary' : '')
                                      }
                                    >
                                      <Heart className={(isWishlisted ? 'fill-current ' : '') + 'h-4 w-4'} />
                                    </button>
                                  </div>

                                  <div className="mt-3 flex flex-wrap items-center gap-2">
                                    <div className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
                                      <span>({product.reviews})</span>
                                    </div>
                                    {!product.inStock && (
                                      <span className="rounded-full bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive">
                                        Out of stock
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                  <div className="text-base font-semibold text-primary">{formatPriceINR(product.price)}</div>
                                  <button
                                    type="button"
                                    disabled={!product.inStock}
                                    onClick={() => {
                                      if (!product.inStock) return;
                                      addToCart(product);
                                      toast('Added to cart');
                                    }}
                                    className="pk-btn pk-btn-primary pk-btn-shine h-10 px-4 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                                  >
                                    <ShoppingCart className="h-4 w-4" />
                                    Add to cart
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ) : (
                  visibleCategories.map((category) => {
                    const list = categorizedProducts[category] ?? [];
                    if (list.length === 0) return null;
                    return (
                      <section
                        key={category}
                        id={categorySectionId(category)}
                        className="scroll-mt-24 border-b pb-10 pt-10 first:pt-2 last:border-b-0"
                      >
                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold tracking-tight">{category}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{list.length} items</p>
                          </div>
                          {currentCategory !== 'All' && (
                            <button
                              type="button"
                              onClick={() => {
                                setCurrentCategory('All');
                                scrollToId('shop');
                              }}
                              className="pk-btn pk-btn-outline pk-btn-shine hidden h-9 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
                            >
                              Show all
                            </button>
                          )}
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                          {list.map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      </section>
                    );
                  })
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section className="border-y bg-muted/30 py-12">
        <div className="pk-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">20k+</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">Fast</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Delivery Pan-India</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Authentic Products</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-primary/5 -skew-y-2 transform origin-top-left scale-110" />
        <div className="pk-container relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Stay in the loop</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join our newsletter for exclusive drops, early access to sales, and curated tech news.
              No spam, just vibes.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); toast('Subscribed successfully!'); }}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12 rounded-full border bg-background px-5 outline-none focus:ring-2 focus:ring-primary transition shadow-sm"
                required
              />
              <button type="submit" className="pk-btn pk-btn-primary pk-btn-shine h-12 px-8 rounded-full shadow-lg shadow-primary/20">
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t bg-muted/40 backdrop-blur-xl">
        <div className="pk-container py-12 lg:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                  P
                </div>
                <span className="text-xl font-bold tracking-tight">PopKart</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Redefining the digital shopping experience with speed, aesthetics, and user-centric design.
              </p>
              <div className="mt-6 flex gap-3">
                <a href="https://github.com/codedbyamankanojiya" target="_blank" rel="noreferrer" className="rounded-full bg-background p-2 transition hover:text-primary border hover:border-primary">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </a>
                <a href="https://www.linkedin.com/in/aman-kanojiya-7386822b0" target="_blank" rel="noreferrer" className="rounded-full bg-background p-2 transition hover:text-primary border hover:border-primary">
                  <span className="font-bold text-xs">in</span>
                </a>
                <a href="https://x.com/AKnj08?t=q_d2a3VqdDRpYaScD9Hclw&s=08" target="_blank" rel="noreferrer" className="rounded-full bg-background p-2 transition hover:text-primary border hover:border-primary">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-foreground">Shop</div>
              <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                <button type="button" className="w-fit hover:text-primary transition-colors" onClick={() => scrollToId('shop')}>
                  All Products
                </button>
                <button type="button" className="w-fit hover:text-primary transition-colors" onClick={() => scrollToId('categories')}>
                  Categories
                </button>
                <button type="button" className="w-fit hover:text-primary transition-colors">
                  New Arrivals
                </button>
                <button type="button" className="w-fit hover:text-primary transition-colors">
                  Featured
                </button>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-foreground">Support</div>
              <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
                <span className="cursor-pointer hover:text-primary transition-colors">Help Center</span>
                <span className="cursor-pointer hover:text-primary transition-colors">Returns & Refunds</span>
                <span className="cursor-pointer hover:text-primary transition-colors">Shipping Info</span>
                <span className="cursor-pointer hover:text-primary transition-colors">Track Order</span>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</div>
              <div className="mt-4 text-sm text-muted-foreground space-y-2">
                <p>Mumbai, India</p>
                <p className="hover:text-primary transition-colors cursor-pointer">support@popkart.com</p>
                <p>+91 98765 43210</p>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-xs text-muted-foreground">
            <div className="flex justify-center gap-6 mb-4">
              <span className="cursor-pointer hover:text-foreground">Privacy Policy</span>
              <span className="cursor-pointer hover:text-foreground">Terms of Service</span>
              <span className="cursor-pointer hover:text-foreground">Cookie Policy</span>
            </div>
            © {new Date().getFullYear()} PopKart. Designed & Built by Aman Kanojiya.
          </div>
        </div>
      </footer>
    </div>
  );
}
