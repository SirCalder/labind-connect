// src/pages/ProjectDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, TProject } from "@/lib/projectService";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Users, Tag, Code } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<TProject | null>(null);

    useEffect(() => {
        if (id) {
            const projectData = getProjectById(id);
            setProject(projectData);
        }
    }, [id]);

    const formatDate = (dateString?: string) => {
        if (!dateString) return "Data não informada";
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    if (!project) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-20">
                <section className="py-12 bg-labind-primary-dark text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/projetos")}
                            className="text-white hover:text-green-200 mb-6"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar aos Projetos
                        </Button>
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="lg:w-2/3">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge variant="secondary">{project.category}</Badge>
                                    <Badge>{project.status}</Badge>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
                                <p className="text-xl text-green-100 leading-relaxed">{project.description}</p>
                            </div>
                            <div className="lg:w-1/3">
                                <img src={project.image || 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1000'} alt={project.title} className="w-full h-full object-cover rounded-2xl shadow-2xl" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Descrição Detalhada</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="whitespace-pre-line">{project.full_description}</p>
                                    </CardContent>
                                </Card>
                                {project.gallery_images && project.gallery_images.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Galeria de Imagens</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {project.gallery_images.map((image, index) => (
                                                <img key={index} src={image} alt={`Galeria ${index+1}`} className="rounded-lg object-cover" />
                                            ))}
                                        </CardContent>
                                    </Card>
                                )}
                                {project.technologies && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Code className="w-5 h-5" /> Tecnologias Utilizadas
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-wrap gap-3">
                                            {project.technologies.map((tech) => (
                                                <Badge key={tech} variant="outline">{tech}</Badge>
                                            ))}
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader><CardTitle>Informações do Projeto</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2"><Tag className="w-4 h-4" /><span>Status</span></div>
                                            <Badge>{project.status}</Badge>
                                        </div>
                                        <Separator />
                                        <div>
                                            <div className="flex items-center gap-2 mb-2"><User className="w-4 h-4" /><span>Coordenador</span></div>
                                            <p>{project.coordinator || "Não informado"}</p>
                                        </div>
                                        <Separator />
                                        {project.team_members && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2"><Users className="w-4 h-4" /><span>Membros</span></div>
                                                <div className="space-y-2">
                                                    {project.team_members.map(member => <div key={member}>{member}</div>)}
                                                </div>
                                            </div>
                                        )}
                                        <Separator />
                                        <div>
                                            <div className="flex items-center gap-2 mb-2"><Calendar className="w-4 h-4" /><span>Período</span></div>
                                            <div>Início: {formatDate(project.start_date)}</div>
                                            {project.end_date && <div>Fim: {formatDate(project.end_date)}</div>}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ProjectDetail;