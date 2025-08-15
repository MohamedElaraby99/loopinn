import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

// Import custom carousel styles
import "../../styles/carousel.css";

const FeaturedProducts = ({ featuredProducts }) => {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-br from-[#561818]/5 via-transparent to-[#D2691E]/5 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#561818] mb-4">
            {t("products.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("products.subtitle")}
          </p>
        </motion.div>

        <div className="relative products-carousel overflow-hidden">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.2}
            initialSlide={1}
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet product-pagination-bullet",
              bulletActiveClass:
                "swiper-pagination-bullet-active product-pagination-bullet-active",
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="!pb-14 !overflow-hidden"
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            key={i18n.language}
          >
            {featuredProducts?.map((product) => (
              <SwiperSlide key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-[#f8f8f8]">
                    <img
                      src={product.image}
                      alt={
                        i18n.language === "ar" ? product.nameAr : product.name
                      }
                      className="w-full h-full object-contain object-center transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        console.error("Image failed to load:", product.image);
                        e.target.src = "/products/cup3.webp";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-[#561818] uppercase tracking-wide mb-2">
                      {i18n.language === "ar" ? product.nameAr : product.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t(`products.categories.${product.category}`)}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="text-center mt-16">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#561818] hover:bg-[#6a1f1f] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>{t("hero.cta.products")}</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

FeaturedProducts.propTypes = {
  featuredProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      nameAr: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FeaturedProducts;
