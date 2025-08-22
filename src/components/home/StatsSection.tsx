import { useEffect, useState, useRef } from "react";
import { FileText, Users, Trophy, Calendar } from "lucide-react";
import { listProjects } from "@/lib/projectService";
import { listPublications } from "@/lib/publicationService";
import { listTeam } from "@/lib/teamService";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Busca os dados dos serviços
  const projectsCount = listProjects().filter(p => p.status === 'Concluído').length;
  const publicationsCount = listPublications().length;
  const teamCount = listTeam().length;

  const stats = [
    {
      icon: Trophy,
      number: projectsCount,
      label: "Projetos Concluídos",
      suffix: "+"
    },
    {
      icon: FileText,
      number: publicationsCount,
      label: "Publicações Científicas",
      suffix: "+"
    },
    {
      icon: Users,
      number: teamCount,
      label: "Membros Ativos",
      suffix: "+"
    },
    {
      icon: Calendar,
      number: 3, // Este pode continuar fixo ou ser ajustado conforme necessário
      label: "Anos de Experiência",
      suffix: ""
    }
  ];

  // Counter Animation Hook
  const useCounter = (target: number, isVisible: boolean) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;
      
      let start = 0;
      const duration = 2000; // 2 segundos
      // Evita divisão por zero se o target for 0
      const increment = target > 0 ? target / (duration / 16) : 0;

      if (target === 0) {
        setCount(0);
        return;
      }

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [target, isVisible]);

    return count;
  };

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-labind">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">
            Nosso Impacto em Números
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Resultados que demonstram nossa contribuição para o avanço da 
            informática industrial no Brasil
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard 
              key={index} 
              stat={stat} 
              isVisible={isVisible}
              useCounter={useCounter}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Separate component for individual stat card
const StatCard = ({ 
  stat, 
  isVisible, 
  useCounter 
}: { 
  stat: any; 
  isVisible: boolean; 
  useCounter: (target: number, isVisible: boolean) => number;
}) => {
  const count = useCounter(stat.number, isVisible);

  return (
    <div className="text-center group">
      <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
        <stat.icon className="w-10 h-10 text-white" />
      </div>
      
      <div className={`text-5xl font-bold text-white mb-2 ${isVisible ? 'animate-count-up' : 'opacity-0'}`}>
        {count}{stat.suffix}
      </div>
      
      <p className="text-lg text-gray-200 font-medium">
        {stat.label}
      </p>
    </div>
  );
};

export default StatsSection;