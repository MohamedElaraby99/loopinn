import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers,
  FiClock,
  FiX,
  FiCalendar,
  FiCoffee,
  FiWifi,
  FiMonitor,
  FiStar,
  FiCheck,
  FiMapPin,
  FiPhone,
  FiShield,
  FiHeart,
  FiAward,
  FiShoppingCart,
  FiPlus,
  FiMinus,
  FiPackage,
} from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";

// Professional rooms data
const roomsData = [
  {
    id: 1,
    name: "small",
    title: "Cozy Meeting Pod",
    titleAr: "كابينة الاجتماعات المريحة",
    capacity: 4,
    image: "/private-meeting-room.jpg",
    timeSlots: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
    features: [
      { name: "Premium Coffee", nameAr: "قهوة مختصة", icon: FiCoffee },
      { name: "High-Speed WiFi", nameAr: "واي فاي عالي السرعة", icon: FiWifi },
      { name: "Smart Display", nameAr: "شاشة ذكية", icon: FiMonitor },
      { name: "Climate Control", nameAr: "تحكم بالمناخ", icon: FiShield },
    ],
    pricePerHour: 80,
    rating: 4.8,
    bookings: 156,
    description: "Perfect for small team meetings and brainstorming sessions",
    descriptionAr: "مثالية للاجتماعات الصغيرة وجلسات العصف الذهني",
  },
  {
    id: 2,
    name: "medium",
    title: "Executive Conference Room",
    titleAr: "قاعة المؤتمرات التنفيذية",
    capacity: 8,
    image: "/hero2.webp",
    timeSlots: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
    features: [
      { name: "Premium Coffee", nameAr: "قهوة مختصة", icon: FiCoffee },
      { name: "High-Speed WiFi", nameAr: "واي فاي عالي السرعة", icon: FiWifi },
      { name: "4K Display", nameAr: "شاشة 4K", icon: FiMonitor },
      { name: "Smart Board", nameAr: "سبورة ذكية", icon: FiAward },
    ],
    pricePerHour: 120,
    rating: 4.9,
    bookings: 203,
    description: "Professional conference room for important business meetings",
    descriptionAr: "قاعة مؤتمرات احترافية للاجتماعات التجارية المهمة",
  },
  {
    id: 3,
    name: "large",
    title: "Grand Presentation Hall",
    titleAr: "قاعة العروض الكبرى",
    capacity: 15,
    image: "/loopin4.webp",
    timeSlots: ["09:00", "12:00", "15:00", "18:00"],
    features: [
      { name: "Premium Coffee Bar", nameAr: "بار قهوة مختصة", icon: FiCoffee },
      { name: "Enterprise WiFi", nameAr: "واي فاي للشركات", icon: FiWifi },
      { name: "Audio System", nameAr: "نظام صوتي", icon: FiStar },
      { name: "Large 4K Display", nameAr: "شاشة 4K كبيرة", icon: FiMonitor },
    ],
    pricePerHour: 200,
    rating: 5.0,
    bookings: 89,
    description: "Spacious hall perfect for presentations and large meetings",
    descriptionAr: "قاعة واسعة مثالية للعروض التقديمية والاجتماعات الكبيرة",
  },
  {
    id: 4,
    name: "study",
    title: "Quiet Study Haven",
    titleAr: "ملاذ الدراسة الهادئ",
    capacity: 2,
    image: "/download.jpg",
    timeSlots: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
    features: [
      { name: "Artisan Coffee", nameAr: "قهوة حرفية", icon: FiCoffee },
      { name: "Silent WiFi Zone", nameAr: "منطقة واي فاي صامتة", icon: FiWifi },
      { name: "Ambient Lighting", nameAr: "إضاءة محيطية", icon: FiHeart },
      { name: "Ergonomic Setup", nameAr: "تجهيزات مريحة", icon: FiShield },
    ],
    pricePerHour: 50,
    rating: 4.7,
    bookings: 312,
    description: "Peaceful study environment with premium coffee service",
    descriptionAr: "بيئة دراسة هادئة مع خدمة قهوة مميزة",
  },
];

