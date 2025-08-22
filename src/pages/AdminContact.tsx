// src/pages/AdminContact.tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getContactInfo, updateContactInfo } from "@/lib/contactService";
import { toast } from "@/components/ui/use-toast";

const contactSchema = z.object({
  address_line1: z.string().min(1, "A primeira linha do endereço é obrigatória."),
  address_line2: z.string().min(1, "A segunda linha do endereço é obrigatória."),
  cep: z.string().min(1, "O CEP é obrigatório."),
  email: z.string().email("Formato de e-mail inválido."),
  phone: z.string().min(1, "O telefone é obrigatório."),
  linkedin_url: z.string().url("URL inválida.").or(z.literal('')),
  github_url: z.string().url("URL inválida.").or(z.literal('')),
  instagram_url: z.string().url("URL inválida.").or(z.literal('')), // Novo campo
});

const AdminContact = () => {
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
    });

    useEffect(() => {
        const contactInfo = getContactInfo();
        form.reset(contactInfo);
    }, [form]);
    
    function onSubmit(values: z.infer<typeof contactSchema>) {
        updateContactInfo(values);
        toast({ title: "Informações de contato atualizadas com sucesso!" });
        navigate("/admin");
    }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card>
            <CardHeader>
              <CardTitle>Editar Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField control={form.control} name="address_line1" render={({ field }) => (<FormItem><FormLabel>Endereço (Linha 1)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="address_line2" render={({ field }) => (<FormItem><FormLabel>Endereço (Linha 2)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="cep" render={({ field }) => (<FormItem><FormLabel>CEP</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>E-mail</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Telefone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="linkedin_url" render={({ field }) => (<FormItem><FormLabel>URL do LinkedIn</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="github_url" render={({ field }) => (<FormItem><FormLabel>URL do GitHub</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="instagram_url" render={({ field }) => (<FormItem><FormLabel>URL do Instagram</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  
                  <Button type="submit">Salvar Alterações</Button>
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

export default AdminContact;