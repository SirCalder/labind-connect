import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Cpu, Lightbulb, Users, Target } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Lightbulb,
      title: "Inovação",
      description: "Desenvolvemos soluções tecnológicas inovadoras para os desafios da indústria moderna"
    },
    {
      icon: Cpu,
      title: "Tecnologia",
      description: "Utilizamos as mais avançadas tecnologias em automação, IA e sistemas embarcados"
    },
    {
      icon: Users,
      title: "Formação",
      description: "Capacitamos estudantes e profissionais para o mercado de informática industrial"
    },
    {
      icon: Target,
      title: "Resultados",
      description: "Entregamos projetos com impacto real na eficiência e produtividade industrial"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
            Bem-vindo ao Laboratório de Informática Industrial
          </h2>
          <p className="text-lg text-foreground-light max-w-3xl mx-auto leading-relaxed">
            O LABIND é um centro de excelência em pesquisa e desenvolvimento localizado na UDESC CEPLAN. 
            Nossa missão é promover a inovação tecnológica através de projetos de pesquisa aplicada, 
            formação de recursos humanos qualificados e parcerias estratégicas com a indústria.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-labind-primary-medium/10 rounded-xl flex items-center justify-center group-hover:bg-labind-primary-medium/20 transition-colors">
                <feature.icon className="w-8 h-8 text-labind-primary-medium" />
              </div>
              <h3 className="font-semibold text-xl text-foreground mb-2">{feature.title}</h3>
              <p className="text-foreground-light">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            asChild 
            variant="labind-primary" 
            size="lg"
            className="text-lg px-8 py-4 h-auto"
          >
            <Link to="/equipe">Conheça Nossa Equipe</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;