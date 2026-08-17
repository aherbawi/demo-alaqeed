import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  MapPin, 
  User, 
  Clock, 
  CreditCard, 
  MessageCircle, 
  CheckCircle2, 
  ShoppingBag,
  Mail
} from 'lucide-react';
import { CartItem, Order } from '../types';
import { BUTCHERY_INFO, CUT_METHODS_LABELS, PACKAGING_LABELS } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.itemTotalPrice, 0);
  const deliveryFee = subtotal >= 40 ? 0 : 2.5;
  const total = subtotal + deliveryFee;

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('abdalrhmanalherbawi@gmail.com');
  const [city, setCity] = useState('عمّان');
  const [area, setArea] = useState('خلدا / دابوق');
  const [streetAddress, setStreetAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState<'morning' | 'afternoon' | 'evening'>('afternoon');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'cliq'>('cash_on_delivery');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const jordanAreas = [
    'خلدا / دابوق / دير غبار',
    'عبدون / الصويفية / أم أذينة',
    'الجاردنز / الشميساني / تلاع العلي',
    'الجبيهة / شفا بدران / أبو نصير',
    'طبربور / ضاحية الرشيد / طارق',
    'مرج الحمام / البيادر / وادي السير',
    'عمّان الشرقية (ماركا، المقابلين، اليادودة)',
    'محافظة الزرقاء / الرصيفة',
    'محافظة إربد',
    'محافظة البلقاء (السلط / الفحيص)',
    'محافظة أخرى'
  ];

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'يرجى إدخال اسمك الكريم';
    if (!phone.trim() || phone.length < 9) errs.phone = 'يرجى إدخال رقم هاتف أردني صحيح (مثل: 0798765432)';
    if (!streetAddress.trim()) errs.streetAddress = 'يرجى إدخال تفاصيل العنوان (الشارع، رقم العمارة/الفيلا)';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Generate formatted WhatsApp message text
  const generateWhatsAppMessage = () => {
    const orderId = `AQD-${Math.floor(100000 + Math.random() * 900000)}`;
    let text = `🥩 *طلب جديد من متجر ملحمة العقيد*\n`;
    text += `🔖 رقم الطلب: ${orderId}\n`;
    text += `👤 اسم الزبون: ${fullName}\n`;
    text += `📱 رقم الهاتف: ${phone}\n`;
    text += `📍 العنوان: ${city} - ${area} (${streetAddress})\n`;
    text += `⏰ موعد التوصيل المفضل: ${deliveryTime === 'morning' ? 'صباحاً (9ص - 12ظ)' : deliveryTime === 'afternoon' ? 'بعد الظهر (12ظ - 5م)' : 'مساءً (5م - 10م)'}\n`;
    text += `💳 طريقة الدفع: ${paymentMethod === 'cash_on_delivery' ? 'دفع عند الاستلام' : `CliQ (كليك: ${BUTCHERY_INFO.cliqAlias})`}\n`;
    text += `\n🛒 *الطلبات والتفصيل:* \n`;

    items.forEach((item, index) => {
      const cut = CUT_METHODS_LABELS[item.cutMethod]?.label || item.cutMethod;
      const pack = PACKAGING_LABELS[item.packaging]?.label?.split('(')[0] || item.packaging;
      text += `${index + 1}) *${item.product.name}*\n`;
      text += `   - الكمية: ${item.quantity} ${item.product.unit}\n`;
      text += `   - التقطيع: ${cut}\n`;
      text += `   - التغليف: ${pack}\n`;
      if (item.customNotes) text += `   - ملاحظة: ${item.customNotes}\n`;
      text += `   - السعر: ${item.itemTotalPrice.toFixed(2)} د.أ\n`;
    });

    text += `\n💰 *المجموع الفرعي:* ${subtotal.toFixed(2)} د.أ\n`;
    text += `🚚 *أجور التوصيل:* ${deliveryFee === 0 ? 'مجاناً' : `${deliveryFee.toFixed(2)} د.أ`}\n`;
    text += `✨ *الإجمالي النهائي:* ${total.toFixed(2)} د.أ\n`;
    if (specialInstructions) text += `\n📝 ملاحظات إضافية: ${specialInstructions}`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppCheckout = () => {
    if (!validate()) return;

    const order: Order = {
      id: `AQD-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      customer: {
        fullName,
        phone,
        email,
        city,
        area,
        streetAddress,
        deliveryTime,
        paymentMethod,
        specialInstructions,
      },
      items,
      subtotal,
      deliveryFee,
      total,
      status: 'pending',
    };

    const waUrl = `https://wa.me/${BUTCHERY_INFO.whatsapp}?text=${generateWhatsAppMessage()}`;
    window.open(waUrl, '_blank');
    onOrderPlaced(order);
  };

  const handleDirectOnlineCheckout = () => {
    if (!validate()) return;

    const order: Order = {
      id: `AQD-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      customer: {
        fullName,
        phone,
        email,
        city,
        area,
        streetAddress,
        deliveryTime,
        paymentMethod,
        specialInstructions,
      },
      items,
      subtotal,
      deliveryFee,
      total,
      status: 'pending',
    };

    onOrderPlaced(order);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-[#E5E0D5] rounded-3xl overflow-hidden shadow-2xl my-8 text-[#2D241E] text-right">
        
        {/* Header */}
        <div className="bg-[#F9F7F2] p-5 sm:p-6 border-b border-[#E5E0D5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8B000015] text-[#8B0000] border border-[#8B000030] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#2D241E] font-serif">إتمام طلب اللحوم والتوصيل</h2>
              <p className="text-xs text-[#6D645E]">حدد عنوانك في الأردن وسيقوم فريق ملحمة العقيد بتجهيز اللحم فوراً</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#F5F2ED] text-[#2D241E] border border-[#E5E0D5] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          
          {/* Customer Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#8B0000]" />
                الاسم الكامل: <span className="text-[#8B0000]">*</span>
              </label>
              <input
                type="text"
                placeholder="مثال: عبدالرحمن الهرباوي"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full bg-[#F9F7F2] border rounded-2xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder-[#A69D91] focus:outline-none focus:border-[#8B0000] focus:bg-white ${
                  errors.fullName ? 'border-[#8B0000]' : 'border-[#E5E0D5]'
                }`}
                id="checkout-fullname"
              />
              {errors.fullName && <p className="text-[10px] text-[#8B0000]">{errors.fullName}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                رقم الهاتف (أردني): <span className="text-[#8B0000]">*</span>
              </label>
              <input
                type="tel"
                placeholder="0798765432"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                dir="ltr"
                className={`w-full bg-[#F9F7F2] border rounded-2xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder-[#A69D91] focus:outline-none focus:border-[#8B0000] focus:bg-white text-right ${
                  errors.phone ? 'border-[#8B0000]' : 'border-[#E5E0D5]'
                }`}
                id="checkout-phone"
              />
              {errors.phone && <p className="text-[10px] text-[#8B0000]">{errors.phone}</p>}
            </div>
          </div>

          {/* Email Info */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#8D6E63]" />
              البريد الإلكتروني لتأكيد الفاتورة:
            </label>
            <input
              type="email"
              placeholder="abdalrhmanalherbawi@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F9F7F2] border border-[#E5E0D5] rounded-2xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder-[#A69D91] focus:outline-none focus:border-[#8B0000] focus:bg-white"
              id="checkout-email"
            />
          </div>

          {/* City & Area Selection in Jordan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#8B0000]" />
                المحافظة:
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#F9F7F2] border border-[#E5E0D5] rounded-2xl px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-none focus:border-[#8B0000]"
              >
                <option value="عمّان">عمّان 🇯🇴</option>
                <option value="الزرقاء">الزرقاء</option>
                <option value="إربد">إربد</option>
                <option value="البلقاء (السلط / الفحيص)">البلقاء (السلط / الفحيص)</option>
                <option value="مأدبا">مأدبا</option>
                <option value="جرش / عجلون">جرش / عجلون</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#8D6E63]" />
                المنطقة / الحي:
              </label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-[#F9F7F2] border border-[#E5E0D5] rounded-2xl px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-none focus:border-[#8B0000]"
              >
                {jordanAreas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Street Address */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#2D241E]">
              تفاصيل العنوان (الشارع، رقم البناء أو معلم قريب): <span className="text-[#8B0000]">*</span>
            </label>
            <input
              type="text"
              placeholder="مثال: شارع وصفي التل، عمارة 45 بجانب صيدلية الواحة، الطابق الثاني"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className={`w-full bg-[#F9F7F2] border rounded-2xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder-[#A69D91] focus:outline-none focus:border-[#8B0000] focus:bg-white ${
                errors.streetAddress ? 'border-[#8B0000]' : 'border-[#E5E0D5]'
              }`}
              id="checkout-street"
            />
            {errors.streetAddress && <p className="text-[10px] text-[#8B0000]">{errors.streetAddress}</p>}
          </div>

          {/* Preferred Delivery Time */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8D6E63]" />
              الوقت المفضل لوصول الطلب المبرد:
            </label>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'morning', label: 'صباحاً', desc: '9:00 ص - 12:00 ظ' },
                { id: 'afternoon', label: 'بعد الظهر', desc: '12:00 ظ - 5:00 م' },
                { id: 'evening', label: 'مساءً', desc: '5:00 م - 10:00 م' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setDeliveryTime(t.id as any)}
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    deliveryTime === t.id
                      ? 'bg-[#8B000010] border-[#8B0000] text-[#8B0000] font-bold shadow-xs'
                      : 'bg-[#F9F7F2] border-[#E5E0D5] text-[#6D645E]'
                  }`}
                >
                  <div className="text-xs">{t.label}</div>
                  <div className="text-[10px] text-[#A69D91]">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
              طريقة الدفع:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div
                onClick={() => setPaymentMethod('cash_on_delivery')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cash_on_delivery'
                    ? 'bg-emerald-50 border-emerald-600 text-[#2D241E] font-bold shadow-xs'
                    : 'bg-[#F9F7F2] border-[#E5E0D5] text-[#6D645E]'
                }`}
              >
                <div className="text-xs text-[#2D241E] font-bold">💵 الدفع نقد عند الاستلام (COD)</div>
                <div className="text-[10px] text-[#6D645E] mt-0.5">ادفع لكابتن التوصيل بعد استلام اللحم وفحصه</div>
              </div>

              <div
                onClick={() => setPaymentMethod('cliq')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cliq'
                    ? 'bg-[#8B000010] border-[#8B0000] text-[#2D241E] font-bold shadow-xs'
                    : 'bg-[#F9F7F2] border-[#E5E0D5] text-[#6D645E]'
                }`}
              >
                <div className="text-xs text-[#8B0000] font-bold">⚡ تحويل فوري كليك (CliQ)</div>
                <div className="text-[10px] text-[#6D645E] font-mono mt-0.5">Alias: {BUTCHERY_INFO.cliqAlias}</div>
              </div>
            </div>
          </div>

          {/* Special Delivery Instructions */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#2D241E]">
              تعليمات خاصة بالتوصيل (اختياري):
            </label>
            <input
              type="text"
              placeholder="مثال: رن الجرس، ترك الطلب عند الباب، الاتصال قبل الوصول بنصف ساعة..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full bg-[#F9F7F2] border border-[#E5E0D5] rounded-2xl px-3.5 py-2 text-xs text-[#2D241E] placeholder-[#A69D91] focus:outline-none focus:border-[#8B0000]"
            />
          </div>

          {/* Summary Mini Box */}
          <div className="bg-[#F5F2ED] p-3.5 rounded-2xl border border-[#E5E0D5] flex items-center justify-between text-xs">
            <div>
              <span className="text-[#6D645E]">إجمالي الطلب ({items.length} صنف):</span>
              <div className="font-mono font-bold text-lg text-[#8B0000]">
                {total.toFixed(2)} <span className="text-xs text-[#2D241E]">د.أ</span>
              </div>
            </div>
            <div className="text-left text-[11px] text-[#6D645E]">
              <div>المجموع: {subtotal.toFixed(2)} د.أ</div>
              <div>التوصيل: {deliveryFee === 0 ? 'مجاني' : `${deliveryFee.toFixed(2)} د.أ`}</div>
            </div>
          </div>

        </div>

        {/* Footer with Dual Order Buttons */}
        <div className="p-5 sm:p-6 bg-[#F9F7F2] border-t border-[#E5E0D5] flex flex-col sm:flex-row items-center gap-3">
          
          {/* WhatsApp Direct Order Button */}
          <button
            onClick={handleWhatsAppCheckout}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-xs sm:text-sm py-3.5 rounded-full shadow-md transition-transform active:scale-95"
            id="btn-checkout-whatsapp"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>طلب فوري عبر الواتساب (موصى به)</span>
          </button>

          {/* Direct Online Confirmation Button */}
          <button
            onClick={handleDirectOnlineCheckout}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#8B0000] hover:bg-[#720000] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md transition-colors"
            id="btn-checkout-online"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>تأكيد الطلب أونلاين</span>
          </button>

        </div>

      </div>
    </div>
  );
};
