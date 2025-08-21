// src/pages/AdminTeamForm.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { addTeamMember, getTeamMemberById, updateTeamMember, TTeamMember } from "@/lib/teamService";
import { toast } from "@/components/ui/use-toast";

const teamMemberSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  role: z.enum(["Coordenador", "Pesquisador", "Mestrando", "Graduando"]),
  title: z.string().min(1, { message: "A titulação é obrigatória." }),
  area_of_interest: z.string().min(1, { message: "A área de interesse é obrigatória." }),
  photo_url: z.string().optional(),
  lattes_url: z.string().url().optional(),
  linkedin_url: z.string().url().optional(),
});

const AdminTeamForm = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditing = !!id;

    const form = useForm<z.infer<typeof teamMemberSchema>>({
        resolver: zodResolver(teamMemberSchema),
        defaultValues: {
            name: "",
            role: "Graduando",
            title: "",
            area_of_interest: "",
            photo_url: "",
            lattes_url: "",
            linkedin_url: "",
        },
    });

    useEffect(() => {
        if (isEditing) {
            const member = getTeamMemberById(id);
            if (member) {
                form.reset(member);
            }
        }
    }, [id, isEditing, form]);

    function onSubmit(values: z.infer<typeof teamMemberSchema>) {
        if (isEditing) {
            updateTeamMember(id, values as Omit<TTeamMember, 'id'>);
            toast({ title: "Membro atualizado com sucesso!" });
        } else {
            addTeamMember(values as Omit<TTeamMember, 'id'>);
            toast({ title: "Membro adicionado com sucesso!" });
        }
        navigate("/admin/equipe");
    }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? "Editar Membro" : "Adicionar Novo Membro"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Nome Completo</FormLabel><FormControl><Input placeholder="Nome do membro" {...field} /></FormControl><FormMessage /></FormItem>)} />
                   <FormField control={form.control} name="role" render={({ field }) => (<FormItem><FormLabel>Função</FormLabel><FormControl><Input placeholder="Ex: Coordenador" {...field} /></FormControl><FormMessage /></FormItem>)} />
                   <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Titulação</FormLabel><FormControl><Input placeholder="Ex: Doutor em Engenharia" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="area_of_interest" render={({ field }) => (<FormItem><FormLabel>Área de Interesse</FormLabel><FormControl><Input placeholder="Ex: Inteligência Artificial" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="photo_url" render={({ field }) => (<FormItem><FormLabel>URL da Foto (Opcional)</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="lattes_url" render={({ field }) => (<FormItem><FormLabel>Link do Lattes (Opcional)</FormLabel><FormControl><Input placeholder="http://lattes.cnpq.br/..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                   <FormField control={form.control} name="linkedin_url" render={({ field }) => (<FormItem><FormLabel>Link do LinkedIn (Opcional)</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/..." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <Button type="submit">{isEditing ? "Salvar Alterações" : "Salvar Membro"}</Button>
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

export default AdminTeamForm;