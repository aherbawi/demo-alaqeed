import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Truck, 
  Heart, 
  CheckCircle2, 
  Scissors,
  Users
} from 'lucide-react';

export const QualityGuarantee: React.FC = () => {
  const guarantees = [
    {
      icon: <Award className="w-6 h-6 text-[#8B0000]" />,
      title: 'لحوم بلدية ومستوردة طازجة 100%',
      desc: 'نضمن أن جميع اللحوم المعروضة تذبح يومياً في المسالخ المعتمدة بالأردن وتحت إشراف أطباء بيطريين مختصين.',
    },
    {
      icon: <Scissors className="w-6 h-6 text-[#8D6E63]" />,
      title: 'تقطيع وتفصيل احترافي حسب رغبتك',
      desc: 'كادر قصابين أردنيين وشاميين ذوي خبرة طويلة لتلبية أدق تفاصيل التقطيع (منسف، مفاصل، شقف، ستيك، مفروم).',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-700]" />,
      title: 'تغليف سحب هواء مفرغ عالي الجودة',
      desc: 'نستخدم تقنية الفاكيوم (Vacuum Sealing) لحفظ العصارة الطبيعية ومنع تأكسد اللحم وضمان أطول مدة طراوة.',
    },
    {
      icon: <Truck className="w-6 h-6 text-[#8B0000]" />,
      title: 'سيارات نقل مبردة ومجهزة بالكامل',
      desc: 'أسطول سيارات تبريد خاصة للحفاظ على سلسلة التبريد حتى تسليم الطلب عند باب بيتك في عمّان وباقي المحافظات.',
    },
  ];

  return (
    <section className="py-16 bg-[#FDFBF7] border-t border-[#E5E0D5] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#8B0000] uppercase tracking-widest bg-[#8B000015] px-3.5 py-1 rounded-full border border-[#8B000030]">
            معايير الجودة والكفالة
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3E2723] font-serif">
            لماذا تختار ملحمة العقيد؟
          </h2>
          <p className="text-xs sm:text-sm text-[#6D645E]">
            نلتزم بأعلى معايير النظافة والشرعية الإسلامية لتصلك أفضل قطعة لحم على مائدتك.
          </p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {guarantees.map((g, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-[#E5E0D5] p-6 space-y-3 hover:border-[#8B000040] hover:shadow-md transition-all shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F9F7F2] border border-[#E5E0D5] flex items-center justify-center">
                {g.icon}
              </div>
              <h3 className="text-base font-bold text-[#2D241E]">{g.title}</h3>
              <p className="text-xs text-[#6D645E] leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust numbers banner */}
        <div className="mt-12 bg-white rounded-3xl border border-[#E5E0D5] p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-xs">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#8B0000] font-mono">+15,000</div>
            <div className="text-xs text-[#6D645E] mt-1 font-semibold">عائلة تثق بنا في عمّان 🇯🇴</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#8B0000] font-mono">100%</div>
            <div className="text-xs text-[#6D645E] mt-1 font-semibold">ذبح حلال بإشراف بيطري</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#8B0000] font-mono">3</div>
            <div className="text-xs text-[#6D645E] mt-1 font-semibold">فروع رئيسية في عمّان</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[#8B0000] font-mono">4.9 / 5.0</div>
            <div className="text-xs text-[#6D645E] mt-1 font-semibold">تقييم رضا الزبائن</div>
          </div>
        </div>

      </div>
    </section>
  );
};
