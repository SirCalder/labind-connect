// src/pages/Admin.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Painel de Administração
            </h1>
            <p className="text-xl text-foreground-light max-w-3xl mx-auto">
              Gerencie o conteúdo do site LABIND Connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Projetos</CardTitle>
                <CardDescription>Adicionar, editar ou remover projetos.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/projetos">
                    <PlusCircle className="mr-2 h-4 w-4" /> Gerenciar Projetos
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notícias</CardTitle>
                <CardDescription>Adicionar, editar ou remover notícias.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/noticias">
                    <PlusCircle className="mr-2 h-4 w-4" /> Gerenciar Notícias
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Membros</CardTitle>
                <CardDescription>Adicionar, editar ou remover membros da equipe.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/equipe">
                    <PlusCircle className="mr-2 h-4 w-4" /> Gerenciar Membros
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publicações</CardTitle>
                <CardDescription>Adicionar, editar ou remover publicações.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/admin/publicacoes">
                    <PlusCircle className="mr-2 h-4 w-4" /> Gerenciar Publicações
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;