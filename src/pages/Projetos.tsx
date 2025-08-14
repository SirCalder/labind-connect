import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Projetos = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Nossos Projetos
            </h1>
            <p className="text-xl text-foreground-light max-w-3xl mx-auto">
              Página em desenvolvimento. Em breve você encontrará aqui todos os nossos projetos 
              de pesquisa e desenvolvimento em informática industrial.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projetos;