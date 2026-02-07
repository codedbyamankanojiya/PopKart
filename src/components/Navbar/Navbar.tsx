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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="pk-container flex h-16 items-center justify-between gap-4">
        <Link to="/" onClick={goHomeTop} className="flex items-center gap-2 font-semibold tracking-tight transition-opacity hover:opacity-80">
          <span className="text-xl font-bold tracking-tight text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500 bg-clip-text dark:from-blue-400 dark:via-indigo-400 dark:to-sky-400">
            PopKart
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <NavLink
            to="/"
            onClick={goHomeTop}
            className={({ isActive }) =>
              cn(
                'pk-btn pk-btn-ghost h-9 px-3 text-sm font-medium text-muted-foreground transition-all hover:bg-accent/50 hover:text-foreground',
                isActive && 'bg-accent/50 text-foreground font-semibold'
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
              className={cn(
                'pk-btn pk-btn-ghost h-9 px-3 text-sm font-medium text-muted-foreground transition-all hover:bg-accent/50 hover:text-foreground',
                isCategoryOpen && 'bg-accent/50 text-foreground'
              )}
            >
              Categories
            </button>

            <div
              role="menu"
              className={cn(
                'absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-border/50 bg-popover/95 p-1 shadow-xl backdrop-blur-xl transition-all',
                !isCategoryOpen && 'hidden opacity-0 scale-95',
                isCategoryOpen && 'pk-pop opacity-100 scale-100'
              )}
            >
              <div className="grid grid-cols-1 gap-0.5 p-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    role="menuitem"
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
          </div>

          <button
            type="button"
            className="pk-btn pk-btn-ghost h-9 px-3 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            onClick={() => goToSection('shop')}
          >
            Shop
          </button>

          <NavLink
            to="/orders"
            onClick={closeAll}
            className={({ isActive }) =>
              cn(
                'pk-btn pk-btn-ghost h-9 px-3 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                isActive && 'bg-accent/50 text-foreground font-semibold'
              )
            }
          >
            Orders
          </NavLink>
          <button
            type="button"
            className="pk-btn pk-btn-ghost h-9 px-3 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            onClick={() => goToSection('contact')}
          >
            Contact
          </button>
        </nav>

        <div className="hidden flex-1 items-center justify-center px-4 md:flex">
          <div className="w-full max-w-sm transition-all focus-within:max-w-md">
            <div className="relative flex h-10 items-center gap-2 rounded-xl border border-input/50 bg-muted/50 px-3 shadow-sm transition-all focus-within:border-primary/50 focus-within:bg-background focus-within:ring-2 focus-within:ring-primary/20">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitSearch();
                }}
                placeholder="Search products..."
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search products"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="rounded-full p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  <X className="h-3 w-3 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              navigate('/wishlist');
              closeAll();
            }}
            className="pk-btn pk-btn-ghost relative h-10 w-10 rounded-full hover:bg-accent/50"
            aria-label="Open wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-background">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              openCart();
            }}
            className="pk-btn pk-btn-ghost relative h-10 w-10 rounded-full hover:bg-accent/50"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm ring-2 ring-background">
                {cartItemsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="pk-btn pk-btn-ghost h-10 w-10 rounded-full hover:bg-accent/50"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            type="button"
            className="pk-btn pk-btn-ghost h-10 w-10 rounded-full hover:bg-accent/50 md:hidden"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
            onClick={() => {
              setIsMobileOpen((v) => !v);
              setIsCategoryOpen(false);
            }}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="border-b border-border/40 bg-background/60 backdrop-blur-xl md:hidden">
        <div className="pk-container py-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitSearch();
                }}
                placeholder="Search..."
                className="h-10 w-full rounded-2xl border border-input/50 bg-muted/50 pl-9 pr-4 text-sm outline-none focus:border-primary/50 focus:bg-background"
                aria-label="Search products"
              />
            </div>

            <select
              value={currentCategory}
              onChange={(e) => setCurrentCategory(e.target.value)}
              className="h-10 w-[35%] max-w-[140px] rounded-2xl border border-input/50 bg-muted/50 px-3 text-xs font-medium outline-none focus:border-primary/50 focus:bg-background"
              aria-label="Select category"
            >
              <option value="All">All Items</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isMobileOpen && (
        <div className="md:hidden" aria-label="Mobile menu" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-lg pk-fade-in" onClick={() => setIsMobileOpen(false)} />
          <div
            ref={mobilePanelRef}
            className="fixed right-0 top-0 z-50 h-dvh w-[80%] max-w-xs border-l border-border/50 bg-background/95 shadow-2xl backdrop-blur-xl pk-slide-in-right p-6"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-bold">Menu</span>
              <button
                type="button"
                className="pk-btn pk-btn-ghost h-9 w-9 rounded-full"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-colors hover:bg-accent"
                onClick={() => {
                  goToSection('categories');
                }}
              >
                Categories
              </button>

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-colors hover:bg-accent"
                onClick={() => {
                  goToSection('shop');
                }}
              >
                Shop All
              </button>

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-colors hover:bg-accent"
                onClick={() => {
                  navigate('/wishlist');
                  closeAll();
                }}
              >
                <Heart className="h-5 w-5" />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-auto flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-primary/10 px-2 text-xs font-bold text-primary">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-colors hover:bg-accent"
                onClick={() => {
                  navigate('/orders');
                  closeAll();
                }}
              >
                My Orders
              </button>

              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition-colors hover:bg-accent"
                onClick={() => {
                  goToSection('contact');
                }}
              >
                Contact Support
              </button>
            </div>

            <div className="absolute bottom-8 left-6 right-6">
              <button
                type="button"
                className="pk-btn pk-btn-primary pk-btn-shine w-full py-6 text-base"
                onClick={() => {
                  openCart();
                  closeAll();
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                View Cart ({cartItemsCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
