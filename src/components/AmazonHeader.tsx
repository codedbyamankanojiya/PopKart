import { MapPin, Search, ShoppingCart, Menu, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

export default function AmazonHeader() {
    const cartItems = useCartStore((state: any) => state.items);
    const cartCount = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);

    return (
        <header className="flex flex-col w-full font-sans">
            {/* Top Bar - Dark Charcoal */}
            <div className="flex items-center gap-2 bg-[#131921] px-4 py-2 text-white h-[60px]">
                {/* Logo */}
                <Link to="/" className="flex items-center pt-2 px-2 border border-transparent hover:border-white rounded-sm pb-1 mr-1">
                    <div className="text-2xl font-bold tracking-tight leading-none bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                        PopKart
                    </div>
                </Link>

                {/* Deliver To */}
                <div className="hidden md:flex items-center gap-1 cursor-pointer border border-transparent hover:border-white p-2 rounded-sm text-sm">
                    <div className="flex flex-col items-center justify-center pt-1">
                        <MapPin className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-[12px] text-gray-300">Deliver to</span>
                        <span className="font-bold text-[14px]">India</span>
                    </div>
                </div>

                {/* Search Bar - Central */}
                <div className="flex flex-1 mx-4 h-10 rounded-md overflow-hidden focus-within:ring-3 focus-within:ring-[#febd69]">
                    <div className="flex items-center justify-center bg-[#f3f3f3] px-3 border-r border-gray-300 text-xs text-gray-600 cursor-pointer hover:bg-[#dadada] transition-colors">
                        All <ChevronDown className="h-3 w-3 ml-1" />
                    </div>
                    <input
                        type="text"
                        className="flex-1 h-full px-3 text-black outline-none placeholder:text-gray-500 font-medium"
                        placeholder="Search PopKart.in"
                    />
                    <button className="bg-[#febd69] px-4 hover:bg-[#f3a847] transition-colors">
                        <Search className="h-5 w-5 text-[#131921]" />
                    </button>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-1">
                    {/* Language (Hidden on small) */}
                    <div className="hidden lg:flex items-center gap-1 p-2 border border-transparent hover:border-white rounded-sm cursor-pointer font-bold text-sm">
                        <span className="mt-1">EN</span>
                        <ChevronDown className="h-3 w-3 mt-1 text-gray-400" />
                    </div>

                    {/* Account */}
                    <div className="flex flex-col leading-none p-2 border border-transparent hover:border-white rounded-sm cursor-pointer">
                        <span className="text-[12px]">Hello, sign in</span>
                        <span className="font-bold text-[14px] flex items-center">
                            Account & Lists <ChevronDown className="h-3 w-3 ml-1 mt-1 text-gray-400" />
                        </span>
                    </div>

                    {/* Orders */}
                    <div className="hidden sm:flex flex-col leading-none p-2 border border-transparent hover:border-white rounded-sm cursor-pointer">
                        <span className="text-[12px]">Returns</span>
                        <span className="font-bold text-[14px]">& Orders</span>
                    </div>

                    {/* Cart */}
                    <Link to="/cart" className="flex items-end p-2 border border-transparent hover:border-white rounded-sm cursor-pointer relative">
                        <div className="relative">
                            <ShoppingCart className="h-8 w-8" />
                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 font-bold text-[#f08804] text-[16px]">
                                {cartCount}
                            </span>
                        </div>
                        <span className="font-bold text-[14px] mb-1 hidden sm:inline">Cart</span>
                    </Link>
                </div>
            </div>

            {/* Bottom Bar - Light Charcoal */}
            <div className="flex items-center gap-4 bg-[#232f3e] px-4 py-1.5 text-white text-[14px] overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-1 font-bold cursor-pointer hover:border hover:border-white px-2 py-1 rounded-sm whitespace-nowrap">
                    <Menu className="h-5 w-5" />
                    All
                </div>
                {['Fresh', 'MX Player', 'Sell', 'Gift Cards', 'Baby', 'Buy Again', 'Browsing History', 'Coupons'].map((item) => (
                    <div key={item} className="cursor-pointer hover:border hover:border-white px-2 py-1 rounded-sm whitespace-nowrap font-medium">
                        {item}
                    </div>
                ))}
            </div>
        </header>
    );
}
