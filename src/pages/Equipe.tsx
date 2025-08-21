// src/pages/Equipe.tsx
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TTeamMember, listTeam } from "@/lib/teamService";

const Equipe = () => {
  const [team, setTeam] = useState<TTeamMember[]>([]);

  useEffect(() => {
    setTeam(listTeam());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-16 bg-background-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
                Nossa Equipe
              </h1>
              <p className="text-xl text-foreground-light max-w-3xl mx-auto">
                Conheça os pesquisadores, professores e estudantes dedicados ao avanço da informática industrial.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <Card key={member.id} className="text-center group hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <img 
                        src={member.photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000'} 
                        alt={member.name} 
                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                      />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="text-labind-primary-medium font-semibold">{member.role}</p>
                    <p className="text-sm text-foreground-light">{member.title}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground-light mb-4 text-sm">
                      <strong>Área de Interesse:</strong> {member.area_of_interest}
                    </p>
                    <div className="flex justify-center gap-4">
                      {member.lattes_url && (
                        <Button asChild variant="outline" size="sm">
                          <a href={member.lattes_url} target="_blank" rel="noopener noreferrer">
                            Lattes
                          </a>
                        </Button>
                      )}
                      {member.linkedin_url && (
                        <Button asChild variant="ghost" size="icon">
                           <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-5 w-5 text-gray-500 hover:text-labind-primary-dark" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Equipe;