/**
 * Google Merch+ Product Catalog
 * Realistic Google merchandise with categories, sustainability attributes,
 * pricing, ratings, reviews, and bundle associations.
 */

import dinoHoodieImg from '../assets/images/chrome_dino_hoodie_1790186738599.jpg';
import stickerPackImg from '../assets/images/google_sticker_pack_1790186716154.jpg';
import googleEcoTeeImg from '../assets/images/google_eco_tee_1790187522477.jpg';
import androidBotPlushImg from '../assets/images/android_bot_plush_1790187542854.jpg';
import googleCapImg from '../assets/images/google_logo_cap_1790187998688.jpg';
import googleWaterBottleImg from '../assets/images/google_water_bottle_1790188030072.jpg';
import googleSocksImg from '../assets/images/google_socks_pack_1790188792702.jpg';
import youtubeTumblerImg from '../assets/images/youtube_tumbler_1790188808431.jpg';
import googleNotebookImg from '../assets/images/google_notebook_set_1790189348811.jpg';
import tensorTechOrganizerImg from '../assets/images/tensor_tech_organizer_1790189364595.jpg';
import googleCloudWindbreakerImg from '../assets/images/google_cloud_windbreaker_1790189377392.jpg';
import pixelBackpackImg from '../assets/images/pixel_commuter_backpack_1790185649108.jpg';
import pixelBackpackInteriorImg from '../assets/images/pixel_backpack_interior_1790185665306.jpg';
import pixelBackpackDetailImg from '../assets/images/pixel_backpack_detail_1790185680438.jpg';
import heroMerchImg from '../assets/images/hero_google_merch_collection_1790184505313.jpg';

export interface ProductColor {
  name: string;
  hex: string;
  bgClass: string;
}

export type CategoryName = 'Apparel' | 'Accessories' | 'Drinkware' | 'Backpacks' | 'Bags' | 'Bags & Backpacks' | 'Office & Tech' | 'Collectibles' | 'Lifestyle' | 'New Arrivals';

export interface Product {
  id: string;
  name: string;
  category: CategoryName;
  price: number;
  rating: number;
  reviewsCount: number;
  badge?: 'Bestseller' | 'Trending' | 'Eco-Choice' | 'New';
  isTrending?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  image: string;
  galleryImages: string[];
  description: string;
  sustainableSpecs: string[];
  colors: ProductColor[];
  sizes?: string[];
  inStock: boolean;
  completeLookIds?: string[];
  material: string;
  details: string[];
}

