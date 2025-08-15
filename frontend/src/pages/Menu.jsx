import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiMinus,
  FiShoppingCart,
  FiPhone,
  FiBell,
  FiCoffee,
  FiStar,
  FiClock,
  FiMapPin,
  FiCheck,
  FiX,
  FiUser,
  FiHeart,
  FiArrowLeft,
  FiArrowRight,
  FiPlay,
  FiSmile,
  FiCoffee as FiCup,
  FiShoppingBag,
  FiHelpCircle,
  FiEdit3,
} from "react-icons/fi";

const menuCategories = [
  {
    id: 1,
    name: "Hot Beverages",
    nameAr: "المشروبات الساخنة",
    icon: FiCoffee,
    items: [
      {
        id: 1,
        name: "Espresso",
        nameAr: "إسبريسو",
        description: "Rich and bold coffee shot",
        descriptionAr: "قهوة قوية ومركزة",
        price: 15,
        image: "/loopin 1.webp",
        popular: true,
      },
      {
        id: 2,
        name: "Cappuccino",
        nameAr: "كابتشينو",
        description: "Espresso with steamed milk and foam",
        descriptionAr: "إسبريسو مع الحليب المبخر والرغوة",
        price: 25,
        image: "/loopin 2.webp",
        popular: false,
      },
      {
        id: 3,
        name: "Latte",
        nameAr: "لاتيه",
        description: "Smooth espresso with steamed milk",
        descriptionAr: "إسبريسو ناعم مع الحليب المبخر",
        price: 28,
        image: "/coffe.jpg",
        popular: true,
      },
    ],
  },
  {
    id: 2,
    name: "Cold Beverages",
    nameAr: "المشروبات الباردة",
    icon: FiHeart,
    items: [
      {
        id: 4,
        name: "Iced Coffee",
        nameAr: "قهوة مثلجة",
        description: "Refreshing cold brew coffee",
        descriptionAr: "قهوة باردة منعشة",
        price: 22,
        image: "/redbull.jpg",
        popular: false,
      },
      {
        id: 5,
        name: "Frappuccino",
        nameAr: "فرابتشينو",
        description: "Blended ice coffee with cream",
        descriptionAr: "قهوة مثلجة مخلوطة مع الكريمة",
        price: 35,
        image: "/loopin5.webp",
        popular: true,
      },
    ],
  },
  {
    id: 3,
    name: "Snacks",
    nameAr: "وجبات خفيفة",
    icon: FiStar,
    items: [
      {
        id: 6,
        name: "Croissant",
        nameAr: "كرواسون",
        description: "Buttery and flaky pastry",
        descriptionAr: "معجنات بالزبدة والطبقات",
        price: 18,
        image: "/loopin7.webp",
        popular: false,
      },
      {
        id: 7,
        name: "Chocolate Muffin",
        nameAr: "مافن بالشوكولاتة",
        description: "Rich chocolate muffin",
        descriptionAr: "مافن غني بالشوكولاتة",
        price: 20,
        image: "/download.jpg",
        popular: true,
      },
    ],
  },
];

