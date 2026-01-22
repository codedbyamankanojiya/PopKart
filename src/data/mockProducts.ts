import type { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: 11,
    name: 'iPhone 15 Pro Max',
    price: 159900.99,
    category: 'Smartphone',
    image:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
    description:
      '6.7-inch Super Retina XDR display with ProMotion technology, A17 Pro chip, titanium design.',
    rating: 4.8,
    reviews: 2156,
    inStock: true,
  },
  {
    id: 12,
    name: 'Samsung Galaxy S24 Ultra',
    price: 124999.99,
    category: 'Smartphone',
    image:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
    description: '6.8-inch Dynamic AMOLED display, S Pen included, 200MP camera, AI features.',
    rating: 4.7,
    reviews: 1834,
    inStock: true,
  },
  {
    id: 13,
    name: 'Google Pixel 8 Pro',
    price: 106999.99,
    category: 'Smartphone',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
    description: '6.7-inch LTPO OLED display, Google Tensor G3 chip, advanced AI photography.',
    rating: 4.6,
    reviews: 1245,
    inStock: true,
  },
  {
    id: 301,
    name: 'OnePlus 12R 5G',
    price: 39999.99,
    category: 'Smartphone',
    image:
      'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=1000&q=80',
    description: '120Hz AMOLED, Snapdragon performance, fast charging, clean feel for daily power users.',
    rating: 4.5,
    reviews: 892,
    inStock: true,
  },
  {
    id: 302,
    name: 'Nothing Phone (2)',
    price: 44999.99,
    category: 'Smartphone',
    image:
      'https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=1000&q=80',
    description: 'Signature Glyph design, smooth OLED, premium build, clean UI with great battery life.',
    rating: 4.4,
    reviews: 640,
    inStock: true,
  },
  {
    id: 303,
    name: 'Xiaomi 14 Ultra',
    price: 99999.99,
    category: 'Smartphone',
    image:
      'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=1000&q=80',
    description: 'Pro camera system, bright LTPO display, flagship performance for creators and gamers.',
    rating: 4.6,
    reviews: 418,
    inStock: true,
  },

  {
    id: 14,
    name: 'NVIDIA RTX 4090 Founders Edition',
    price: 164999.99,
    category: 'Gaming PC Gears',
    image:
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1000&q=80',
    description: 'Ultimate gaming graphics card with 24GB GDDR6X memory, ray tracing, DLSS 3.',
    rating: 4.9,
    reviews: 1567,
    inStock: true,
  },
  {
    id: 15,
    name: 'Intel Core i9-14900K',
    price: 59999.99,
    category: 'Gaming PC Gears',
    image:
      'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=1000&q=80',
    description: '24-core processor with up to 6.0 GHz boost clock, perfect for gaming and creation.',
    rating: 4.8,
    reviews: 892,
    inStock: true,
  },
  {
    id: 304,
    name: 'AMD Ryzen 7 7800X3D',
    price: 38999.99,
    category: 'Gaming PC Gears',
    image:
      'https://images.unsplash.com/photo-1612810436541-336b3d0f7657?auto=format&fit=crop&w=1000&q=80',
    description: 'Best-in-class gaming CPU with 3D V-Cache, smooth 1% lows, efficient performance.',
    rating: 4.9,
    reviews: 1443,
    inStock: true,
  },
  {
    id: 305,
    name: 'Corsair 32GB DDR5 6000MHz Kit',
    price: 11999.99,
    category: 'Gaming PC Gears',
    image:
      'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1000&q=80',
    description: 'High-speed DDR5 memory for esports and creation, stable XMP profiles, premium heatsink.',
    rating: 4.7,
    reviews: 768,
    inStock: true,
  },
  {
    id: 306,
    name: 'Samsung 990 Pro 2TB NVMe SSD',
    price: 15999.99,
    category: 'Gaming PC Gears',
    image:
      'https://images.unsplash.com/photo-1587202372775-e6a36f82f7f8?auto=format&fit=crop&w=1000&q=80',
    description: 'Blazing fast PCIe 4.0 storage with top-tier endurance and consistent real-world speeds.',
    rating: 4.8,
    reviews: 932,
    inStock: true,
  },

  {
    id: 24,
    name: 'MacBook Pro 16 M3 Max',
    price: 299999.99,
    category: 'Laptop',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80',
    description: '16-inch Liquid Retina XDR, M3 Max chip, 32GB RAM, 1TB SSD',
    rating: 4.9,
    reviews: 234,
    inStock: true,
  },
  {
    id: 25,
    name: 'ASUS ROG Strix G15 Gaming Laptop',
    price: 89999.99,
    category: 'Laptop',
    image:
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1000&q=80',
    description: '15.6-inch 144Hz, RTX 4060, Ryzen 7, 16GB RAM, 512GB SSD',
    rating: 4.7,
    reviews: 567,
    inStock: true,
  },
  {
    id: 307,
    name: 'HP Pavilion 14 (OLED)',
    price: 74999.99,
    category: 'Laptop',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    description: 'Compact OLED laptop for study and work: sharp visuals, solid battery, comfortable keyboard.',
    rating: 4.4,
    reviews: 412,
    inStock: true,
  },
  {
    id: 308,
    name: 'Lenovo IdeaPad Slim 5',
    price: 64999.99,
    category: 'Laptop',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80',
    description: 'Lightweight daily laptop with fast SSD, crisp display, and strong multitasking performance.',
    rating: 4.5,
    reviews: 980,
    inStock: true,
  },
  {
    id: 309,
    name: 'Dell XPS 13 Plus',
    price: 149999.99,
    category: 'Laptop',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1000&q=80',
    description: 'Premium ultrabook with edge-to-edge design, sharp display, and a top-tier trackpad feel.',
    rating: 4.6,
    reviews: 520,
    inStock: true,
  },

  {
    id: 34,
    name: 'Premium Cotton Formal Shirt',
    price: 2499.99,
    category: "Men's Fashion",
    image:
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
    description: '100% cotton, slim fit, wrinkle-resistant, multiple colors.',
    rating: 4.4,
    reviews: 123,
    inStock: true,
  },
  {
    id: 310,
    name: 'Classic Denim Jacket - Dark Wash',
    price: 3499.99,
    category: "Men's Fashion",
    image:
      'https://images.unsplash.com/photo-1520975958225-9d2cce5501bd?auto=format&fit=crop&w=1000&q=80',
    description: 'A timeless denim jacket with sturdy stitching and a clean silhouette for daily wear.',
    rating: 4.5,
    reviews: 286,
    inStock: true,
  },
  {
    id: 311,
    name: 'Premium Leather Sneakers',
    price: 4999.99,
    category: "Men's Fashion",
    image:
      'https://images.unsplash.com/photo-1528701800489-20be3c84c0f2?auto=format&fit=crop&w=1000&q=80',
    description: 'Clean minimal sneakers with cushioned sole, comfortable fit, and easy-to-style profile.',
    rating: 4.6,
    reviews: 741,
    inStock: true,
  },
  {
    id: 312,
    name: 'Slim Fit Chinos - Beige',
    price: 1999.99,
    category: "Men's Fashion",
    image:
      'https://images.unsplash.com/photo-1520974735194-6a0a5fa2bb1c?auto=format&fit=crop&w=1000&q=80',
    description: 'Soft stretch chinos built for all-day comfort. Dress up or down, always looks sharp.',
    rating: 4.4,
    reviews: 534,
    inStock: true,
  },
  {
    id: 68,
    name: 'Elegant Silk Saree - Kanjivaram',
    price: 12999.99,
    category: "Women's Fashion",
    image:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    description: 'Pure Kanjivaram silk, traditional temple border, rich colors, handwoven.',
    rating: 4.8,
    reviews: 234,
    inStock: true,
  },
  {
    id: 313,
    name: 'Classic Kurti Set - Festive',
    price: 2999.99,
    category: "Women's Fashion",
    image:
      'https://images.unsplash.com/photo-1618354691404-16b3fcf1a049?auto=format&fit=crop&w=1000&q=80',
    description: 'Comfort-first festive kurti set with premium fabric feel and a flattering drape.',
    rating: 4.5,
    reviews: 812,
    inStock: true,
  },
  {
    id: 314,
    name: 'Premium Handbag - Everyday Tote',
    price: 3999.99,
    category: "Women's Fashion",
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    description: 'Roomy and structured tote with clean lines, sturdy handles, and an elevated finish.',
    rating: 4.6,
    reviews: 420,
    inStock: true,
  },
  {
    id: 315,
    name: 'Minimal Gold-Plated Earrings',
    price: 1299.99,
    category: "Women's Fashion",
    image:
      'https://images.unsplash.com/photo-1520975751320-7ccda6fd7c6c?auto=format&fit=crop&w=1000&q=80',
    description: 'Everyday minimal earrings with a soft shine, comfortable for all-day wear.',
    rating: 4.4,
    reviews: 315,
    inStock: true,
  },

  {
    id: 230,
    name: 'Xbox Series S',
    price: 34999.99,
    category: 'Gaming Console',
    image:
      'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=1000&q=80',
    description: 'Compact design, 1440p gaming, 512GB SSD, Game Pass ready.',
    rating: 4.6,
    reviews: 567,
    inStock: true,
  },
  {
    id: 316,
    name: 'PlayStation 5 Slim',
    price: 54999.99,
    category: 'Gaming Console',
    image:
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1000&q=80',
    description: 'Next-gen performance, fast loading, immersive haptics. Compact design with premium finish.',
    rating: 4.8,
    reviews: 2045,
    inStock: true,
  },
  {
    id: 317,
    name: 'Nintendo Switch OLED',
    price: 33999.99,
    category: 'Gaming Console',
    image:
      'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=1000&q=80',
    description: 'Vibrant OLED screen, portable play, great exclusives. Dock and play on TV instantly.',
    rating: 4.7,
    reviews: 1780,
    inStock: true,
  },

  {
    id: 76,
    name: 'Samsung 65 QLED 4K Smart TV',
    price: 89999.99,
    category: 'Television',
    image:
      'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?auto=format&fit=crop&w=1000&q=80',
    description: 'Quantum dot technology, HDR10+, smart features, voice control.',
    rating: 4.8,
    reviews: 245,
    inStock: true,
  },
  {
    id: 318,
    name: 'Sony 55 Bravia 4K HDR TV',
    price: 75999.99,
    category: 'Television',
    image:
      'https://images.unsplash.com/photo-1520092352425-9699926a9d33?auto=format&fit=crop&w=1000&q=80',
    description: 'Cinematic color, smooth motion, and strong upscaling. Ideal for movies and console gaming.',
    rating: 4.7,
    reviews: 890,
    inStock: true,
  },
  {
    id: 319,
    name: 'Mi 43 4K Android TV',
    price: 26999.99,
    category: 'Television',
    image:
      'https://images.unsplash.com/photo-1601944179066-aca3d9a4d6a1?auto=format&fit=crop&w=1000&q=80',
    description: 'Budget 4K smart TV with smooth streaming apps, crisp panel, and easy casting support.',
    rating: 4.4,
    reviews: 1320,
    inStock: true,
  },

  {
    id: 64,
    name: 'Wireless Mouse RGB Gaming',
    price: 2499.99,
    category: 'PC Accessories',
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80',
    description: 'High precision sensor, customizable RGB lighting, ergonomic design.',
    rating: 4.5,
    reviews: 120,
    inStock: true,
  },
  {
    id: 320,
    name: 'Mechanical Keyboard - Hot Swappable',
    price: 5999.99,
    category: 'PC Accessories',
    image:
      'https://images.unsplash.com/photo-1541140134513-85a161dc4a00?auto=format&fit=crop&w=1000&q=80',
    description: 'Thocky mechanical feel, customizable switches, sturdy build for gaming and typing.',
    rating: 4.6,
    reviews: 1540,
    inStock: true,
  },
  {
    id: 321,
    name: '1080p 60fps Webcam',
    price: 2999.99,
    category: 'PC Accessories',
    image:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1000&q=80',
    description: 'Clear video calls with noise-reduced mic, wide angle lens, and easy plug-and-play setup.',
    rating: 4.3,
    reviews: 890,
    inStock: true,
  },
  {
    id: 322,
    name: 'USB-C Hub 8-in-1',
    price: 2499.99,
    category: 'PC Accessories',
    image:
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1000&q=80',
    description: 'Expand ports instantly: HDMI, USB, SD card, and charging passthrough for laptops and tablets.',
    rating: 4.4,
    reviews: 670,
    inStock: true,
  },

  {
    id: 90,
    name: 'Smart Fitness Band Pro',
    price: 3999.99,
    category: 'Gadgets',
    image:
      'https://images.unsplash.com/photo-1576243345690-4e4b79b63227?auto=format&fit=crop&w=1000&q=80',
    description: 'AMOLED display, 7-day battery, heart-rate tracking, sleep insights, water resistant.',
    rating: 4.4,
    reviews: 680,
    inStock: true,
  },
  {
    id: 323,
    name: 'Noise Cancelling Earbuds',
    price: 4999.99,
    category: 'Gadgets',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80',
    description: 'Punchy sound, strong ANC, low-latency mode, and a compact case for daily carry.',
    rating: 4.5,
    reviews: 2140,
    inStock: true,
  },
  {
    id: 324,
    name: 'Portable Power Bank 20000mAh',
    price: 2999.99,
    category: 'Gadgets',
    image:
      'https://images.unsplash.com/photo-1587033411391-5d9a9e3d6d73?auto=format&fit=crop&w=1000&q=80',
    description: 'Fast charge support, dual output, travel friendly. Keeps your phone topped up for days.',
    rating: 4.4,
    reviews: 3022,
    inStock: true,
  },
  {
    id: 325,
    name: 'Smart Speaker Mini',
    price: 3499.99,
    category: 'Gadgets',
    image:
      'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=1000&q=80',
    description: 'Room-filling sound, voice assistant support, and quick device pairing for home control.',
    rating: 4.3,
    reviews: 1340,
    inStock: true,
  },

  {
    id: 43,
    name: 'Ray-Ban Aviator Classic',
    price: 8999.99,
    category: 'Glasses',
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
    description: 'Classic aviator design, UV protection, gold frame, green lenses.',
    rating: 4.6,
    reviews: 234,
    inStock: true,
  },
  {
    id: 326,
    name: 'Blue Light Blocking Glasses',
    price: 1299.99,
    category: 'Glasses',
    image:
      'https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=1000&q=80',
    description: 'Comfortable lightweight frame designed for long screen sessions with reduced glare.',
    rating: 4.3,
    reviews: 980,
    inStock: true,
  },
  {
    id: 327,
    name: 'Premium Round Frame Sunglasses',
    price: 2499.99,
    category: 'Glasses',
    image:
      'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1000&q=80',
    description: 'Trendy round design with UV protection and a comfortable nose bridge for daily wear.',
    rating: 4.4,
    reviews: 410,
    inStock: true,
  },
];

export const categoryImages: Record<string, string> = {
  Smartphone:
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2080&q=80',
  'Gaming PC Gears':
    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=2042&q=80',
  Laptop:
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=2071&q=80',
  "Men's Fashion":
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=2070&q=80',
  "Women's Fashion":
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=2088&q=80',
  'Gaming Console':
    'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=2070&q=80',
  Television:
    'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?auto=format&fit=crop&w=2070&q=80',
  'PC Accessories':
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=2067&q=80',
  Gadgets:
    'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=2021&q=80',
  Glasses:
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=2080&q=80',
};

export const categories = Object.keys(categoryImages);
