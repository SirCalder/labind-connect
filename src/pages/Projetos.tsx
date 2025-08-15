import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import projectAI from "@/assets/project-ai.jpg";
import projectEmbedded from "@/assets/project-embedded.jpg";
import projectAutomation from "@/assets/project-automation.jpg";

// ...existing code...
const projects = [
  {
    id: 1,
    title: "Inteligência Artificial Aplicada",
    description: "Desenvolvimento de algoritmos de IA para otimização de processos industriais e manutenção preditiva.",
    image: projectAI,
    status: "Em Andamento",
    category: "Inteligência Artificial",
    technologies: ["Python", "TensorFlow", "IoT"],
    githubUrl: "https://github.com/Laboratorio-de-Informatica-Industrial/astroNAOta-chatbot"
  },
  {
    id: 2,
    title: "Sistemas Embarcados",
    description: "Criação de soluções embarcadas para controle e monitoramento de equipamentos industriais.",
    image: projectEmbedded,
    status: "Concluído",
    category: "Sistemas Embarcados",
    technologies: ["C++", "Arduino", "ESP32"],
    githubUrl: "https://github.com/Laboratorio-de-Informatica-Industrial/astroNAOta-chatbot"
  },
  {
    id: 3,
    title: "Automação Industrial",
    description: "Implementação de sistemas de automação para aumentar a eficiência de linhas de produção.",
    image: projectAutomation,
    status: "Em Andamento",
    category: "Automação",
    technologies: ["PLC", "SCADA", "Modbus"],
    githubUrl: "https://github.com/Laboratorio-de-Informatica-Industrial/astroNAOta-chatbot"
  }
];
// ...existing code...

const Projetos = () => {
  // Remova os estados e funções relacionados ao README
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Nossos Projetos
            </h1>
            <p className="text-xl text-foreground-light max-w-3xl mx-auto mb-10">
              Conheça nossos projetos de pesquisa e desenvolvimento em informática industrial.
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
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    asChild
                    variant="labind-secondary"
                    className="w-full mb-2"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      Ver no GitHub
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="labind-outline"
                    className="w-full"
                  >
                    <Link to={`/projetos/${project.id}`}>Ver Detalhes</Link>
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

export default Projetos;
// ...existing code...