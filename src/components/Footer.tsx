import React from 'react';
import { 
  Beef, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ShieldCheck 
} from 'lucide-react';
import { BUTCHERY_INFO } from '../data/products';
import { MeatCategory } from '../types';

interface FooterProps {
  onSelectCategory?: (category: MeatCategory) => void;
  onScrollToSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onScrollToSection,
}) => {
  const handleCatClick = (cat: MeatCategory) => {
    if (onSelectCategory) onSelectCategory(cat);
    if (onScrollToSection) onScrollToSection('products');
  };

  return (
    <footer className="bg-[#2D241E] text-[#D7CCC8] text-xs border-t border-[#4E3D35]">
      
      {/* Top Banner inside Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-right">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#8B0000] border border-[#A93226] flex items-center justify-center text-white shadow-xs">
                <Beef className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-serif">
                  ملحمة <span className="text-[#FFCDD2]">العقيد</span>
                </h3>
                <p className="text-[10px] text-[#A69D91]">عمّان - المملكة الأردنية الهاشمية 🇯🇴</p>
              </div>
            </div>

            <p className="text-xs text-[#BCAAA4] leading-relaxed">
              الوجهة الأولى والموثوقة في الأردن للحصول على أجود الذبائح واللحوم البلدية الطازجة، مقطعة ومغلفة بأحدث تقنيات سحب الهواء المفرغة وتوصيل مبرد لباب البيت.
            </p>

            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ذبح حلال 100% وإشراف بيطري كامل</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">أقسام اللحوم والطلبات</h4>
            <ul className="space-y-2 text-xs text-[#D7CCC8]">
              <li>
                <button onClick={() => handleCatClick('carcasses')} className="hover:text-white transition-colors text-right flex items-center gap-1.5">
                  <span>🐑</span>
                  <span>الذبائح الكاملة (نعيمي، روماني، تيوس)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleCatClick('veal')} className="hover:text-white transition-colors text-right flex items-center gap-1.5">
                  <span>🥩</span>
                  <span>عجل طازج (راس عصفور، مفروم، شرحات)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleCatClick('marinated_bbq')} className="hover:text-white transition-colors text-right flex items-center gap-1.5">
                  <span>🔥</span>
                  <span>مشاوي متبلة (كباب حلبي، ريش، طاووق)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleCatClick('steaks')} className="hover:text-white transition-colors text-right flex items-center gap-1.5">
                  <span>✨</span>
                  <span>ستيك عالمي (توموهاك، ريب آي، واغيو)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleCatClick('ready_trays')} className="hover:text-white transition-colors text-right flex items-center gap-1.5">
                  <span>🥘</span>
                  <span>صواني جاهزة للفرن (كفتة طحينية، ريش)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleCatClick('bbq_boxes')} className="hover:text-white transition-colors text-right flex items-center gap-1.5">
                  <span>🍢</span>
                  <span>بوكسات المشاوي والشواء العائلية</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleCatClick('aqiqah')} className="hover:text-white transition-colors text-right flex items-center gap-1.5">
                  <span>🤝</span>
                  <span>خدمة العقائق والنذور والصدقات الشرعية</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">معلومات الاتصال والطلب</h4>
            <ul className="space-y-2.5 text-xs text-[#D7CCC8]">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>الهاتف: <a href={`tel:${BUTCHERY_INFO.phone}`} className="font-mono text-white font-bold hover:underline">{BUTCHERY_INFO.phoneDisplay}</a></span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>واتساب: <a href={`https://wa.me/${BUTCHERY_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-bold">دردشة فورية</a></span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D7CCC8] shrink-0" />
                <span className="truncate">الإيميل: <a href={`mailto:${BUTCHERY_INFO.email}`} className="text-white hover:underline">{BUTCHERY_INFO.email}</a></span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFCDD2] shrink-0 mt-0.5" />
                <span>عمّان - شارع وصفي التل (الجاردنز) / فروع: دابوق والجبيهة</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Delivery & Payment in Jordan */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">التوصيل والدفع في الأردن</h4>
            <p className="text-xs text-[#BCAAA4] leading-relaxed">
              توصيل مبرد سريع لجميع مناطق عمّان (توصيل مجاني للطلبات فوق 40 د.أ) وتوصيل لكافة محافظات الأردن.
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-[11px] text-[#D7CCC8] font-bold">طرق الدفع المعتمدة:</div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#3E2723] px-2.5 py-1 rounded-lg border border-[#5D4037] text-white">
                  💵 دفع عند الاستلام (COD)
                </span>
                <span className="bg-[#8B0000] text-white px-2.5 py-1 rounded-lg border border-[#A93226] font-mono font-bold">
                  ⚡ كليك CliQ (ALAQEEDMEAT)
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#4E3D35] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A69D91]">
          <p>© {new Date().getFullYear()} ملحمة العقيد - كافة الحقوق محفوظة للمملكة الأردنية الهاشمية 🇯🇴</p>
          <div className="flex items-center gap-4">
            <span>سجل تجاري معتمد</span>
            <span>فحص مخبري وبيطري يومي</span>
            <span>كفالة طراوة وجودة اللحم 100%</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
