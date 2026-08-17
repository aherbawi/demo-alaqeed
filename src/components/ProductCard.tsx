import React from 'react';
import { 
  Star, 
  Plus, 
  Settings2, 
  Users
} from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onQuickAdd,
}) => {
  return (
    <div className="group bg-white rounded-3xl border border-[#E5E0D5] hover:border-[#8B000040] hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between p-1">
      
      {/* Image & Badges Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EFEBE9] rounded-2xl cursor-pointer" onClick={() => onOpenDetails(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end">
          <span className="bg-[#8B0000] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
            {product.origin}
          </span>
          {product.badge && (
            <span className="bg-[#F5F2ED] text-[#2D241E] border border-[#E5E0D5] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Fresh Daily Pill */}
        {product.isFreshDaily && (
          <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#E5E0D5] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            ذبح اليوم
          </div>
        )}

        {/* Servings & Rating at Bottom of Image */}
        <div className="absolute bottom-2.5 right-2.5 left-2.5 flex items-center justify-between text-[11px] text-white">
          {product.servings && (
            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md text-neutral-100">
              <Users className="w-3 h-3 text-[#D7CCC8]" />
              {product.servings}
            </span>
          )}
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md text-amber-300 font-semibold mr-auto">
            <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
            {product.rating} ({product.reviewsCount})
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 
            onClick={() => onOpenDetails(product)}
            className="text-base font-bold text-[#2D241E] group-hover:text-[#8B0000] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#6D645E] line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>

          {/* Cutting and packaging features hints */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {product.allowMarinade && (
              <span className="text-[10px] bg-[#8B000010] text-[#8B0000] border border-[#8B000020] px-2 py-0.5 rounded-full font-medium">
                تتبيل مجاني
              </span>
            )}
            {product.availableCutMethods.length > 1 && (
              <span className="text-[10px] bg-[#F5F2ED] text-[#6D645E] border border-[#E5E0D5] px-2 py-0.5 rounded-full">
                خيارات تقطيع
              </span>
            )}
            <span className="text-[10px] bg-[#F5F2ED] text-[#6D645E] border border-[#E5E0D5] px-2 py-0.5 rounded-full">
              تغليف مفرغ
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-[#E5E0D5] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-[#8B0000] font-mono">
                {product.price.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-[#2D241E]">
                د.أ
              </span>
              <span className="text-[11px] text-[#A69D91]">
                / {product.unit}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Detailed customization button */}
            <button
              onClick={() => onOpenDetails(product)}
              className="p-2 rounded-full bg-[#F5F2ED] hover:bg-[#EAE4DC] text-[#2D241E] transition-colors border border-[#E5E0D5]"
              title="تخصيص نوع التقطيع والتغليف والتتبيل"
              id={`btn-customize-${product.id}`}
            >
              <Settings2 className="w-4 h-4 text-[#8D6E63]" />
            </button>

            {/* Add to cart / customize */}
            <button
              onClick={() => onOpenDetails(product)}
              className="flex items-center gap-1.5 bg-[#8B0000] hover:bg-[#720000] text-white text-xs font-bold px-4 py-2 rounded-full transition-all shadow-xs active:scale-95"
              id={`btn-add-product-${product.id}`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>فصّل واطلب</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
