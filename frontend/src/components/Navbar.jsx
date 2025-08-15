import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Logo from "./Logo";

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-amber-400 hover:text-amber-300 transition-colors duration-200 font-medium"
  >
    {children}
  </Link>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};



const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure body scroll is restored
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  const handleMobileNavigation = (path) => {
    console.log('handleMobileNavigation called with path:', path);
    setIsOpen(false);
    console.log('Menu closed, navigating to:', path);
    // Use window.location for immediate navigation
    window.location.href = path;
  };



  return (
    <div className="fixed w-full top-0 z-50">
      <nav
        className={`transition-all duration-300 ${
          scrolled ? "bg-[#561818]/95 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24 lg:h-26">
            {/* Logo */}
            <motion.div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <Logo
                  className={`h-29 md:h-30 lg:h-22 hover:scale-105 transition-transform duration-300`}
                  isScrolled={scrolled}
                />
              </Link>
            </motion.div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 transition-colors duration-300 ${
                  scrolled
                    ? "text-amber-200 hover:text-amber-400"
                    : "text-white hover:text-amber-200"
                }`}
              >
                {t("nav.home")}
              </Link>
              <Link
                to="/products"
                className={`px-3 transition-colors duration-300 ${
                  scrolled
                    ? "text-amber-200 hover:text-amber-400"
                    : "text-white hover:text-amber-200"
                }`}
              >
                {t("nav.products")}
              </Link>
              <Link
                to="/booking"
                className={`px-3 transition-colors duration-300 ${
                  scrolled
                    ? "text-amber-200 hover:text-amber-400"
                    : "text-white hover:text-amber-200"
                }`}
              >
                {t("nav.booking")}
              </Link>
              <Link
                to="/customer-orders"
                className={`px-3 transition-colors duration-300 ${
                  scrolled
                    ? "text-amber-200 hover:text-amber-400"
                    : "text-white hover:text-amber-200"
                }`}
              >
                {i18n.language === "ar" ? "تتبع الطلبات" : "Track Orders"}
              </Link>

              <button
                onClick={toggleLanguage}
                className={`rounded-full px-4 py-1 transition-colors duration-300 ${
                  scrolled
                    ? "bg-amber-200 text-[#561818] hover:bg-amber-400"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {i18n.language === "en" ? "عربي" : "English"}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md transition-colors duration-300 ${
                  scrolled
                    ? "text-amber-200 hover:text-amber-400"
                    : "text-white hover:text-amber-200"
                }`}
              >
                {/* Menu Icon */}
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

             {/* Full-Screen Mobile Menu */}
       {isOpen && (
         <div className="md:hidden fixed inset-0 z-[60] bg-gradient-to-br from-[#561818] via-[#8B4513] to-[#D2691E]">
                       {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.5)_1px,transparent_0)] bg-[length:30px_30px]"></div>
            </div>

           {/* Close Button */}
           <div className="absolute top-6 right-6 z-[70]">
             <button
               onClick={() => setIsOpen(false)}
               className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
             >
               <svg
                 className="h-6 w-6"
                 fill="none"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
               >
                 <path d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           </div>

                       {/* Menu Content */}
            <div className="h-full flex flex-col items-center justify-center text-center px-8 relative z-10">
                                                                                        {/* Logo */}
                <div className="mb-12">
                  <button
                    onClick={() => {
                      console.log('Logo clicked');
                      handleMobileNavigation('/');
                    }}
                    className="flex items-center justify-center bg-transparent border-none cursor-pointer"
                  >
                    <Logo
                      className="h-24 md:h-28 hover:scale-105 transition-transform duration-300"
                      isScrolled={false}
                    />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="space-y-8 mb-12">
                  <button
                    onClick={() => {
                      console.log('Home clicked');
                      handleMobileNavigation('/');
                    }}
                    className="block text-3xl font-bold text-white hover:text-amber-200 transition-colors duration-300 cursor-pointer w-full text-center py-4 bg-transparent border-none"
                  >
                    {t("nav.home")}
                  </button>

                  <button
                    onClick={() => {
                      console.log('Products clicked');
                      handleMobileNavigation('/products');
                    }}
                    className="block text-3xl font-bold text-white hover:text-amber-200 transition-colors duration-300 cursor-pointer w-full text-center py-4 bg-transparent border-none"
                  >
                    {t("nav.products")}
                  </button>

                  <button
                    onClick={() => {
                      console.log('Booking clicked');
                      handleMobileNavigation('/booking');
                    }}
                    className="block text-3xl font-bold text-white hover:text-amber-200 transition-colors duration-300 cursor-pointer w-full text-center py-4 bg-transparent border-none"
                  >
                    {t("nav.booking")}
                  </button>
                </div>

             {/* Language Toggle */}
             <div>
               <button
                 onClick={() => {
                   toggleLanguage();
                   setIsOpen(false);
                 }}
                 className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
               >
                 {i18n.language === "ar" ? "English" : "عربي"}
               </button>
             </div>

                           {/* Decorative Element */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
                <div className="w-16 h-1 bg-white/30 rounded-full"></div>
              </div>
           </div>
         </div>
       )}
    </div>
  );
};

export default Navbar;
