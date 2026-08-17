import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  Building2, 
  Compass 
} from 'lucide-react';
import { BUTCHERY_INFO } from '../data/products';

export const ContactSection: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;

    setSentSuccess(true);
    setTimeout(() => {
      setFormName('');
      setFormPhone('');
      setFormEmail('');
      setFormMsg('');
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 bg-[#F9F7F2] border-t border-[#E5E0D5] relative text-right text-[#2D241E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#8B0000] uppercase tracking-widest bg-[#8B000015] px-3.5 py-1 rounded-full border border-[#8B000030]">
            فروعنا وتواصل معنا
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3E2723] font-serif">
            ملحمة العقيد في خدمتكم دائماً
          </h2>
          <p className="text-xs sm:text-sm text-[#6D645E]">
            يسعدنا استقبالكم في فروعنا داخل عمّان أو تلقي اتصالاتكم وطلباتكم المبردة لجميع محافظات المملكة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Branches & Contact Info */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              
              {/* Phone Card */}
              <div className="bg-white p-4 rounded-3xl border border-[#E5E0D5] space-y-2 shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs text-[#6D645E]">اتصال هاتفي مباشر</div>
                <a 
                  href={`tel:${BUTCHERY_INFO.phone}`} 
                  className="text-sm font-bold text-[#2D241E] hover:text-[#8B0000] font-mono block"
                >
                  {BUTCHERY_INFO.phoneDisplay}
                </a>
              </div>

              {/* Email Card */}
              <div className="bg-white p-4 rounded-3xl border border-[#E5E0D5] space-y-2 shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-[#F5F2ED] text-[#8D6E63] border border-[#E5E0D5] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-xs text-[#6D645E]">البريد الإلكتروني</div>
                <a 
                  href={`mailto:${BUTCHERY_INFO.email}`} 
                  className="text-xs font-bold text-[#2D241E] hover:text-[#8B0000] block truncate"
                  title={BUTCHERY_INFO.email}
                >
                  {BUTCHERY_INFO.email}
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white p-4 rounded-3xl border border-[#E5E0D5] space-y-2 shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="text-xs text-[#6D645E]">خدمة الواتساب</div>
                <a 
                  href={`https://wa.me/${BUTCHERY_INFO.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-800 hover:underline block"
                >
                  دردشة مباشرة 24/7
                </a>
              </div>

            </div>

            {/* Branches List in Jordan */}
            <div className="bg-white rounded-3xl border border-[#E5E0D5] p-6 space-y-4 shadow-xs">
              <h3 className="text-lg font-bold text-[#3E2723] flex items-center gap-2 font-serif">
                <Building2 className="w-5 h-5 text-[#8B0000]" />
                فروع ملحمة العقيد في عمّان:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {BUTCHERY_INFO.branches.map((branch, index) => (
                  <div 
                    key={index}
                    className="bg-[#F9F7F2] p-4 rounded-2xl border border-[#E5E0D5] space-y-2 text-right"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D241E]">
                      <MapPin className="w-4 h-4 text-[#8B0000] shrink-0" />
                      <span>{branch.name}</span>
                    </div>
                    <p className="text-[11px] text-[#6D645E] leading-relaxed">
                      {branch.address}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-[#8D6E63] pt-1 border-t border-[#E5E0D5]">
                      <Clock className="w-3 h-3" />
                      <span>{branch.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map Visual */}
            <div className="bg-white rounded-3xl border border-[#E5E0D5] overflow-hidden shadow-xs">
              <div className="p-4 bg-[#F9F7F2] border-b border-[#E5E0D5] flex items-center justify-between">
                <span className="text-xs font-bold text-[#2D241E] flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#8B0000]" />
                  موقع الفروع على خارطة عمّان 🇯🇴
                </span>
                <a
                  href="https://maps.google.com/?q=Amman,Jordan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#8B0000] hover:underline font-bold"
                >
                  فتح في Google Maps ↗
                </a>
              </div>
              <div className="relative h-48 bg-[#F5F2ED] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8D6E63_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 text-center space-y-2 p-4">
                  <div className="inline-flex items-center gap-2 bg-[#8B0000] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>ملحمة العقيد - شارع وصفي التل (الجاردنز) & دابوق</span>
                  </div>
                  <p className="text-[11px] text-[#6D645E]">تتوفر مواقف خاصة لزبائن الملحمة أمام كافة الفروع</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E5E0D5] p-6 sm:p-7 shadow-xs space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#3E2723] font-serif">تواصل سريع مع الإدارة أو اللحام</h3>
              <p className="text-xs text-[#6D645E] mt-1">
                هل لديك استفسار عن ذبائح المناسبات، أو ترغب في حجز كميات للمطاعم والفنادق؟ أرسل لنا وسنتواصل معك خلال دقائق.
              </p>
            </div>

            {sentSuccess ? (
              <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-2xl text-center space-y-2 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="text-base font-bold text-[#2D241E]">تم إرسال رسالتك بنجاح!</h4>
                <p className="text-xs text-[#6D645E]">
                  شكراً لتواصلك مع ملحمة العقيد. سنقوم بالاتصال بك على رقم هاتفك فوراً.
                </p>
                <button
                  onClick={() => setSentSuccess(false)}
                  className="mt-3 text-xs text-emerald-800 underline font-bold"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2D241E]">الاسم:</label>
                  <input
                    type="text"
                    required
                    placeholder="اسمك الكريم"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-[#F9F7F2] border border-[#E5E0D5] rounded-2xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder-[#A69D91] focus:outline-none focus:border-[#8B0000] focus:bg-white"
                    id="contact-form-name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2D241E]">رقم الهاتف:</label>
                  <input
                    type="tel"
                    required
                    placeholder="0798765432"
                    dir="ltr"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-[#F9F7F2] border border-[#E5E0D5] rounded-2xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder-[#A69D91] focus:outline-none focus:border-[#8B0000] focus:bg-white text-right"
                    id="contact-form-phone"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2D241E]">البريد الإلكتروني:</label>
                  <input
                    type="email"
                    placeholder="your-email@example.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-[#F9F7F2] border border-[#E5E0D5] rounded-2xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder-[#A69D91] focus:outline-none focus:border-[#8B0000] focus:bg-white"
                    id="contact-form-email"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#2D241E]">الرسالة أو نوع الاستفسار:</label>
                  <textarea
                    rows={4}
                    placeholder="اكتب استفسارك هنا (مثال: حجز 5 ذبائح لعزومة يوم الجمعة)..."
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    className="w-full bg-[#F9F7F2] border border-[#E5E0D5] rounded-2xl px-3.5 py-2.5 text-xs text-[#2D241E] placeholder-[#A69D91] focus:outline-none focus:border-[#8B0000] focus:bg-white"
                    id="contact-form-message"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#8B0000] hover:bg-[#720000] text-white font-bold text-xs py-3.5 rounded-full shadow-md transition-transform active:scale-95"
                  id="contact-form-submit"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الاستفسار لملحمة العقيد</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
