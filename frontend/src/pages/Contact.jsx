import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiFacebook,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";

const Contact = () => {
  const { t } = useTranslation();
  const [messageSuccess, setMessageSuccess] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Contact form submitted:", values);
      setMessageSuccess(true);
      formik.resetForm();
      setTimeout(() => setMessageSuccess(false), 3000);
    },
  });

  const contactInfo = [
    {
      icon: FiPhone,
      label: t("contact.info.phone"),
      value: "+966 12 345 6789",
    },
    {
      icon: FiMail,
      label: t("contact.info.email"),
      value: "info@loopin.com",
    },
    {
      icon: FiMapPin,
      label: t("contact.info.address"),
      value: "King Fahd Road, Riyadh, Saudi Arabia",
    },
    {
      icon: FiClock,
      label: t("contact.info.hours"),
      value: "Mon-Fri: 7AM-10PM, Sat-Sun: 8AM-11PM",
    },
  ];

  const socialLinks = [
    {
      icon: FiFacebook,
      href: "#",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: FiInstagram,
      href: "#",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: FiTwitter,
      href: "#",
      label: "Twitter",
      color: "hover:text-blue-400",
    },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("contact.title")}
          </h1>
          <p className="text-lg text-gray-600">{t("contact.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            {/* Success Message */}
            {messageSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
              >
                {t("contact.success")}
              </motion.div>
            )}

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.name")}
                </label>
                <input
                  type="text"
                  {...formik.getFieldProps("name")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.email")}
                </label>
                <input
                  type="email"
                  {...formik.getFieldProps("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("contact.form.message")}
                </label>
                <textarea
                  {...formik.getFieldProps("message")}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.message}
                  </p>
                )}
              </div>

              <button type="submit" className="w-full btn-primary py-3">
                {t("contact.form.submit")}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4 rtl:space-x-reverse"
                >
                  <div className="flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {info.label}
                    </h3>
                    <p className="text-gray-600">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="font-medium text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4 rtl:space-x-reverse">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-colors duration-200`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-64 bg-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <FiMapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Google Maps</p>
                  <p className="text-sm">(Would be embedded here)</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
