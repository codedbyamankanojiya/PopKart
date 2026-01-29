import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PackageCheck, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { formatPriceINR } from '../lib/format';
import { cartTotal, useCartStore } from '../stores/cartStore';

export default function Orders() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const total = useMemo(() => cartTotal(items), [items]);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Orders</h1>
          <p className="mt-1 text-sm text-muted-foreground">Place a demo order using your current cart items.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/" className="pk-btn pk-btn-outline h-10 px-4 text-sm">
            Continue shopping
          </Link>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={() => {
              clearCart();
              toast('Cart cleared');
            }}
            className="pk-btn pk-btn-outline h-10 px-4 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
            Clear cart
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="pk-section p-4 sm:p-6">
          <div className="text-sm font-semibold">Items</div>
          {items.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">Your cart is empty. Add items to place an order.</p>
          ) : (
            <div className="mt-4 grid gap-3">
              {items.map((i) => (
                <div key={i.id} className="flex items-center justify-between gap-3 rounded-2xl border bg-card/70 p-4 pk-glass">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{i.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Qty: {i.quantity} · {formatPriceINR(i.price)}
                    </div>
                  </div>
                  <div className="shrink-0 text-sm font-semibold">{formatPriceINR(i.price * i.quantity)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pk-section p-4 sm:p-6">
          <div className="text-sm font-semibold">Order summary</div>
          <div className="mt-4 rounded-2xl border bg-card/70 p-4 pk-glass">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold">{formatPriceINR(total)}</span>
            </div>
            <button
              type="button"
              disabled={items.length === 0}
              onClick={() => {
                if (items.length === 0) return;
                clearCart();
                toast('Order placed successfully');
              }}
              className="pk-btn pk-btn-primary pk-btn-shine mt-4 h-11 w-full text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              <PackageCheck className="h-4 w-4" />
              Place order
            </button>
            <Link to="/" className="pk-btn pk-btn-outline mt-2 h-11 w-full text-sm">
              <ShoppingCart className="h-4 w-4" />
              Add more items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
