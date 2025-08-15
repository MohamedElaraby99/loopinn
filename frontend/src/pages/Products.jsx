import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Product data
export const productsData = [
  {
    id: 1,
    name: "Loopin Coffee Cup",
    nameAr: "كوب LoopIn",
    image: "/products/cup3.webp",
    category: "accessories",
  },
  {
    id: 2,
    name: "Loopin Bracelet Premium",
    nameAr: "إسورة LoopIn مميزة",
    image: "/products/BRACLETE.webp",
    category: "accessories",
  },
  {
    id: 3,
    name: "Loopin Bracelet Gold",
    nameAr: "إسورة LoopIn ذهبية",
    image: "/products/BRACLETE 2.webp",
    category: "accessories",
  },
  {
    id: 4,
    name: "Loopin Notebook",
    nameAr: "دفتر LoopIn",
    image: "/products/NOTEBOOK M.webp",
    category: "stationery",
  },
  {
    id: 5,
    name: "Loopin Premium Notebook",
    nameAr: "دفتر LoopIn المميز",
    image: "/products/note_book.webp",
    category: "stationery",
  },
  {
    id: 6,
    name: "Loopin Tote Bag",
    nameAr: "حقيبة LoopIn",
    image: "/products/bag .webp",
    category: "accessories",
  },
  {
    id: 7,
    name: "Loopin Cap",
    nameAr: "قبعة LoopIn",
    image: "/products/CAP_1.webp",
    category: "clothing",
  },
  {
    id: 8,
    name: "Loopin T-Shirt Classic",
    nameAr: "تيشيرت LoopIn كلاسيك",
    image: "/products/tee-shirt.webp",
    category: "clothing",
  },
  {
    id: 9,
    name: "Loopin T-Shirt Vintage",
    nameAr: "تيشيرت LoopIn فينتيج",
    image: "/products/tee shirt 2.webp",
    category: "clothing",
  },
  {
    id: 10,
    name: "Loopin T-Shirt Modern",
    nameAr: "تيشيرت LoopIn مودرن",
    image: "/products/tee shirt 3.webp",
    category: "clothing",
  },
  {
    id: 11,
    name: "Loopin T-Shirt Premium",
    nameAr: "تيشيرت LoopIn بريميوم",
    image: "/products/teeshirt4.webp",
    category: "clothing",
  },
  {
    id: 12,
    name: "Loopin Coffee Blend",
    nameAr: "خلطة قهوة LoopIn",
    image: "/products/loopin5.webp",
    category: "coffee",
  },
  {
    id: 13,
    name: "Loopin Coffee Experience",
    nameAr: "تجربة قهوة LoopIn",
    image: "/products/loopin 1.webp",
    category: "coffee",
  },
  {
    id: 14,
    name: "Loopin Premium Coffee",
    nameAr: "قهوة LoopIn المميزة",
    image: "/products/loopin 2.webp",
    category: "coffee",
  },
  {
    id: 15,
    name: "Loopin Specialty Coffee",
    nameAr: "قهوة LoopIn المختصة",
    image: "/products/loopin7.webp",
    category: "coffee",
  },
];

const Products = () => {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { key: "all", label: t("products.categories.all") },
    { key: "clothing", label: t("products.categories.clothing") },
    { key: "accessories", label: t("products.categories.accessories") },
    { key: "stationery", label: t("products.categories.stationery") },
    { key: "coffee", label: t("products.categories.coffee") },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? productsData
      : productsData.filter((product) => product.category === selectedCategory);

  return (
    <div className="pt-16 min-h-screen">
      {/* Background with overlay */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("/loopin7.webp")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#561818]/90 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("products.title")}
          </h1>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category.key
                  ? "bg-amber-500 text-white"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Products Grid - Updated for better image handling */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 break-inside-avoid mb-6"
            >
              {/* Image Container with flexible height */}
              <div className="relative w-full">
                <img
                  src={product.image}
                  alt={i18n.language === "ar" ? product.nameAr : product.name}
                  className="w-full h-auto object-contain bg-white/5 transform group-hover:scale-105 transition-transform duration-300"
                  style={{ minHeight: '200px', maxHeight: '400px' }}
                />
                {/* Overlay with product name on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <h3 className="text-lg font-semibold text-white text-center px-4">
                    {i18n.language === "ar" ? product.nameAr : product.name}
                  </h3>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-white font-medium mb-2 text-center">
                  {i18n.language === "ar" ? product.nameAr : product.name}
                </h3>
                <div className="flex justify-center">
                  <button className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium">
                    {t("products.view")}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