// Available products for ordering
const availableProducts = [
  {
    id: 1,
    name: "Premium Coffee",
    nameAr: "قهوة مختصة",
    description: "Single origin specialty coffee",
    descriptionAr: "قهوة مختصة من أصل واحد",
    price: 25,
    image: "/products/coffe.jpg",
    category: "beverages",
    available: true,
  },
  {
    id: 2,
    name: "Red Bull Energy",
    nameAr: "ريد بول طاقة",
    description: "Energy drink for productivity",
    descriptionAr: "مشروب طاقة للإنتاجية",
    price: 35,
    image: "/products/redbull.jpg",
    category: "beverages",
    available: true,
  },
  {
    id: 3,
    name: "Artisan Tea",
    nameAr: "شاي حرفي",
    description: "Premium loose leaf tea selection",
    descriptionAr: "اختيار شاي أوراق فضفاضة مميز",
    price: 20,
    image: "/products/coffe.jpg",
    category: "beverages",
    available: true,
  },
  {
    id: 4,
    name: "Fresh Pastry",
    nameAr: "معجنات طازجة",
    description: "Daily baked fresh pastries",
    descriptionAr: "معجنات طازجة مخبوزة يومياً",
    price: 30,
    image: "/products/coffe.jpg",
    category: "food",
    available: true,
  },
  {
    id: 5,
    name: "Sandwich Platter",
    nameAr: "طبق ساندويتش",
    description: "Assorted fresh sandwiches",
    descriptionAr: "ساندويتش طازج متنوع",
    price: 45,
    image: "/products/coffe.jpg",
    category: "food",
    available: true,
  },
  {
    id: 6,
    name: "Fruit Basket",
    nameAr: "سلة فواكه",
    description: "Seasonal fresh fruits",
    descriptionAr: "فواكه طازجة موسمية",
    price: 40,
    image: "/products/coffe.jpg",
    category: "food",
    available: true,
  },
];

const FeatureIcon = ({ feature }) => {
  const IconComponent = feature.icon;
  return <IconComponent className="w-4 h-4" />;
};

