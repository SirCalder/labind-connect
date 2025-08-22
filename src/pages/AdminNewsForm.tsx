// src/pages/AdminNewsForm.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addNews, getNewsById, updateNews } from "@/lib/newsService";
import { toast } from "@/components/ui/use-toast";

const newsSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório." }),
  summary: z.string().min(1, { message: "O resumo é obrigatório." }),
  content: z.string().min(1, { message: "O conteúdo é obrigatório." }),
  published_date: z.string().min(1, { message: "A data é obrigatória." }),
});

const AdminNewsForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditing = !!id;

    const form = useForm<z.infer<typeof newsSchema>>({
        resolver: zodResolver(newsSchema),
        defaultValues: {
            title: "",
            summary: "",
            content: "",
            published_date: new Date().toISOString().split('T')[0],
        },
    });

    useEffect(() => {
        if (isEditing) {
            const newsItem = getNewsById(id);
            if (newsItem) {
                form.reset(newsItem);
            }
        }
    }, [id, isEditing, form]);

    function onSubmit(values: z.infer<typeof newsSchema>) {
        if (isEditing) {
            updateNews(id, values);
            toast({ title: "Notícia atualizada com sucesso!"});
        } else {
            addNews(values);
            toast({ title: "Notícia adicionada com sucesso!"});
        }
        navigate("/admin/noticias");
    }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Editar Notícia" : "Adicionar Nova Notícia"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Título</FormLabel><FormControl><Input placeholder="Título da notícia" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="summary" render={({ field }) => (<FormItem><FormLabel>Resumo</FormLabel><FormControl><Textarea placeholder="Resumo para o card da notícia" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="content" render={({ field }) => (<FormItem><FormLabel>Conteúdo Completo</FormLabel><FormControl><Textarea placeholder="Conteúdo da notícia" rows={10} {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="published_date" render={({ field }) => (<FormItem><FormLabel>Data de Publicação</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="submit">{isEditing ? "Salvar Alterações" : "Salvar Notícia"}</Button>
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

export default AdminNewsForm;