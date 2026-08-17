import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  Beef, 
  Package, 
  Scissors, 
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Flame,
  Info
} from 'lucide-react';
import { CartItem, Product, CutMethod, PackagingType } from '../types';
import { CUT_METHODS_LABELS, PACKAGING_LABELS } from '../data/products';

interface CustomCarcassBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const CustomCarcassBuilder: React.FC<CustomCarcassBuilderProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedBreed, setSelectedBreed] = useState<string>('naimi_baladi');
  const [weight, setWeight] = useState<number>(18);
  const [selectedCut, setSelectedCut] = useState<CutMethod>('mansaf_large');
  const [selectedPackaging, setSelectedPackaging] = useState<PackagingType>('vacuum');
  const [includeOffal, setIncludeOffal] = useState<boolean>(true);
  const [headOption, setHeadOption] = useState<'burned' | 'boiled' | 'raw'>('burned');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  if (!isOpen) return null;

  const breeds = [
    {
      id: 'naimi_baladi',
      name: 'خروف نعيمي بلدي أردني فاخر',
      pricePerKg: 10.5,
      minWeight: 14,
      maxWeight: 26,
      desc: 'مرعى طبيعي، قليل الدهن، لحم طري جداً ومثالي للمنسف والمناسبات.',
      badge: 'الخيار الملكي 👑',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'romanian_fresh',
      name: 'خروف روماني طازج ذبح مسلخ عمّان',
      pricePerKg: 7.9,
      minWeight: 15,
      maxWeight: 24,
      desc: 'طازج يذبح يومياً، ممتاز للطبخ المنزلي والعزائم بأسعار اقتصادية.',
      badge: 'الأكثر طلباً ⭐',
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'goat_baladi',
      name: 'جدي / تيس بلدي عوارضي',
      pricePerKg: 9.5,
      minWeight: 10,
      maxWeight: 18,
      desc: 'لحم أحمر خفيف وصحي، قليل الكوليسترول وله نكهة بلدية مميزة.',
      badge: 'صحي وخفيف 🌱',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const currentBreedObj = breeds.find(b => b.id === selectedBreed) || breeds[0];
  const totalPrice = currentBreedObj.pricePerKg * weight + (selectedPackaging === 'vacuum' ? 2.5 : 0);

  const handleFinish = () => {
    const customProduct: Product = {
      id: `custom-carcass-${Date.now()}`,
      name: `ذبيحة ${currentBreedObj.name} (وزن تقريبي ${weight} كغم)`,
      nameEn: `Custom Carcass (${weight} kg)`,
      category: 'carcasses',
      price: totalPrice,
      priceType: 'per_unit',
      defaultWeight: weight,
      unit: `ذبيحة كاملة (${weight} كغم)`,
      image: currentBreedObj.image,
      description: `ذبيحة مفصلة بطلب خاص: تقطيع ${CUT_METHODS_LABELS[selectedCut]?.label || selectedCut}، تغليف ${PACKAGING_LABELS[selectedPackaging]?.label?.split('(')[0] || selectedPackaging}، رأس ${headOption === 'burned' ? 'مشوط' : 'مسلوخ'}.`,
      origin: currentBreedObj.id === 'naimi_baladi' ? 'أردني بلدي 🇯🇴' : 'طازج مسلخ عمّان',
      availableCutMethods: [selectedCut],
      availablePackaging: [selectedPackaging],
      allowMarinade: false,
      allowFatCustomization: true,
      isFreshDaily: true,
      rating: 5.0,
      reviewsCount: 1,
    };

    const cartItem: CartItem = {
      cartItemId: `carcass-custom-${Date.now()}`,
      product: customProduct,
      quantity: 1,
      cutMethod: selectedCut,
      packaging: selectedPackaging,
      fatLevel: 'rich_fat',
      marinade: 'none',
      customNotes: `تفصيل الرأس: ${headOption === 'burned' ? 'مشوط على النار' : headOption === 'boiled' ? 'مسلوخ أبيض' : 'نيء'}. المعلاق والأحشاء: ${includeOffal ? 'مطلوبة ومغلفة' : 'غير مطلوبة'}. ${specialNotes}`,
      itemTotalPrice: totalPrice,
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white border border-[#E5E0D5] rounded-3xl overflow-hidden shadow-2xl my-8 text-right text-[#2D241E]">
        
        {/* Header */}
        <div className="bg-[#F9F7F2] p-5 sm:p-6 border-b border-[#E5E0D5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8B000015] text-[#8B0000] border border-[#8B000030] flex items-center justify-center">
              <Beef className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#2D241E] font-serif">معالج تفصيل الذبائح والمواشي</h2>
              <p className="text-xs text-[#6D645E]">فصّل ذبيحتك كما تحب بإشراف لحامك الخاص في ملحمة العقيد</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#F5F2ED] text-[#2D241E] border border-[#E5E0D5] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 pt-4 pb-2 bg-[#F5F2ED] border-b border-[#E5E0D5] flex items-center justify-between">
          {[
            { s: 1, title: '١. نوع الذبيحة والوزن' },
            { s: 2, title: '٢. التقطيع والتغليف' },
            { s: 3, title: '٣. الرأس والمعلاق وتأكيد' },
          ].map((item) => (
            <div 
              key={item.s} 
              className={`text-xs font-bold flex items-center gap-1.5 ${
                step === item.s 
                  ? 'text-[#8B0000]' 
                  : step > item.s ? 'text-emerald-700' : 'text-[#A69D91]'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                step === item.s 
                  ? 'bg-[#8B0000] text-white' 
                  : step > item.s ? 'bg-emerald-600 text-white' : 'bg-[#E5E0D5] text-[#6D645E]'
              }`}>
                {step > item.s ? '✓' : item.s}
              </div>
              <span className="hidden sm:inline">{item.title}</span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* STEP 1: BREED & WEIGHT */}
          {step === 1 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-[#2D241E] block">
                اختر نوع وسلالة الذبيحة:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {breeds.map((breed) => {
                  const isSelected = selectedBreed === breed.id;
                  return (
                    <div
                      key={breed.id}
                      onClick={() => {
                        setSelectedBreed(breed.id);
                        setWeight(breed.minWeight + 3);
                      }}
                      className={`p-4 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#8B000010] border-[#8B0000] shadow-xs'
                          : 'bg-[#F9F7F2] border-[#E5E0D5] hover:border-[#8B000040]'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] bg-white text-[#8B0000] border border-[#E5E0D5] font-bold px-2 py-0.5 rounded-full inline-block mb-2">
                          {breed.badge}
                        </span>
                        <h4 className="text-sm font-bold text-[#2D241E]">{breed.name}</h4>
                        <p className="text-[11px] text-[#6D645E] mt-1 leading-relaxed">{breed.desc}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E5E0D5] flex items-center justify-between">
                        <span className="font-mono text-base font-bold text-[#8B0000]">
                          {breed.pricePerKg.toFixed(2)} د.أ/كغم
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#8B0000]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Weight Slider */}
              <div className="bg-[#F9F7F2] p-5 rounded-3xl border border-[#E5E0D5] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#2D241E]">حدد الوزن التقريبي للذبيحة:</span>
                  <span className="text-[#8B0000] font-mono text-base">
                    {weight} كغم (تقريباً {(weight * currentBreedObj.pricePerKg).toFixed(2)} د.أ)
                  </span>
                </div>

                <input
                  type="range"
                  min={currentBreedObj.minWeight}
                  max={currentBreedObj.maxWeight}
                  step={1}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-[#8B0000] h-2 bg-[#E5E0D5] rounded-lg cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-[#6D645E]">
                  <span>أصغر وزن: {currentBreedObj.minWeight} كغم</span>
                  <span>الوزن المحدد: {weight} كغم</span>
                  <span>أكبر وزن: {currentBreedObj.maxWeight} كغم</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: CUTTING & PACKAGING */}
          {step === 2 && (
            <div className="space-y-5">
              
              {/* Cutting */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
                  <Scissors className="w-4 h-4 text-[#8B0000]" />
                  <span>طريقة التقطيع والتفصيل:</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'mansaf_large', title: 'تقطيع منسف أردني كبير', desc: 'قطع كبيرة مميزة للولائم مع العظام واللية' },
                    { id: 'refrigerated', title: 'تقطيع ثلاجة أكياس طبخ', desc: 'قطع متوسطة مقسمة بوجبات جاهزة للفريزر' },
                    { id: 'joints', title: 'تفصيل مفاصل كاملة (٤ أرباع)', desc: 'فخذين، كتفين، وضلوع كاملة مع الرقبة' },
                    { id: 'stew_cubes', title: 'شقف وقطع متوسطة بدون عظم زائد', desc: 'للصواني والإيدامات وطبخ الأرز' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCut(c.id as any)}
                      className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                        selectedCut === c.id
                          ? 'bg-[#8B000010] border-[#8B0000] text-[#8B0000] shadow-xs'
                          : 'bg-[#F9F7F2] border-[#E5E0D5] text-[#2D241E]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold">{c.title}</span>
                        {selectedCut === c.id && <Check className="w-3.5 h-3.5 text-[#8B0000]" />}
                      </div>
                      <span className="text-[10px] text-[#6D645E] mt-1">{c.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Packaging */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#8D6E63]" />
                  <span>طريقة التغليف والتعبئة:</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'vacuum', title: 'سحب هواء مفرغ (Vacuum)', desc: 'أفضل حفظ للطراوة والنكهة (+2.5 د.أ للذبيحة)' },
                    { id: 'bags', title: 'أكياس نايلون ثقيلة مخصصة', desc: 'مقسمة كيلو / وجبة للثلاجة (مجاناً)' },
                    { id: 'foam_plates', title: 'أطباق فوم مغلفة بالسلوفان', desc: 'مرتبة وأنيقة لسهولة الترتيب (مجاناً)' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPackaging(p.id as any)}
                      className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                        selectedPackaging === p.id
                          ? 'bg-[#8B000010] border-[#8B0000] text-[#8B0000] shadow-xs'
                          : 'bg-[#F9F7F2] border-[#E5E0D5] text-[#2D241E]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold">{p.title}</span>
                        {selectedPackaging === p.id && <Check className="w-3.5 h-3.5 text-[#8B0000]" />}
                      </div>
                      <span className="text-[10px] text-[#6D645E] mt-1">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: HEAD, OFFAL & CONFIRMATION */}
          {step === 3 && (
            <div className="space-y-4">
              
              {/* Head Preparation */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#2D241E]">
                  تجهيز وتنظيف الرأس والكوارع:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'burned', title: 'مشوط على النار', desc: 'على الطريقة الأردنية التقليدية' },
                    { id: 'boiled', title: 'مسلوخ أبيض نظيف', desc: 'جاهز تماماً للسلق والشوربة' },
                    { id: 'raw', title: 'بدون تشويط (كامل)', desc: 'كما هو بدون تعديل' },
                  ].map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setHeadOption(h.id as any)}
                      className={`p-2.5 rounded-2xl border text-center transition-all ${
                        headOption === h.id
                          ? 'bg-[#8B000010] border-[#8B0000] text-[#8B0000] font-bold shadow-xs'
                          : 'bg-[#F9F7F2] border-[#E5E0D5] text-[#6D645E]'
                      }`}
                    >
                      <div className="text-xs">{h.title}</div>
                      <div className="text-[10px] text-[#A69D91] mt-0.5">{h.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Offal Checkbox */}
              <div className="bg-[#F9F7F2] p-3.5 rounded-2xl border border-[#E5E0D5] flex items-center justify-between">
                <div className="text-right">
                  <div className="text-xs font-bold text-[#2D241E]">تضمين ملحقات الذبيحة (المعلاق، الكبد، القلب، الكلاوي)</div>
                  <div className="text-[11px] text-[#6D645E]">تُغلف مفردة في بوكس مبرد خاص</div>
                </div>
                <input
                  type="checkbox"
                  checked={includeOffal}
                  onChange={(e) => setIncludeOffal(e.target.checked)}
                  className="w-5 h-5 accent-[#8B0000] rounded-md cursor-pointer"
                />
              </div>

              {/* Notes for Butcher */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#2D241E]">
                  ملاحظات إضافية لكادر التقطيع بالملحمة:
                </label>
                <textarea
                  rows={2}
                  placeholder="مثال: فصل اللية لحالها بأكياس، تقطيع الكبد مكعبات..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full bg-[#F9F7F2] border border-[#E5E0D5] rounded-2xl p-3 text-xs text-[#2D241E] placeholder-[#A69D91] focus:outline-none focus:border-[#8B0000]"
                />
              </div>

              {/* Summary Card */}
              <div className="bg-[#F5F2ED] p-4 rounded-3xl border border-[#E5E0D5] space-y-1.5 text-xs text-[#2D241E]">
                <div className="font-bold text-[#8B0000] text-sm">ملخص تفصيل الذبيحة:</div>
                <div>• النوع: <strong>{currentBreedObj.name}</strong></div>
                <div>• الوزن المقدر: <strong>{weight} كغم</strong> ({currentBreedObj.pricePerKg} د.أ/كغم)</div>
                <div>• التقطيع والتغليف: {CUT_METHODS_LABELS[selectedCut]?.label || selectedCut} / {PACKAGING_LABELS[selectedPackaging]?.label?.split('(')[0] || selectedPackaging}</div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer with Stepper Controls */}
        <div className="p-5 sm:p-6 bg-[#F9F7F2] border-t border-[#E5E0D5] flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-[#6D645E]">السعر الإجمالي المقدر:</div>
            <div className="text-2xl font-black text-[#8B0000] font-mono">
              {totalPrice.toFixed(2)} <span className="text-xs font-bold text-[#2D241E]">د.أ</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 rounded-full border border-[#E5E0D5] bg-white hover:bg-[#F5F2ED] text-xs font-bold text-[#2D241E] transition-colors"
              >
                السابق
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1.5 bg-[#8B0000] hover:bg-[#720000] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs"
              >
                <span>التالي: التقطيع والتغليف</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="flex items-center gap-2 bg-[#8B0000] hover:bg-[#720000] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md transition-transform active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>إضافة الذبيحة للسلة وتأكيد الطلب</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
