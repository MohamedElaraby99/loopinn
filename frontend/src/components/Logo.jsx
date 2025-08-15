import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Logo = ({ className = "", isScrolled = false }) => {
  const fillColor = isScrolled ? "url(#goldGradient)" : "#FFFFFF";

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <motion.svg
        width="108"
        height="84"
        viewBox="0 0 104 84"
        marginTop="10px"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2315_2)">
          <motion.path
            d="M1.6042 51.9777C1.49461 57.9613 1.57431 59.5968 1.51453 62.7482C1.46472 65.7998 1.37505 68.5822 3.27792 70.7363C3.6565 71.1552 4.06497 71.5142 4.4834 71.8034C5.65899 72.6211 7.07368 73.03 8.50831 73.0599"
            stroke={fillColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M21.8282 56.4554C22.1769 56.4155 22.5256 56.3856 22.8942 56.3856C27.467 56.3856 31.1731 60.0954 31.1731 64.6729C31.1731 69.2504 27.467 72.9602 22.8942 72.9602C18.3213 72.9602 14.6152 69.2504 14.6152 64.6729C14.6152 64.3338 14.6352 63.9948 14.675 63.6657"
            stroke={fillColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.path
            d="M44.334 56.4554C44.6827 56.4155 45.0314 56.3856 45.4 56.3856C49.9729 56.3856 53.679 60.0954 53.679 64.6729C53.679 69.2504 49.9729 72.9602 45.4 72.9602C40.8272 72.9602 37.1211 69.2504 37.1211 64.6729"
            stroke={fillColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.path
            d="M66.8892 56.4554C67.2379 56.4155 67.5866 56.3856 67.9552 56.3856C72.5281 56.3856 76.2342 60.0954 76.2342 64.6729C76.2342 69.2504 72.5281 72.9602 67.9552 72.9602C63.3824 72.9602 59.6763 69.2504 59.6763 64.6729V82.5041"
            stroke={fillColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.path
            d="M61.6589 59.2178C61.9505 59.2178 62.1869 58.9812 62.1869 58.6893C62.1869 58.3974 61.9505 58.1607 61.6589 58.1607C61.3673 58.1607 61.1309 58.3974 61.1309 58.6893C61.1309 58.9812 61.3673 59.2178 61.6589 59.2178Z"
            stroke={fillColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
          />
          <motion.path
            d="M82.2617 56.0465V73.04"
            stroke={fillColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
          />
          <motion.path
            d="M88.1794 73.6882C88.471 73.6882 88.7074 73.4516 88.7074 73.1597C88.7074 72.8677 88.471 72.6311 88.1794 72.6311C87.8878 72.6311 87.6514 72.8677 87.6514 73.1597C87.6514 73.4516 87.8878 73.6882 88.1794 73.6882Z"
            stroke={fillColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1.2 }}
          />
          <motion.path
            d="M88.1597 67.5351V56.3856L102.446 72.5414V56.0266"
            stroke={fillColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 1.4 }}
          />
          <motion.path
            d="M49.4744 38.0358H45.6487C45.4893 38.0358 45.3199 38.0458 45.1705 38.0757C43.6064 38.0757 42.0323 38.0757 40.3884 38.0757C39.2527 38.0757 38.4955 37.3876 38.4856 36.2607L38.4258 14.979C38.4258 13.4631 38.4258 11.9473 38.4258 10.4215V7.96817C38.4258 6.23293 37.0111 4.8168 35.2776 4.8168C33.5441 4.8168 32.1294 6.23293 32.1294 7.96817V10.3915C32.1294 10.3915 32.1294 10.4115 32.1294 10.4314C32.1095 21.2418 32.0796 26.7468 32.0796 37.5472C32.0796 39.8708 33.1356 41.7058 34.9488 43.1219C36.493 44.3186 38.2863 44.6079 40.1792 44.5979C42.0024 44.5979 43.7359 44.5979 45.4694 44.5979C45.5292 44.5979 45.5889 44.5979 45.6487 44.5979H47.0933C47.8803 44.5979 48.6773 44.5979 49.4943 44.5979C49.6138 44.5979 49.7433 44.5979 49.8629 44.5979C49.9625 44.5979 50.0522 44.568 50.1319 44.5281C51.6163 44.2189 52.7521 42.9025 52.7521 41.3268C52.7521 39.5318 51.2776 38.0558 49.4843 38.0558L49.4744 38.0358Z"
            fill={fillColor}
            initial={{ fillOpacity: 0 }}
            animate={{ fillOpacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1.6 }}
          />
          <motion.path
            d="M70.5653 12.1667C69.1406 9.18485 67.0484 6.89113 63.9102 5.71435C61.6288 4.8567 59.2477 4.80684 56.8766 5.14591C54.0871 5.54482 51.6562 6.69168 49.7832 8.86572C47.4021 11.6282 46.4258 14.8892 46.4258 18.4794V26.5274C46.4258 26.5274 46.4258 26.5972 46.4258 26.6371V30.7857C46.4258 32.501 47.8305 33.8972 49.5341 33.8972C51.1879 33.8972 52.5428 32.5908 52.6325 30.9652C52.6624 30.9054 52.6724 30.8455 52.6724 30.7857C52.6724 26.2681 52.6724 23.5455 52.7122 19.0279C52.7122 18.1204 52.8019 17.183 53.0111 16.3054C54.2066 11.3689 59.6362 10.222 62.7147 12.416C64.7172 13.8421 65.564 15.8666 65.574 18.25C65.6039 26.7667 65.6039 29.8782 65.6138 38.2852V41.616C65.6138 43.3214 67.0086 44.7275 68.7222 44.7275C70.4258 44.7275 71.8305 43.3314 71.8305 41.616V38.6542C71.8305 38.6542 71.8405 38.5744 71.8405 38.5345C71.8405 36.8591 71.8405 35.2136 71.8405 33.5681C71.8405 27.036 71.8205 26.0188 71.8604 19.4866C71.8803 16.9536 71.6711 14.5003 70.5653 12.1667Z"
            fill={fillColor}
            initial={{ fillOpacity: 0 }}
            animate={{ fillOpacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1.8 }}
          />
          <motion.path
            d="M74.8393 2.67269C74.8991 2.78239 74.9589 2.90206 75.0186 3.01176C75.1481 3.25111 75.2777 3.50043 75.4171 3.73977C75.4171 3.73977 75.4171 3.75972 75.4271 3.77966C75.4171 3.77966 75.4072 3.77966 75.3972 3.77966C75.2478 3.77966 75.1083 3.77966 74.9589 3.77966C74.9389 3.77966 74.929 3.77966 74.919 3.75972C74.7496 3.44059 74.5902 3.12146 74.4209 2.80234C74.4109 2.78239 74.4009 2.77242 74.3711 2.77242C74.2216 2.77242 74.0722 2.77242 73.9227 2.77242H73.8929V3.76969H73.4346V1.17679C73.4346 1.17679 73.4346 1.17679 73.4445 1.17679C73.7633 1.17679 74.0921 1.17679 74.4109 1.17679C74.5604 1.17679 74.7098 1.20671 74.8493 1.26654C75.1083 1.37624 75.2478 1.5757 75.2777 1.85493C75.2876 1.98458 75.2777 2.11422 75.2478 2.23389C75.188 2.4134 75.0684 2.54305 74.909 2.6328C74.8792 2.65275 74.8493 2.66272 74.8194 2.68267L74.8393 2.67269Z"
            fill={fillColor}
            initial={{ fillOpacity: 0 }}
            animate={{ fillOpacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 2.4 }}
          />
          <motion.path
            d="M73.9028 2.4134C73.9028 2.4134 73.9227 2.4134 73.9327 2.4134C74.0821 2.4134 74.2216 2.4134 74.3711 2.4134C74.4209 2.4134 74.4806 2.4134 74.5305 2.39346C74.6699 2.36354 74.7696 2.28376 74.8194 2.15411C74.8493 2.07433 74.8592 1.99455 74.8493 1.90479C74.8293 1.73526 74.7297 1.60561 74.5703 1.56572C74.5105 1.54578 74.4508 1.54578 74.381 1.53581C74.2316 1.53581 74.0821 1.53581 73.9227 1.53581C73.9227 1.53581 73.9028 1.53581 73.8929 1.53581V2.40343L73.9028 2.4134Z"
            fill={fillColor}
            initial={{ fillOpacity: 0 }}
            animate={{ fillOpacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 2.6 }}
          />
          <defs>
            <linearGradient id="goldGradient" x1="24" y1="8" x2="24" y2="40">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFA500" />
            </linearGradient>
            <clipPath id="clip0_2315_2">
              <rect width="104" height="84" fill="white" />
            </clipPath>
          </defs>
        </g>
      </motion.svg>

      {/* تأثير التوهج */}
      <div
        className={`absolute inset-0 -z-10 blur-lg rounded-full ${
          isScrolled ? "bg-amber-500/20" : "bg-white/20"
        }`}
      />
    </motion.div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  isScrolled: PropTypes.bool,
};

export default Logo;
