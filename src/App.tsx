import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CustomCarcassBuilder } from './components/CustomCarcassBuilder';
import { FeastCalculator } from './components/FeastCalculator';
import { BbqBoxesSection } from './components/BbqBoxesSection';
import { AqiqahSection } from './components/AqiqahSection';
import { QualityGuarantee } from './components/QualityGuarantee';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { PRODUCTS, BUTCHERY_INFO } from './data/products';
import { Product, MeatCategory, CartItem, Order } from './types';
import { 
  Phone, 
  MessageCircle, 
  Check,
  Search,
  Beef
} from 'lucide-react';

export default function App() {
  // State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('alaqeed_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<MeatCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isCarcassBuilderOpen, setIsCarcassBuilderOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('alaqeed_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart Handlers
  const handleAddToCart = (item: CartItem) => {
    setCartItems(prev => [item, ...prev]);
    showToast(`تمت إضافة "${item.product.name}" إلى سلة اللحوم بنجاح 🥩`);
  };

  const handleQuickAdd = (product: Product) => {
    setActiveProductModal(product);
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const itemTotalPrice = item.product.priceType === 'per_kg'
          ? item.product.price * newQuantity
          : item.product.price;
        return {
          ...item,
          quantity: newQuantity,
          itemTotalPrice
        };
      }
      return item;
    }));
  };

  const handleAddFeastToCart = (items: CartItem[]) => {
    setCartItems(prev => [...items, ...prev]);
    setIsCalculatorOpen(false);
    setIsCartOpen(true);
    showToast(`تمت إضافة باقة العزومة (${items.length} أصناف) إلى السلة!`);
  };

  const handleOrderPlaced = (order: Order) => {
    setCompletedOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  // Calculations
  const cartCount = useMemo(() => cartItems.length, [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((acc, item) => acc + item.itemTotalPrice, 0), [cartItems]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PRODUCTS.length };
    PRODUCTS.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch = !searchQuery.trim() || (
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.origin.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const bbqProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.category === 'bbq_boxes');
  }, []);

  const aqiqahProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.category === 'aqiqah');
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D241E] flex flex-col selection:bg-[#8B0000] selection:text-white" dir="rtl">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#2E7D32] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-bounce border border-[#1B5E20]">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenCarcassBuilder={() => setIsCarcassBuilderOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={() => {
          setSelectedCategory('all');
          handleScrollToSection('products');
        }}
        onBbqClick={() => {
          setSelectedCategory('bbq_boxes');
          handleScrollToSection('products');
        }}
        onOpenCarcassBuilder={() => setIsCarcassBuilderOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* Categories Bar */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* Main Products Grid Section */}
      <main id="products" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#3E2723] font-serif flex items-center gap-2">
              <Beef className="w-7 h-7 text-[#8B0000]" />
              <span>
                {selectedCategory === 'all' ? 'قائمة اللحوم والذبائح المتوفرة اليوم' :
                 selectedCategory === 'carcasses' ? 'الذبائح الكاملة البلدية والمستوردة' :
                 selectedCategory === 'lamb' ? 'لحوم الغنم البلدي بالكيلو' :
                 selectedCategory === 'veal' ? 'عجل طازج بالكيلو (راس عصفور، مفروم، شرحات)' :
                 selectedCategory === 'marinated_bbq' ? 'مشاوي متبلة جاهزة للشك والشواء' :
                 selectedCategory === 'steaks' ? 'ستيك عالمي فاخر (توموهاك، ريب آي، تندرلوين)' :
                 selectedCategory === 'ready_trays' ? 'صواني جاهزة للفرن (كفتة بالطحينية والريش)' :
                 selectedCategory === 'bbq_boxes' ? 'بوكسات المشاوي والشواء والجمعات' :
                 selectedCategory === 'prepared' ? 'كباب ومصنعات بلدية متبلة' : 'عقائق ونذور وصدقات'}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6D645E] mt-1">
              جميع اللحوم بلدية طازجة وتذبح يومياً بإشراف بيطري مع إمكانية تحديد طريقة التقطيع والتغليف.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6D645E] bg-white border border-[#E5E0D5] px-3 py-1.5 rounded-full font-mono shadow-xs">
              {filteredProducts.length} صنف متوفر
            </span>
          </div>
        </div>

        {/* Empty Search Result */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E5E0D5] p-12 text-center space-y-3 my-8 shadow-xs">
            <Search className="w-12 h-12 text-[#A69D91] mx-auto" />
            <h3 className="text-lg font-bold text-[#2D241E]">لم نجد أي صنف يطابق بحثك</h3>
            <p className="text-xs text-[#6D645E] max-w-md mx-auto">
              جرب البحث بكلمات أخرى مثل: "ريش"، "مفروم"، "نعيمي"، "كباب"، أو تصفح الأقسام مباشرة.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-2 bg-[#8B0000] hover:bg-[#720000] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors shadow-xs"
            >
              عرض كافة اللحوم
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={setActiveProductModal}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        )}

      </main>

      {/* BBQ Boxes Section */}
      <BbqBoxesSection
        bbqProducts={bbqProducts}
        onOpenProductModal={setActiveProductModal}
      />

      {/* Feast Calculator Embedded Highlight Section */}
      <section className="py-14 bg-[#F9F7F2] border-t border-b border-[#E5E0D5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeastCalculator onAddFeastToCart={handleAddFeastToCart} />
        </div>
      </section>

      {/* Aqiqah & Sacrifices Section */}
      <AqiqahSection
        aqiqahProducts={aqiqahProducts}
        onOpenProductModal={setActiveProductModal}
      />

      {/* Quality Guarantees & Why Al-Aqeed */}
      <QualityGuarantee />

      {/* Contact, Jordan Branches & Location Section */}
      <ContactSection />

      {/* Footer */}
      <Footer 
        onSelectCategory={setSelectedCategory}
        onScrollToSection={handleScrollToSection}
      />

      {/* Modals & Slide-overs */}
      
      {/* 1. Deep Product Cut & Packaging Customization Modal */}
      <ProductModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 2. Custom Carcass & Livestock Builder Wizard */}
      <CustomCarcassBuilder
        isOpen={isCarcassBuilderOpen}
        onClose={() => setIsCarcassBuilderOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* 3. Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 4. Checkout Modal (Jordan Delivery & Direct WhatsApp Generator) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* 5. Order Success & Official Receipt Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Floating Quick Action Buttons for Mobile/Desktop */}
      <div className="fixed bottom-4 left-4 z-30 flex flex-col gap-2">
        <a
          href={`https://wa.me/${BUTCHERY_INFO.whatsapp}?text=${encodeURIComponent('مرحباً ملحمة العقيد، أرغب بطلب لحوم طازجة اليوم.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          title="تواصل مباشر عبر الواتساب"
          id="floating-whatsapp-btn"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
        </a>
        <a
          href={`tel:${BUTCHERY_INFO.phone}`}
          className="w-12 h-12 rounded-full bg-[#8B0000] hover:bg-[#720000] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          title="اتصال مباشر بالملحمة"
          id="floating-call-btn"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

    </div>
  );
}
