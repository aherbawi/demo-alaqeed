import React from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowLeft, 
  Sparkles, 
  Package, 
  Scissors, 
  Flame,
  Plus,
  Minus
} from 'lucide-react';
import { CartItem } from '../types';
import { 
  CUT_METHODS_LABELS, 
  PACKAGING_LABELS, 
  MARINADE_LABELS 
} from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (cartItemId: string) => void;
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  const deliveryFee = subtotal > 0 ? (subtotal >= 40 ? 0 : 2.5) : 0; // Free delivery over 40 JOD in Amman
  const total = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-start animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full border-l border-[#E5E0D5] flex flex-col justify-between shadow-2xl relative animate-slideLeft text-[#2D241E]">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#F9F7F2] border-b border-[#E5E0D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#8B000015] text-[#8B0000] border border-[#8B000030] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#2D241E] font-serif">سلة طلبات اللحوم</h2>
              <p className="text-[11px] text-[#6D645E]">
                {items.length} {items.length === 1 ? 'صنف مختار' : 'أصناف مختارة'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#F5F2ED] text-[#2D241E] border border-[#E5E0D5] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 divide-y divide-[#E5E0D5]">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F5F2ED] flex items-center justify-center mx-auto text-[#A69D91] border border-[#E5E0D5]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-[#2D241E]">السلة فارغة حالياً</h3>
              <p className="text-xs text-[#6D645E] max-w-xs mx-auto">
                اختر ما يناسبك من اللحوم البلدية، الذبائح، أو بوكسات الشواء مع خيارات التقطيع والتغليف.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-[#8B0000] hover:bg-[#720000] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors shadow-xs"
              >
                تصفح قائمة اللحوم
              </button>
            </div>
          ) : (
            items.map((item) => {
              const cutInfo = CUT_METHODS_LABELS[item.cutMethod];
              const packInfo = PACKAGING_LABELS[item.packaging];
              const marinadeInfo = MARINADE_LABELS[item.marinade];

              return (
                <div key={item.cartItemId} className="pt-3 first:pt-0 space-y-2 text-right">
                  
                  {/* Top line: Name & Remove */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-xl object-cover border border-[#E5E0D5] shrink-0"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#2D241E] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="text-xs text-[#8B0000] font-bold font-mono">
                          {item.itemTotalPrice.toFixed(2)} د.أ
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="text-[#A69D91] hover:text-[#8B0000] p-1.5 rounded-lg hover:bg-[#F5F2ED] transition-colors"
                      title="حذف من السلة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Cut & Packaging Badges */}
                  <div className="bg-[#F9F7F2] p-2.5 rounded-2xl border border-[#E5E0D5] space-y-1 text-[11px] text-[#2D241E]">
                    <div className="flex items-center gap-1">
                      <Scissors className="w-3 h-3 text-[#8B0000] shrink-0" />
                      <span>التقطيع: <strong>{cutInfo?.label || item.cutMethod}</strong></span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Package className="w-3 h-3 text-[#8D6E63] shrink-0" />
                      <span>التغليف: <strong>{packInfo?.label?.split('(')[0] || item.packaging}</strong></span>
                    </div>

                    {item.marinade !== 'none' && (
                      <div className="flex items-center gap-1 text-emerald-800">
                        <Flame className="w-3 h-3 shrink-0" />
                        <span>التتبيل: <strong>{marinadeInfo?.label}</strong></span>
                      </div>
                    )}

                    {item.customNotes && (
                      <div className="text-[10px] text-[#6D645E] border-t border-[#E5E0D5] pt-1 mt-1">
                        ملاحظة: {item.customNotes}
                      </div>
                    )}
                  </div>

                  {/* Weight / Quantity Controls (if per kg) */}
                  {item.product.priceType === 'per_kg' && (
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[#6D645E]">الوزن:</span>
                      <div className="flex items-center gap-2 bg-[#F9F7F2] border border-[#E5E0D5] rounded-xl p-1">
                        <button
                          onClick={() => {
                            if (item.quantity > 0.5) {
                              onUpdateQuantity(item.cartItemId, item.quantity - 0.5);
                            }
                          }}
                          className="w-6 h-6 rounded-lg bg-white hover:bg-[#EAE4DC] text-[#2D241E] border border-[#E5E0D5] flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="font-mono font-bold text-[#8B0000] px-2">
                          {item.quantity} كغم
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 0.5)}
                          className="w-6 h-6 rounded-lg bg-[#8B0000] hover:bg-[#720000] text-white flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#F9F7F2] border-t border-[#E5E0D5] space-y-3">
            
            {/* Free Delivery Bar in Jordan */}
            <div className="bg-white p-2.5 rounded-2xl border border-[#E5E0D5] text-[11px] text-center shadow-xs">
              {subtotal >= 40 ? (
                <span className="text-emerald-800 font-bold">
                  🎉 مبروك! طلبك مؤهل للتوصيل المجاني في عمّان
                </span>
              ) : (
                <span className="text-[#6D645E]">
                  أضف بـ <strong className="text-[#8B0000] font-mono">{(40 - subtotal).toFixed(2)} د.أ</strong> للحصول على توصيل مجاني!
                </span>
              )}
            </div>

            {/* Calculations Summary */}
            <div className="space-y-1 text-xs text-[#6D645E]">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-mono font-bold text-[#2D241E]">{subtotal.toFixed(2)} د.أ</span>
              </div>
              <div className="flex justify-between">
                <span>أجور التوصيل المبرد (عمّان):</span>
                <span className="font-mono font-bold text-[#2D241E]">
                  {deliveryFee === 0 ? <span className="text-emerald-700 font-bold">مجاناً</span> : `${deliveryFee.toFixed(2)} د.أ`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2D241E] pt-2 border-t border-[#E5E0D5]">
                <span>الإجمالي النهائي:</span>
                <span className="font-mono text-[#8B0000] text-lg">{total.toFixed(2)} د.أ</span>
              </div>
            </div>

            {/* Proceed Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full flex items-center justify-center gap-2 bg-[#8B0000] hover:bg-[#720000] text-white font-bold text-sm py-3.5 rounded-full shadow-md transition-transform active:scale-95"
              id="drawer-proceed-checkout-btn"
            >
              <span>متابعة لتحديد العنوان وتأكيد الطلب</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
