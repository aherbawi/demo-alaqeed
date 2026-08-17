import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Printer, 
  Phone, 
  MapPin, 
  MessageCircle, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { Order } from '../types';
import { BUTCHERY_INFO, CUT_METHODS_LABELS } from '../data/products';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
}) => {
  useEffect(() => {
    if (order) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [order]);

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppContact = () => {
    const text = `مرحباً ملحمة العقيد، بخصوص طلبي رقم ${order.id} باسم ${order.customer.fullName}.`;
    window.open(`https://wa.me/${BUTCHERY_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white border border-[#E5E0D5] rounded-3xl overflow-hidden shadow-2xl my-8 text-right text-[#2D241E]">
        
        {/* Header Ribbon */}
        <div className="bg-[#F9F7F2] p-6 border-b border-[#E5E0D5] text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#3E2723] font-serif">تم استلام طلبك بنجاح!</h2>
          <p className="text-xs text-[#6D645E]">
            شكراً لثقتكم بملحمة العقيد. سيقوم كادر الملحمة بتجهيز اللحوم الطازجة فوراً.
          </p>
        </div>

        {/* Invoice Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          
          {/* Order Meta */}
          <div className="bg-[#F9F7F2] p-3.5 rounded-2xl border border-[#E5E0D5] flex items-center justify-between text-xs">
            <div>
              <span className="text-[#6D645E] block">رقم الطلب:</span>
              <span className="font-mono font-bold text-[#8B0000] text-base">{order.id}</span>
            </div>
            <div>
              <span className="text-[#6D645E] block">تاريخ الطلب:</span>
              <span className="text-[#2D241E]">{new Date(order.createdAt).toLocaleDateString('ar-JO')}</span>
            </div>
            <div>
              <span className="text-[#6D645E] block">حالة الطلب:</span>
              <span className="text-emerald-700 font-bold">جاري التجهيز 🥩</span>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="bg-[#F9F7F2] p-3.5 rounded-2xl border border-[#E5E0D5] space-y-1.5 text-xs text-[#2D241E]">
            <div className="font-bold text-[#3E2723] mb-1">تفاصيل التوصيل:</div>
            <div>👤 العميل: <strong className="text-[#2D241E]">{order.customer.fullName}</strong> ({order.customer.phone})</div>
            <div>📍 العنوان: {order.customer.city} - {order.customer.area} ({order.customer.streetAddress})</div>
            <div>💳 الدفع: {order.customer.paymentMethod === 'cash_on_delivery' ? 'دفع عند الاستلام' : `كليك (CliQ: ${BUTCHERY_INFO.cliqAlias})`}</div>
          </div>

          {/* Ordered items */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-[#2D241E]">الأصناف المطلوبة:</div>
            <div className="divide-y divide-[#E5E0D5] bg-[#F9F7F2] rounded-2xl p-3 border border-[#E5E0D5]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2 first:pt-0 last:pb-0 flex items-start justify-between gap-2 text-xs">
                  <div>
                    <span className="font-bold text-[#2D241E]">{item.product.name}</span>
                    <span className="text-[#6D645E] block text-[11px]">
                      {item.quantity} {item.product.unit} • {CUT_METHODS_LABELS[item.cutMethod]?.label || item.cutMethod}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#8B0000]">
                    {item.itemTotalPrice.toFixed(2)} د.أ
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-[#F9F7F2] p-3.5 rounded-2xl border border-[#E5E0D5] space-y-1 text-xs text-[#6D645E]">
            <div className="flex justify-between">
              <span>المجموع الفرعي:</span>
              <span className="font-mono text-[#2D241E]">{order.subtotal.toFixed(2)} د.أ</span>
            </div>
            <div className="flex justify-between">
              <span>التوصيل:</span>
              <span className="font-mono text-[#2D241E]">{order.deliveryFee === 0 ? 'مجاني' : `${order.deliveryFee.toFixed(2)} د.أ`}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#2D241E] pt-2 border-t border-[#E5E0D5]">
              <span>الإجمالي:</span>
              <span className="font-mono text-[#8B0000] text-base">{order.total.toFixed(2)} د.أ</span>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-5 bg-[#F9F7F2] border-t border-[#E5E0D5] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleWhatsAppContact}
            className="flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>متابعة الطلب عبر الواتساب</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-white hover:bg-[#F5F2ED] text-[#2D241E] text-xs px-3.5 py-2.5 rounded-full border border-[#E5E0D5] transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة</span>
            </button>
            <button
              onClick={onClose}
              className="bg-[#8B0000] hover:bg-[#720000] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors shadow-xs"
            >
              العودة للمتجر
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
