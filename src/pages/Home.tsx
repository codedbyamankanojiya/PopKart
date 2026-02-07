import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import ProductCard from '../components/products/ProductCard';
import { cn } from '../lib/utils';

// Amazon-style Hero Carousel Images
const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop',
    alt: 'Electronics Sale',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
    alt: 'Fashion Collection',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop',
    alt: 'Home & Kitchen',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  // Group products for horizontal feeds
  const techProducts = mockProducts.filter(p => (p.category as string) === 'Electronics').slice(0, 6);
  const fashionProducts = mockProducts.filter(p => (p.category as string) === 'Fashion').slice(0, 6);

  return (
    <div className="relative flex flex-col min-h-screen bg-[#eaeded]">
      {/* Hero Section - Full Width Carousel */}
      <div className="relative w-full max-w-[1500px] mx-auto z-0">
        <div className="relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[600px] overflow-hidden">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-500 ease-in-out",
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover object-top"
                style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }} // Fade out bottom
              />
            </div>
          ))}

          {/* Hero Controls */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 h-60 hover:border-2 hover:border-white focus:outline-none"
          >
            <ChevronLeft className="w-10 h-10 text-white drop-shadow-lg" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 h-60 hover:border-2 hover:border-white focus:outline-none"
          >
            <ChevronRight className="w-10 h-10 text-white drop-shadow-lg" />
          </button>
        </div>

        {/* Bento Grid - Overlapping Hero */}
        <div className="absolute top-[220px] sm:top-[200px] md:top-[250px] lg:top-[300px] w-full px-4 z-30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Card 1 */}
            <div className="bg-white p-4 z-30 flex flex-col gap-3 shadow-sm h-[320px]">
              <h2 className="text-xl font-bold text-[#0F1111]">Keep shopping for</h2>
              <div className="grid grid-cols-2 gap-2 flex-1">
                <div className="flex flex-col gap-1 cursor-pointer">
                  <img src={techProducts[0]?.image} className="h-24 object-contain p-1 bg-gray-50 bg-center" alt="" />
                  <span className="text-xs text-gray-500">Smartphones</span>
                </div>
                <div className="flex flex-col gap-1 cursor-pointer">
                  <img src={techProducts[1]?.image} className="h-24 object-contain p-1 bg-gray-50 bg-center" alt="" />
                  <span className="text-xs text-gray-500">Laptops</span>
                </div>
                <div className="flex flex-col gap-1 cursor-pointer">
                  <img src={techProducts[2]?.image} className="h-24 object-contain p-1 bg-gray-50 bg-center" alt="" />
                  <span className="text-xs text-gray-500">Headphones</span>
                </div>
                <div className="flex flex-col gap-1 cursor-pointer">
                  <img src={techProducts[3]?.image} className="h-24 object-contain p-1 bg-gray-50 bg-center" alt="" />
                  <span className="text-xs text-gray-500">Accessories</span>
                </div>
              </div>
              <Link to="/category/Electronics" className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline">See more</Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 z-30 flex flex-col gap-3 shadow-sm h-[320px]">
              <h2 className="text-xl font-bold text-[#0F1111]">Pick up where you left off</h2>
              <div className="grid grid-cols-2 gap-2 flex-1">
                <div className="col-span-2 h-full flex items-center justify-center bg-gray-50">
                  <img src={fashionProducts[0]?.image} className="max-h-40 object-contain" alt="" />
                </div>
              </div>
              <Link to="/category/Fashion" className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline">See more</Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 z-30 flex flex-col gap-3 shadow-sm h-[320px]">
              <h2 className="text-xl font-bold text-[#0F1111]">Shop Deals in Electronics</h2>
              <div className="flex-1 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Electronics" />
              </div>
              <Link to="/category/Electronics" className="text-sm text-[#007185] hover:text-[#c7511f] hover:underline">See all deals</Link>
            </div>

            {/* Card 4 - SignIn / Ad */}
            <div className="bg-white p-4 z-30 flex flex-col gap-3 shadow-sm h-[320px]">
              <h2 className="text-xl font-bold text-[#0F1111]">Sign in for your best experience</h2>
              <button className="amz-btn amz-btn-primary w-full py-2 !rounded-lg text-sm">Sign in securely</button>
              <div className="mt-4">
                <img src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=800&auto=format&fit=crop" className="w-full h-32 object-cover rounded-md" alt="Promo" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Spacing for Bento Grid overlap */}
      <div className="mt-[340px] md:mt-[120px] lg:mt-[20px]" />

      {/* Horizontal Scroll Feed 1 */}
      <div className="max-w-[1500px] mx-auto w-full px-4 mb-6 z-10 relative">
        <div className="bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-[#0F1111]">Best Sellers in Electronics</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
            {techProducts.map((product) => (
              <div key={product.id} className="min-w-[200px] max-w-[200px] flex-none">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Feed 2 */}
      <div className="max-w-[1500px] mx-auto w-full px-4 mb-6 relative">
        <div className="bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-[#0F1111]">Top Fashion Picks</h2>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
            {fashionProducts.map((product) => (
              <div key={product.id} className="min-w-[200px] max-w-[200px] flex-none">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Placeholder within Home for now */}
      <div className="w-full bg-[#131921] h-20 mt-10 flex items-center justify-center text-white text-sm">
        Amazon-Style Footer (Coming Soon)
      </div>

    </div>
  );
}
