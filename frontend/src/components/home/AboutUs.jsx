import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import {
  FiCoffee,
  FiMapPin,
  FiHeart,
  FiStar,
  FiSun,
  FiMoon,
} from "react-icons/fi";

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Handle swipe navigation
  const handleSwipe = (direction) => {
    if (direction === 'left' && currentChapter < storyChapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    } else if (direction === 'right' && currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0) {
        handleSwipe('right'); // Swipe right (previous)
      } else {
        handleSwipe('left'); // Swipe left (next)
      }
    }
    setIsDragging(false);
  };

  const storyChapters = [
    {
      id: 0,
      title: i18n.language === "ar" ? "الحلم" : "The Dream",
      time: i18n.language === "ar" ? "في البداية..." : "In the beginning...",
      image: "/download.jpg",
      story: i18n.language === "ar" 
        ? "كان هناك حلم بسيط... فكرة تراودنا في أمسيات الشتاء الهادئة. حلم بمكان يجمع الناس حول كوب قهوة مثالي، مكان يحتضن الأحلام ويغذي الأرواح. لم نكن نعلم وقتها أن هذا الحلم سيصبح LoopIn."
        : "There was a simple dream... an idea that came to us during quiet winter evenings. A dream of a place that brings people together around the perfect cup of coffee, a place that embraces dreams and nourishes souls. We didn't know then that this dream would become LoopIn."
    },
    {
      id: 1,
      title: i18n.language === "ar" ? "البحث" : "The Search",
      time: i18n.language === "ar" ? "أشهر من الاستكشاف..." : "Months of exploration...",
      image: "/loopin4.webp",
      story: i18n.language === "ar" 
        ? "سافرنا عبر القارات بحثاً عن أجود حبوب القهوة. من مزارع إثيوبيا العريقة إلى مرتفعات كولومبيا، ومن جبال جامايكا إلى وديان كوستاريكا. كل رحلة علمتنا شيئاً جديداً عن فن القهوة وشغف المزارعين."
        : "We traveled across continents searching for the finest coffee beans. From the ancient farms of Ethiopia to the highlands of Colombia, from Jamaica's mountains to Costa Rica's valleys. Each journey taught us something new about the art of coffee and the passion of farmers."
    },
    {
      id: 2,
      title: i18n.language === "ar" ? "الإلهام" : "The Inspiration",
      time: i18n.language === "ar" ? "لحظة الإشراق..." : "The moment of clarity...",
      image: "/hero2.webp",
      story: i18n.language === "ar" 
        ? "في مقهى صغير بأزقة اسطنبول القديمة، تذوقنا قهوة غيرت مفهومنا تماماً. لم تكن مجرد مشروب، بل كانت قصة... ذكريات... لحظة سحرية تجمع بين الماضي والحاضر. هنا أدركنا أن LoopIn يجب أن يكون أكثر من مقهى."
        : "In a small café in the old alleys of Istanbul, we tasted coffee that completely changed our understanding. It wasn't just a drink, it was a story... memories... a magical moment connecting past and present. Here we realized that LoopIn had to be more than just a café."
    },
    {
      id: 3,
      title: i18n.language === "ar" ? "الولادة" : "The Birth",
      time: i18n.language === "ar" ? "اليوم..." : "Today...",
      image: "/private-meeting-room.jpg",
      story: i18n.language === "ar" 
        ? "اليوم، نفتح أبواب LoopIn لأول مرة. ليس فقط كمقهى، بل كبيت ثانٍ لكل من يؤمن بقوة القهوة في جمع القلوب. مكان حيث تولد الأفكار، تنمو الصداقات، وتُكتب القصص الجديدة. أهلاً بكم في عائلة LoopIn."
        : "Today, we open LoopIn's doors for the first time. Not just as a café, but as a second home for everyone who believes in coffee's power to unite hearts. A place where ideas are born, friendships grow, and new stories are written. Welcome to the LoopIn family."
    }
  ];

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 text-gray-900 overflow-hidden relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(139,69,19,0.5)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Story Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="flex justify-center items-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-[#561818] to-[#8B4513] rounded-full flex items-center justify-center mr-4">
              <FiCoffee className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-hero text-4xl md:text-5xl font-bold text-[#561818]">
              {i18n.language === "ar" ? "حكايتنا" : "Our Story"}
            </h2>
          </motion.div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed italic">
            {i18n.language === "ar" 
              ? "كل كوب قهوة يحمل قصة... وهذه قصتنا"
              : "Every cup of coffee carries a story... and this is ours"
            }
          </p>
        </motion.div>

        {/* Story Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-2 rtl:space-x-reverse bg-white/60 backdrop-blur-sm rounded-full p-2 shadow-lg">
            {storyChapters.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => setCurrentChapter(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentChapter === index
                    ? 'bg-gradient-to-r from-[#561818] to-[#8B4513] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Story Content */}
        <motion.div 
          className="relative min-h-[600px] touch-pan-y select-none"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'pan-y pinch-zoom'
          }}
          whileDrag={{ scale: 0.98 }}
        >
          {/* Swipe indicator for mobile */}
          <div className="block md:hidden absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
            <motion.div 
              className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-xs text-gray-600 shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.span 
                animate={{ x: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className={currentChapter > 0 ? 'text-[#561818]' : 'text-gray-400'}
              >
                ←
              </motion.span>
              <span className="font-medium">
                {i18n.language === "ar" ? "اسحب للتنقل" : "Swipe to navigate"}
              </span>
              <motion.span 
                animate={{ x: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1 }}
                className={currentChapter < storyChapters.length - 1 ? 'text-[#561818]' : 'text-gray-400'}
              >
                →
              </motion.span>
            </motion.div>
          </div>

          {storyChapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: currentChapter === index ? 1 : 0,
                x: currentChapter === index ? 0 : 50
              }}
              transition={{ duration: isDragging ? 0.1 : 0.6 }}
              className={`absolute inset-0 ${currentChapter === index ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Story Text */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                      {index === 0 && <FiStar className="w-4 h-4 text-white" />}
                      {index === 1 && <FiMapPin className="w-4 h-4 text-white" />}
                      {index === 2 && <FiSun className="w-4 h-4 text-white" />}
                      {index === 3 && <FiHeart className="w-4 h-4 text-white" />}
                    </div>
                    <span className="text-amber-600 font-semibold text-sm tracking-wide uppercase">
                      {chapter.time}
                    </span>
                  </div>
                  
                  <h3 className="font-hero text-3xl md:text-4xl font-bold text-[#561818] mb-6">
                    {chapter.title}
                  </h3>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg font-light">
                      {chapter.story}
                    </p>
                  </div>

                  {/* Chapter indicator */}
                  <div className="flex items-center space-x-2 rtl:space-x-reverse pt-4">
                    <span className="text-xs text-gray-500 font-medium">
                      {i18n.language === "ar" ? "فصل" : "Chapter"} {index + 1} {i18n.language === "ar" ? "من" : "of"} {storyChapters.length}
                    </span>
                    <div className="flex space-x-1 rtl:space-x-reverse">
                      {storyChapters.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-1 rounded-full ${
                            idx <= index ? 'bg-amber-400' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Story Image */}
                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <motion.img
                      src={chapter.image}
                      alt={chapter.title}
                      className="w-full h-96 object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Floating Quote */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <p className="text-[#561818] font-semibold text-base italic">
                          "{chapter.title}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Navigation Arrows - Hidden on Mobile, Shown on Desktop */}
        <div className="hidden md:flex justify-between items-center mt-12">
          <button
            onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
            disabled={currentChapter === 0}
            className={`flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 rounded-lg transition-all duration-300 ${
              currentChapter === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#561818] hover:bg-white/50'
            }`}
          >
            <span className="text-2xl">←</span>
            <span className="font-medium">
              {i18n.language === "ar" ? "السابق" : "Previous"}
            </span>
          </button>

          <button
            onClick={() => setCurrentChapter(Math.min(storyChapters.length - 1, currentChapter + 1))}
            disabled={currentChapter === storyChapters.length - 1}
            className={`flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 rounded-lg transition-all duration-300 ${
              currentChapter === storyChapters.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-[#561818] hover:bg-white/50'
            }`}
          >
            <span className="font-medium">
              {i18n.language === "ar" ? "التالي" : "Next"}
            </span>
            <span className="text-2xl">→</span>
          </button>
        </div>

        {/* Mobile Navigation Instructions */}
        <div className="block md:hidden mt-8 text-center">
          <div className="flex justify-center items-center space-x-6 rtl:space-x-reverse">
            <motion.div 
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentChapter > 0 ? 'bg-[#561818] shadow-lg' : 'bg-gray-300'
              }`}
              whileTap={{ scale: 0.8 }}
              animate={currentChapter > 0 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <motion.span 
              className="text-sm text-gray-600 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full font-medium border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {currentChapter + 1} / {storyChapters.length}
            </motion.span>
            <motion.div 
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentChapter < storyChapters.length - 1 ? 'bg-[#561818] shadow-lg' : 'bg-gray-300'
              }`}
              whileTap={{ scale: 0.8 }}
              animate={currentChapter < storyChapters.length - 1 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};



export default AboutUs;
