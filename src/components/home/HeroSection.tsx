import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// Remova a linha: import heroImage from "@/assets/hero-labind.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-labind-primary-dark">
      {/* Seção da imagem de fundo removida para corrigir o build */}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
          LABIND: Inovação e Tecnologia
          <span className="block text-labind-primary-medium">para a Indústria</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Conheça os projetos de ponta desenvolvidos no coração da UDESC CEPLAN
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            variant="labind-secondary"
            size="lg"
            className="text-lg px-8 py-4 h-auto"
          >
            <Link to="/projetos">Nossos Projetos</Link>
          </Button>

          <Button
            asChild
            variant="labind-outline"
            size="lg"
            className="text-lg px-8 py-4 h-auto border-white text-white hover:bg-white hover:text-labind-primary-dark"
          >
            <Link to="/equipe">Conheça Nossa Equipe</Link>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;