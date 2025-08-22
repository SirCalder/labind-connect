// src/components/layout/Header.tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Projetos", href: "/projetos" },
    { name: "Equipe", href: "/equipe" },
    { name: "Publicações", href: "/publicacoes" },
    { name: "Notícias", href: "/noticias" },
    { name: "Contato", href: "/contato" },
    // A linha abaixo foi removida
    // { name: "Admin", href: "/admin" }, 
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-labind-primary-dark shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-labind-primary-dark font-bold text-xl">L</span>
              </div>
              <div className="text-white">
                <div className="font-heading font-bold text-xl">LABIND</div>
                <div className="text-sm opacity-90">UDESC CEPLAN</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Button key={item.name} asChild variant="ghost" className={`text-white hover:bg-white/10 hover:text-white ${isActive(item.href) ? 'bg-white/10' : ''}`}>
                <Link
                  to={item.href}
                  className="relative"
                >
                  {item.name}
                </Link>
              </Button>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-white hover:text-labind-primary-medium transition-colors px-4 py-2 rounded ${
                    isActive(item.href) ? "bg-white/10 text-labind-primary-medium" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;