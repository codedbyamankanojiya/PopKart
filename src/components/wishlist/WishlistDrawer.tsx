import { HeartOff, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { mockProducts } from '../../data/mockProducts';
import { formatPriceINR } from '../../lib/format';
import { useCartStore } from '../../stores/cartStore';
import Sheet from '../overlays/Sheet';

export default function WishlistDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const wishlist = useCartStore((s) => s.wishlist);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const addToCart = useCartStore((s) => s.addToCart);

  const items = mockProducts.filter((p) => wishlist.includes(p.id));

  return (
    <Sheet open={open} onOpenChange={onOpenChange} title="Wishlist" description="Save items for later.">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border bg-card p-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
            <HeartOff className="h-6 w-6" />
          </div>
          <div className="text-base font-semibold">Your wishlist is empty</div>
          <div className="text-sm text-muted-foreground">Tap the heart icon on a product to save it.</div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            Browse products
          </button>
        </div>
      ) : (
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

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={!item.inStock}
                    className="inline-flex h-9 items-center justify-center rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                    onClick={() => {
                      if (!item.inStock) return;
                      addToCart(item);
                      toast('Added to cart');
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to cart
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center justify-center rounded-xl border bg-background px-3 text-sm font-semibold"
                    onClick={() => {
                      toggleWishlist(item.id);
                      toast('Removed from wishlist');
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Sheet>
  );
}
