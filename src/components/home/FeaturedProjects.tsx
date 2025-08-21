import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { TProject, listProjects } from "@/lib/projectService";

const FeaturedProjects = () => {
    const [projects, setProjects] = useState<TProject[]>([]);

    useEffect(() => {
        setProjects(listProjects().slice(0, 3));
    }, []);


  return (
    <section className="py-20 bg-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
            Projetos em Destaque
          </h2>
          <p className="text-lg text-foreground-light max-w-2xl mx-auto">
            Conheça alguns dos nossos principais projetos de pesquisa e desenvolvimento
            em informática industrial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant={project.status === "Em Andamento" ? "destructive" : "secondary"}
                    className={project.status === "Em Andamento" ? "bg-labind-accent-red" : "bg-labind-primary-medium"}
                  >
                    {project.status}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-foreground-light">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  asChild
                  variant="labind-secondary"
                  className="w-full"
                >
                  <Link to={`/projetos/${project.id}`}>Ver Detalhes</Link>
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
            <Link to="/projetos">Ver Todos os Projetos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;