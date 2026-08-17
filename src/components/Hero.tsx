import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Flame, 
  ArrowLeft, 
  PhoneCall, 
  CheckCircle2
} from 'lucide-react';
import { BUTCHERY_INFO } from '../data/products';

interface HeroProps {
  onExploreClick: () => void;
  onBbqClick: () => void;
  onOpenCarcassBuilder: () => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onBbqClick,
  onOpenCarcassBuilder,
  onOpenCalculator,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#FDFBF7] pt-8 pb-16 border-b border-[#E5E0D5]">
      {/* Warm Natural Tones Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8B00000a] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#D7CCC825] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Text Content */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-[#F5F2ED] border border-[#E5E0D5] px-4 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold text-[#6D645E]">
                ذبح طازج يومي حلال 100% | فروع عمّان وكافة المحافظات 🇯🇴
              </span>
            </div>

            {/* Headline in Natural Tones Typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#3E2723] leading-tight tracking-tight">
              أجود لحوم <span className="text-[#8B0000]">الغنم والعجل البلدي</span> المذبوحة يومياً
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#6D645E] leading-relaxed max-w-2xl font-normal">
              في <strong className="text-[#2D241E] font-bold">ملحمة العقيد</strong>، نختار لك أفضل المواشي والذبائح البلدية، مع خيارات تقطيع احترافية (منسف، ثلاجة، مفاصل، ستيك، مفروم)، تغليف سحب هواء معقم، وتوصيل مبرد يضمن وصولها طازجة لباب بيتك.
            </p>

            {/* Bullet points of trust */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2D241E] bg-white p-3 rounded-2xl border border-[#E5E0D5] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>ذبح وفحص بيطري يومي</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#2D241E] bg-white p-3 rounded-2xl border border-[#E5E0D5] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#8D6E63] shrink-0" />
                <span>تغليف سحب هواء معقم</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#2D241E] bg-white p-3 rounded-2xl border border-[#E5E0D5] shadow-xs col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>توصيل مبرد لكافة عمّان</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <button
                onClick={onExploreClick}
                className="flex items-center gap-2 bg-[#8B0000] hover:bg-[#720000] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                id="hero-explore-btn"
              >
                <span>تصفح قائمة اللحوم والأسعار</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onBbqClick}
                className="flex items-center gap-2 bg-white hover:bg-[#F5F2ED] text-[#8B0000] border border-[#E5E0D5] px-5 py-3.5 rounded-full font-bold text-sm transition-all shadow-xs"
                id="hero-bbq-btn"
              >
                <Flame className="w-4 h-4 text-[#8B0000]" />
                <span>بوكسات المشاوي الجاهزة</span>
              </button>

              <button
                onClick={onOpenCalculator}
                className="flex items-center gap-2 bg-[#F5F2ED] hover:bg-[#EAE4DC] text-[#2D241E] border border-[#E5E0D5] px-4 py-3.5 rounded-full font-bold text-xs sm:text-sm transition-all"
                id="hero-calc-btn"
              >
                <span>حاسبة العزائم</span>
              </button>
            </div>

            {/* Quick Jordan hotline banner */}
            <div className="pt-2 flex items-center gap-3 text-xs text-[#6D645E]">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#8B0000]" />
                للطلب السريع المباشر أو تجهيز العزائم:
              </span>
              <a 
                href={`tel:${BUTCHERY_INFO.phone}`}
                className="font-mono font-bold text-[#8B0000] hover:underline"
              >
                {BUTCHERY_INFO.phoneDisplay}
              </a>
            </div>

          </div>

          {/* Right Visual Card (Featured Showcase) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#E5E0D5] bg-white shadow-md p-3">
              
              {/* Product Hero Image */}
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-[#EFEBE9]">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                  alt="لحم غنم وريش بلدي أردني طازج - ملحمة العقيد"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/90 via-[#2D241E]/30 to-transparent" />
                
                {/* Floating Tags */}
                <div className="absolute top-3 right-3 bg-[#8B0000] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-sm">
                  خروف نعيمي بلدي 🇯🇴
                </div>

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#2D241E] text-xs font-bold px-3 py-1 rounded-full border border-[#E5E0D5]">
                  ⭐ 5.0 (أعلى تقييم)
                </div>

                {/* Overlay details */}
                <div className="absolute bottom-3 right-3 left-3 text-right">
                  <span className="text-[11px] text-[#D7CCC8] font-bold tracking-wider uppercase">تجهيز حسب رغبتك</span>
                  <h3 className="text-xl font-bold text-white">ريش وقطع لحم منسف بلدي طازج</h3>
                  <p className="text-xs text-[#F5F2ED] line-clamp-1">تقطيع منسف، مفاصل، شقف راس عصفور، مع تغليف سحب هواء مفرغ</p>
                </div>
              </div>

              {/* Bottom Quick Feature Grid */}
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="bg-[#F9F7F2] p-2.5 rounded-2xl border border-[#E5E0D5]">
                  <ShieldCheck className="w-5 h-5 text-[#8B0000] mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-[#2D241E]">ضمان ذهبي</p>
                  <p className="text-[9px] text-[#6D645E]">جودة وطراوة تامة</p>
                </div>
                <div className="bg-[#F9F7F2] p-2.5 rounded-2xl border border-[#E5E0D5]">
                  <Truck className="w-5 h-5 text-[#8D6E63] mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-[#2D241E]">سيارات مبردة</p>
                  <p className="text-[9px] text-[#6D645E]">تحفظ البرودة 100%</p>
                </div>
                <div className="bg-[#F9F7F2] p-2.5 rounded-2xl border border-[#E5E0D5]">
                  <Sparkles className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
                  <p className="text-[11px] font-bold text-[#2D241E]">تتبيل مجاني</p>
                  <p className="text-[9px] text-[#6D645E]">خلطة العقيد الخاصة</p>
                </div>
              </div>

              {/* Interactive banner to customize */}
              <div className="mt-3 bg-[#F5F2ED] p-3.5 rounded-2xl border border-[#E5E0D5] flex items-center justify-between">
                <div className="text-right">
                  <p className="text-xs font-bold text-[#2D241E]">عندك عزومة أو مناسبة خاصة؟</p>
                  <p className="text-[11px] text-[#6D645E]">نجهزلك الذبيحة كاملة مقطعة ومغلفة</p>
                </div>
                <button
                  onClick={onOpenCarcassBuilder}
                  className="bg-[#8B0000] hover:bg-[#720000] text-white text-xs font-bold px-4 py-2 rounded-full shadow-xs transition-colors"
                >
                  فصّل الآن
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