const BookingModal = ({ isOpen, onClose, room, onSubmit, isSubmitting }) => {
  const { t, i18n } = useTranslation();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required(t("booking.validation.nameRequired")),
    email: Yup.string()
      .email(t("booking.validation.emailInvalid"))
      .required(t("booking.validation.emailRequired")),
    phone: Yup.string()
      .matches(/^[0-9+\-\s()]+$/, t("booking.validation.phoneInvalid"))
      .required(t("booking.validation.phoneRequired")),
    date: Yup.string().required(t("booking.validation.dateRequired")),
    timeSlot: Yup.string().required(t("booking.validation.timeRequired")),
    notes: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      timeSlot: "",
      notes: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const bookingData = {
        ...values,
        room: room.name,
        room_id: room.id,
        products: selectedProducts,
        total_amount: calculateTotal(),
      };
      onSubmit(bookingData);
      formik.resetForm();
      setSelectedProducts([]);
    },
  });

  const addProduct = (product) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    if (existingProduct) {
      setSelectedProducts(selectedProducts.map(p => 
        p.id === product.id 
          ? { ...p, quantity: p.quantity + 1 }
          : p
      ));
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeProduct(productId);
    } else {
      setSelectedProducts(selectedProducts.map(p => 
        p.id === productId ? { ...p, quantity: newQuantity } : p
      ));
    }
  };

  const calculateTotal = () => {
    const roomCost = room.pricePerHour;
    const productsCost = selectedProducts.reduce((total, product) => 
      total + (product.price * product.quantity), 0
    );
    return roomCost + productsCost;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with image */}
          <div className="relative h-48 rounded-t-3xl overflow-hidden">
            <img
              src={room?.image}
              alt={i18n.language === "ar" ? room?.titleAr : room?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Room info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-amber-300 mb-1 drop-shadow-lg">
                    {i18n.language === "ar" ? room?.titleAr : room?.title}
                  </h3>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-amber-200/90">
                    <div className="flex items-center">
                      <FiUsers className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      <span className="text-sm">{room?.capacity} {t("booking.capacity")}</span>
                    </div>
                    <div className="flex items-center">
                      <FiStar className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1 text-amber-400" />
                      <span className="text-sm">{room?.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-300 drop-shadow-lg">
                    {room?.pricePerHour} {i18n.language === "ar" ? "جنيه" : "EGP"}
                  </div>
                  <div className="text-sm text-amber-200/90">
                    {i18n.language === "ar" ? "/ ساعة" : "/ hour"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Room description */}
            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed">
                {i18n.language === "ar" ? room?.descriptionAr : room?.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {i18n.language === "ar" ? "المميزات" : "Features"}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {room?.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="w-8 h-8 bg-[#561818] rounded-lg flex items-center justify-center text-white">
                      <FeatureIcon feature={feature} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {i18n.language === "ar" ? feature.nameAr : feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Products Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FiPackage className="w-5 h-5 mr-2" />
                  {i18n.language === "ar" ? "إضافة منتجات" : "Add Products"}
                </h4>
                <button
                  type="button"
                  onClick={() => setShowProducts(!showProducts)}
                  className="text-[#561818] hover:text-[#8B4513] transition-colors duration-300"
                >
                  {showProducts ? "Hide Products" : "Show Products"}
                </button>
              </div>

              {showProducts && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {availableProducts.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center space-x-3 mb-3">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 text-sm">
                            {i18n.language === "ar" ? product.nameAr : product.name}
                          </h5>
                          <p className="text-gray-600 text-xs">
                            {i18n.language === "ar" ? product.descriptionAr : product.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#561818]">{product.price} EGP</span>
                        <button
                          type="button"
                          onClick={() => addProduct(product)}
                          className="bg-[#561818] text-white p-2 rounded-lg hover:bg-[#8B4513] transition-colors duration-300"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Selected Products */}
              {selectedProducts.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FiShoppingCart className="w-4 h-4 mr-2" />
                    {i18n.language === "ar" ? "المنتجات المختارة" : "Selected Products"}
                  </h5>
                  <div className="space-y-2">
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-8 h-8 rounded object-cover"
                          />
                          <span className="font-medium text-gray-900">
                            {i18n.language === "ar" ? product.nameAr : product.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, product.quantity - 1)}
                              className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-300"
                            >
                              <FiMinus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-medium">{product.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(product.id, product.quantity + 1)}
                              className="w-6 h-6 bg-[#561818] text-white rounded-full flex items-center justify-center hover:bg-[#8B4513] transition-colors duration-300"
                            >
                              <FiPlus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-[#561818] w-16 text-right">
                            {product.price * product.quantity} EGP
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">
                        {i18n.language === "ar" ? "إجمالي المنتجات" : "Products Total"}
                      </span>
                      <span className="font-bold text-[#561818]">
                        {selectedProducts.reduce((total, product) => total + (product.price * product.quantity), 0)} EGP
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Total Cost */}
              <div className="bg-gradient-to-r from-[#561818] to-[#8B4513] text-white rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    {i18n.language === "ar" ? "التكلفة الإجمالية" : "Total Cost"}
                  </span>
                  <span className="text-2xl font-bold">
                    {calculateTotal()} EGP
                  </span>
                </div>
                <div className="text-sm opacity-90 mt-1">
                  {i18n.language === "ar" 
                    ? `غرفة: ${room.pricePerHour} EGP + منتجات: ${selectedProducts.reduce((total, product) => total + (product.price * product.quantity), 0)} EGP`
                    : `Room: ${room.pricePerHour} EGP + Products: ${selectedProducts.reduce((total, product) => total + (product.price * product.quantity), 0)} EGP`
                  }
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("booking.form.name")}
                  </label>
                  <input
                    type="text"
                    {...formik.getFieldProps("name")}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#561818] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    placeholder={t("booking.form.namePlaceholder")}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FiX className="w-4 h-4 mr-1" />
                      {formik.errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("booking.form.email")}
                  </label>
                  <input
                    type="email"
                    {...formik.getFieldProps("email")}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#561818] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    placeholder={t("booking.form.emailPlaceholder")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FiX className="w-4 h-4 mr-1" />
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("booking.form.phone")}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      {...formik.getFieldProps("phone")}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#561818] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                      placeholder={t("booking.form.phonePlaceholder")}
                    />
                    <FiPhone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FiX className="w-4 h-4 mr-1" />
                      {formik.errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("booking.form.date")}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      {...formik.getFieldProps("date")}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#561818] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    />
                    <FiCalendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                  {formik.touched.date && formik.errors.date && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <FiX className="w-4 h-4 mr-1" />
                      {formik.errors.date}
                    </p>
                  )}
                </div>
              </div>

              {/* Modern Time Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  {t("booking.form.timeSlot")}
                </label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {room?.timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => formik.setFieldValue("timeSlot", slot)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 font-medium ${
                        formik.values.timeSlot === slot
                          ? "border-[#561818] bg-[#561818] text-white shadow-lg"
                          : "border-gray-200 bg-gray-50 text-gray-700 hover:border-[#561818] hover:bg-[#561818]/5"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {formik.touched.timeSlot && formik.errors.timeSlot && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <FiX className="w-4 h-4 mr-1" />
                    {formik.errors.timeSlot}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("booking.form.notes")}
                </label>
                <textarea
                  {...formik.getFieldProps("notes")}
                  rows={4}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#561818] focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
                  placeholder={t("booking.form.notesPlaceholder")}
                />
              </div>

              <div className="flex space-x-4 rtl:space-x-reverse pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
                >
                  {t("booking.form.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[#561818] to-[#8B4513] text-white rounded-xl hover:from-[#6a1f1f] hover:to-[#A0522D] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {i18n.language === "ar" ? "جاري الإرسال..." : "Submitting..."}
                    </div>
                  ) : (
                    t("booking.form.submit")
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Booking = () => {
  const { t, i18n } = useTranslation();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleSubmitBooking = async (bookingData) => {
    setIsSubmitting(true);
    try {
      // Use the new customer orders endpoint that handles both room booking and order creation
      const response = await fetch('http://localhost:8000/api/customer-orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_id: bookingData.room_id,
          customer_name: bookingData.name,
          customer_phone: bookingData.phone,
          customer_email: bookingData.email,
          start_time: `${bookingData.date}T${bookingData.timeSlot}:00`,
          end_time: `${bookingData.date}T${parseInt(bookingData.timeSlot) + 1}:00`,
          notes: bookingData.notes,
          products: bookingData.products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            unit_price: product.price,
            total_price: product.price * product.quantity,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking');
      }

      const result = await response.json();
      console.log('Booking created successfully:', result);

      setIsModalOpen(false);
      setBookingSuccess(true);
      setTimeout(() => setBookingSuccess(false), 5000);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert(`Failed to create booking: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(86,24,24,0.3)_1px,transparent_0)] bg-[length:30px_30px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#561818] to-[#8B4513] rounded-full mb-6"
            >
              <FiCalendar className="w-8 h-8 text-white" />
            </motion.div>
            
            <h1 className="font-hero text-4xl md:text-6xl font-bold text-[#561818] mb-6 leading-tight">
              {i18n.language === "ar" ? "احجز مساحتك المثالية" : "Book Your Perfect Space"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {i18n.language === "ar" 
                ? "اختر من مجموعة متنوعة من الغرف المصممة خصيصاً لتلبية احتياجاتك المختلفة"
                : "Choose from a variety of thoughtfully designed rooms to meet your different needs"
              }
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center items-center space-x-8 rtl:space-x-reverse mt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#561818]">4</div>
                <div className="text-sm text-gray-500">
                  {i18n.language === "ar" ? "أنواع غرف" : "Room Types"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#561818]">29</div>
                <div className="text-sm text-gray-500">
                  {i18n.language === "ar" ? "مقعد متاح" : "Total Seats"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#561818]">760+</div>
                <div className="text-sm text-gray-500">
                  {i18n.language === "ar" ? "حجز سعيد" : "Happy Bookings"}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Success Message */}
        <AnimatePresence>
          {bookingSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="bg-green-50 border border-green-200 text-green-800 px-8 py-6 rounded-2xl mb-12 shadow-lg"
            >
              <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <FiCheck className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-lg">
                  {i18n.language === "ar" ? "تم إرسال طلب الحجز بنجاح!" : "Booking request sent successfully!"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roomsData.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div className="relative h-80">
                <img
                  src={room.image}
                  alt={i18n.language === "ar" ? room.titleAr : room.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Room badge */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <FiStar className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-semibold text-gray-800">{room.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Room info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-amber-300 mb-2 drop-shadow-lg">
                    {i18n.language === "ar" ? room.titleAr : room.title}
                  </h3>
                  <div className="flex items-center space-x-6 rtl:space-x-reverse text-amber-200/90">
                    <div className="flex items-center">
                      <FiUsers className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      <span className="text-sm">{room.capacity} {t("booking.capacity")}</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                      <span className="text-sm">{room.timeSlots.length} {t("booking.slots")}</span>
                    </div>
                    <div className="flex items-center">
                      <FiHeart className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 text-red-400" />
                      <span className="text-sm">{room.bookings}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {i18n.language === "ar" ? room.descriptionAr : room.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3">
                  {room.features.slice(0, 4).map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600"
                    >
                                             <div className="w-6 h-6 bg-[#561818]/10 rounded-lg flex items-center justify-center text-[#561818]">
                         <FeatureIcon feature={feature} />
                       </div>
                      <span className="font-medium">
                        {i18n.language === "ar" ? feature.nameAr : feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing and booking */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-3xl font-bold text-[#561818]">
                      {room.pricePerHour} {i18n.language === "ar" ? "جنيه" : "EGP"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {i18n.language === "ar" ? "/ ساعة" : "/ hour"}
                    </div>
                  </div>
                  <button
                    onClick={() => handleBookRoom(room)}
                    className="bg-gradient-to-r from-[#561818] to-[#8B4513] text-white px-8 py-4 rounded-xl hover:from-[#6a1f1f] hover:to-[#A0522D] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {i18n.language === "ar" ? "احجز الآن" : "Book Now"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
        onSubmit={handleSubmitBooking}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Booking;
