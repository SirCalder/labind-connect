// src/pages/AdminNews.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";
import { TNews, listNews, deleteNews } from "@/lib/newsService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AdminNews = () => {
  const [news, setNews] = useState<TNews[]>([]);

  useEffect(() => {
    setNews(listNews());
  }, []);

  const handleDelete = (id: string) => {
    deleteNews(id);
    setNews(listNews());
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
              Gerenciar Notícias
            </h1>
            <Button asChild>
              <Link to="/admin/noticias/novo">
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Notícia
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((newsItem) => (
                <Card key={newsItem.id}>
                    <CardHeader>
                        <CardTitle>{newsItem.title}</CardTitle>
                        <CardDescription>{new Date(newsItem.published_date).toLocaleDateString('pt-BR')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500 line-clamp-2">{newsItem.summary}</p>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete(newsItem.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
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

export default AdminNews;