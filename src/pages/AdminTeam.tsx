// src/pages/AdminTeam.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { TTeamMember, listTeam, deleteTeamMember } from "@/lib/teamService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AdminTeam = () => {
  const [team, setTeam] = useState<TTeamMember[]>([]);

  useEffect(() => {
    setTeam(listTeam());
  }, []);

  const handleDelete = (id: string) => {
    deleteTeamMember(id);
    setTeam(listTeam());
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground">
              Gerenciar Equipe
            </h1>
            <Button asChild>
              <Link to="/admin/equipe/novo">
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Membro
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
                <Card key={member.id}>
                    <CardHeader>
                        <CardTitle>{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500">{member.title}</p>
                            <div className="flex gap-2">
                                <Button asChild variant="outline" size="icon">
                                    <Link to={`/admin/equipe/editar/${member.id}`}>
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => handleDelete(member.id)}>
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

export default AdminTeam;