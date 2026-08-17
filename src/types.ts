export type MeatCategory = 
  | 'all'
  | 'carcasses'     // ذبائح كاملة
  | 'lamb'          // لحوم غنم بلدي
  | 'veal'          // عجل طازج
  | 'marinated_bbq' // مشاوي متبلة
  | 'steaks'        // ستيك عالمي
  | 'ready_trays'   // صواني جاهزة
  | 'bbq_boxes'     // بوكسات المشاوي
  | 'prepared'      // كباب ومصنعات
  | 'aqiqah';       // عقائق ونذور وأضاحي

export type CutMethod = 
  | 'default'       // تقطيع عادي
  | 'refrigerator'  // تقطيع ثلاجة (قطع وسط في أكياس)
  | 'joints'        // تقطيع مفاصل كاملة (فخذ، كتف، رقبة)
  | 'mansaf'        // تقطيع منسف أردني كبير باللحم والدهن
  | 'ras_asfour'    // تقطيع شقف ناعمة راس عصفور
  | 'steak'         // شرائح ستيك بسماكة حسب الطلب
  | 'minced_fine'   // مفروم ناعم (وجهين)
  | 'minced_coarse' // مفروم خشن (للصواني والمحاشي)
  | 'whole_carcass' // ذبيحة كاملة بدون تقطيع (أو 4 أرباع);

export type PackagingType = 
  | 'vacuum'        // أكياس مسحوبة الهواء مفرغة (طازجة ومناسبة للتجميد)
  | 'foam_trays'    // أطباق فوم حرارية مقسمة مع نايلون محكم
  | 'plastic_bags'  // أكياس سميكة مخصصة للحوم
  | 'bbq_box_pack'; // بوكس شواء حراري مبرد

export type FatLevel = 
  | 'pure_lean'     // لحم صافي بدون دهن
  | 'light_fat'     // دهن خفيف 10%
  | 'medium_fat'    // دهن وسط 20% (المثالي للمشاوي والكباب)
  | 'rich_fat';     // دسم للمنسف والأكلات التراثية

export type MarinadeOption = 
  | 'none'          // سادة بدون بهارات
  | 'alaqeed_mix'   // خلطة بهارات العقيد السرية
  | 'bbq_spicy'     // تتبيلة مشاوي حارة
  | 'herbs_olive'   // أعشاب برية وزيت زيتون بلدي
  | 'mansaf_spices' // بهارات المنسف الأردني والهيل;

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: MeatCategory;
  price: number; // in JOD
  unit: string; // "كغم", "ذبيحة", "بوكس"
  priceType: 'per_kg' | 'per_unit';
  weightOptions?: number[]; // e.g. [0.5, 1, 2, 3, 5] or [14, 16, 18, 22]
  defaultWeight: number;
  image: string;
  description: string;
  origin: string; // e.g. "بلدي أردني", "روماني طازج", "جورجي"
  badge?: string; // "الأكثر طلباً", "عرض خاص", "بلدي 100%"
  fatPercentage?: string;
  servings?: string; // e.g. "يكفي 4-6 أشخاص"
  rating: number;
  reviewsCount: number;
  isFreshDaily: boolean;
  availableCutMethods: CutMethod[];
  availablePackaging: PackagingType[];
  allowMarinade: boolean;
  allowFatCustomization: boolean;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number; // weight or unit count
  cutMethod: CutMethod;
  packaging: PackagingType;
  fatLevel: FatLevel;
  marinade: MarinadeOption;
  customNotes?: string;
  itemTotalPrice: number;
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
  city: string; // عمّان، الزرقاء، إربد، إلخ
  area: string; // دابوق، عبدون، الجاردنز، إلخ
  streetAddress: string;
  deliveryTime: 'morning' | 'afternoon' | 'evening';
  paymentMethod: 'cash_on_delivery' | 'cliq';
  specialInstructions?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'preparing' | 'on_the_way' | 'delivered';
}
