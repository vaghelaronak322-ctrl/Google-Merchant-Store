import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Leaf, 
  RotateCcw, 
  Globe, 
  ShieldCheck, 
  Check, 
  Minus, 
  Plus, 
  Ruler, 
  X, 
  ArrowLeft,
  Share2,
  Sparkles
} from 'lucide-react';
import { Product, COMPLETE_LOOK_BUNDLES } from '../data/products';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import { ga4 } from '../services/ga4';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onProceedToCheckout: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBack,
  onSelectProduct,
  onProceedToCheckout,
}) => {
  const { addToCart, toggleWishlist, isInWishlist, markAsViewed } = useCart();
  
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[1] || product.sizes[0] : '');
  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [measurementUnit, setMeasurementUnit] = useState<'inches' | 'cm'>('inches');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const isWishlisted = isInWishlist(product.id);

  // Trigger GA4 view_item event & record in recently viewed
  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedColor(product.colors[0]?.name || '');
    setSelectedSize(product.sizes ? product.sizes[1] || product.sizes[0] : '');
    setQuantity(1);
    markAsViewed(product.id);

    ga4.viewItem({
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    onProceedToCheckout();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Find related products ("You May Also Like")
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Fallback if less than 4 in same category
  const youMayAlsoLike = relatedProducts.length >= 3 
    ? relatedProducts 
    : [...relatedProducts, ...allProducts.filter((p) => p.id !== product.id)].slice(0, 4);

  // Look for curated bundle or generate from completeLookIds
  const bundleItems = (product.completeLookIds || [])
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Storefront</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Product'}</span>
          </button>
        </div>

        {/* Main Product Layout: Sticky Gallery (Left) & Contiguous Purchase Module (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[4/3] rounded-2xl bg-slate-100 overflow-hidden border border-slate-200/70 group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-slate-900 text-white shadow-sm">
                    {product.badge}
                  </span>
                </div>
              )}

              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-slate-700 hover:text-rose-500 shadow-md flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-blue-600 ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} angle ${i + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Material & Sustainability Specs Pillows */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Sustainable Material Integrity</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.sustainableSpecs.map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category, Rating & Reviews */}
              <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                <span className="font-semibold text-blue-600 uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 text-slate-800">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-xs tabular-nums">{product.rating}</span>
                  <span className="text-slate-400 text-xs">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                {product.name}
              </h1>

              {/* Price & Stock */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900 tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  In Stock · Ready to Ship
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900 mb-2.5">
                    <span>Color: <span className="font-normal text-slate-600">{selectedColor}</span></span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`group relative p-1 rounded-full border-2 transition-all cursor-pointer ${
                          selectedColor === color.name
                            ? 'border-blue-600 scale-110 shadow-xs'
                            : 'border-transparent hover:border-slate-300'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="block w-6 h-6 rounded-full border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection & Size Guide */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900 mb-2.5">
                    <span>Size: <span className="font-normal text-slate-600">{selectedSize}</span></span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-6">
                <label className="block text-xs font-semibold text-slate-900 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200/80">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-xs tabular-nums text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-slate-400">
                    Max 10 per customer
                  </span>
                </div>
              </div>

              {/* Primary & Secondary Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart · ${(product.price * quantity).toFixed(2)}</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>Buy Now · Direct Express Checkout</span>
                </button>
              </div>

              {/* Trust Indicators Below CTA */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-2.5">
                  <Leaf className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Sustainable Material</div>
                    <div className="text-[11px] text-slate-500">{product.material}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <RotateCcw className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Easy Returns</div>
                    <div className="text-[11px] text-slate-500">30-day return window</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Worldwide Shipping</div>
                    <div className="text-[11px] text-slate-500">Free delivery over $50</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Secure Checkout</div>
                    <div className="text-[11px] text-slate-500">256-bit SSL encrypted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Your Look Section (Contextual to current PDP) */}
        {bundleItems.length > 0 && (
          <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Style Synergy
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mt-0.5">
                  Complete Your Look
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Engineered complementary pairings tailored for this merchandise item.
                </p>
              </div>

              <button
                onClick={() => {
                  bundleItems.forEach((item) => addToCart(item));
                  addToCart(product, selectedColor, selectedSize, 1);
                }}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add Set to Bag</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundleItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectProduct(item)}
                  className="group bg-slate-50 hover:bg-white rounded-2xl p-4 border border-slate-200/80 transition-all cursor-pointer flex items-center gap-4 hover:shadow-md"
                >
                  <div className="w-20 h-20 rounded-xl bg-slate-200 overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5 tabular-nums">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* You May Also Like Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Related Recommendations
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-display mt-0.5">
                You May Also Like
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {youMayAlsoLike.map((item, idx) => (
              <ProductCard
                key={item.id}
                product={item}
                onSelectProduct={onSelectProduct}
                listName="You May Also Like"
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Add to Cart Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden z-40 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <div className="text-[11px] text-slate-500 truncate max-w-[140px]">{product.name}</div>
          <div className="text-sm font-bold text-slate-900 tabular-nums">${product.price.toFixed(2)}</div>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:bg-blue-600 shadow-md cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Interactive Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsSizeGuideOpen(false)}
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Sizing & Fit Guide
                </h3>
              </div>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metric/Inches toggle */}
            <div className="flex items-center justify-between my-4">
              <span className="text-xs text-slate-500">Select measurement units:</span>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setMeasurementUnit('inches')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                    measurementUnit === 'inches' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                  }`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setMeasurementUnit('cm')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                    measurementUnit === 'cm' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                  }`}
                >
                  Centimeters
                </button>
              </div>
            </div>

            {/* Measurement Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="py-2.5 px-3 rounded-l-lg">Size</th>
                    <th className="py-2.5 px-3">Chest</th>
                    <th className="py-2.5 px-3">Length</th>
                    <th className="py-2.5 px-3 rounded-r-lg">Sleeve</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {[
                    { size: 'XS', chest: measurementUnit === 'inches' ? '34-36"' : '86-91 cm', length: measurementUnit === 'inches' ? '27"' : '68 cm', sleeve: measurementUnit === 'inches' ? '32"' : '81 cm' },
                    { size: 'S', chest: measurementUnit === 'inches' ? '36-38"' : '91-96 cm', length: measurementUnit === 'inches' ? '28"' : '71 cm', sleeve: measurementUnit === 'inches' ? '33"' : '84 cm' },
                    { size: 'M', chest: measurementUnit === 'inches' ? '38-40"' : '96-101 cm', length: measurementUnit === 'inches' ? '29"' : '73 cm', sleeve: measurementUnit === 'inches' ? '34"' : '86 cm' },
                    { size: 'L', chest: measurementUnit === 'inches' ? '40-42"' : '101-106 cm', length: measurementUnit === 'inches' ? '30"' : '76 cm', sleeve: measurementUnit === 'inches' ? '35"' : '89 cm' },
                    { size: 'XL', chest: measurementUnit === 'inches' ? '42-44"' : '106-111 cm', length: measurementUnit === 'inches' ? '31"' : '78 cm', sleeve: measurementUnit === 'inches' ? '36"' : '91 cm' },
                    { size: '2XL', chest: measurementUnit === 'inches' ? '44-46"' : '111-116 cm', length: measurementUnit === 'inches' ? '32"' : '81 cm', sleeve: measurementUnit === 'inches' ? '37"' : '94 cm' },
                  ].map((row) => (
                    <tr key={row.size} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3 font-bold text-slate-900">{row.size}</td>
                      <td className="py-2 px-3 tabular-nums">{row.chest}</td>
                      <td className="py-2 px-3 tabular-nums">{row.length}</td>
                      <td className="py-2 px-3 tabular-nums">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-[11px] text-slate-500 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
              <strong>Fit advice:</strong> Designed with a relaxed modern unisex silhouette. If you prefer a tailored fit, size down one size.
            </p>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="mt-5 w-full py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