const Menu = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [serviceCalled, setServiceCalled] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [orderMode, setOrderMode] = useState(null); // 'self' or 'service'
  const [showTutorial, setShowTutorial] = useState(true); // Force tutorial to show for testing
  const [tutorialStep, setTutorialStep] = useState(0);
  const [showCharacter, setShowCharacter] = useState(true);
  const [orderNote, setOrderNote] = useState("");

  const tutorialSteps = [
    {
      title: i18n.language === "ar" ? "مرحباً! أنا هنا لمساعدتك" : "Hello! I'm here to help you",
      description: i18n.language === "ar" 
        ? "يمكنك طلب الطعام بنفسك أو استدعاء شخص لمساعدتك"
        : "You can order food yourself or call someone to help you",
      action: "welcome",
      character: "/loopincharacter2.png",
      icon: FiSmile
    },
    {
      title: i18n.language === "ar" ? "اطلب بنفسك" : "Order Yourself",
      description: i18n.language === "ar"
        ? "تصفح القائمة واختر ما تريد، ثم اضغط على زر السلة"
        : "Browse the menu and choose what you want, then press the cart button",
      action: "self-order",
      character: "/loopincharacter3.png",
      icon: FiShoppingBag
    },
    {
      title: i18n.language === "ar" ? "اطلب المساعدة" : "Call for Help",
      description: i18n.language === "ar"
        ? "اضغط على زر الجرس لاستدعاء شخص لمساعدتك"
        : "Press the bell button to call someone to help you",
      action: "call-help",
      character: "/loopincharacter4.png",
      icon: FiHelpCircle
    },
    {
      title: i18n.language === "ar" ? "أنت جاهز!" : "You're all set!",
      description: i18n.language === "ar"
        ? "استمتع بتجربتك في LoopIn!"
        : "Enjoy your experience at LoopIn!",
      action: "complete",
      character: "/loopincharacter5.png",
      icon: FiCup
    }
  ];

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCart(cart.filter((cartItem) => cartItem.id !== itemId));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const callService = () => {
    setServiceCalled(true);
    setTimeout(() => setServiceCalled(false), 3000);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setShowCart(false);
    setCart([]);
    setOrderNote(""); // Clear the note after placing order
    setTimeout(() => setOrderPlaced(false), 4000);
  };

  const startTutorial = () => {
    console.log("startTutorial called");
    setShowTutorial(true);
    setShowCharacter(false);
    setShowWelcome(false);
    setTutorialStep(0);
    console.log("showTutorial set to true");
  };

  const nextTutorialStep = () => {
    console.log("nextTutorialStep called, current step:", tutorialStep);
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
      console.log("Moving to next step:", tutorialStep + 1);
    } else {
      // Tutorial completed - close everything
      console.log("Tutorial completed, closing everything");
      setShowTutorial(false);
      setShowWelcome(false);
      setShowCharacter(false);
    }
  };

  const skipTutorial = () => {
    console.log("skipTutorial called");
    setShowTutorial(false);
    setShowWelcome(false);
    setShowCharacter(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#561818] via-[#6b2121] to-[#3d1010] relative overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(217,119,6,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(139,69,19,0.05)_0%,transparent_50%)]"></div>
      </div>
             {/* Character Welcome */}
       <AnimatePresence>
         {showCharacter && showWelcome && (
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.8 }}
             className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4"
           >
                         <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 50 }}
               className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden shadow-2xl"
             >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(86,24,24,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
              </div>

              {/* Character Image */}
              <motion.div
                initial={{ y: -20, scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="mb-6 relative"
              >
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="relative"
                >
                  <img
                    src="/loopincharacter2.png"
                    alt="LoopIn Character"
                    className="w-36 h-36 mx-auto object-contain drop-shadow-lg"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl scale-150 -z-10"></div>
                </motion.div>
              </motion.div>

                             <motion.h2
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="text-4xl font-bold text-[#561818] mb-4"
               >
                 {i18n.language === "ar" ? "أهلاً وسهلاً!" : "Welcome!"}
               </motion.h2>

                             <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="text-gray-700 mb-8 text-lg leading-relaxed"
               >
                {i18n.language === "ar" 
                  ? "مرحباً! أنا هنا لمساعدتك في طلب الطعام. هل تريد مني أن أوضح لك كيفية استخدام هذا النظام؟"
                  : "Hello! I'm here to help you order food. Would you like me to show you how to use this system?"
                }
              </motion.p>

              <div className="flex space-x-4 rtl:space-x-reverse">
                                 <motion.button
                   whileHover={{ scale: 1.05, y: -2 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => {
                     console.log("Button clicked!");
                     startTutorial();
                   }}
                   className="flex-1 bg-[#561818] hover:bg-[#6a1f1f] text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-lg hover:shadow-xl"
                 >
                  <FiPlay className="w-5 h-5" />
                  <span className="text-lg">{i18n.language === "ar" ? "نعم، أوضح لي" : "Yes, show me"}</span>
                </motion.button>

                                 <motion.button
                   whileHover={{ scale: 1.05, y: -2 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => setShowCharacter(false)}
                   className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                 >
                  <span className="text-lg">{i18n.language === "ar" ? "لا، شكراً" : "No, thanks"}</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

                   {/* Professional Tutorial Overlay */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            key="tutorial-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
            style={{ pointerEvents: 'auto', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              className="bg-gradient-to-br from-white/95 to-white/98 backdrop-blur-xl border border-white/40 rounded-3xl p-8 max-w-2xl w-full text-center relative overflow-hidden shadow-2xl"
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-[#561818]/10 to-amber-500/10 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 0.9, 1]
                  }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-[#561818]/10 rounded-full blur-xl"
                />
              </div>

              {/* Step Counter Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-4 right-4 bg-gradient-to-r from-[#561818] to-[#6a1f1f] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
              >
                {tutorialStep + 1} / {tutorialSteps.length}
              </motion.div>

              {/* Enhanced Character Section */}
              <motion.div
                key={tutorialStep}
                initial={{ scale: 0.8, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: -20, opacity: 0 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                className="mb-8 relative"
              >
                {/* Character Container with Enhanced Effects */}
                <div className="relative inline-block">
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      rotate: tutorialStep === 1 ? [0, 3, -3, 0] : [0, 1, -1, 0]
                    }}
                    transition={{ 
                      duration: tutorialStep === 1 ? 2.5 : 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="relative"
                  >
                    <img
                      src={tutorialSteps[tutorialStep].character}
                      alt="LoopIn Character"
                      className="w-40 h-40 mx-auto object-contain drop-shadow-2xl"
                    />
                    
                    {/* Enhanced Glow Effects */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-[#561818]/30 rounded-full blur-3xl scale-150 -z-10"
                    />
                    <motion.div
                      animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-[#561818]/20 to-amber-500/20 rounded-full blur-2xl scale-200 -z-20"
                    />
                  </motion.div>
                  
                  {/* Floating Action Icon */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
                    className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-[#561818] to-[#6a1f1f] rounded-full flex items-center justify-center shadow-xl border-2 border-white"
                  >
                    {(() => {
                      const IconComponent = tutorialSteps[tutorialStep].icon;
                      return <IconComponent className="w-6 h-6 text-white" />;
                    })()}
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Title with Gradient */}
              <motion.h3
                key={`title-${tutorialStep}`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-[#561818] via-[#6a1f1f] to-[#561818] bg-clip-text text-transparent mb-6"
              >
                {tutorialSteps[tutorialStep].title}
              </motion.h3>

              {/* Enhanced Description */}
              <motion.p
                key={`desc-${tutorialStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-[#561818] font-medium mb-10 text-lg leading-relaxed max-w-lg mx-auto"
              >
                {tutorialSteps[tutorialStep].description}
              </motion.p>

              {/* Enhanced Progress Indicator */}
              <div className="flex justify-center space-x-2 rtl:space-x-reverse mb-8">
                {tutorialSteps.map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring", bounce: 0.4 }}
                    className={`relative transition-all duration-500 ${
                      index === tutorialStep 
                        ? 'scale-125' 
                        : 'scale-100'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === tutorialStep 
                        ? 'bg-gradient-to-r from-[#561818] to-[#6a1f1f] shadow-lg' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`} />
                    {index === tutorialStep && (
                      <motion.div
                        layoutId="activeStep"
                        className="absolute inset-0 w-3 h-3 rounded-full bg-gradient-to-r from-[#561818] to-[#6a1f1f] shadow-lg"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.4 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

                             {/* Enhanced Action Buttons */}
               <div className="flex space-x-4 rtl:space-x-reverse" style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10000 }}>
                 <motion.button
                   whileHover={{ scale: 1.05, y: -2 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => {
                     console.log("Skip button clicked!");
                     skipTutorial();
                   }}
                   className="px-8 py-4 text-gray-600 hover:text-gray-800 font-semibold transition-all duration-300 text-lg rounded-xl hover:bg-gray-100"
                   style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10001 }}
                 >
                   {i18n.language === "ar" ? "تخطي" : "Skip"}
                 </motion.button>

                 <motion.button
                   whileHover={{ scale: 1.05, y: -2 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => {
                     console.log("Next/Start button clicked!");
                     nextTutorialStep();
                   }}
                   className="flex-1 bg-gradient-to-r from-[#561818] to-[#6a1f1f] hover:from-[#6a1f1f] hover:to-[#561818] text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 rtl:space-x-reverse shadow-lg hover:shadow-xl text-lg"
                   style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10001 }}
                 >
                  <span>
                    {tutorialStep === tutorialSteps.length - 1 
                      ? (i18n.language === "ar" ? "ابدأ" : "Start")
                      : (i18n.language === "ar" ? "التالي" : "Next")
                    }
                  </span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <FiArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons - Centered in Header */}
      {!showWelcome && !showTutorial && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-3 rtl:space-x-reverse">
                 <motion.button
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           onClick={callService}
           className="bg-[#561818] hover:bg-[#6a1f1f] text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
         >
          <FiBell className="w-5 h-5" />
        </motion.button>
        
                 <motion.button
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           onClick={() => setShowCart(true)}
           className="relative bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
         >
          <FiShoppingCart className="w-5 h-5" />
          {getTotalItems() > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{getTotalItems()}</span>
            </div>
          )}
        </motion.button>
      </div>
      )}

      {/* Table Info Badge */}
      {!showWelcome && !showTutorial && (
        <div className="fixed top-4 left-4 z-50">
                 <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6 }}
           className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-lg px-4 py-2 shadow-lg"
         >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                         <div className="w-8 h-8 bg-[#561818]/20 rounded-lg flex items-center justify-center">
               <FiMapPin className="w-4 h-4 text-[#561818]" />
             </div>
             <div>
               <h1 className="text-sm font-bold text-gray-900">
                 {i18n.language === "ar" ? `الطاولة ${id}` : `Table ${id}`}
               </h1>
               <p className="text-xs text-gray-600">
                 {i18n.language === "ar" ? "LoopIn" : "LoopIn"}
               </p>
             </div>
          </div>
        </motion.div>
      </div>
      )}

      {/* Success Messages */}
      <AnimatePresence>
        {serviceCalled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -100 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className="fixed top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-sm sm:max-w-md mx-4"
          >
            {/* Enhanced Service Called Notification */}
            <motion.div
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-2xl border border-emerald-400/30 backdrop-blur-xl overflow-hidden"
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:12px_12px] sm:bg-[length:15px_15px]"></div>
              </div>
              
              {/* Floating Particles */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"
              />
              <motion.div
                animate={{ 
                  y: [0, 8, 0],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ 
                  duration: 1.8, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-1 h-1 bg-white rounded-full"
              />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-xl sm:rounded-2xl blur-xl scale-150 -z-10"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Header with Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3, type: "spring", bounce: 0.4 }}
                  className="flex items-center justify-center mb-3 sm:mb-4"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <FiBell className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </motion.div>
                    
                    {/* Ringing Animation */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0, 0.3]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "easeOut" 
                      }}
                      className="absolute inset-0 border-2 border-white/30 rounded-full"
                    />
                    <motion.div
                      animate={{ 
                        scale: [1, 1.6, 1],
                        opacity: [0.2, 0, 0.2]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "easeOut",
                        delay: 0.3
                      }}
                      className="absolute inset-0 border-2 border-white/20 rounded-full"
                    />
                  </div>
                </motion.div>
                
                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg sm:text-xl font-bold text-center mb-2 px-2"
                >
                  {i18n.language === "ar" ? "تم استدعاء الخدمة!" : "Service Called!"}
                </motion.h3>
                
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-white/90 text-center text-xs sm:text-sm mb-3 sm:mb-4 px-2 leading-relaxed"
                >
                  {i18n.language === "ar" 
                    ? "سيأتي أحد أعضاء فريقنا لمساعدتك في أقرب وقت"
                    : "One of our team members will be with you shortly"
                  }
                </motion.p>
                
                {/* Progress Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5, delay: 0.6 }}
                  className="h-0.5 sm:h-1 bg-white/30 rounded-full overflow-hidden mx-2"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, delay: 0.6 }}
                    className="h-full bg-white rounded-full"
                  />
                </motion.div>
                
                {/* Status Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex items-center justify-center mt-2 sm:mt-3 space-x-1.5 sm:space-x-2 rtl:space-x-reverse"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full"
                  />
                  <span className="text-xs text-white/80">
                    {i18n.language === "ar" ? "جاري التوجيه..." : "Redirecting..."}
                  </span>
                </motion.div>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-bl-xl sm:rounded-bl-2xl">
                <div className="w-full h-full bg-gradient-to-br from-transparent to-white/10 rounded-bl-xl sm:rounded-bl-2xl"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {orderPlaced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            style={{ 
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div 
              className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-xl p-3 text-center shadow-2xl"
              style={{ 
                width: 'calc(100vw - 8px)',
                maxWidth: '320px',
                margin: '0 auto',
                position: 'relative',
                left: '0',
                right: '0'
              }}
            >
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <FiCheck className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-[#561818] mb-1">
                {i18n.language === "ar" ? "تم تأكيد الطلب!" : "Order Confirmed!"}
              </h3>
              <p className="text-gray-700 text-xs mb-2">
                {i18n.language === "ar" 
                  ? "سيتم تحضير طلبك في أقرب وقت"
                  : "Your order will be prepared shortly"
                }
              </p>
              {orderNote && (
                <div className="mt-2 p-1 bg-[#561818]/10 rounded-lg border border-[#561818]/20">
                  <p className="text-xs text-[#561818]">
                    <strong>{i18n.language === "ar" ? "ملاحظاتك:" : "Your notes:"}</strong> {orderNote}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 pt-20">
        <AnimatePresence mode="wait">
          {showWelcome && !showTutorial ? (
            /* Welcome Screen */
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8"
            >
              {/* Hero Welcome */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#561818] to-[#8B4513] rounded-full shadow-xl mb-6"
                >
                  <FiCoffee className="w-10 h-10 text-white" />
                </motion.div>
                
                                 <h1 className="font-hero text-3xl md:text-5xl font-bold text-white leading-tight">
                   {i18n.language === "ar" ? "أهلاً وسهلاً في LoopIn!" : "Welcome to LoopIn!"}
                 </h1>
                 <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                   {i18n.language === "ar" 
                     ? "نحن سعداء لخدمتك! اختر الطريقة المفضلة لديك"
                     : "We're happy to serve you! Choose your preferred way to order"
                   }
                 </p>
              </motion.div>

              {/* Order Options */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setOrderMode('self');
                    setShowWelcome(false);
                  }}
                  className="group bg-gradient-to-br from-[#561818] to-[#8B4513] text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <FiShoppingCart className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold">
                      {i18n.language === "ar" ? "اطلب بنفسك" : "Order Yourself"}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {i18n.language === "ar" 
                        ? "تصفح القائمة واطلب ما تريد"
                        : "Browse menu and order what you want"
                      }
                    </p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setOrderMode('service');
                    callService();
                    setShowWelcome(false);
                  }}
                  className="group bg-gradient-to-br from-amber-500 to-amber-600 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <FiBell className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold">
                      {i18n.language === "ar" ? "اطلب المساعدة" : "Call for Help"}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {i18n.language === "ar" 
                        ? "سيأتي شخص لمساعدتك"
                        : "Someone will come to assist you"
                      }
                    </p>
                  </div>
                </motion.button>
              </motion.div>

                             {/* Enhanced Category Preview */}
               <motion.div
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.6 }}
                 className="space-y-8"
               >
                 <motion.div
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.6, delay: 0.8 }}
                   className="text-center"
                 >
                   <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent mb-2">
                     {i18n.language === "ar" ? "استكشف فئاتنا المميزة" : "Explore Our Premium Categories"}
                   </h2>
                   <p className="text-white/80 text-lg">
                     {i18n.language === "ar" 
                       ? "اختر من مجموعة متنوعة من المشروبات والوجبات الخفيفة"
                       : "Choose from our diverse selection of beverages and snacks"
                     }
                   </p>
                 </motion.div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {menuCategories.map((category, index) => (
                     <motion.button
                       key={category.id}
                       initial={{ opacity: 0, y: 30, scale: 0.8 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       transition={{ duration: 0.6, delay: 1.0 + index * 0.15 }}
                       whileHover={{ 
                         scale: 1.05, 
                         y: -8,
                         rotateY: 5
                       }}
                       whileTap={{ scale: 0.95 }}
                       onClick={() => {
                         setActiveCategory(category.id);
                         setOrderMode('self');
                         setShowWelcome(false);
                       }}
                       className="group relative bg-gradient-to-br from-white/95 to-white/98 backdrop-blur-xl p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 hover:border-amber-300/50 overflow-hidden"
                     >
                       {/* Animated Background Pattern */}
                       <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(86,24,24,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                       </div>
                       
                       {/* Floating Particles Effect */}
                       <div className="absolute inset-0 overflow-hidden">
                         <motion.div
                           animate={{ 
                             y: [0, -20, 0],
                             opacity: [0.3, 0.6, 0.3]
                           }}
                           transition={{ 
                             duration: 3, 
                             repeat: Infinity, 
                             ease: "easeInOut",
                             delay: index * 0.5
                           }}
                           className="absolute top-4 right-4 w-2 h-2 bg-amber-400 rounded-full"
                         />
                         <motion.div
                           animate={{ 
                             y: [0, 15, 0],
                             opacity: [0.2, 0.5, 0.2]
                           }}
                           transition={{ 
                             duration: 2.5, 
                             repeat: Infinity, 
                             ease: "easeInOut",
                             delay: index * 0.3
                           }}
                           className="absolute bottom-6 left-6 w-1 h-1 bg-[#561818] rounded-full"
                         />
                       </div>

                       <div className="relative space-y-6">
                         {/* Enhanced Icon Container */}
                         <motion.div
                           whileHover={{ 
                             scale: 1.1,
                             rotate: 5
                           }}
                           className="relative"
                         >
                           <div className="w-16 h-16 bg-gradient-to-br from-[#561818]/20 to-amber-500/20 rounded-2xl flex items-center justify-center mx-auto group-hover:from-[#561818] group-hover:to-amber-500 group-hover:text-white transition-all duration-500 shadow-lg group-hover:shadow-xl">
                             <category.icon className="w-8 h-8 text-[#561818] group-hover:text-white transition-colors duration-500" />
                           </div>
                           
                           {/* Glow Effect */}
                           <motion.div
                             animate={{ 
                               scale: [1, 1.2, 1],
                               opacity: [0.3, 0.6, 0.3]
                             }}
                             transition={{ 
                               duration: 2, 
                               repeat: Infinity, 
                               ease: "easeInOut" 
                             }}
                             className="absolute inset-0 bg-gradient-to-r from-amber-400/30 to-[#561818]/30 rounded-2xl blur-xl scale-150 -z-10"
                           />
                         </motion.div>

                         {/* Enhanced Content */}
                         <div className="space-y-3">
                           <motion.h3 
                             className="text-xl font-bold text-gray-900 group-hover:text-[#561818] transition-colors duration-500 text-center"
                             whileHover={{ scale: 1.05 }}
                           >
                             {i18n.language === "ar" ? category.nameAr : category.name}
                           </motion.h3>
                           
                           <motion.div
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.3 + index * 0.1 }}
                             className="flex items-center justify-center space-x-2 rtl:space-x-reverse"
                           >
                             <div className="w-2 h-2 bg-gradient-to-r from-[#561818] to-amber-500 rounded-full"></div>
                             <span className="text-sm font-medium text-gray-600 group-hover:text-[#561818] transition-colors duration-300">
                               {category.items.length} {i18n.language === "ar" ? "عنصر مميز" : "premium items"}
                             </span>
                             <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-[#561818] rounded-full"></div>
                           </motion.div>
                           
                           {/* Hover Indicator */}
                           <motion.div
                             initial={{ width: 0 }}
                             whileHover={{ width: "60%" }}
                             className="h-1 bg-gradient-to-r from-[#561818] to-amber-500 rounded-full mx-auto transition-all duration-500"
                           />
                         </div>
                       </div>
                       
                       {/* Corner Accent */}
                       <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-[#561818] to-amber-500 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                         <div className="w-full h-full bg-gradient-to-br from-transparent to-white/20 rounded-bl-2xl"></div>
                       </div>
                     </motion.button>
                   ))}
                 </div>
                 
                 {/* Category Navigation Hint */}
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 1.5 }}
                   className="text-center"
                 >
                   <p className="text-white/70 text-sm">
                     {i18n.language === "ar" 
                       ? "انقر على أي فئة لاستكشاف قائمتنا الكاملة"
                       : "Click on any category to explore our full menu"
                     }
                   </p>
                 </motion.div>
               </motion.div>
            </motion.div>
          ) : (
            /* Menu Interface */
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Back to Welcome */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWelcome(true)}
                                       className="flex items-center space-x-2 rtl:space-x-reverse text-white/90 hover:text-white transition-colors duration-300"
              >
                
                
              </motion.button>

              {/* Category Tabs */}
              <div className="flex space-x-4 rtl:space-x-reverse mb-8 overflow-x-auto">
                {menuCategories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category.id)}
                                         className={`flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                       activeCategory === category.id
                         ? "bg-white text-[#561818] shadow-lg"
                         : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                     }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{i18n.language === "ar" ? category.nameAr : category.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Menu Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuCategories
                  .find((cat) => cat.id === activeCategory)
                  ?.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                      <div className="relative h-48">
                        <img
                          src={item.image}
                          alt={i18n.language === "ar" ? item.nameAr : item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.popular && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="absolute top-4 left-4 bg-[#561818] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
                          >
                            {i18n.language === "ar" ? "الأكثر طلباً" : "Popular"}
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="p-6">
                                                 <h3 className="text-xl font-bold text-gray-900 mb-2">
                           {i18n.language === "ar" ? item.nameAr : item.name}
                         </h3>
                         <p className="text-gray-700 mb-4">
                           {i18n.language === "ar" ? item.descriptionAr : item.description}
                         </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-[#561818]">
                            {item.price} {i18n.language === "ar" ? "جنيه" : "EGP"}
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addToCart(item)}
                            className="bg-[#561818] hover:bg-[#6a1f1f] text-white px-6 py-2 rounded-lg flex items-center space-x-2 rtl:space-x-reverse transition-colors duration-300 shadow-lg hover:shadow-xl"
                          >
                            <FiPlus className="w-4 h-4" />
                            <span>{i18n.language === "ar" ? "إضافة" : "Add"}</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white rounded-t-3xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {i18n.language === "ar" ? "طلبك" : "Your Order"}
                  </h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <FiShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {i18n.language === "ar" ? "السلة فارغة" : "Cart is empty"}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 rounded-xl"
                        >
                          <img
                            src={item.image}
                            alt={i18n.language === "ar" ? item.nameAr : item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {i18n.language === "ar" ? item.nameAr : item.name}
                            </h3>
                            <p className="text-[#561818] font-bold">
                              {item.price} {i18n.language === "ar" ? "جنيه" : "EGP"}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors duration-300"
                            >
                              <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors duration-300"
                            >
                              <FiPlus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Note Section */}
                    <div className="border-t pt-4 mb-4">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2 rtl:space-x-reverse">
                          <FiEdit3 className="w-4 h-4 text-[#561818]" />
                          <span>{i18n.language === "ar" ? "ملاحظات الطلب (اختياري)" : "Order Notes (Optional)"}</span>
                        </label>
                        <textarea
                          value={orderNote}
                          onChange={(e) => setOrderNote(e.target.value)}
                          placeholder={i18n.language === "ar" 
                            ? "أضف أي ملاحظات خاصة لطلبك..." 
                            : "Add any special notes for your order..."
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#561818] focus:border-transparent resize-none"
                          rows="3"
                          maxLength="200"
                        />
                        <div className="text-xs text-gray-500 text-right">
                          {orderNote.length}/200
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-bold text-gray-900">
                          {i18n.language === "ar" ? "المجموع:" : "Total:"}
                        </span>
                        <span className="text-2xl font-bold text-[#561818]">
                          {getTotalPrice()} {i18n.language === "ar" ? "جنيه" : "EGP"}
                        </span>
                      </div>
                      
                      <button
                        onClick={placeOrder}
                        className="w-full bg-[#561818] hover:bg-[#6a1f1f] text-white py-4 rounded-xl font-semibold text-lg transition-colors duration-300"
                      >
                        {i18n.language === "ar" ? "تأكيد الطلب" : "Confirm Order"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu; 