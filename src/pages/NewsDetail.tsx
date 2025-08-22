// src/pages/NewsDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, TNews } from "@/lib/newsService";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";

const NewsDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [newsItem, setNewsItem] = useState<TNews | null>(null);

    useEffect(() => {
        if (id) {
            const data = getNewsById(id);
            setNewsItem(data || null);
        }
    }, [id]);

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
    };

    if (!newsItem) {
        return <div>Carregando notícia...</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/noticias")}
                        className="mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar para Notícias
                    </Button>

                    <article>
                        <header className="mb-8">
                            <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">{newsItem.title}</h1>
                            <div className="flex items-center text-sm text-foreground-light">
                                <Calendar size={16} className="mr-2" />
                                <span>Publicado em {formatDate(newsItem.published_date)}</span>
                            </div>
                        </header>
                        
                        <div className="prose lg:prose-xl max-w-none">
                            <p className="lead font-semibold">{newsItem.summary}</p>
                            <p className="whitespace-pre-line">{newsItem.content}</p>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NewsDetail;