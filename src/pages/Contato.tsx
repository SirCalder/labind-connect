// src/pages/Contato.tsx
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getContactInfo, TContactInfo } from "@/lib/contactService";
import { Mail, MapPin, Phone, Instagram } from "lucide-react";

const Contato = () => {
  const [contactInfo, setContactInfo] = useState<TContactInfo | null>(null);

  useEffect(() => {
    setContactInfo(getContactInfo());
  }, []);

  if (!contactInfo) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl text-foreground-light max-w-3xl mx-auto">
              Estamos abertos para parcerias, projetos e para tirar suas dúvidas. Utilize um dos canais abaixo para falar conosco.
            </p>
          </div>

          <div className="max-w-lg mx-auto grid grid-cols-1 gap-8">
            <div className="flex items-start space-x-4">
              <MapPin size={24} className="text-labind-primary-medium mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Endereço</h3>
                <p className="text-foreground-light">{contactInfo.address_line1}<br/>{contactInfo.address_line2}<br/>{contactInfo.cep}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail size={24} className="text-labind-primary-medium mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">E-mail</h3>
                <a href={`mailto:${contactInfo.email}`} className="text-foreground-light hover:underline">{contactInfo.email}</a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone size={24} className="text-labind-primary-medium mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Telefone</h3>
                <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="text-foreground-light hover:underline">{contactInfo.phone}</a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Instagram size={24} className="text-labind-primary-medium mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold">Instagram</h3>
                <a href={contactInfo.instagram_url} target="_blank" rel="noopener noreferrer" className="text-foreground-light hover:underline">Siga-nos no Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contato;