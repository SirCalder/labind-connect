import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// Passo 1: Importe o vídeo diretamente
import videoFundo from "@/assets/video_fundo.mp4";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Container para o vídeo e o overlay */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
          // Passo 2: Use a variável importada como src
          src={videoFundo} 
        >
          {/* A tag <source> não é mais necessária quando usamos import */}
          Seu navegador não suporta o elemento de vídeo.
        </video>
        {/* Overlay Escuro */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      </div>

      {/* Conteúdo da Seção */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider mb-6">
          Laboratório de <br />
          <span className="text-labind-primary-medium">Informática Industrial</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          Inovação e tecnologia para a indústria 4.0. Conectando o futuro através de projetos de pesquisa, ensino e extensão na UDESC.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            variant="labind"
            className="text-lg px-8 py-4 h-auto w-full sm:w-auto"
          >
            <Link to="/projetos">
              Nossos Projetos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg px-8 py-4 h-auto w-full sm:w-auto bg-transparent border-current text-white hover:bg-white hover:text-labind-primary-dark"
          >
            <Link to="/contato">
              Entre em Contato
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;