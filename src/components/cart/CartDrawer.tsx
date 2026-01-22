import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatPriceINR } from '../../lib/format';
import { cn } from '../../lib/utils';
import { cartTotal, useCartStore } from '../../stores/cartStore';
import Sheet from '../overlays/Sheet';

export default function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const setQty = useCartStore((s) => s.setQty);
  const clearCart = useCartStore((s) => s.clearCart);

  const total = cartTotal(items);

  return (
    <Sheet open={open} onOpenChange={onOpenChange} title="Your cart" description="Review items and checkout.">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border bg-card p-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div className="text-base font-semibold">Your cart is empty</div>
          <div className="text-sm text-muted-foreground">Add products to see them here.</div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            Continue shopping
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="grid gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-2xl border bg-card p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-xl object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="min-w-0 flex-1">
                  <div className="line-clamp-2 text-sm font-semibold">{item.name}</div>
                  <div className="mt-1 text-sm font-semibold text-primary">{formatPriceINR(item.price)}</div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-xl border bg-background">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="inline-flex h-9 w-9 items-center justify-center"
                        onClick={() => setQty(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className={cn('h-4 w-4', item.quantity <= 1 && 'opacity-40')} />
                      </button>
                      <div className="min-w-10 text-center text-sm font-semibold">{item.quantity}</div>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="inline-flex h-9 w-9 items-center justify-center"
                        onClick={() => setQty(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="inline-flex h-9 items-center justify-center rounded-xl border bg-background px-3 text-sm font-semibold text-destructive"
                      onClick={() => {
                        removeFromCart(item.id);
                        toast('Removed from cart');
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border bg-card p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="text-base font-semibold">{formatPriceINR(total)}</span>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
              onClick={() => {
                toast('Checkout is a mock flow for now');
              }}
            >
              Checkout
            </button>
            <button
              type="button"
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl border bg-background text-sm font-semibold"
              onClick={() => {
                clearCart();
                toast('Cart cleared');
              }}
            >
              Clear cart
            </button>
          </div>
        </div>
      )}
    </Sheet>
  );
}
