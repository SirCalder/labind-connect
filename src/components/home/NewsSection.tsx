import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "LABIND participa da Feira de Tecnologia Industrial 2024",
      excerpt: "Nosso laboratório apresentou três projetos inovadores na maior feira de tecnologia industrial do sul do Brasil.",
      date: "2024-03-15",
      category: "Eventos",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Novo projeto de IA aprovado pela FAPESC",
      excerpt: "Recebemos financiamento para desenvolver sistema de manutenção preditiva usando inteligência artificial.",
      date: "2024-03-10",
      category: "Pesquisa",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Parceria com indústria local gera novo laboratório",
      excerpt: "Acordo de cooperação técnica resultará na criação de espaço dedicado a sistemas embarcados.",
      date: "2024-03-05",
      category: "Parcerias",
      image: "/api/placeholder/400/250"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
            Notícias e Eventos
          </h2>
          <p className="text-lg text-foreground-light max-w-2xl mx-auto">
            Fique por dentro das últimas novidades, conquistas e eventos do LABIND
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {news.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-labind-primary-medium/20 to-labind-primary-dark/20 flex items-center justify-center">
                  <div className="text-center text-foreground-light">
                    <Calendar size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Imagem em breve</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-labind-primary-medium text-white">
                    {item.category}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-center text-sm text-foreground-light mb-2">
                  <Calendar size={16} className="mr-2" />
                  {formatDate(item.date)}
                </div>
                <CardTitle className="text-xl group-hover:text-labind-primary-medium transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-foreground-light mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                
                <Button 
                  asChild 
                  variant="ghost" 
                  className="p-0 h-auto text-labind-primary-medium hover:text-labind-primary-dark"
                >
                  <Link to={`/noticias/${item.id}`} className="flex items-center">
                    Leia mais
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            asChild 
            variant="labind-outline" 
            size="lg"
            className="text-lg px-8 py-4 h-auto"
          >
            <Link to="/noticias">Ver Todas as Notícias</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;