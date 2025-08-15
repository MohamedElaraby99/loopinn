import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiCalendar,
  FiCoffee,
  FiArrowLeft,
  FiSearch,
  FiMapPin,
} from "react-icons/fi";
import Logo from "../components/Logo";

const NotFound = () => {
  const { t, i18n } = useTranslation();

  const quickLinks = [
    {
      to: "/",
      icon: FiHome,
      label: i18n.language === "ar" ? "الصفحة الرئيسية" : "Home",
      description: i18n.language === "ar" ? "العودة إلى الصفحة الرئيسية" : "Back to homepage",
    },
    {
      to: "/products",
      icon: FiShoppingBag,
      label: i18n.language === "ar" ? "المنتجات" : "Products",
      description: i18n.language === "ar" ? "تصفح منتجاتنا المميزة" : "Browse our products",
    },
    {
      to: "/booking",
      icon: FiCalendar,
      label: i18n.language === "ar" ? "احجز غرفة" : "Book a Room",
      description: i18n.language === "ar" ? "احجز مساحتك الخاصة" : "Reserve your space",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(86,24,24,0.3)_1px,transparent_0)] bg-[length:30px_30px]"></div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-amber-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#561818]/5 to-[#8B4513]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Logo className="h-16 md:h-20 mx-auto drop-shadow-lg" isScrolled={false} />
          </motion.div>

          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <h1 className="font-hero text-8xl md:text-9xl lg:text-[12rem] font-bold text-[#561818]/20 leading-none">
              404
            </h1>
          </motion.div>

          {/* Coffee Cup Animation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative mb-8"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#561818] to-[#8B4513] rounded-full shadow-xl"
            >
              <FiCoffee className="w-12 h-12 text-white" />
            </motion.div>
            
            {/* Steam Animation */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-8 bg-gradient-to-t from-gray-400/50 to-transparent rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-0 left-2 w-2 h-6 bg-gradient-to-t from-gray-300/40 to-transparent rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.7, 1, 0.7] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-2 -left-1 w-2 h-5 bg-gradient-to-t from-gray-400/30 to-transparent rounded-full"
              />
            </div>
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-4 mb-12"
          >
            <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold text-[#561818] leading-tight">
              {i18n.language === "ar" ? "عذراً، الصفحة غير موجودة!" : "Oops! Page Not Found"}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {i18n.language === "ar" 
                ? "يبدو أن الصفحة التي تبحث عنها قد انتهت مثل آخر رشفة قهوة. لكن لا تقلق، لدينا الكثير من الأشياء الرائعة الأخرى!"
                : "Looks like the page you're looking for has gone missing like the last sip of coffee. But don't worry, we have plenty of other great things!"
              }
            </p>
          </motion.div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={link.to}
                className="group block bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#561818]/20"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#561818] to-[#8B4513] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <link.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#561818] transition-colors duration-300">
                      {link.label}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {link.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center space-x-3 rtl:space-x-reverse bg-gradient-to-r from-[#561818] to-[#8B4513] hover:from-[#6a1f1f] hover:to-[#A0522D] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <FiArrowLeft className={`w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300 ${i18n.language === "ar" ? "rotate-180" : ""}`} />
            <span>{i18n.language === "ar" ? "العودة للخلف" : "Go Back"}</span>
          </button>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 rtl:md:space-x-reverse text-gray-500">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <FiMapPin className="w-4 h-4" />
              <span className="text-sm">
                {i18n.language === "ar" ? "المنصورة، مصر" : "Mansoura, Egypt"}
              </span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <FiCoffee className="w-4 h-4" />
              <span className="text-sm">
                {i18n.language === "ar" ? "قهوة مختصة منذ 2024" : "Specialty Coffee Since 2024"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound; 