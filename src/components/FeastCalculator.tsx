import React, { useState } from 'react';
import { 
  Users, 
  Calculator, 
  Sparkles, 
  Flame, 
  ShoppingBag, 
  Check, 
  Plus, 
  Minus,
  UtensilsCrossed
} from 'lucide-react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/products';

interface FeastCalculatorProps {
  onAddFeastToCart: (items: CartItem[]) => void;
}

export const FeastCalculator: React.FC<FeastCalculatorProps> = ({
  onAddFeastToCart,
}) => {
  const [guestCount, setGuestCount] = useState<number>(12);
  const [mealType, setMealType] = useState<'mansaf' | 'bbq' | 'mandi' | 'steaks'>('mansaf');
  const [meatPreference, setMeatPreference] = useState<'lamb' | 'veal' | 'mixed'>('lamb');

  // Calculation formulas per person based on authentic Jordanian feast practices
  const getGramsPerPerson = () => {
    switch (mealType) {
      case 'mansaf': return 400; // 400g lamb per person with bone & jameed
      case 'bbq': return 350; // 350g mixed skewers per person
      case 'mandi': return 350; // 350g lamb / mutton
      case 'steaks': return 300; // 300g boneless ribeye/striploin
      default: return 350;
    }
  };

  const requiredKg = Math.ceil((guestCount * getGramsPerPerson()) / 1000);
  const estimatedPricePerKg = mealType === 'bbq' ? 12.5 : mealType === 'steaks' ? 16.0 : 11.5;
  const estimatedTotalCost = requiredKg * estimatedPricePerKg;

  const handleAddFeastPackage = () => {
    // Select best matching product
    const targetProduct = mealType === 'mansaf' 
      ? PRODUCTS.find(p => p.id === 'lamb-mansaf') || PRODUCTS[1]
      : mealType === 'bbq'
      ? PRODUCTS.find(p => p.id === 'bbq-royal') || PRODUCTS[5]
      : PRODUCTS.find(p => p.id === 'veal-shredded') || PRODUCTS[3];

    const feastItem: CartItem = {
      cartItemId: `feast-calc-${Date.now()}`,
      product: targetProduct,
      quantity: requiredKg,
      cutMethod: mealType === 'mansaf' ? 'mansaf' : 'ras_asfour',
      packaging: 'vacuum',
      fatLevel: 'medium_fat',
      marinade: mealType === 'bbq' ? 'alaqeed_mix' : 'none',
      customNotes: `باقة عزومة (${mealType}) جاهزة لـ ${guestCount} شخص - وزن ${requiredKg} كغم.`,
      itemTotalPrice: estimatedTotalCost,
    };

    onAddFeastToCart([feastItem]);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E5E0D5] p-6 sm:p-8 shadow-sm text-right text-[#2D241E]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D5]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#8B000015] text-[#8B0000] border border-[#8B000030] flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3E2723] font-serif">
                حاسبة عزومات المنسف والمشاوي الذكية
              </h2>
              <span className="text-[10px] bg-[#8B000015] text-[#8B0000] font-bold px-2 py-0.5 rounded-full">
                دقيقة 100%
              </span>
            </div>
            <p className="text-xs text-[#6D645E]">
              حدد عدد ضيوفك ونوع الوجبة، وسنقوم بحساب كمية اللحم الصافي بالكيلوغرام والتكلفة التقديرية بالدينار.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Guest Count Stepper */}
          <div className="bg-[#F9F7F2] p-5 rounded-3xl border border-[#E5E0D5] space-y-3">
            <label className="text-xs font-bold text-[#2D241E] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#8B0000]" />
                عدد الضيوف أو أفراد العائلة:
              </span>
              <span className="text-[#8B0000] font-mono text-base font-bold">
                {guestCount} ضيف
              </span>
            </label>

            <div className="flex items-center justify-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => setGuestCount(Math.max(2, guestCount - 2))}
                className="w-10 h-10 rounded-full bg-white border border-[#E5E0D5] hover:bg-[#F5F2ED] text-[#2D241E] flex items-center justify-center font-bold text-lg transition-colors shadow-xs"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="bg-white px-8 py-2 rounded-2xl border border-[#E5E0D5] text-center min-w-[140px] shadow-xs">
                <span className="font-mono font-black text-2xl text-[#8B0000]">
                  {guestCount}
                </span>
                <span className="text-xs text-[#6D645E] mr-2">شخص</span>
              </div>

              <button
                type="button"
                onClick={() => setGuestCount(guestCount + 2)}
                className="w-10 h-10 rounded-full bg-[#8B0000] hover:bg-[#720000] text-white flex items-center justify-center font-bold text-lg transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Guest presets */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {[5, 10, 15, 20, 30, 50].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGuestCount(num)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${
                    guestCount === num
                      ? 'bg-[#8B0000] text-white border-[#8B0000] font-bold'
                      : 'bg-white text-[#6D645E] border-[#E5E0D5] hover:border-[#8B000040]'
                  }`}
                >
                  {num} أشخاص
                </button>
              ))}
            </div>
          </div>

          {/* Meal Type Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#2D241E] flex items-center gap-1.5">
              <UtensilsCrossed className="w-4 h-4 text-[#8D6E63]" />
              <span>نوع الوليمة أو المناسبة:</span>
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'mansaf', title: 'سدر منسف أردني بلدي', desc: 'لحم غنم بلدي بالعظم والجميد الكركي' },
                { id: 'bbq', title: 'مشاوي وشواء على الفحم', desc: 'كباب، شقف، وريش متبلة جاهزة للسيخ' },
                { id: 'mandi', title: 'مندي / أوزي / مضغوط', desc: 'لحوم طرية مطبوخة على نار هادئة' },
                { id: 'steaks', title: 'ستيك وسهرات فاخرة', desc: 'ريب آي وتندرلوين معتق' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMealType(m.id as any)}
                  className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                    mealType === m.id
                      ? 'bg-[#8B000010] border-[#8B0000] text-[#8B0000] shadow-xs'
                      : 'bg-[#F9F7F2] border-[#E5E0D5] text-[#2D241E] hover:border-[#8B000040]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-xs">{m.title}</span>
                    {mealType === m.id && <Check className="w-3.5 h-3.5 text-[#8B0000]" />}
                  </div>
                  <span className="text-[10px] text-[#6D645E] mt-1 line-clamp-1">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Calculated Results Banner Card */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-[#8B0000] to-[#5C0000] text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              توصية كادر ملحمة العقيد
            </div>

            <div>
              <span className="text-xs text-[#E5E0D5] block">الوزن المقترح والمثالي للوليمة:</span>
              <div className="text-4xl sm:text-5xl font-black font-mono text-white mt-1">
                {requiredKg} <span className="text-xl font-sans text-neutral-200">كغم</span>
              </div>
              <p className="text-xs text-[#E5E0D5] mt-1">
                بمعدل {getGramsPerPerson()} غرام لكل ضيف لضمان كرم الضيافة والوفرة.
              </p>
            </div>

            <div className="pt-4 border-t border-white/20 space-y-1">
              <span className="text-xs text-[#E5E0D5] block">التكلفة التقديرية (تقطيع وتغليف مفرغ):</span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-300">
                {estimatedTotalCost.toFixed(2)} <span className="text-sm font-sans text-white">د.أ</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6">
            <button
              onClick={handleAddFeastPackage}
              className="w-full flex items-center justify-center gap-2 bg-white text-[#8B0000] hover:bg-[#F5F2ED] font-bold text-xs sm:text-sm py-3.5 rounded-full shadow-lg transition-transform active:scale-95"
              id="btn-add-feast-cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>إضافة باقة العزومة إلى السلة ({requiredKg} كغم)</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
