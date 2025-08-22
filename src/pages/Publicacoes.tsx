// src/pages/Publicacoes.tsx
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TPublication, listPublications } from "@/lib/publicationService";
import { Link as LinkIcon } from "lucide-react";

const Publicacoes = () => {
  const [publications, setPublications] = useState<TPublication[]>([]);

  useEffect(() => {
    setPublications(listPublications());
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Publicações Científicas
            </h1>
            <p className="text-xl text-foreground-light max-w-3xl mx-auto">
              Nossa produção científica e contribuições para o conhecimento em informática industrial.
            </p>
          </div>

          <div className="space-y-6">
            {publications.map(pub => (
              <Card key={pub.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{pub.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 pt-2">
                    <span className="font-semibold">{pub.venue}, {pub.year}</span>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">{pub.type}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground-light mb-4">{pub.authors.join(", ")}</p>
                  {pub.doi && (
                    <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                      <LinkIcon size={14} /> Ver na Fonte
                    </a>
                  )}
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

export default Publicacoes;