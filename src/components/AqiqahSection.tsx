import React from 'react';
import { 
  HeartHandshake, 
  Video, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Product } from '../types';

interface AqiqahSectionProps {
  aqiqahProducts: Product[];
  onOpenProductModal: (product: Product) => void;
}

export const AqiqahSection: React.FC<AqiqahSectionProps> = ({
  aqiqahProducts,
  onOpenProductModal,
}) => {
  return (
    <section id="aqiqah-section" className="py-16 bg-[#F9F7F2] border-t border-[#E5E0D5] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Box */}
        <div className="bg-white rounded-3xl border border-[#E5E0D5] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5">
              
              <div className="inline-flex items-center gap-2 bg-[#8B000015] text-[#8B0000] px-3.5 py-1 rounded-full text-xs font-bold border border-[#8B000030]">
                <HeartHandshake className="w-4 h-4 text-[#8B0000]" />
                <span>خدمة العقائق، النذور، والأضاحي والصدقات الشرعية</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-[#3E2723] font-serif">
                نذبح عنكم وفق الشريعة الإسلامية مع توثيق كامل بالفيديو 📹
              </h2>

              <p className="text-xs sm:text-sm text-[#6D645E] leading-relaxed">
                في <strong className="text-[#2D241E]">ملحمة العقيد</strong>، نوفر لكم خراف نعيمي بلدي أو روماني مطابقة لكافة الشروط الشرعية، ونقوم بالذبح والتسمية باسم صاحب العقيقة مع إرسال فيديو التوثيق وتوزيعها حسب رغبتكم (توصيل للمنزل مقطعة بأكياس أو توزيعها على العائلات المحتاجة في الأردن).
              </p>

              {/* Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#F9F7F2] p-3.5 rounded-2xl border border-[#E5E0D5] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D241E]">
                    <Video className="w-4 h-4 text-[#8B0000]" />
                    <span>توثيق بالفيديو</span>
                  </div>
                  <p className="text-[11px] text-[#6D645E]">فيديو كامل باسم صاحب النذر</p>
                </div>

                <div className="bg-[#F9F7F2] p-3.5 rounded-2xl border border-[#E5E0D5] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D241E]">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>شروط شرعية 100%</span>
                  </div>
                  <p className="text-[11px] text-[#6D645E]">سليمة وخالية من العيوب</p>
                </div>

                <div className="bg-[#F9F7F2] p-3.5 rounded-2xl border border-[#E5E0D5] space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D241E]">
                    <Truck className="w-4 h-4 text-[#8D6E63]" />
                    <span>توصيل أو توزيع</span>
                  </div>
                  <p className="text-[11px] text-[#6D645E]">توصيل للبيت أو للجمعيات</p>
                </div>
              </div>

            </div>

            {/* Right Aqiqah Product Selector */}
            <div className="lg:col-span-4 bg-[#F9F7F2] p-5 rounded-3xl border border-[#E5E0D5] space-y-3">
              <div className="text-xs font-bold text-[#2D241E] pb-2 border-b border-[#E5E0D5]">
                باقات العقائق المتوفرة:
              </div>

              {aqiqahProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onOpenProductModal(p)}
                  className="bg-white p-3.5 rounded-2xl border border-[#E5E0D5] hover:border-[#8B000040] hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#E5E0D5]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#2D241E]">{p.name}</h4>
                      <span className="text-[10px] text-[#6D645E] block">{p.origin}</span>
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-sm font-black text-[#8B0000] font-mono">
                      {p.price.toFixed(2)} د.أ
                    </div>
                    <span className="text-[10px] text-[#8B0000] underline font-bold">حجز وتفصيل</span>
                  </div>
                </div>
              ))}

              <div className="pt-2 text-center">
                <span className="text-[11px] text-[#6D645E]">
                  للتواصل المباشر مع مشرف الأضاحي: <strong className="font-mono text-[#8B0000]">0798765432</strong>
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
