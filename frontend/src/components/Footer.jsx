import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCoffee,
  FiHeart,
  FiStar,
  FiSend,
} from "react-icons/fi";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const socialLinks = [
    { icon: FiFacebook, href: "#", label: "Facebook", color: "hover:text-blue-400" },
    { icon: FiInstagram, href: "#", label: "Instagram", color: "hover:text-pink-400" },
    { icon: FiTwitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-600" },
  ];

  const services = [
    { name: i18n.language === "ar" ? "قهوة مختصة" : "Specialty Coffee", icon: FiCoffee },
    { name: i18n.language === "ar" ? "غرف خاصة" : "Private Rooms", icon: FiHeart },
    { name: i18n.language === "ar" ? "منتجات مميزة" : "Premium Products", icon: FiStar },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#561818] via-[#6B2121] to-[#8B4513] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                {/* LoopIn Logo with enhanced styling */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative mb-4"
                >
                  <div className="relative inline-block">
                    <Logo className="h-14 md:h-16 drop-shadow-lg" isScrolled={false} />
                    {/* Glow effect behind logo */}
                    <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl scale-150 -z-10"></div>
                  </div>
                  {/* Brand tagline */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-amber-200 text-sm font-medium mt-2 tracking-wider"
                  >
                    {i18n.language === "ar" ? "أكثر من مجرد قهوة" : "More than just coffee"}
                  </motion.p>
                </motion.div>

                <p className="text-gray-200 leading-relaxed text-sm max-w-xs mx-auto lg:mx-0">
                  {i18n.language === "ar" 
                    ? "مكانك المفضل للقهوة المختصة والتجارب الاستثنائية. نجمع بين الجودة والشغف في كل كوب."
                    : "Your favorite place for specialty coffee and exceptional experiences. We combine quality and passion in every cup."
                  }
                </p>
              </motion.div>

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-3"
              >
                <h4 className="text-base font-bold text-amber-200 text-center lg:text-left">
                  {i18n.language === "ar" ? "اشترك في نشرتنا" : "Subscribe to Newsletter"}
                </h4>
                <form onSubmit={handleNewsletterSubmit} className="max-w-xs mx-auto lg:mx-0 space-y-2">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={i18n.language === "ar" ? "البريد الإلكتروني" : "Your email address"}
                      className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubscribed ? (
                      <>
                        <span>{i18n.language === "ar" ? "تم الاشتراك!" : "Subscribed!"}</span>
                        <FiHeart className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        <span>{i18n.language === "ar" ? "اشترك الآن" : "Subscribe"}</span>
                        <FiSend className="w-3 h-3" />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-base font-bold text-amber-200 mb-4 text-center lg:text-left">
                  {i18n.language === "ar" ? "خدماتنا" : "Our Services"}
                </h4>
                <ul className="space-y-2">
                  {services.map((service, index) => (
                    <motion.li
                      key={service.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-center space-x-2 rtl:space-x-reverse text-gray-200 text-sm justify-center lg:justify-start"
                    >
                      <div className="w-6 h-6 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <service.icon className="w-3 h-3 text-amber-400" />
                      </div>
                      <span className="font-medium">{service.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="text-base font-bold text-amber-200 mb-4 text-center lg:text-left">
                  {i18n.language === "ar" ? "معلومات التواصل" : "Contact Info"}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 rtl:space-x-reverse justify-center lg:justify-start">
                    <div className="w-6 h-6 bg-amber-500/20 rounded-lg flex items-center justify-center mt-0.5">
                      <FiMapPin className="w-3 h-3 text-amber-400" />
                    </div>
                    <div className="text-center lg:text-left">
                      <p className="text-gray-200 font-medium text-sm">
                        {i18n.language === "ar" ? "المنصورة، مصر" : "Mansoura, Egypt"}
                      </p>
                      <p className="text-gray-300 text-xs">
                        {i18n.language === "ar" ? "المشاية، المنصورة" : "Al-Mashaya, Mansoura"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 rtl:space-x-reverse justify-center lg:justify-start">
                    <div className="w-6 h-6 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <FiPhone className="w-3 h-3 text-amber-400" />
                    </div>
                    <div>
                      <a href="tel:+2050123456" className="text-gray-200 hover:text-amber-300 transition-colors duration-300 text-sm">
                        +20 50 123 4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 rtl:space-x-reverse justify-center lg:justify-start">
                    <div className="w-6 h-6 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <FiMail className="w-3 h-3 text-amber-400" />
                    </div>
                    <div>
                      <a href="mailto:info@loopin.com" className="text-gray-200 hover:text-amber-300 transition-colors duration-300 text-sm">
                        info@loopin.com
                      </a>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="pt-2">
                    <h5 className="text-amber-200 font-semibold text-xs mb-2 text-center lg:text-left">
                      {i18n.language === "ar" ? "تابعنا" : "Follow Us"}
                    </h5>
                    <div className="flex space-x-2 rtl:space-x-reverse justify-center lg:justify-start">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          className={`w-7 h-7 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:bg-white/20 hover:scale-110`}
                          aria-label={social.label}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                        >
                          <social.icon className="w-3 h-3" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Map Section */}
            <div className="lg:col-span-1 space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h4 className="text-base font-bold text-amber-200 mb-4 text-center lg:text-left">
                  {i18n.language === "ar" ? "موقعنا" : "Our Location"}
                </h4>
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418.1234567890123!2d31.3800!3d31.0400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDAyJzI0LjAiTiAzMcKwMjInNDguMCJF!5e0!3m2!1sen!2seg!4v1234567890123"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="LoopIn Location in Mansoura"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-gray-200 font-medium text-xs">
                        {i18n.language === "ar" ? "المنصورة، مصر" : "Mansoura, Egypt"}
                      </p>
                      <p className="text-gray-300 text-xs mt-1">
                        {i18n.language === "ar" ? "المشاية، المنصورة" : "Al-Mashaya, Mansoura"}
                      </p>
                      <motion.a
                        href="https://maps.google.com/?q=Mansoura,Egypt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 rtl:space-x-reverse mt-2 text-amber-300 hover:text-amber-200 transition-colors duration-300 text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiMapPin className="w-3 h-3" />
                        <span>
                          {i18n.language === "ar" ? "فتح في الخرائط" : "Open in Maps"}
                        </span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-gray-300 text-xs flex items-center space-x-2 rtl:space-x-reverse"
              >
                <span>© {currentYear} LoopIn.</span>
                <span>{i18n.language === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}</span>
                <FiHeart className="w-3 h-3 text-red-400 animate-pulse" />
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex items-center space-x-4 rtl:space-x-reverse text-xs text-gray-300"
              >
                <a href="#" className="hover:text-amber-300 transition-colors duration-300 font-medium">
                  {i18n.language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
                </a>
                <a href="#" className="hover:text-amber-300 transition-colors duration-300 font-medium">
                  {i18n.language === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
