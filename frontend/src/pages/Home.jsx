import { productsData } from "../pages/Products";

// Import components
import HeroSection from "../components/home/HeroSection";
import MobileCoffeeSection from "../components/home/MobileCoffeeSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import RoomBooking from "../components/home/RoomBooking";
import AboutUs from "../components/home/AboutUs";

const Home = () => {
  // Select featured products (first 8 products)
  const featuredProducts = productsData.slice(0, 8);

  // Debug log
  console.log("Products Data:", productsData);
  console.log("Featured Products:", featuredProducts);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <MobileCoffeeSection />
      <FeaturedProducts featuredProducts={featuredProducts} />
      <RoomBooking />
      <AboutUs />
    </div>
  );
};

export default Home;
