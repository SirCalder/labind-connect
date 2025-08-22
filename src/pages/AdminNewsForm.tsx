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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { addNews, getNewsById, updateNews } from "@/lib/newsService";
import { toast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const newsSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório." }),
  summary: z.string().min(1, { message: "O resumo é obrigatório." }),
  content: z.string().min(1, { message: "O conteúdo é obrigatório." }),
  published_date: z.date({ required_error: "A data de publicação é obrigatória." }),
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
        },
    });

    useEffect(() => {
        if (isEditing) {
            const newsItem = getNewsById(id);
            if (newsItem) {
                form.reset({
                    ...newsItem,
                    published_date: new Date(newsItem.published_date)
                });
            }
        }
    }, [id, isEditing, form]);

    function onSubmit(values: z.infer<typeof newsSchema>) {
        const newsData = {
            ...values,
            published_date: format(values.published_date, "yyyy-MM-dd"),
        };
        
        if (isEditing && id) {
            updateNews(id, newsData);
            toast({ title: "Notícia atualizada com sucesso!"});
        } else {
            addNews(newsData);
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
                  
                  <FormField
                    control={form.control}
                    name="published_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Data de Publicação</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Escolha uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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