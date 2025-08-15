import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiCoffee,
  FiLock,
  FiBriefcase,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

const RoomBooking = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-16 bg-gradient-to-br from-[#561818] via-[#8B4513] to-[#D2691E] text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M8 8h4v16h12v4H8z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Professional Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-amber-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <FiHome className="w-5 h-5 text-white" />
                </div>
                <span className="text-amber-400 font-semibold text-lg tracking-wide">
                  {i18n.language === "ar" ? "مساحات خاصة" : "Private Spaces"}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
              >
                {i18n.language === "ar" ? (
                  <>
                    احجز <span className="text-amber-400">غرفتك</span> الخاصة
                  </>
                ) : (
                  <>
                    Book Your <span className="text-amber-400">Private</span>{" "}
                    Room
                  </>
                )}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-200 leading-relaxed max-w-md"
              >
                {t("booking.hero.subtitle")}
              </motion.p>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-amber-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-amber-400/20">
                  <FiCheckCircle className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-gray-200 text-base font-medium">
                  {t("booking.hero.features.quiet")}
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-amber-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-amber-400/20">
                  <FiCoffee className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-gray-200 text-base font-medium">
                  {t("booking.hero.features.coffee")}
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-amber-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-amber-400/20">
                  <FiLock className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-gray-200 text-base font-medium">
                  {t("booking.hero.features.privacy")}
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-8 h-8 bg-amber-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-amber-400/20">
                  <FiBriefcase className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-gray-200 text-base font-medium">
                  {t("booking.hero.features.work")}
                </span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-4"
            >
              <Link
                to="/booking"
                className="group inline-flex items-center space-x-3 rtl:space-x-reverse bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>{t("booking.hero.cta")}</span>
                <FiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/private-meeting-room.jpg"
                  alt="Private Room"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />



                {/* Bottom Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-white">5+</div>
                        <div className="text-sm text-gray-200">
                          {t("booking.hero.roomsCount")}
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-amber-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <FiHome className="w-6 h-6 text-amber-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RoomBooking;
