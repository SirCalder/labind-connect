// src/components/layout/Footer.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MapPin, Phone, Instagram } from "lucide-react";
import { getContactInfo, TContactInfo } from "@/lib/contactService";

const Footer = () => {
  const [contactInfo, setContactInfo] = useState<TContactInfo | null>(null);

  useEffect(() => {
    setContactInfo(getContactInfo());
  }, []);

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Projetos", href: "/projetos" },
    { name: "Equipe", href: "/equipe" },
    { name: "Publicações", href: "/publicacoes" },
    { name: "Notícias", href: "/noticias" },
    { name: "Contato", href: "/contato" },
  ];

  if (!contactInfo) {
    return null; // ou um loader para evitar que o rodapé "pisque" ao carregar
  }

  return (
    <footer className="bg-labind-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1: Sobre o LABIND */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-labind-primary-dark font-bold text-xl">L</span>
              </div>
              <div>
                <div className="font-heading font-bold text-xl">LABIND</div>
                <div className="text-sm opacity-90">UDESC CEPLAN</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Laboratório de Informática Industrial</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Desenvolvemos tecnologias inovadoras para a indústria através de projetos no ambito da pesquisa,
                ensino e extensão. Nossa missão é capacitar e formar profissionais para o mercado do meio da tecnologia.
              </p>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Links Rápidos</h3>
            <nav className="grid grid-cols-2 gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-300 hover:text-labind-primary-medium transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Coluna 3: Contato */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-labind-primary-medium mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>{contactInfo.address_line1}</p>
                  <p>{contactInfo.address_line2}</p>
                  <p>{contactInfo.cep}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-labind-primary-medium flex-shrink-0" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-300 hover:text-labind-primary-medium transition-colors text-sm"
                >
                  {contactInfo.email}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-labind-primary-medium flex-shrink-0" />
                <a 
                  href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                  className="text-gray-300 hover:text-labind-primary-medium transition-colors text-sm"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="pt-4">
              <h4 className="font-medium mb-3">Siga-nos</h4>
              <div className="flex space-x-4">
                <a 
                  href={contactInfo.linkedin_url}
                  target="_blank" rel="noopener noreferrer"
                  className="text-gray-300 hover:text-labind-primary-medium transition-colors"
                  aria-label="LinkedIn do LABIND"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href={contactInfo.github_url}
                  target="_blank" rel="noopener noreferrer"
                  className="text-gray-300 hover:text-labind-primary-medium transition-colors"
                  aria-label="GitHub do LABIND"
                >
                  <Github size={20} />
                </a>
                <a 
                  href={contactInfo.instagram_url}
                  target="_blank" rel="noopener noreferrer"
                  className="text-gray-300 hover:text-labind-primary-medium transition-colors"
                  aria-label="Instagram do LABIND"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Linha de Copyright */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} LABIND - Laboratório de Informática Industrial. 
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;