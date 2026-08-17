import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Search, 
  Menu, 
  X, 
  Clock, 
  Calculator,
  Beef,
  Flame
} from 'lucide-react';
import { BUTCHERY_INFO } from '../data/products';
import { MeatCategory } from '../types';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  selectedCategory: MeatCategory;
  onSelectCategory: (category: MeatCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCalculator: () => void;
  onOpenCarcassBuilder: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenCalculator,
  onOpenCarcassBuilder,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E0D5] transition-all shadow-xs">
      {/* Top Banner (Natural Tones - Jordan Info, Call & WhatsApp) */}
      <div className="bg-[#F5F2ED] text-xs text-[#6D645E] py-2 px-4 border-b border-[#E5E0D5]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-[#8B0000]">
              <MapPin className="w-3.5 h-3.5 text-[#8B0000]" />
              عمّان - الأردن 🇯🇴 | توصيل مبرد لكافة المحافظات
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#6D645E]">
              <Clock className="w-3.5 h-3.5 text-[#A69D91]" />
              ذبح يومي طازج من 8:00 صباحاً حتى 11:30 مساءً
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={`tel:${BUTCHERY_INFO.phone}`}
              className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[#E5E0D5] text-[#2D241E] hover:text-[#8B0000] font-semibold transition-colors"
              id="header-phone-link"
            >
              <Phone className="w-3 h-3 text-[#8B0000]" />
              <span>اتصل بالملحمة: <strong className="font-mono text-[#8B0000]">{BUTCHERY_INFO.phoneDisplay}</strong></span>
            </a>
            <span className="text-[#E5E0D5] hidden sm:inline">|</span>
            <a 
              href={`https://wa.me/${BUTCHERY_INFO.whatsapp}?text=${encodeURIComponent('مرحباً ملحمة العقيد، أرغب بالاستفسار عن أسعار وطلب اللحوم اليوم.')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-[#2E7D32] hover:text-[#1B5E20] font-bold transition-colors"
              id="header-whatsapp-top-link"
            >
              <span>واتساب سريع</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onScrollToSection('hero')}>
            <div className="w-11 h-11 rounded-2xl bg-[#8B000015] border border-[#8B000030] flex items-center justify-center text-[#8B0000] shadow-xs">
              <Beef className="w-6 h-6 text-[#8B0000]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-[#8B0000] font-serif">
                  ملحمة العقيد
                </h1>
                <span className="text-[10px] bg-[#8B000015] text-[#8B0000] font-bold px-2.5 py-0.5 rounded-full border border-[#8B000025]">
                  بلدي 100%
                </span>
              </div>
              <p className="text-[11px] text-[#6D645E]">أجود اللحوم والذبائح الطازجة - الأردن</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#F9F7F2] p-1.5 rounded-2xl border border-[#E5E0D5]">
            <button
              onClick={() => { onSelectCategory('all'); onScrollToSection('products'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'all' 
                  ? 'bg-[#8B0000] text-white shadow-sm' 
                  : 'text-[#6D645E] hover:text-[#8B0000] hover:bg-white'
              }`}
              id="nav-all-products"
            >
              كافة اللحوم
            </button>
            <button
              onClick={() => { onSelectCategory('carcasses'); onScrollToSection('products'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'carcasses' 
                  ? 'bg-[#8B0000] text-white shadow-sm' 
                  : 'text-[#6D645E] hover:text-[#8B0000] hover:bg-white'
              }`}
              id="nav-carcasses"
            >
              الذبائح الكاملة
            </button>
            <button
              onClick={() => { onSelectCategory('veal'); onScrollToSection('products'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'veal' 
                  ? 'bg-[#8B0000] text-white shadow-sm' 
                  : 'text-[#6D645E] hover:text-[#8B0000] hover:bg-white'
              }`}
              id="nav-veal"
            >
              عجل طازج
            </button>
            <button
              onClick={() => { onSelectCategory('marinated_bbq'); onScrollToSection('products'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'marinated_bbq' 
                  ? 'bg-[#8B0000] text-white shadow-sm' 
                  : 'text-[#6D645E] hover:text-[#8B0000] hover:bg-white'
              }`}
              id="nav-marinated-bbq"
            >
              مشاوي متبلة
            </button>
            <button
              onClick={() => { onSelectCategory('steaks'); onScrollToSection('products'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'steaks' 
                  ? 'bg-[#8B0000] text-white shadow-sm' 
                  : 'text-[#6D645E] hover:text-[#8B0000] hover:bg-white'
              }`}
              id="nav-steaks"
            >
              ستيك عالمي
            </button>
            <button
              onClick={() => { onSelectCategory('ready_trays'); onScrollToSection('products'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'ready_trays' 
                  ? 'bg-[#8B0000] text-white shadow-sm' 
                  : 'text-[#6D645E] hover:text-[#8B0000] hover:bg-white'
              }`}
              id="nav-ready-trays"
            >
              صواني جاهزة
            </button>
            <button
              onClick={() => { onSelectCategory('bbq_boxes'); onScrollToSection('products'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'bbq_boxes' 
                  ? 'bg-[#8B0000] text-white shadow-sm' 
                  : 'text-[#6D645E] hover:text-[#8B0000] hover:bg-white'
              }`}
              id="nav-bbq-boxes"
            >
              بوكسات المشاوي
            </button>
            <button
              onClick={() => { onSelectCategory('aqiqah'); onScrollToSection('products'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === 'aqiqah' 
                  ? 'bg-[#8B0000] text-white shadow-sm' 
                  : 'text-[#6D645E] hover:text-[#8B0000] hover:bg-white'
              }`}
              id="nav-aqiqah"
            >
              عقائق ونذور
            </button>
            <button
              onClick={onOpenCalculator}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#8B0000] hover:bg-[#8B000010] flex items-center gap-1 transition-all"
              id="nav-calculator-btn"
            >
              <Calculator className="w-3.5 h-3.5 text-[#8B0000]" />
              حاسبة العزومة
            </button>
          </nav>

          {/* Search Bar & Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Live Search Input */}
            <div className="relative hidden sm:block w-48 md:w-60">
              <input
                type="text"
                placeholder="ابحث عن لحم، ريش، بوكس..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#F9F7F2] text-[#2D241E] placeholder-[#A69D91] text-xs rounded-2xl pl-3 pr-9 py-2.5 border border-[#E5E0D5] focus:outline-none focus:border-[#8B0000] focus:bg-white transition-all"
                id="search-input-header"
              />
              <Search className="w-4 h-4 text-[#A69D91] absolute right-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute left-2.5 top-2.5 text-[#A69D91] hover:text-[#2D241E] text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Carcass customizer quick button */}
            <button
              onClick={onOpenCarcassBuilder}
              className="hidden md:flex items-center gap-1.5 bg-[#F5F2ED] hover:bg-[#EAE4DC] text-[#2D241E] border border-[#E5E0D5] px-3.5 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs"
              id="btn-custom-carcass"
            >
              <Flame className="w-4 h-4 text-[#8B0000]" />
              <span>فصّل ذبيحتك</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 bg-[#8B0000] hover:bg-[#720000] text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95"
              id="header-cart-btn"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#8B0000] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="font-mono font-bold">
                {cartTotal.toFixed(2)} د.أ
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#2D241E] p-2 rounded-2xl bg-[#F5F2ED] border border-[#E5E0D5]"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search field when open on small screens */}
        <div className="sm:hidden pb-3 pt-1">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="ابحث عن لحم، ريش، كباب، ذبيحة..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#F9F7F2] text-[#2D241E] placeholder-[#A69D91] text-xs rounded-2xl pl-3 pr-9 py-2.5 border border-[#E5E0D5] focus:outline-none focus:border-[#8B0000]"
              id="mobile-search-input"
            />
            <Search className="w-4 h-4 text-[#A69D91] absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5E0D5] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => { onSelectCategory('all'); onScrollToSection('products'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-2xl text-right transition-colors ${selectedCategory === 'all' ? 'bg-[#8B0000] text-white' : 'bg-[#F9F7F2] text-[#2D241E] border border-[#E5E0D5]'}`}
            >
              🥩 كافة اللحوم
            </button>
            <button
              onClick={() => { onSelectCategory('carcasses'); onScrollToSection('products'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-2xl text-right transition-colors ${selectedCategory === 'carcasses' ? 'bg-[#8B0000] text-white' : 'bg-[#F9F7F2] text-[#2D241E] border border-[#E5E0D5]'}`}
            >
              🐑 الذبائح الكاملة
            </button>
            <button
              onClick={() => { onSelectCategory('veal'); onScrollToSection('products'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-2xl text-right transition-colors ${selectedCategory === 'veal' ? 'bg-[#8B0000] text-white' : 'bg-[#F9F7F2] text-[#2D241E] border border-[#E5E0D5]'}`}
            >
              🥩 عجل طازج
            </button>
            <button
              onClick={() => { onSelectCategory('marinated_bbq'); onScrollToSection('products'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-2xl text-right transition-colors ${selectedCategory === 'marinated_bbq' ? 'bg-[#8B0000] text-white' : 'bg-[#F9F7F2] text-[#2D241E] border border-[#E5E0D5]'}`}
            >
              🔥 مشاوي متبلة
            </button>
            <button
              onClick={() => { onSelectCategory('steaks'); onScrollToSection('products'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-2xl text-right transition-colors ${selectedCategory === 'steaks' ? 'bg-[#8B0000] text-white' : 'bg-[#F9F7F2] text-[#2D241E] border border-[#E5E0D5]'}`}
            >
              ✨ ستيك عالمي
            </button>
            <button
              onClick={() => { onSelectCategory('ready_trays'); onScrollToSection('products'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-2xl text-right transition-colors ${selectedCategory === 'ready_trays' ? 'bg-[#8B0000] text-white' : 'bg-[#F9F7F2] text-[#2D241E] border border-[#E5E0D5]'}`}
            >
              🥘 صواني جاهزة
            </button>
            <button
              onClick={() => { onSelectCategory('bbq_boxes'); onScrollToSection('products'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-2xl text-right transition-colors ${selectedCategory === 'bbq_boxes' ? 'bg-[#8B0000] text-white' : 'bg-[#F9F7F2] text-[#2D241E] border border-[#E5E0D5]'}`}
            >
              🍢 بوكسات المشاوي
            </button>
            <button
              onClick={() => { onSelectCategory('aqiqah'); onScrollToSection('products'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-2xl text-right transition-colors ${selectedCategory === 'aqiqah' ? 'bg-[#8B0000] text-white' : 'bg-[#F9F7F2] text-[#2D241E] border border-[#E5E0D5]'}`}
            >
              🤝 عقائق ونذور
            </button>
          </div>

          <div className="pt-2 border-t border-[#E5E0D5] space-y-2">
            <button
              onClick={() => { onOpenCalculator(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#F5F2ED] border border-[#E5E0D5] text-[#8B0000] font-bold text-xs"
            >
              <span className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#8B0000]" />
                حاسبة عزومات المنسف والمشاوي
              </span>
              <span>←</span>
            </button>
            <button
              onClick={() => { onOpenCarcassBuilder(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#F9F7F2] border border-[#E5E0D5] text-[#2D241E] font-semibold text-xs"
            >
              <span className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#8B0000]" />
                فصّل ذبيحتك واطلب التقطيع والتغليف
              </span>
              <span>←</span>
            </button>
            <button
              onClick={() => { onScrollToSection('contact'); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#F9F7F2] border border-[#E5E0D5] text-[#2D241E] font-semibold text-xs"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8B0000]" />
                فروع ملحمة العقيد وساعات العمل
              </span>
              <span>←</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
