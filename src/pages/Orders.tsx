import { Link } from 'react-router-dom';
import { Check, Clock, Package, ShoppingBag } from 'lucide-react';
import { formatPriceINR } from '../lib/format';
import { cn } from '../lib/utils';

// Mock data for orders
const mockOrders = [
    {
        id: 'ORD-7782-3421',
        date: 'Oct 24, 2023',
        status: 'Delivered',
        total: 4499,
        items: [
            { name: 'Wireless Noise Cancelling Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
            { name: 'Smart Fitness Band 5', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80' },
        ]
    },
    {
        id: 'ORD-9921-1102',
        date: 'Sep 12, 2023',
        status: 'Delivered',
        total: 12999,
        items: [
            { name: 'Mechanic Mechanical Keyboard', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80' },
        ]
    },
    {
        id: 'ORD-1102-4432',
        date: 'Aug 05, 2023',
        status: 'Cancelled',
        total: 899,
        items: [
            { name: 'Minimalist Water Bottle', image: 'https://images.unsplash.com/photo-1602143407151-a111efd40bac?auto=format&fit=crop&w=800&q=80' },
        ]
    }
];

export default function Orders() {
    return (
        <div className="pk-container py-12">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">My Orders</h1>
                    <p className="mt-2 text-muted-foreground">Track and manage your recent orders.</p>
                </div>
            </div>

            <div className="mt-8 grid gap-6">
                {mockOrders.length === 0 ? (
                    <div className="rounded-3xl border bg-card/70 p-12 text-center shadow-sm backdrop-blur pk-glass">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h2 className="mt-4 text-2xl font-semibold tracking-tight">No orders yet</h2>
                        <p className="mt-2 text-muted-foreground">When you place an order, it will appear here.</p>
                        <Link
                            to="/"
                            className="pk-btn pk-btn-primary pk-btn-shine mt-6 h-11 px-8"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    mockOrders.map((order) => (
                        <div key={order.id} className="overflow-hidden rounded-2xl border bg-card/70 shadow-sm backdrop-blur pk-glass">
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-muted/40 p-4 text-sm">
                                <div className="flex flex-wrap gap-x-8 gap-y-2">
                                    <div>
                                        <span className="font-medium text-muted-foreground">Order ID</span>
                                        <div className="font-semibold">{order.id}</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-muted-foreground">Date Placed</span>
                                        <div className="font-semibold">{order.date}</div>
                                    </div>
                                    <div>
                                        <span className="font-medium text-muted-foreground">Total Amount</span>
                                        <div className="font-semibold">{formatPriceINR(order.total)}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link to={`/orders/${order.id}`} className="pk-btn pk-btn-outline h-8 px-3 text-xs">
                                        View Invoice
                                    </Link>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6">
                                <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                                    {order.status === 'Delivered' ? (
                                        <span className="inline-flex items-center gap-1.5 text-emerald-600">
                                            <Check className="h-4 w-4" />
                                            Delivered on {order.date}
                                        </span>
                                    ) : order.status === 'Cancelled' ? (
                                        <span className="inline-flex items-center gap-1.5 text-destructive">
                                            <XIcon className="h-4 w-4" />
                                            Cancelled
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 text-sky-600">
                                            <Clock className="h-4 w-4" />
                                            In Transit
                                        </span>
                                    )}
                                </div>

                                <div className="grid gap-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border bg-muted">
                                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-sm font-medium">{item.name}</div>
                                                <div className="mt-1 text-xs text-muted-foreground">Qty: 1</div>
                                            </div>
                                            <Link to={`/product/1`} className="pk-btn pk-btn-ghost text-xs text-primary hover:underline">
                                                Write a review
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function XIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M18 6 6 18" /><path d="m6 6 18 18" />
        </svg>
    );
}
