import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, Moon, Search, ShoppingCart, Sun, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { categories } from '../../data/mockProducts';
import { categorySectionId } from '../../lib/slug';
import { scrollToId } from '../../lib/scroll';
import { useTheme } from '../providers/ThemeProvider';
import { cn } from '../../lib/utils';
import { useCatalogStore } from '../../stores/catalogStore';
import { cartCount, useCartStore } from '../../stores/cartStore';


export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);

  const setCurrentCategory = useCatalogStore((s) => s.setCurrentCategory);
  const searchTerm = useCatalogStore((s) => s.searchTerm);
  const setSearchTerm = useCatalogStore((s) => s.setSearchTerm);
  const cartItems = useCartStore((s) => s.items);
  const wishlistCount = useCartStore((s) => s.wishlist.length);

  const [localSearch, setLocalSearch] = useState(searchTerm);

  // Sync local search when global search changes (e.g. clear filters)
  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  // Debounce updates to global store
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearch);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, setSearchTerm]);

  const cartItemsCount = useMemo(() => cartCount(cartItems), [cartItems]);

  const closeAll = () => {
    setIsCategoryOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  };

  const goHomeTop = () => {
    closeAll();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: '__top__' } });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToSection = (id: string) => {
    closeAll();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    scrollToId(id);
  };

  const submitSearch = () => {
    const q = localSearch.trim();
    if (!q) {
      goToSection('shop');
      return;
    }
    // Ensure store is synced immediately on submit
    setSearchTerm(localSearch);
    goToSection('shop');
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll();
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (categoryRef.current && !categoryRef.current.contains(target)) {
        setIsCategoryOpen(false);
      }
      if (isMobileMenuOpen && mobilePanelRef.current && !mobilePanelRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown, { passive: true });
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      mobilePanelRef.current?.querySelector<HTMLElement>('button, a')?.focus();
    });
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="pk-container flex h-[68px] items-center justify-between gap-4">
        <Link to="/" onClick={goHomeTop} className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="text-lg font-semibold tracking-tight text-transparent bg-gradient-to-r from-primary via-sky-500 to-emerald-500 bg-clip-text">
            PopKart
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <NavLink
            to="/"
            onClick={goHomeTop}
            className={({ isActive }) =>
              cn(
                'pk-btn pk-btn-ghost h-9 px-3 text-sm text-muted-foreground hover:bg-accent/80 hover:text-foreground',
                isActive && 'bg-accent/80 text-foreground shadow-sm'
              )
            }
          >
            Home
          </NavLink>

          <div className="relative" ref={categoryRef}>
            <button
              type="button"
              onClick={() => setIsCategoryOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={isCategoryOpen}
              className="pk-btn pk-btn-ghost h-9 px-3 text-sm text-muted-foreground hover:bg-accent/80 hover:text-foreground"
            >
              Categories
            </button>

            <div
              role="menu"
              className={cn(
                'absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-xl border bg-popover p-1 shadow-lg',
                !isCategoryOpen && 'hidden',
                isCategoryOpen && 'pk-pop'
              )}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-popover-foreground transition hover:bg-accent/80"
                  onClick={() => {
                    setCurrentCategory(category);
                    setIsCategoryOpen(false);
                    goToSection(categorySectionId(category));
                  }}
                >
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>



          <NavLink
            to="/orders"
            onClick={closeAll}
            className={({ isActive }) =>
              cn(
                'pk-btn pk-btn-ghost h-9 px-3 text-sm text-muted-foreground hover:bg-accent/80 hover:text-foreground',
                isActive && 'bg-accent/80 text-foreground shadow-sm'
              )
            }
          >
            Orders
          </NavLink>
          <button
            type="button"
            className="pk-btn pk-btn-ghost h-9 px-3 text-sm text-muted-foreground hover:bg-accent/80 hover:text-foreground"
            onClick={() => goToSection('contact')}
          >
            Contact
          </button>
        </nav>

        <div className="hidden flex-1 items-center justify-center px-4 md:flex">
          <div className="w-full max-w-lg">
            <div className="flex h-10 items-center gap-2 rounded-full border bg-card/90 px-4 shadow-sm backdrop-blur pk-glass transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary/20">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitSearch();
                }}
                placeholder="Search products..."
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                aria-label="Search products"
              />
              <button
                type="button"
                onClick={submitSearch}
                className="pk-btn pk-btn-primary pk-btn-shine h-7 px-4 text-xs font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              navigate('/wishlist');
              closeAll();
            }}
            className="pk-btn pk-btn-outline relative h-9 w-9 hover:bg-accent/70"
            aria-label="Open wishlist"
          >
            <Heart className="h-4 w-4" />
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              navigate('/cart');
            }}
            className="pk-btn pk-btn-outline relative h-9 w-9 hover:bg-accent/70"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartItemsCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {cartItemsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="pk-btn pk-btn-outline h-9 w-9 hover:bg-accent/70"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {isMobileSearchOpen ? (
            <div className="absolute inset-x-0 top-0 z-50 flex h-[68px] items-center gap-3 bg-background px-4 shadow-md md:hidden">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  autoFocus
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      submitSearch();
                      setIsMobileSearchOpen(false);
                    }
                    if (e.key === 'Escape') {
                      setIsMobileSearchOpen(false);
                    }
                  }}
                  placeholder="Search products..."
                  className="h-10 w-full rounded-full border bg-muted/50 pl-10 pr-4 text-sm outline-none transition-all focus:bg-muted focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(false)}
                className="shrink-0 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="pk-btn pk-btn-outline h-9 w-9 hover:bg-accent/70 md:hidden"
              onClick={() => setIsMobileSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          )}

          <button
            type="button"
            className="pk-btn pk-btn-outline h-9 w-9 hover:bg-accent/70 md:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => {
              setIsMobileMenuOpen((v) => !v);
              setIsCategoryOpen(false);
            }}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>



      {isMobileMenuOpen && (
        <div className="md:hidden" aria-label="Mobile menu" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm pk-fade-in" onClick={() => setIsMobileMenuOpen(false)} />
          <div
            ref={mobilePanelRef}
            className="fixed right-0 top-0 z-50 h-dvh w-[85%] max-w-sm border-l bg-background shadow-2xl pk-slide-in-right"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b p-5">
                <div className="text-lg font-semibold">Menu</div>
                <button
                  type="button"
                  className="pk-btn pk-btn-ghost h-9 w-9 hover:bg-accent/70 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <nav className="grid gap-2">
                  <button
                    type="button"
                    className="pk-btn pk-btn-ghost h-12 w-full justify-start px-4 text-left text-sm font-medium hover:bg-accent/80 transition-colors"
                    onClick={() => {
                      goHomeTop();
                    }}
                  >
                    Home
                  </button>

                  <button
                    type="button"
                    className="pk-btn pk-btn-ghost h-12 w-full justify-start px-4 text-left text-sm font-medium hover:bg-accent/80 transition-colors"
                    onClick={() => {
                      goToSection('categories');
                    }}
                  >
                    Categories
                  </button>

                  <button
                    type="button"
                    className="pk-btn pk-btn-ghost h-12 w-full justify-start px-4 text-left text-sm font-medium hover:bg-accent/80 transition-colors"
                    onClick={() => {
                      goToSection('shop');
                    }}
                  >
                    Shop
                  </button>

                  <button
                    type="button"
                    className="pk-btn pk-btn-ghost relative h-12 w-full justify-start px-4 text-left text-sm font-medium hover:bg-accent/80 transition-colors"
                    onClick={() => {
                      navigate('/wishlist');
                      closeAll();
                    }}
                  >
                    <span className="inline-flex items-center gap-3">
                      <Heart className="h-4 w-4" />
                      Wishlist
                    </span>
                    {wishlistCount > 0 && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                        {wishlistCount}
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    className="pk-btn pk-btn-ghost h-12 w-full justify-start px-4 text-left text-sm font-medium hover:bg-accent/80 transition-colors"
                    onClick={() => {
                      navigate('/orders');
                      closeAll();
                    }}
                  >
                    Orders
                  </button>

                  <button
                    type="button"
                    className="pk-btn pk-btn-ghost h-12 w-full justify-start px-4 text-left text-sm font-medium hover:bg-accent/80 transition-colors"
                    onClick={() => {
                      goToSection('contact');
                    }}
                  >
                    Contact
                  </button>

                  <div className="my-3 border-t" />

                  <button
                    type="button"
                    className="pk-btn pk-btn-ghost relative h-12 w-full justify-start px-4 text-left text-sm font-medium hover:bg-accent/80 transition-colors"
                    onClick={() => {
                      navigate('/cart');
                      closeAll();
                    }}
                  >
                    <span className="inline-flex items-center gap-3">
                      <ShoppingCart className="h-4 w-4" />
                      Cart
                    </span>
                    {cartItemsCount > 0 && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                        {cartItemsCount}
                      </span>
                    )}
                  </button>
                </nav>

                <div className="mt-6 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                  💡 Tip: Tap outside or press Esc to close
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
