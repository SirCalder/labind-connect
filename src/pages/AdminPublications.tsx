// src/pages/AdminPublications.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { TPublication, listPublications, deletePublication } from "@/lib/publicationService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AdminPublications = () => {
  const [publications, setPublications] = useState<TPublication[]>([]);

  useEffect(() => {
    setPublications(listPublications());
  }, []);

  const handleDelete = (id: string) => {
    deletePublication(id);
    setPublications(listPublications());
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
              Gerenciar Publicações
            </h1>
            <Button asChild>
              <Link to="/admin/publicacoes/novo">
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Publicação
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {publications.map((pub) => (
                <Card key={pub.id}>
                    <CardHeader>
                        <CardTitle className="text-lg">{pub.title}</CardTitle>
                        <CardDescription>{pub.venue}, {pub.year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500 line-clamp-1">{pub.authors.join(", ")}</p>
                            <div className="flex gap-2">
                                <Button asChild variant="outline" size="icon">
                                    <Link to={`/admin/publicacoes/editar/${pub.id}`}>
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleDelete(pub.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
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

export default AdminPublications;