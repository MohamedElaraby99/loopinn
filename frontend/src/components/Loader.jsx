import Logo from "./Logo";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Logo with pulse animation */}
        <div className="animate-pulse">
          <Logo className="h-24 w-24 md:h-32 md:w-32" isScrolled={false} />
        </div>

        {/* Simple loading dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
