import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShoppingBag, 
  Scissors, 
  Package, 
  Flame, 
  Plus, 
  Minus, 
  Check, 
  Beef
} from 'lucide-react';
import { Product, CartItem, CutMethod, PackagingType, FatLevel, MarinadeOption } from '../types';
import { 
  CUT_METHODS_LABELS, 
  PACKAGING_LABELS, 
  FAT_LABELS,
  MARINADE_LABELS 
} from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  // Configuration state
  const [quantity, setQuantity] = useState<number>(product.defaultWeight || 1);
  const [selectedCut, setSelectedCut] = useState<CutMethod>(product.availableCutMethods[0] || 'refrigerator');
  const [selectedPackaging, setSelectedPackaging] = useState<PackagingType>(product.availablePackaging[0] || 'vacuum');
  const [selectedFat, setSelectedFat] = useState<FatLevel>('medium_fat');
  const [selectedMarinade, setSelectedMarinade] = useState<MarinadeOption>('none');
  const [customNotes, setCustomNotes] = useState<string>('');

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setQuantity(product.defaultWeight || 1);
      setSelectedCut(product.availableCutMethods[0] || 'refrigerator');
      setSelectedPackaging(product.availablePackaging[0] || 'vacuum');
      setSelectedFat('medium_fat');
      setSelectedMarinade('none');
      setCustomNotes('');
    }
  }, [product]);

  // Calculate final total price
  const calculateTotalPrice = () => {
    return product.priceType === 'per_kg' 
      ? product.price * quantity 
      : product.price;
  };

  const handleAdd = () => {
    const cartItem: CartItem = {
      cartItemId: `${product.id}-${Date.now()}`,
      product,
      quantity,
      cutMethod: selectedCut,
      packaging: selectedPackaging,
      fatLevel: selectedFat,
      marinade: selectedMarinade,
      customNotes: customNotes.trim() || undefined,
      itemTotalPrice: calculateTotalPrice(),
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-[#E5E0D5] rounded-3xl overflow-hidden shadow-2xl my-8 text-right text-[#2D241E]">
        
        {/* Header Ribbon */}
        <div className="relative h-48 sm:h-56 bg-[#EFEBE9] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors backdrop-blur-xs"
            id="close-product-modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Header */}
          <div className="absolute bottom-4 right-4 left-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#8B0000] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {product.origin}
              </span>
              <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                {product.unit}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif">{product.name}</h2>
            <p className="text-xs text-neutral-200 line-clamp-1">{product.description}</p>
          </div>
        </div>

        {/* Modal Body / Customizer Fields */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Weight / Quantity Selector (if per_kg) */}
          {product.priceType === 'per_kg' && (
            <div className="bg-[#F9F7F2] p-4 rounded-2xl border border-[#E5E0D5] space-y-2">
              <label className="text-xs font-bold text-[#2D241E] flex items-center justify-between">
                <span>اختر الوزن المطلوب (بالكيلوغرام):</span>
                <span className="text-[#8B0000] font-mono text-sm font-bold">
                  {quantity} كغم = {(product.price * quantity).toFixed(2)} د.أ
                </span>
              </label>

              <div className="flex items-center justify-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))}
                  className="w-10 h-10 rounded-full bg-white border border-[#E5E0D5] hover:bg-[#F5F2ED] text-[#2D241E] flex items-center justify-center font-bold text-lg transition-colors shadow-xs"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="bg-white px-6 py-2 rounded-2xl border border-[#E5E0D5] text-center min-w-[120px] shadow-xs">
                  <span className="font-mono font-black text-xl text-[#8B0000]">
                    {quantity}
                  </span>
                  <span className="text-xs text-[#6D645E] mr-1">كغم</span>
                </div>

                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 0.5)}
                  className="w-10 h-10 rounded-full bg-[#8B0000] hover:bg-[#720000] text-white flex items-center justify-center font-bold text-lg transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Quick weight buttons */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {[1, 2, 3, 5, 10].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setQuantity(w)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all ${
                      quantity === w 
                        ? 'bg-[#8B0000] text-white border-[#8B0000] font-bold' 
                        : 'bg-white text-[#6D645E] border-[#E5E0D5] hover:border-[#8B000040]'
                    }`}
                  >
                    {w} كغم
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cut Method Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
                <Scissors className="w-4 h-4 text-[#8B0000]" />
                <span>طريقة التقطيع والتفصيل المفضلة:</span>
              </label>
              <span className="text-[11px] text-[#8B0000] font-bold">مجاناً</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {product.availableCutMethods.map((cutKey) => {
                const info = CUT_METHODS_LABELS[cutKey];
                const isSelected = selectedCut === cutKey;

                return (
                  <button
                    key={cutKey}
                    type="button"
                    onClick={() => setSelectedCut(cutKey)}
                    className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#8B000010] border-[#8B0000] text-[#8B0000] shadow-xs'
                        : 'bg-[#F9F7F2] border-[#E5E0D5] text-[#2D241E] hover:border-[#8B000040]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-xs">{info?.label || cutKey}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#8B0000]" />}
                    </div>
                    {info?.desc && (
                      <span className="text-[10px] text-[#6D645E] mt-1 line-clamp-1">{info.desc}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Packaging Type */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
              <Package className="w-4 h-4 text-[#8D6E63]" />
              <span>نوع التغليف والتعبئة:</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {product.availablePackaging.map((packKey) => {
                const info = PACKAGING_LABELS[packKey];
                const isSelected = selectedPackaging === packKey;

                return (
                  <button
                    key={packKey}
                    type="button"
                    onClick={() => setSelectedPackaging(packKey)}
                    className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#8B000010] border-[#8B0000] text-[#8B0000] shadow-xs'
                        : 'bg-[#F9F7F2] border-[#E5E0D5] text-[#2D241E] hover:border-[#8B000040]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-xs">{info?.label || packKey}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#8B0000]" />}
                    </div>
                    {info?.desc && (
                      <span className="text-[10px] text-[#6D645E] mt-1">{info.desc}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fat preference for lamb & veal */}
          {product.allowFatCustomization && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
                <Beef className="w-4 h-4 text-[#8B0000]" />
                <span>رغبتك في نسبة الدهن / اللية:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['pure_lean', 'light_fat', 'medium_fat', 'rich_fat'] as FatLevel[]).map((f) => {
                  const info = FAT_LABELS[f];
                  const isSelected = selectedFat === f;
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setSelectedFat(f)}
                      className={`p-2.5 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'bg-[#8B000010] border-[#8B0000] text-[#8B0000] font-bold shadow-xs'
                          : 'bg-[#F9F7F2] border-[#E5E0D5] text-[#6D645E]'
                      }`}
                    >
                      <div className="text-xs">{info?.label?.split('(')[0] || f}</div>
                      <div className="text-[10px] text-[#A69D91] mt-0.5">{info?.desc?.split(' ')[0] || ''}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Marinade Selection if available */}
          {product.allowMarinade && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#8B0000]" />
                <span>التتبيل والبهارات (خدمة مجانية من الملحمة):</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {(Object.keys(MARINADE_LABELS) as MarinadeOption[]).map((marKey) => {
                  const info = MARINADE_LABELS[marKey];
                  const isSelected = selectedMarinade === marKey;

                  return (
                    <button
                      key={marKey}
                      type="button"
                      onClick={() => setSelectedMarinade(marKey)}
                      className={`p-2.5 rounded-2xl border text-right transition-all ${
                        isSelected
                          ? 'bg-[#8B000010] border-[#8B0000] text-[#8B0000] font-bold shadow-xs'
                          : 'bg-[#F9F7F2] border-[#E5E0D5] text-[#6D645E]'
                      }`}
                    >
                      <div className="text-xs font-bold">{info.label}</div>
                      <div className="text-[10px] text-[#A69D91] mt-0.5">{info.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Notes */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#2D241E]">
              ملاحظات خاصة للحام (اختياري):
            </label>
            <textarea
              rows={2}
              placeholder="مثال: فصل عظام الرقبة لحالها، دق الريش برقة، عدم فرم الشحم..."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full bg-[#F9F7F2] border border-[#E5E0D5] rounded-2xl p-3 text-xs text-[#2D241E] placeholder-[#A69D91] focus:outline-none focus:border-[#8B0000]"
            />
          </div>

        </div>

        {/* Modal Footer with Total and Add to Cart */}
        <div className="p-5 sm:p-6 bg-[#F9F7F2] border-t border-[#E5E0D5] flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-[#6D645E]">إجمالي الصنف بالتفصيل:</div>
            <div className="text-2xl font-black text-[#8B0000] font-mono">
              {calculateTotalPrice().toFixed(2)} <span className="text-xs font-bold text-[#2D241E]">د.أ</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#8B0000] hover:bg-[#720000] text-white px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95"
            id="modal-add-to-cart-btn"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>إضافة للسلة والطلب</span>
          </button>
        </div>

      </div>
    </div>
  );
};
