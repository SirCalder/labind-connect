// src/pages/AdminProjectForm.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addProject, getProjectById, updateProject, TProject } from "@/lib/projectService";
import { listTeam, TTeamMember } from "@/lib/teamService";
import { toast } from "@/components/ui/use-toast";

const projectSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório." }),
  description: z.string().min(1, { message: "A descrição curta é obrigatória." }),
  full_description: z.string().min(1, { message: "A descrição completa é obrigatória." }),
  category: z.string().min(1, { message: "A categoria é obrigatória." }),
  status: z.enum(["Em Andamento", "Concluído", "Planejado"]),
  technologies: z.string().min(1, { message: "As tecnologias são obrigatórias." }),
  image: z.string().optional(),
  gallery_images: z.array(z.string()).optional(),
  coordinator: z.string().optional(),
  githubUrl: z.string().url({ message: "Por favor, insira uma URL válida." }).optional(),
});

const AdminProjectForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditing = !!id;
    const [teamMembers, setTeamMembers] = useState<TTeamMember[]>([]);

    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            description: "",
            full_description: "",
            category: "",
            status: "Em Andamento",
            technologies: "",
            githubUrl: "",
            image: "",
            gallery_images: [],
            coordinator: "",
        },
    });

    useEffect(() => {
        setTeamMembers(listTeam());
        if (isEditing && id) {
            const project = getProjectById(id);
            if (project) {
                form.reset({
                    ...project,
                    technologies: project.technologies.join(", "),
                });
            }
        }
    }, [id, isEditing, form]);

    const handleFileRead = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const base64 = await handleFileRead(file);
            form.setValue("image", base64);
        }
    };

    const handleGalleryImagesChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const base64Promises = Array.from(files).map(file => handleFileRead(file));
            const base64Images = await Promise.all(base64Promises);
            form.setValue("gallery_images", [...(form.getValues("gallery_images") || []), ...base64Images]);
        }
    };
    
    function onSubmit(values: z.infer<typeof projectSchema>) {
        const projectData = {
            ...values,
            technologies: values.technologies.split(',').map(tech => tech.trim()),
        };

        if (isEditing && id) {
            updateProject(id, projectData as Omit<TProject, 'id'>);
            toast({ title: "Projeto atualizado com sucesso!" });
        } else {
            addProject(projectData as Omit<TProject, 'id'>);
            toast({ title: "Projeto adicionado com sucesso!" });
        }
        navigate("/admin/projetos");
    }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Editar Projeto" : "Adicionar Novo Projeto"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Título</FormLabel><FormControl><Input placeholder="Nome do projeto" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Descrição Curta (para o card)</FormLabel><FormControl><Textarea placeholder="Descreva o projeto em poucas palavras" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="full_description" render={({ field }) => (<FormItem><FormLabel>Descrição Completa</FormLabel><FormControl><Textarea placeholder="Descreva detalhadamente o projeto" rows={10} {...field} /></FormControl><FormMessage /></FormItem>)} />
                  
                  <FormField
                    control={form.control}
                    name="coordinator"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coordenador</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um coordenador" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {teamMembers.map(member => (
                              <SelectItem key={member.id} value={member.name}>{member.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField control={form.control} name="category" render={({ field }) => (<FormItem><FormLabel>Categoria</FormLabel><FormControl><Input placeholder="Ex: Inteligência Artificial" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="status" render={({ field }) => (<FormItem><FormLabel>Status</FormLabel><FormControl><Input placeholder="Em Andamento ou Concluído" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="technologies" render={({ field }) => (<FormItem><FormLabel>Tecnologias</FormLabel><FormControl><Input placeholder="Separadas por vírgula" {...field} /></FormControl><FormDescription>Ex: Python, TensorFlow, IoT</FormDescription><FormMessage /></FormItem>)} />
                  
                  <FormItem>
                    <FormLabel>Imagem Principal</FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" onChange={handleImageChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Imagens da Galeria</FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" multiple onChange={handleGalleryImagesChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  
                  <FormField control={form.control} name="githubUrl" render={({ field }) => (<FormItem><FormLabel>URL do GitHub (Opcional)</FormLabel><FormControl><Input placeholder="https://github.com/..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="submit">{isEditing ? "Salvar Alterações" : "Salvar Projeto"}</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminProjectForm;