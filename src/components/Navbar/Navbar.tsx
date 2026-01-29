import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, Moon, ShoppingCart, Sun, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { categories } from '../../data/mockProducts';
import { categorySectionId } from '../../lib/slug';
import { scrollToId } from '../../lib/scroll';
import { useTheme } from '../providers/ThemeProvider';
import { cn } from '../../lib/utils';
import { useCatalogStore } from '../../stores/catalogStore';
import { cartCount, useCartStore } from '../../stores/cartStore';
import { useUiStore } from '../../stores/uiStore';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);

  const currentCategory = useCatalogStore((s) => s.currentCategory);
  const setCurrentCategory = useCatalogStore((s) => s.setCurrentCategory);
  const searchTerm = useCatalogStore((s) => s.searchTerm);
  const setSearchTerm = useCatalogStore((s) => s.setSearchTerm);
  const cartItems = useCartStore((s) => s.items);
  const wishlistCount = useCartStore((s) => s.wishlist.length);
  const openCart = useUiStore((s) => s.openCart);

  const cartItemsCount = useMemo(() => cartCount(cartItems), [cartItems]);

  const closeAll = () => {
    setIsCategoryOpen(false);
    setIsMobileOpen(false);
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
    const q = searchTerm.trim();
    if (!q) {
      goToSection('shop');
      return;
    }
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
      if (isMobileOpen && mobilePanelRef.current && !mobilePanelRef.current.contains(target)) {
        setIsMobileOpen(false);
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
  }, [isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      mobilePanelRef.current?.querySelector<HTMLElement>('button, a')?.focus();
    });
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between gap-4 px-4">
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

          <button
            type="button"
            className="pk-btn pk-btn-ghost h-9 px-3 text-sm text-muted-foreground hover:bg-accent/80 hover:text-foreground"
            onClick={() => goToSection('shop')}
          >
            Shop
          </button>

          <NavLink
            to="/wishlist"
            onClick={closeAll}
            className={({ isActive }) =>
              cn(
                'pk-btn pk-btn-ghost h-9 px-3 text-sm text-muted-foreground hover:bg-accent/80 hover:text-foreground',
                isActive && 'bg-accent/80 text-foreground shadow-sm'
              )
            }
          >
            Wishlist
          </NavLink>

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

        <div className="hidden flex-1 items-center justify-center px-2 md:flex">
          <div className="w-full max-w-md">
            <div className="flex h-11 items-center gap-2 rounded-2xl border bg-card/90 px-3 shadow-sm backdrop-blur pk-glass">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitSearch();
                }}
                placeholder="Search products..."
                className="h-full w-full bg-transparent text-sm outline-none"
                aria-label="Search products"
              />
              <button
                type="button"
                onClick={submitSearch}
                className="pk-btn pk-btn-primary pk-btn-shine h-7 px-3 text-xs"
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
              openCart();
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

          <button
            type="button"
            className="pk-btn pk-btn-outline h-9 w-9 hover:bg-accent/70 md:hidden"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            onClick={() => {
              setIsMobileOpen((v) => !v);
              setIsCategoryOpen(false);
            }}
          >
            {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="border-b bg-background/90 backdrop-blur md:hidden">
        <div className="mx-auto w-full max-w-7xl px-4 py-3">
          <div className="flex flex-col gap-2 rounded-2xl border bg-card/90 p-3 shadow-sm pk-glass">
            <div className="flex items-center gap-2">
              <select
                value={currentCategory}
                onChange={(e) => setCurrentCategory(e.target.value as any)}
                className="h-10 min-w-[96px] rounded-xl border bg-background/80 px-2 text-xs font-semibold outline-none"
                aria-label="Select category"
              >
                <option value="All">All</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitSearch();
                }}
                placeholder="Search products, brands, deals..."
                className="h-10 w-full rounded-xl border bg-background/80 px-3 text-sm outline-none"
                aria-label="Search products"
              />
            </div>
            <button
              type="button"
              onClick={submitSearch}
              className="pk-btn pk-btn-primary pk-btn-shine h-10 w-full text-sm"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {isMobileOpen && (
        <div className="md:hidden" aria-label="Mobile menu" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-40 bg-black/40 pk-fade-in" />
          <div
            ref={mobilePanelRef}
            className="fixed right-0 top-0 z-50 h-dvh w-[88%] max-w-sm border-l bg-background pk-slide-in-right"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="text-sm font-semibold">Menu</div>
              <button
                type="button"
                className="pk-btn pk-btn-outline h-9 w-9 hover:bg-accent/70"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              <button
                type="button"
                className="pk-btn pk-btn-outline h-11 w-full justify-start px-4 text-left text-sm shadow-sm"
                onClick={() => {
                  goToSection('categories');
                }}
              >
                Categories
              </button>

              <button
                type="button"
                className="pk-btn pk-btn-outline h-11 w-full justify-start px-4 text-left text-sm shadow-sm"
                onClick={() => {
                  goToSection('shop');
                }}
              >
                Shop
              </button>

              <button
                type="button"
                className="pk-btn pk-btn-outline relative h-11 w-full justify-start px-4 text-left text-sm shadow-sm"
                onClick={() => {
                  navigate('/wishlist');
                  closeAll();
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist
                </span>
                {wishlistCount > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                className="pk-btn pk-btn-outline h-11 w-full justify-start px-4 text-left text-sm shadow-sm"
                onClick={() => {
                  navigate('/orders');
                  closeAll();
                }}
              >
                Orders
              </button>

              <button
                type="button"
                className="pk-btn pk-btn-outline h-11 w-full justify-start px-4 text-left text-sm shadow-sm"
                onClick={() => {
                  goToSection('contact');
                }}
              >
                Contact
              </button>

              <div className="mt-2 grid gap-2">
                <button
                  type="button"
                  className="pk-btn pk-btn-outline relative h-11 w-full justify-start px-4 text-left text-sm shadow-sm"
                  onClick={() => {
                    openCart();
                    closeAll();
                  }}
                >
                  <span className="inline-flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Cart
                  </span>
                  {cartItemsCount > 0 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground">
                      {cartItemsCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  className="pk-btn pk-btn-outline relative h-11 w-full justify-start px-4 text-left text-sm shadow-sm"
                  onClick={() => {
                    navigate('/wishlist');
                    closeAll();
                  }}
                >
                  <span className="inline-flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </span>
                  {wishlistCount > 0 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="mt-2 text-xs text-muted-foreground">Tip: tap outside or press Esc to close.</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
