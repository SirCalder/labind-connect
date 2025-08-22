// src/pages/Noticias.tsx
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TNews, listNews } from "@/lib/newsService";
import { Calendar, ArrowRight } from "lucide-react";

const Noticias = () => {
  const [news, setNews] = useState<TNews[]>([]);

  useEffect(() => {
    setNews(listNews());
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Notícias e Eventos
            </h1>
            <p className="text-xl text-foreground-light max-w-3xl mx-auto">
              Acompanhe aqui as últimas novidades, eventos e conquistas do LABIND.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 flex flex-col">
                <CardHeader>
                  <div className="flex items-center text-sm text-foreground-light mb-2">
                    <Calendar size={16} className="mr-2" />
                    {formatDate(item.published_date)}
                  </div>
                  <CardTitle className="text-xl group-hover:text-labind-primary-medium transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-foreground-light mb-4 line-clamp-3 flex-grow">
                    {item.summary}
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto text-labind-primary-medium justify-start">
                    <Link to={`/noticias/${item.id}`}>
                      Leia mais
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Noticias;