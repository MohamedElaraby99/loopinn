import { useEffect, useState } from "react";
import Logo from "./Logo";
import RingLoader from "react-spinners/RingLoader";
import CircleLoader from "react-spinners/CircleLoader";

const Loader = ({ progress = 0, loadedResources = 0, totalResources = 0, loadingStage = 'initializing' }) => {
  const [mounted, setMounted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-1000 ease-out ${
      mounted ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-100">
        {/* Floating coffee beans */}
        <div className="absolute top-20 left-20 animate-float-slow opacity-20">
          <div className="w-4 h-4 bg-amber-600 rounded-full"></div>
        </div>
        <div className="absolute top-40 right-32 animate-float-medium opacity-30">
          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-32 left-32 animate-float-fast opacity-25">
          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-20 right-20 animate-float-slow opacity-20">
          <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative h-full flex items-center justify-center">
       
          {/* <RingLoader color="#fbbf24" size={100} /> */}
          <CircleLoader color="#fbbf24" size={200} />

      </div>
    </div>
  );
};

export default Loader;
