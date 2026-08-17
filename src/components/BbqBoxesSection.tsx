import React from 'react';
import { 
  Flame, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  ArrowLeft, 
  Package,
  Plus
} from 'lucide-react';
import { Product } from '../types';

interface BbqBoxesSectionProps {
  bbqProducts: Product[];
  onOpenProductModal: (product: Product) => void;
}

export const BbqBoxesSection: React.FC<BbqBoxesSectionProps> = ({
  bbqProducts,
  onOpenProductModal,
}) => {
  if (bbqProducts.length === 0) return null;

  return (
    <section id="bbq-boxes-section" className="py-16 bg-[#FDFBF7] border-t border-b border-[#E5E0D5] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-right">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#8B000015] text-[#8B0000] px-3.5 py-1 rounded-full text-xs font-bold mb-2 border border-[#8B000030]">
              <Flame className="w-3.5 h-3.5 text-[#8B0000]" />
              <span>جاهزة للشواء الفوري على المنقل</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#3E2723] font-serif">
              بوكسات المشاوي والشواء الملكية 🍢
            </h2>
            <p className="text-xs sm:text-sm text-[#6D645E] mt-1 max-w-xl">
              تشكيلات مشاوي لحم غنم وعجل بلدي متبلة بخلطة بهارات العقيد، مجهزة بأسياخ خشبية ومحفوظة في بوكسات حرارية لرحلاتكم وسهراتكم.
            </p>
          </div>

          <div className="text-xs text-[#6D645E] bg-white p-3 rounded-2xl border border-[#E5E0D5] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>تشمل الخضار المشوية وصوص الباربكيو والتتبيلة</span>
          </div>
        </div>

        {/* BBQ Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bbqProducts.map((box) => (
            <div
              key={box.id}
              className="bg-white rounded-3xl border border-[#E5E0D5] hover:border-[#8B000040] hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between p-1 group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EFEBE9] rounded-2xl cursor-pointer" onClick={() => onOpenProductModal(box)}>
                <img
                  src={box.image}
                  alt={box.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-3 right-3 bg-[#8B0000] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xs">
                  {box.badge || 'بوكس ملكي'}
                </div>

                {box.servings && (
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-bold">
                    <Users className="w-3.5 h-3.5 text-[#D7CCC8]" />
                    <span>{box.servings}</span>
                  </div>
                )}
              </div>

              {/* Box Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-right">
                <div>
                  <h3 
                    onClick={() => onOpenProductModal(box)}
                    className="text-lg font-bold text-[#2D241E] group-hover:text-[#8B0000] transition-colors cursor-pointer"
                  >
                    {box.name}
                  </h3>
                  <p className="text-xs text-[#6D645E] mt-1.5 leading-relaxed">
                    {box.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E0D5] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#A69D91] block">سعر البوكس الشامل:</span>
                    <span className="text-2xl font-black text-[#8B0000] font-mono">
                      {box.price.toFixed(2)} <span className="text-xs font-bold text-[#2D241E]">د.أ</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenProductModal(box)}
                    className="flex items-center gap-1.5 bg-[#8B0000] hover:bg-[#720000] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xs transition-transform active:scale-95"
                    id={`btn-order-bbq-${box.id}`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>اطلب البوكس</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
