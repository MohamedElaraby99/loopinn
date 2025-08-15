import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiPackage,
  FiCheckCircle,
  FiClock as FiPending,
  FiXCircle,
  FiTruck,
  FiUser,
  FiPhone,
  FiMail,
  FiRefreshCw,
} from "react-icons/fi";

const CustomerOrders = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("phone"); // "phone" or "email"
  const [customerOrders, setCustomerOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const searchOrders = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a phone number or email address");
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const params = new URLSearchParams();
      if (searchType === "phone") {
        params.append("phone", searchQuery);
      } else {
        params.append("email", searchQuery);
      }

      const response = await fetch(`http://localhost:8000/api/customer-orders/?${params}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch orders");
      }

      const data = await response.json();
      setCustomerOrders(data.customer_bookings || []);
      
      if (data.customer_bookings.length === 0) {
        setError("No orders found for this " + searchType);
      }
    } catch (error) {
      console.error("Error searching orders:", error);
      setError(error.message);
      setCustomerOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <FiPending className="w-5 h-5 text-yellow-500" />;
      case "cancelled":
        return <FiXCircle className="w-5 h-5 text-red-500" />;
      case "completed":
        return <FiCheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <FiClock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) {
      return "Expired";
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  const isActive = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    return now >= start && now <= end;
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(86,24,24,0.3)_1px,transparent_0)] bg-[length:30px_30px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#561818] to-[#8B4513] rounded-full mb-6"
            >
              <FiPackage className="w-8 h-8 text-white" />
            </motion.div>
            
            <h1 className="font-hero text-4xl md:text-6xl font-bold text-[#561818] mb-6 leading-tight">
              {i18n.language === "ar" ? "تتبع طلباتك" : "Track Your Orders"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {i18n.language === "ar" 
                ? "ابحث عن طلباتك وحجوزاتك باستخدام رقم هاتفك أو بريدك الإلكتروني"
                : "Search for your orders and bookings using your phone number or email"
              }
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {i18n.language === "ar" ? "البحث عن الطلبات" : "Search Orders"}
            </h2>
            
            <div className="space-y-6">
              {/* Search Type Toggle */}
              <div className="flex justify-center">
                <div className="bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setSearchType("phone")}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      searchType === "phone"
                        ? "bg-white text-[#561818] shadow-md"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <FiPhone className="inline w-4 h-4 mr-2" />
                    {i18n.language === "ar" ? "رقم الهاتف" : "Phone Number"}
                  </button>
                  <button
                    onClick={() => setSearchType("email")}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      searchType === "email"
                        ? "bg-white text-[#561818] shadow-md"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <FiMail className="inline w-4 h-4 mr-2" />
                    {i18n.language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </button>
                </div>
              </div>

              {/* Search Input */}
              <div className="relative">
                <input
                  type={searchType === "phone" ? "tel" : "email"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    searchType === "phone"
                      ? (i18n.language === "ar" ? "أدخل رقم الهاتف" : "Enter phone number")
                      : (i18n.language === "ar" ? "أدخل البريد الإلكتروني" : "Enter email address")
                  }
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#561818] focus:border-transparent transition-all duration-300 text-lg"
                  onKeyPress={(e) => e.key === "Enter" && searchOrders()}
                />
                <button
                  onClick={searchOrders}
                  disabled={loading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#561818] text-white p-3 rounded-lg hover:bg-[#8B4513] transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <FiRefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <FiSearch className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Search Button */}
              <button
                onClick={searchOrders}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#561818] to-[#8B4513] text-white py-4 rounded-xl font-semibold text-lg hover:from-[#6a1f1f] hover:to-[#A0522D] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <FiRefreshCw className="w-5 h-5 animate-spin mr-2" />
                    {i18n.language === "ar" ? "جاري البحث..." : "Searching..."}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FiSearch className="w-5 h-5 mr-2" />
                    {i18n.language === "ar" ? "البحث عن الطلبات" : "Search Orders"}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl mb-8 text-center"
          >
            <div className="flex items-center justify-center">
              <FiXCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          </motion.div>
        )}

        {/* Results Section */}
        {searched && !loading && customerOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {i18n.language === "ar" ? "نتائج البحث" : "Search Results"}
            </h2>

            {customerOrders.map((booking, index) => (
              <motion.div
                key={booking.booking_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 ${
                  isActive(booking.start_time, booking.end_time)
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 hover:border-[#561818]"
                }`}
              >
                {/* Booking Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-[#561818] rounded-xl flex items-center justify-center">
                      <FiMapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {booking.room_name}
                      </h3>
                      <p className="text-gray-600">
                        {i18n.language === "ar" ? "رقم الغرفة" : "Room ID"}: {booking.room_id}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(booking.booking_status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.booking_status)}`}>
                      {booking.booking_status?.toUpperCase() || "UNKNOWN"}
                    </span>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <FiUser className="w-5 h-5 text-[#561818]" />
                    <span className="font-medium">{booking.customer_name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiPhone className="w-5 h-5 text-[#561818]" />
                    <span className="font-medium">{booking.customer_phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiMail className="w-5 h-5 text-[#561818]" />
                    <span className="font-medium">{booking.customer_email}</span>
                  </div>
                </div>

                {/* Time Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <FiCalendar className="w-5 h-5 text-[#561818]" />
                    <div>
                      <p className="font-medium">
                        {i18n.language === "ar" ? "الوقت" : "Time"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDateTime(booking.start_time)} - {formatDateTime(booking.end_time)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiClock className="w-5 h-5 text-[#561818]" />
                    <div>
                      <p className="font-medium">
                        {i18n.language === "ar" ? "الوقت المتبقي" : "Time Remaining"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {getTimeRemaining(booking.end_time)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Orders */}
                {booking.orders && booking.orders.length > 0 && (
                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiPackage className="w-5 h-5 mr-2 text-[#561818]" />
                      {i18n.language === "ar" ? "الطلبات" : "Orders"}
                    </h4>
                    <div className="space-y-3">
                      {booking.orders.map((order) => (
                        <div key={order.order_id} className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">
                                {i18n.language === "ar" ? "طلب رقم" : "Order #"}{order.order_id}
                              </p>
                              <p className="text-sm text-gray-600">
                                {i18n.language === "ar" ? "المبلغ الإجمالي" : "Total Amount"}: {order.total_amount} EGP
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(order.order_status)}
                              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.order_status)}`}>
                                {order.order_status?.toUpperCase() || "UNKNOWN"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Active Status Indicator */}
                {isActive(booking.start_time, booking.end_time) && (
                  <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-xl">
                    <div className="flex items-center justify-center text-green-800">
                      <FiCheckCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">
                        {i18n.language === "ar" ? "الحجز نشط الآن" : "Booking is currently active"}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {searched && !loading && customerOrders.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-gray-50 rounded-2xl p-8">
              <FiPackage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {i18n.language === "ar" ? "لا توجد نتائج" : "No Results Found"}
              </h3>
              <p className="text-gray-600">
                {i18n.language === "ar" 
                  ? "لم نتمكن من العثور على أي طلبات أو حجوزات لهذا " + (searchType === "phone" ? "رقم الهاتف" : "البريد الإلكتروني")
                  : "We couldn't find any orders or bookings for this " + searchType
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
