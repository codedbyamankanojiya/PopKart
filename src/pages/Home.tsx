import { useMemo } from 'react';
import { categories, categoryImages, mockProducts } from '../data/mockProducts';
import { categorySectionId } from '../lib/slug';
import { scrollToId } from '../lib/scroll';
import ProductCard from '../components/products/ProductCard';
import { useCatalogStore } from '../stores/catalogStore';

export default function Home() {
  const currentCategory = useCatalogStore((s) => s.currentCategory);
  const setCurrentCategory = useCatalogStore((s) => s.setCurrentCategory);
  const searchTerm = useCatalogStore((s) => s.searchTerm);
  const setSearchTerm = useCatalogStore((s) => s.setSearchTerm);
  const sortBy = useCatalogStore((s) => s.sortBy);
  const setSortBy = useCatalogStore((s) => s.setSortBy);

  const products = mockProducts;

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

  const featuredProducts = useMemo(() => {
    return [...products]
      .filter((p) => p.inStock)
      .sort((a, b) => b.rating + b.reviews / 1000 - (a.rating + a.reviews / 1000))
      .slice(0, 6);
  }, [products]);

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-[-120px] left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 py-10">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-primary">India’s modern megastore</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Everything you love.
                <span className="block text-muted-foreground">Delivered fast.</span>
              </h1>
              <p className="mt-4 max-w-prose text-muted-foreground">
                Electronics, fashion, gadgets and more. Smooth browsing, clean checkout flow, and a true black
                dark mode that feels premium.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => scrollToId('shop')}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition active:scale-[0.99] hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Shop now
                </button>
                <button
                  type="button"
                  onClick={() => scrollToId('categories')}
                  className="inline-flex h-11 items-center justify-center rounded-xl border bg-card px-5 text-sm font-semibold shadow-sm transition hover:bg-accent active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Explore categories
                </button>
              </div>
            </div>

            <div className="rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border bg-background/80 p-4 transition hover:bg-background">
                  <div className="text-sm font-semibold">Flash Sale</div>
                  <div className="mt-1 text-sm text-muted-foreground">Up to 70% OFF</div>
                </div>
                <div className="rounded-xl border bg-background/80 p-4 transition hover:bg-background">
                  <div className="text-sm font-semibold">Free Shipping</div>
                  <div className="mt-1 text-sm text-muted-foreground">On ₹999+</div>
                </div>
                <div className="rounded-xl border bg-background/80 p-4 transition hover:bg-background">
                  <div className="text-sm font-semibold">Secure Payments</div>
                  <div className="mt-1 text-sm text-muted-foreground">UPI / Card</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-32 top-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 py-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Featured picks</h2>
              <p className="mt-1 text-sm text-muted-foreground">Top-rated items customers love right now.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setCurrentCategory('All');
                scrollToId('shop');
              }}
              className="hidden h-9 items-center justify-center rounded-xl border bg-card px-3 text-sm font-semibold shadow-sm transition hover:bg-accent active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
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

      <section id="categories" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-7xl px-4 py-10">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Explore categories</h2>
              <p className="mt-1 text-sm text-muted-foreground">Jump directly to product sections.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setCurrentCategory('All');
                scrollToId('shop');
              }}
              className="inline-flex h-10 items-center justify-center rounded-xl border bg-card px-4 text-sm font-semibold shadow-sm transition hover:bg-accent active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Show all products
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="group relative overflow-hidden rounded-2xl border bg-card text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
      </section>

      <section id="shop" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-7xl px-4 pb-4 pt-2">
          <div className="flex flex-col gap-3 rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="text-sm font-semibold">Shop</div>
              <div className="text-sm text-muted-foreground">Search and sort products instantly.</div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="h-10 w-full rounded-xl border bg-background/80 px-3 text-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring sm:w-[260px]"
                aria-label="Search products"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="h-10 w-full rounded-xl border bg-background/80 px-3 text-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring sm:w-[220px]"
                aria-label="Sort products"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-4">
          {categories
            .filter((c) => currentCategory === 'All' || c === currentCategory)
            .map((category) => {
              const list = categorizedProducts[category] ?? [];
              if (list.length === 0) return null;
              return (
                <section
                  key={category}
                  id={categorySectionId(category)}
                  className="scroll-mt-24 border-b pb-10 pt-8 last:border-b-0"
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
                        className="hidden h-9 items-center justify-center rounded-xl border bg-card px-3 text-sm font-semibold shadow-sm transition hover:bg-accent active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
                      >
                        Show all
                      </button>
                    )}
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              );
            })}
        </div>
      </section>

      <footer id="contact" className="border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="text-lg font-semibold">About PopKart</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Your one-stop shop for the latest in tech, fashion, gadgets and more. Built for speed and
                mobile-first usability.
              </p>
            </div>
            <div>
              <div className="text-lg font-semibold">Quick Links</div>
              <div className="mt-2 grid gap-2 text-sm text-muted-foreground">
                <button type="button" className="w-fit hover:text-foreground" onClick={() => scrollToId('shop')}>
                  Shop
                </button>
                <button
                  type="button"
                  className="w-fit hover:text-foreground"
                  onClick={() => scrollToId('categories')}
                >
                  Categories
                </button>
                <button type="button" className="w-fit hover:text-foreground" onClick={() => scrollToId('contact')}>
                  Contact
                </button>
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">Contact</div>
              <p className="mt-2 text-sm text-muted-foreground">Mumbai, India</p>
              <p className="mt-1 text-sm text-muted-foreground">support@popkart.com</p>
            </div>
          </div>
          <div className="mt-10 text-xs text-muted-foreground">© {new Date().getFullYear()} PopKart</div>
        </div>
      </footer>

      <section className="border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-10">
          <div className="grid gap-6 rounded-2xl border bg-card/80 p-6 shadow-sm backdrop-blur md:grid-cols-[220px_1fr]">
            <div className="relative">
              <div className="aspect-square w-full overflow-hidden rounded-2xl border bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                  alt="Developer"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-primary">About the developer</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Aman Kanojiya</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Passionate front-end developer focused on crafting fast, polished, mobile-first experiences.
                PopKart is rebuilt with a clean architecture, persisted state, and modern UX.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href="https://www.linkedin.com/in/aman-kanojiya-7386822b0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-xl border bg-card px-4 text-sm font-semibold shadow-sm transition hover:bg-accent active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/codedbyamankanojiya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-xl border bg-card px-4 text-sm font-semibold shadow-sm transition hover:bg-accent active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  GitHub
                </a>
                <a
                  href="https://x.com/AKnj08?t=q_d2a3VqdDRpYaScD9Hclw&s=08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-xl border bg-card px-4 text-sm font-semibold shadow-sm transition hover:bg-accent active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  X
                </a>
                <a
                  href="https://www.instagram.com/lostwithamann?igsh=MnoydWo2YWxjdnZu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-xl border bg-card px-4 text-sm font-semibold shadow-sm transition hover:bg-accent active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
