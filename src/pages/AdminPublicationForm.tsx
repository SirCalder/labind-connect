// src/pages/AdminPublicationForm.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { addPublication, getPublicationById, updatePublication, TPublication } from "@/lib/publicationService";
import { toast } from "@/components/ui/use-toast";

const publicationSchema = z.object({
  title: z.string().min(1, "O título é obrigatório."),
  authors: z.string().min(1, "Pelo menos um autor é obrigatório."),
  year: z.coerce.number().min(1900, "Ano inválido.").max(new Date().getFullYear() + 1, "Ano inválido."),
  venue: z.string().min(1, "O local de publicação é obrigatório."),
  doi: z.string().optional(),
  type: z.enum(["Artigo", "Capítulo de Livro", "Congresso", "Tese", "Dissertação"]),
});

const AdminPublicationForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditing = !!id;

    const form = useForm<z.infer<typeof publicationSchema>>({
        resolver: zodResolver(publicationSchema),
        defaultValues: {
            title: "",
            authors: "",
            year: new Date().getFullYear(),
            venue: "",
            doi: "",
            type: "Artigo",
        },
    });

    useEffect(() => {
        if (isEditing) {
            const pub = getPublicationById(id);
            if (pub) {
                form.reset({
                    ...pub,
                    authors: pub.authors.join(", "),
                });
            }
        }
    }, [id, isEditing, form]);
    
    function onSubmit(values: z.infer<typeof publicationSchema>) {
        const publicationData = {
            ...values,
            authors: values.authors.split(',').map(author => author.trim()),
        };

        if (isEditing) {
            updatePublication(id, publicationData as Omit<TPublication, 'id'>);
            toast({ title: "Publicação atualizada com sucesso!" });
        } else {
            addPublication(publicationData as Omit<TPublication, 'id'>);
            toast({ title: "Publicação adicionada com sucesso!" });
        }
        navigate("/admin/publicacoes");
    }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Editar Publicação" : "Adicionar Nova Publicação"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Título</FormLabel><FormControl><Input placeholder="Título da publicação" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="authors" render={({ field }) => (<FormItem><FormLabel>Autores</FormLabel><FormControl><Input placeholder="Nomes separados por vírgula" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="year" render={({ field }) => (<FormItem><FormLabel>Ano</FormLabel><FormControl><Input type="number" placeholder="Ano de publicação" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="venue" render={({ field }) => (<FormItem><FormLabel>Local de Publicação</FormLabel><FormControl><Input placeholder="Ex: Revista Brasileira de..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="doi" render={({ field }) => (<FormItem><FormLabel>DOI (Opcional)</FormLabel><FormControl><Input placeholder="10.1234/..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="type" render={({ field }) => (<FormItem><FormLabel>Tipo</FormLabel><FormControl><Input placeholder="Ex: Artigo" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="submit">{isEditing ? "Salvar Alterações" : "Salvar Publicação"}</Button>
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

export default AdminPublicationForm;