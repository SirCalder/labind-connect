import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import StatsSection from "@/components/home/StatsSection";
import NewsSection from "@/components/home/NewsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20"> {/* Account for fixed header */}
        <HeroSection />
        <AboutSection />
        <FeaturedProjects />
        <StatsSection />
        <NewsSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
