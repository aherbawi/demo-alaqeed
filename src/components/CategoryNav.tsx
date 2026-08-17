import React from 'react';
import { 
  Store, 
  Beef, 
  Flame, 
  Utensils, 
  Sparkles, 
  ChefHat, 
  HeartHandshake 
} from 'lucide-react';
import { MeatCategory } from '../types';
import { CATEGORIES_CONFIG } from '../data/products';

interface CategoryNavProps {
  selectedCategory: MeatCategory;
  onSelectCategory: (cat: MeatCategory) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Store': return <Store className="w-4 h-4" />;
      case 'Beef': return <Beef className="w-4 h-4" />;
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'ChefHat': return <ChefHat className="w-4 h-4" />;
      case 'HeartHandshake': return <HeartHandshake className="w-4 h-4" />;
      default: return <Beef className="w-4 h-4" />;
    }
  };

  return (
    <div className="py-5 border-b border-[#E5E0D5] bg-[#FDFBF7]/95 sticky top-20 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between gap-4 mb-3">
          <div>
            <h2 className="text-xl font-bold text-[#2D241E] font-serif">تصفح أقسام اللحوم والذبائح</h2>
            <p className="text-xs text-[#6D645E]">اختر القسم لمشاهدة الأصناف المتوفرة اليوم وأسعارها بالدينار الأردني</p>
          </div>
        </div>

        {/* Categories Scrollable Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES_CONFIG.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as MeatCategory)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap text-xs sm:text-sm font-bold transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-sm scale-[1.01]'
                    : 'bg-white text-[#6D645E] border-[#E5E0D5] hover:border-[#8B000040] hover:text-[#8B0000] hover:bg-[#F9F7F2]'
                }`}
                id={`cat-btn-${cat.id}`}
              >
                <span className={isSelected ? 'text-white' : 'text-[#8B0000]'}>
                  {getIcon(cat.icon)}
                </span>
                <span>{cat.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-[#F5F2ED] text-[#6D645E]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