export interface Category {
  id: string;
  name: CategoryName;
  description: string;
  itemCount: number;
  accentColor: string;
  icon: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'apparel',
    name: 'Apparel',
    description: 'Organic hoodies, tees & outerwear',
    itemCount: 24,
    accentColor: '#1a73e8', // Google Blue
    icon: 'Shirt',
    image: dinoHoodieImg,
  },
  {
    id: 'backpacks',
    name: 'Backpacks',
    description: 'Weatherproof backpacks & everyday tech carry',
    itemCount: 14,
    accentColor: '#ea4335', // Google Red
    icon: 'Briefcase',
    image: pixelBackpackImg,
  },
  {
    id: 'drinkware',
    name: 'Drinkware',
    description: 'Double-walled tumblers & thermal bottles',
    itemCount: 18,
    accentColor: '#fbbc04', // Google Yellow
    icon: 'Coffee',
    image: googleWaterBottleImg,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Caps, socks, beanies & tech organizers',
    itemCount: 22,
    accentColor: '#34a853', // Google Green
    icon: 'Watch',
    image: googleCapImg,
  },
  {
    id: 'office-tech',
    name: 'Office & Tech',
    description: 'Recycled journals, desk pads & cable kits',
    itemCount: 16,
    accentColor: '#1a73e8',
    icon: 'Laptop',
    image: tensorTechOrganizerImg,
  },
  {
    id: 'collectibles',
    name: 'Collectibles',
    description: 'Vinyl sticker packs, Android bots & pins',
    itemCount: 12,
    accentColor: '#34a853',
    icon: 'Sparkles',
    image: stickerPackImg,
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    description: 'Zero-waste daily essentials & picnic kits',
    itemCount: 15,
    accentColor: '#fbbc04',
    icon: 'Compass',
    image: heroMerchImg,
  },
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    description: 'Fresh seasonal drops & experimental series',
    itemCount: 9,
    accentColor: '#ea4335',
    icon: 'Zap',
    image: googleCloudWindbreakerImg,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Chrome Dino Zip Hoodie',
    category: 'Apparel',
    price: 68.00,
    rating: 4.9,
    reviewsCount: 342,
    badge: 'Trending',
    isTrending: true,
    isBestseller: true,
    image: dinoHoodieImg,
    galleryImages: [dinoHoodieImg, heroMerchImg],
    description: 'Our most iconic streetwear apparel piece. Crafted from 400 GSM heavyweight organic French terry cotton with a crisp white embroidered 8-bit pixel Chrome offline Dino (T-Rex) on the left chest. Features a full-front metal zipper, matching drawstrings with metal aglets, dual split kangaroo pockets, and ribbed cuffs and hem.',
    sustainableSpecs: [
      '100% GOTS certified organic fleece cotton',
      'Non-toxic low-impact water-based dyes',
      'YKK recycled metal zipper mechanism',
      'Zero single-use plastic packaging'
    ],
    colors: [
      { name: 'Matte Black', hex: '#18181b', bgClass: 'bg-zinc-900' },
      { name: 'Charcoal Heather', hex: '#27272a', bgClass: 'bg-zinc-800' },
      { name: 'Google Navy', hex: '#1e3a8a', bgClass: 'bg-blue-900' },
      { name: 'Bone White', hex: '#e4e4e7', bgClass: 'bg-zinc-200' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    completeLookIds: ['prod-003', 'prod-006'], // Backpack + Cap
    material: '100% Organic French Terry Cotton',
    details: [
      'Heavyweight 400 GSM brushed organic fleece',
      'Crisp white 8-bit pixel Chrome Dino chest embroidery',
      'Full-front YKK metal zipper with custom pull',
      'Double-lined hood with matching drawstrings & metal aglets',
      'Split kangaroo pouch pockets and ribbed waistband'
    ],
  },
  {
    id: 'prod-002',
    name: 'Google Eco Unisex Tee',
    category: 'Apparel',
    price: 32.00,
    rating: 4.8,
    reviewsCount: 512,
    badge: 'Eco-Choice',
    isTrending: true,
    isBestseller: true,
    image: googleEcoTeeImg,
    galleryImages: [googleEcoTeeImg, dinoHoodieImg],
    description: 'The foundation of everyday Google style. Crafted from 100% GOTS certified organic ring-spun cotton with the iconic vibrant Google "G" logo centered on the chest, a clean four-color interior neck label, and an authentic woven Google "G" hem tab. Pre-shrunk, breathable, and designed for effortless everyday wear.',
    sustainableSpecs: [
      '100% GOTS certified ring-spun organic cotton',
      'Saves 70 gallons of water per shirt vs conventional cotton',
      'Non-toxic low-impact water-based inks',
      'Carbon-neutral certified shipment'
    ],
    colors: [
      { name: 'Pure Chalk', hex: '#f8fafc', bgClass: 'bg-slate-50' },
      { name: 'Google Navy', hex: '#1e3a8a', bgClass: 'bg-blue-900' },
      { name: 'Slate Gray', hex: '#475569', bgClass: 'bg-slate-600' },
      { name: 'Forest Green', hex: '#166534', bgClass: 'bg-emerald-800' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    completeLookIds: ['prod-006', 'prod-008'], // Cap + Water Bottle
    material: '100% Ring-spun Organic Cotton',
    details: [
      'Medium-weight 180 GSM single jersey with ultra-soft hand feel',
      'Center-chest high-definition screen printed Google "G" icon',
      'Discreet woven four-color Google brand flag label at bottom hem',
      'Seamless tubular body construction and tagless neck comfort',
      'Machine wash cold, tumble dry low'
    ],
  },
  {
    id: 'prod-003',
    name: 'Pixel Commuter Backpack',
    category: 'Backpacks',
    price: 89.00,
    rating: 4.9,
    reviewsCount: 288,
    badge: 'Bestseller',
    isTrending: true,
    isBestseller: true,
    image: pixelBackpackImg,
    galleryImages: [pixelBackpackImg, pixelBackpackInteriorImg, pixelBackpackDetailImg],
    description: 'Engineered specifically for everyday creators, engineers, and tech commuters. Features a dedicated padded 16-inch laptop compartment, organized tech accessories sleeves for cables and power banks, side water bottle holder with embossed Google G logo, weather-resistant ballistic shell, and air-mesh shoulder straps with authentic Google colorway tag.',
    sustainableSpecs: [
      'Made from 38 recycled ocean-bound plastic bottles (RPET)',
      'Fluorocarbon-free DWR water-resistant technical coating',
      'Ergonomic airflow back panel with luggage trolley pass-through',
      'Lifetime zipper and seam warranty'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#0f172a', bgClass: 'bg-slate-950' },
      { name: 'Storm Grey', hex: '#334155', bgClass: 'bg-slate-700' },
      { name: 'Dune Sand', hex: '#a8a29e', bgClass: 'bg-stone-400' },
    ],
    inStock: true,
    completeLookIds: ['prod-001', 'prod-006'], // Hoodie + Cap
    material: '1680D Recycled Ballistic Polyester',
    details: [
      'Padded 16" laptop & tablet compartment with rapid top-access zipper',
      'Internal organizer for power bank, cables, stylus, and accessories',
      'Side stretch hydration pocket fitted for Google insulated tumblers',
      'Breathable padded air-mesh shoulder straps with woven Google G label'
    ],
  },
  {
    id: 'prod-004',
    name: 'YouTube Stainless Steel Tumbler',
    category: 'Drinkware',
    price: 34.00,
    rating: 4.8,
    reviewsCount: 215,
    badge: 'Trending',
    isTrending: true,
    isBestseller: true,
    image: youtubeTumblerImg,
    galleryImages: [youtubeTumblerImg],
    description: 'Elevate your daily hydration with the official YouTube insulated travel tumbler. Finished in premium matte black powder coat with polished stainless steel top and bottom accents, featuring the iconic red YouTube Play button logo front and center. Includes a crystal-clear splash-resistant slider lid.',
    sustainableSpecs: [
      'Food-grade 18/8 kitchen stainless steel',
      '100% BPA and Phthalate-free construction',
      'Eliminates ~300 disposable coffee cups annually',
      'Recycled protective packaging'
    ],
    colors: [
      { name: 'Matte Black', hex: '#18181b', bgClass: 'bg-zinc-900' },
      { name: 'Brushed Steel', hex: '#cbd5e1', bgClass: 'bg-slate-300' },
    ],
    inStock: true,
    material: 'Double-Wall Vacuum 18/8 Stainless Steel',
    details: [
      '20 oz / 590 ml liquid capacity',
      'Keeps hot beverages piping for 8+ hours, cold for 24+ hours',
      'Sleek tapered base fits standard vehicle cup holders',
      'Crystal-clear splash-resistant slider sip lid',
      'Brushed stainless steel rim and base rim reinforcement'
    ],
  },
  {
    id: 'prod-005',
    name: 'Android Bot Plush',
    category: 'Collectibles',
    price: 24.00,
    rating: 4.9,
    reviewsCount: 421,
    badge: 'Bestseller',
    isTrending: true,
    isBestseller: true,
    image: androidBotPlushImg,
    galleryImages: [androidBotPlushImg, stickerPackImg],
    description: 'The beloved Android Bugdroid mascot brought to life in an ultra-soft, premium tactile plush. Features soft textured lime-green velour fleece, clean embroidered white circular eyes, dual dome antennae, and poseable arms. Sits stably on your desk, workstation, or bookshelf.',
    sustainableSpecs: [
      '100% recycled poly-fill fiber stuffing',
      'OEKO-TEX Standard 100 non-toxic certified materials',
      'Zero microplastic shedding fleece',
      'Biodegradable craft gift box'
    ],
    colors: [
      { name: 'Classic Android Green', hex: '#16a34a', bgClass: 'bg-green-600' },
      { name: 'Dark Mode Slate', hex: '#334155', bgClass: 'bg-slate-700' },
    ],
    inStock: true,
    material: 'Super-soft Recycled Micro-Velour',
    details: [
      'Height: 8 inches (20 cm) tall',
      'Child-safe embroidered circular eyes and seam construction',
      'Weighted base pellet pack so it stands firmly on desks and shelves',
      'Surface washable with gentle warm water',
      'Official Google Hardware collectible series'
    ],
  },
  {
    id: 'prod-006',
    name: 'Google Logo Cap',
    category: 'Accessories',
    price: 28.00,
    rating: 4.8,
    reviewsCount: 310,
    badge: 'Trending',
    isTrending: true,
    isBestseller: true,
    image: googleCapImg,
    galleryImages: [googleCapImg],
    description: 'Minimalist 6-panel unstructured dad cap crafted from organic washed navy cotton twill. Features the iconic high-density embroidered multi-colored Google "G" logo on the front crown, curved visor with tonal stitching, breathable eyelets, and custom antique brass buckle closure on the back strap.',
    sustainableSpecs: [
      '100% organic cotton twill',
      'Plastic-free curved brim core made from recycled cardboard',
      'Recycled thread embroidery'
    ],
    colors: [
      { name: 'Deep Navy', hex: '#1e3a8a', bgClass: 'bg-blue-900' },
      { name: 'Pitch Black', hex: '#09090b', bgClass: 'bg-zinc-950' },
      { name: 'Sand Khaki', hex: '#d6d3d1', bgClass: 'bg-stone-300' },
    ],
    sizes: ['One Size (Adjustable)'],
    inStock: true,
    completeLookIds: ['prod-001', 'prod-003'], // Hoodie + Backpack
    material: '100% Washed Organic Cotton Twill',
    details: [
      'Adjustable 54-61cm circumference with brass slider',
      'Front center high-density embroidered Google "G" emblem',
      'Pre-curved visor with moisture-wicking internal sweatband',
      'Ventilated embroidered eyelets for breathability'
    ],
  },
  {
    id: 'prod-007',
    name: 'Google Notebook Set',
    category: 'Office & Tech',
    price: 26.00,
    rating: 4.8,
    reviewsCount: 195,
    badge: 'Bestseller',
    isBestseller: true,
    image: googleNotebookImg,
    galleryImages: [googleNotebookImg],
    description: 'Executive journal and writing gift set presented in a custom Google keepsake box. Includes a premium black hardcover lay-flat dot-grid notebook with elastic band and multi-colored Google "G" logo, matching white Google branded metal rollerball pen, and a 4-color sticky note index tab palette.',
    sustainableSpecs: [
      'FSC certified post-consumer recycled paper and cardboard',
      'Refillable metal pen cartridge to minimize plastic waste',
      'Non-toxic soy-based ink printing',
      '100% recyclable keepsake presentation box'
    ],
    colors: [
      { name: 'Obsidian & Chalk', hex: '#18181b', bgClass: 'bg-zinc-900' },
      { name: 'Kraft & Slate', hex: '#78716c', bgClass: 'bg-stone-500' },
    ],
    inStock: true,
    material: 'Upcycled Sugarcane Fiber Paper & Recycled Hardcover',
    details: [
      'A5 size (5.8 x 8.3 in / 148 x 210 mm) 192 numbered dot-grid pages',
      'Includes custom Google branded precision rollerball pen',
      'Includes 4-color Google sticky page flags (Blue, Red, Yellow, Green)',
      'Lays completely 180° flat with dual ribbon place markers and back pocket',
      'Delivered in an authentic white Google gift presentation box'
    ],
  },
  {
    id: 'prod-008',
    name: 'Pixel Water Bottle',
    category: 'Drinkware',
    price: 36.00,
    rating: 4.9,
    reviewsCount: 247,
    badge: 'Bestseller',
    isBestseller: true,
    image: googleWaterBottleImg,
    galleryImages: [googleWaterBottleImg],
    description: 'Clean, minimalist double-walled vacuum-insulated stainless steel water bottle. Features a durable powder-coated matte porcelain white finish with the official vibrant Google "G" logo, leakproof brushed stainless steel screw lid, and an integrated flexible silicone carry loop strap. Keeps cold beverages chilled for 24+ hours.',
    sustainableSpecs: [
      '18/8 food-grade recyclable stainless steel body',
      'BPA/BPS-free silicone tether strap and leakproof gasket',
      'Zero single-use plastic packaging',
      'Saves estimated 1,400 single-use bottles over lifespan'
    ],
    colors: [
      { name: 'Porcelain White', hex: '#f8fafc', bgClass: 'bg-slate-50' },
      { name: 'Hazel Green', hex: '#65a30d', bgClass: 'bg-lime-600' },
      { name: 'Obsidian Black', hex: '#1e293b', bgClass: 'bg-slate-800' },
    ],
    inStock: true,
    material: '18/8 Medical Grade Stainless Steel',
    details: [
      '24 oz / 710 ml volume capacity',
      'Brushed stainless steel twist cap with flexible silicone tether loop',
      'High-grade vibrant multi-color Google "G" front print',
      'Double-wall vacuum insulation prevents sweating and maintains temperature'
    ],
  },
  {
    id: 'prod-009',
    name: 'Google Socks 3-Pack (Gift Box)',
    category: 'Accessories',
    price: 24.00,
    rating: 4.8,
    reviewsCount: 230,
    badge: 'Bestseller',
    isBestseller: true,
    image: googleSocksImg,
    galleryImages: [googleSocksImg],
    description: 'Three pairs of premium ribbed crew socks presented in an authentic Google branded gift box. Includes crisp Pure White, Heather Grey, and Deep Black pairs, each featuring high-density embroidery of the vibrant multi-colored Google "G" logo. Crafted with a cushioned sole and targeted arch compression.',
    sustainableSpecs: [
      '80% certified organic combed cotton',
      '18% recycled polyester, 2% spandex for shape retention',
      'Water-saving low-impact yarn dyes',
      '100% recyclable FSC-certified presentation gift box'
    ],
    colors: [
      { name: 'Tri-Color Gift Set (White, Grey, Black)', hex: '#64748b', bgClass: 'bg-slate-500' },
    ],
    sizes: ['S/M (US 6-9)', 'L/XL (US 9.5-13)'],
    inStock: true,
    material: '80% Organic Cotton, 18% Recycled Poly, 2% Elastane',
    details: [
      'Set of 3 pairs: Pure White, Heather Grey, and Pitch Black',
      'High-definition multi-colored Google "G" embroidered emblem',
      'Cushioned terry footbed for shock absorption and all-day comfort',
      'Targeted arch compression band and stay-up ribbed calf cuff',
      'Delivered in an authentic matte white Google keepsake gift box'
    ],
  },
  {
    id: 'prod-010',
    name: 'Google Vinyl Sticker Pack (Collector Edition)',
    category: 'Collectibles',
    price: 15.00,
    rating: 4.9,
    reviewsCount: 560,
    badge: 'Bestseller',
    isTrending: true,
    isBestseller: true,
    image: stickerPackImg,
    galleryImages: [stickerPackImg],
    description: 'Curated premium die-cut vinyl sticker set celebrating Google, Chrome, Android, and creator culture. Includes Google multi-color logotype, green Android bot, Chrome browser emblem, YouTube play icon, Google Cloud logo, 8-bit offline pixel Chrome Dino, "Good Ideas Ahead", and "Make It Happen" with Google four-color underline. Complete with official Google Merch+ keepsake card.',
    sustainableSpecs: [
      'PVC-free polypropylene eco-film with UV matte laminate',
      'Non-toxic residue-free clean-peel adhesive',
      '100% recyclable glassine backing paper with soy inks'
    ],
    colors: [
      { name: 'Full Spectrum Pack', hex: '#4285f4', bgClass: 'bg-blue-600' },
    ],
    inStock: true,
    material: 'Weatherproof Matte Eco-Film Vinyl',
    details: [
      '8 distinctive die-cut collector vinyl decals',
      'UV and scratch-resistant matte laminate finish',
      '100% waterproof and dishwasher safe for tumblers and bottles',
      'Safe for laptops, MacBooks, iPad cases, notebooks, and monitors',
      'Leaves zero sticky residue upon removal'
    ],
  },
  {
    id: 'prod-011',
    name: 'Tensor G-Series Tech Organizer',
    category: 'Office & Tech',
    price: 45.00,
    rating: 4.9,
    reviewsCount: 148,
    badge: 'New',
    isNewArrival: true,
    image: tensorTechOrganizerImg,
    galleryImages: [tensorTechOrganizerImg],
    description: 'Purpose-built hardware gear case tailored for Google Pixel phones, Pixel Buds, Tensor chargers, and cables. Crafted in heather charcoal melange with a molded Google "G" badge, clamshell 180° flat opening, interior stretch mesh cable organizers with "Build Connect Create" tag, and custom padded device cradles.',
    sustainableSpecs: [
      '100% recycled 600D heather poly-twill exterior fabric',
      'Cushioned shock-absorbent recycled EVA foam wall protection',
      'YKK recycled dual-zipper mechanism with rubberized Google pulls',
      'Delivered in matte black Tensor series collectible box'
    ],
    colors: [
      { name: 'Heather Charcoal', hex: '#4b5563', bgClass: 'bg-gray-600' },
      { name: 'Anthracite', hex: '#18181b', bgClass: 'bg-zinc-900' },
    ],
    inStock: true,
    material: 'Recycled 600D Weather-Resistant Poly-Twill',
    details: [
      'Dimensions: 9.5 x 5.8 x 2.8 in (fits Pixel Pro, Buds, 65W brick & cords)',
      '180° clamshell flat opening for effortless airport security checks',
      'Dual-layer cable retention mesh pockets and memory card sleeves',
      'Integrated soft-touch carry handle and luggage strap pass-through'
    ],
  },
  {
    id: 'prod-012',
    name: 'Google Cloud Engineer Windbreaker',
    category: 'Apparel',
    price: 95.00,
    rating: 4.9,
    reviewsCount: 116,
    badge: 'New',
    isNewArrival: true,
    image: googleCloudWindbreakerImg,
    galleryImages: [googleCloudWindbreakerImg],
    description: 'Technical weather-resistant hooded windbreaker celebrating the Google Cloud builder community. Clean white shell featuring high-impact geometric color-blocked sleeves (Royal Blue & Red right arm, Emerald Green & Chrome Yellow left arm), with the Google Cloud multi-color logo and "Google Cloud Engineer" chest insignia.',
    sustainableSpecs: [
      '100% post-consumer recycled micro-ripstop polyester',
      'PFC-free eco water-repellent DWR coating',
      'Bluesign certified sustainable textile production',
      'Recycled composite drawcord toggles and zipper pulls'
    ],
    colors: [
      { name: 'Cloud White Colorblock', hex: '#f8fafc', bgClass: 'bg-slate-50' },
      { name: 'Obsidian Black', hex: '#09090b', bgClass: 'bg-zinc-950' },
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    inStock: true,
    completeLookIds: ['prod-003', 'prod-006'],
    material: '100% Recycled 50D Micro-Ripstop Polyester',
    details: [
      'Engineered for light rain and wind protection (windproof up to 45 mph)',
      'Full front zip with high-collar chin guard and adjustable hood toggles',
      'Dual zippered hand pockets and internal device slip pocket',
      'Elastic cuffs and adjustable cinch waist hem for heat retention'
    ],
  }
];

// Curated bundles for "Complete Your Look"
export interface BundleLook {
  id: string;
  name: string;
  subtitle: string;
  mainProductId: string;
  complementaryProductIds: string[];
  discountPercentage: number;
}

export const COMPLETE_LOOK_BUNDLES: BundleLook[] = [
  {
    id: 'bundle-commuter',
    name: 'Everyday Creator Trio',
    subtitle: 'Chrome Dino Hoodie + Google Cap + Pixel Commuter Backpack',
    mainProductId: 'prod-001',
    complementaryProductIds: ['prod-006', 'prod-003'],
    discountPercentage: 15, // 15% off when bought together
  },
  {
    id: 'bundle-campus',
    name: 'Campus Eco Minimalist',
    subtitle: 'Google Eco Unisex Tee + Pixel Water Bottle + Notebook Set',
    mainProductId: 'prod-002',
    complementaryProductIds: ['prod-008', 'prod-007'],
    discountPercentage: 12,
  },
  {
    id: 'bundle-desk',
    name: 'Desk & Commute Pro',
    subtitle: 'Pixel Backpack + Tech Organizer + YouTube Tumbler',
    mainProductId: 'prod-003',
    complementaryProductIds: ['prod-011', 'prod-004'],
    discountPercentage: 15,
  }
];
