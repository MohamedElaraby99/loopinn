import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const [swiperKey, setSwiperKey] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Force Swiper to reinitialize when language changes
  useEffect(() => {
    setSwiperKey(prev => prev + 1);
    setImagesLoaded(false);
  }, [i18n.language]);

  // Preload images to ensure they're available
  useEffect(() => {
    const imageUrls = [
      "/loopin4.webp",
      "/hero2.webp", 
      "/download.jpg",
      "/private-meeting-room.jpg"
    ];

    const loadImages = async () => {
      try {
        const imagePromises = imageUrls.map(url => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => {
              console.warn(`Failed to load image: ${url}, will retry`);
              // Retry once after a short delay
              // setTimeout(() => {
              //   const retryImg = new Image();
              //   retryImg.onload = () => resolve(url);
              //   retryImg.onerror = () => reject(new Error(`Failed to load ${url} after retry`));
              //   retryImg.src = url;
              // }, 1000);
            };
            img.src = url;
          });
        });

        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
       
        setImagesLoaded(true);
      }
    };

    loadImages();
  }, [i18n.language]);

  const heroImages = [
    {
      src: "/loopin4.webp",
      alt: "Loopin Hero 1"
    },
    // {
    //   src: "/hero2.webp", 
    //   alt: "Loopin Hero 2"
    // },
    {
      src: "/download.jpg",
      alt: "Loopin Hero 3"
    },
    // {
    //   src: "/private-meeting-room.jpg",
    //   alt: "Loopin Meeting Room"
    // }
  ];

  // if (!imagesLoaded) {
  //   return (
  //     <section className="relative h-screen bg-gray-900 flex items-center justify-center">
  //       <div className="text-white text-center">
  //         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400 mx-auto mb-4"></div>
  //         <p className="text-lg">Loading...</p>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section className="relative h-screen">
      {/* Background Image Carousel */}
      <Swiper
        key={swiperKey}
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet hero-pagination-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active hero-pagination-bullet-active",
        }}
        className="hero-swiper h-full"
        onSwiper={(swiper) => {
          // Ensure proper initialization
          swiper.update();
        }}
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={`${swiperKey}-${index}`}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error(`Failed to load image: ${image.src}`);
                e.target.style.display = 'none';
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content Container */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-end text-right max-w-2xl ml-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-hero text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-wide leading-tight"
            >
              {t("hero.title")
                .split(" . ")
                .map((word, index, array) => (
                  <span key={index}>
                    <span className="text-amber-200">{word}</span>
                    {index < array.length - 1 && (
                      <span className="text-white/50 mx-2">.</span>
                    )}
                  </span>
                ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 mb-8 font-light text-right"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-end"
            >
              <Link
                to="/products"
                className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                {t("hero.cta.products")}
              </Link>
              <Link
                to="/booking"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                {t("hero.cta.booking")}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
