import { Minus, PackageCheck, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { formatPriceINR } from '../../lib/format';
import { cn } from '../../lib/utils';
import { cartTotal, useCartStore } from '../../stores/cartStore';
import Sheet from '../overlays/Sheet';
import type { SyntheticEvent } from 'react';
import { categoryImages } from '../../data/mockProducts';
import type { Category } from '../../types/product';
import { scrollToId } from '../../lib/scroll';

export default function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const setQty = useCartStore((s) => s.setQty);
  const clearCart = useCartStore((s) => s.clearCart);

  const subtotal = cartTotal(items);
  const shipping = subtotal > 999 ? 0 : subtotal > 0 ? 49 : 0;
  const tax = subtotal > 0 ? Math.round(subtotal * 0.18) : 0;
  const total = subtotal + shipping + tax;
  const freeShipTarget = 999;
  const freeShipRemaining = Math.max(0, freeShipTarget - subtotal);
  const freeShipProgress = Math.min(1, subtotal / freeShipTarget);

  const isCategory = (v: unknown): v is Category => {
    return typeof v === 'string' && v in categoryImages;
  };

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>, category?: string) => {
    const img = e.currentTarget;
    const fallback = isCategory(category) ? categoryImages[category] : categoryImages.Gadgets;
    img.src = fallback;
  };

  const goToShop = () => {
    onOpenChange(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'shop' } });
      return;
    }
    scrollToId('shop');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} title="Your cart" description="Review items and checkout.">
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center p-8 text-center">
          <div className="relative mb-6 h-24 w-24">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10 blur-xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-3xl border border-dashed border-muted-foreground/25 bg-card/50">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
            </div>
          </div>
          <h3 className="text-xl font-bold tracking-tight">Your cart is empty</h3>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Looks like you haven't added anything yet. Explore our categories to find something you love.
          </p>
          <button
            type="button"
            onClick={goToShop}
            className="pk-btn pk-btn-primary pk-btn-shine mt-8 h-11 w-full max-w-xs"
          >
            Start shopping
          </button>
        </div>
      ) : (
        <div className="flex h-full flex-col gap-5">
          <div className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-hide py-1">
            <div className="grid gap-4">
              {/* Free Shipping Progress */}
              <div className="rounded-2xl border bg-card/40 p-4 relative overflow-hidden">
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">Free Shipping</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {shipping === 0 ? (
                        <span className="font-medium text-emerald-500 flex items-center gap-1">
                          <PackageCheck className="h-3.5 w-3.5" />
                          Offer unlocked!
                        </span>
                      ) : (
                        <span>
                          Add <span className="font-semibold text-foreground">{formatPriceINR(freeShipRemaining)}</span> more
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="pk-btn pk-btn-ghost h-8 px-2 text-xs text-muted-foreground hover:text-destructive"
                    onClick={() => {
                      clearCart();
                      toast('Cart cleared');
                    }}
                  >
                    Clear all
                  </button>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: `${Math.round(freeShipProgress * 100)}%` }}
                  />
                </div>
              </div>

              {/* Cart Items */}
              <div className="grid gap-3">
                {items.map((item) => (
                  <div key={item.id} className="group relative flex gap-3 rounded-2xl border bg-card/40 p-3 transition hover:bg-card/60">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted border border-border/50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => handleImgError(e, item.category)}
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                      <div className="flex justify-between gap-2">
                        <div className="line-clamp-2 text-sm font-medium leading-snug">{item.name}</div>
                        <button
                          type="button"
                          className="pk-btn pk-btn-ghost -mr-2 -mt-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => {
                            removeFromCart(item.id);
                            toast('Removed from cart');
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-end justify-between gap-2">
                        <div className="flex items-center rounded-lg border bg-background/50 shadow-sm h-8">
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center transition hover:bg-accent disabled:opacity-50"
                            onClick={() => setQty(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <div className="w-8 text-center text-xs font-semibold">{item.quantity}</div>
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center transition hover:bg-accent"
                            onClick={() => setQty(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">{formatPriceINR(item.price * item.quantity)}</div>
                          {item.quantity > 1 && (
                            <div className="text-[10px] text-muted-foreground">{formatPriceINR(item.price)} each</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t bg-background/50 pt-4 backdrop-blur-md">
            <div className="rounded-2xl border bg-card/40 p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">{formatPriceINR(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className={cn("font-semibold", shipping === 0 && "text-emerald-500")}>
                  {shipping === 0 ? 'Free' : formatPriceINR(shipping)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tax (18%)</span>
                <span className="font-semibold">{formatPriceINR(tax)}</span>
              </div>

              <div className="h-px bg-border/50 my-2" />

              <div className="flex items-center justify-between">
                <span className="text-base font-bold">Total</span>
                <span className="text-xl font-bold text-primary">{formatPriceINR(total)}</span>
              </div>

              <button
                type="button"
                className="pk-btn pk-btn-primary pk-btn-shine mt-4 h-12 w-full text-base shadow-lg shadow-primary/20"
                onClick={() => {
                  toast('Checkout is a mock flow for now');
                }}
              >
                Checkout Securely
              </button>
            </div>
          </div>
        </div>
      )}
    </Sheet>
  );
}
