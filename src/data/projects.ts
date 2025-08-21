// src/data/projects.ts
import { TProject } from "@/lib/projectService";
import projectChatbot from "@/assets/Leds.jpg";
import projectLEO from "@/assets/LeoRover.jpeg";
import ProjectVr from "@/assets/MetaVr.jpeg";

export const projects: TProject[] = [
    {
      id: "1",
      title: "Inteligência Artificial Aplicada",
      description: "Desenvolvimento de algoritmos de IA para otimização de processos industriais.",
      full_description: "Este projeto foca no desenvolvimento e aplicação de algoritmos de Inteligência Artificial para otimizar processos na indústria. Exploramos técnicas de manutenção preditiva, controle de qualidade automatizado e logística inteligente para aumentar a eficiência e reduzir custos operacionais.",
      image: projectChatbot,
      gallery_images: [projectLEO, ProjectVr],
      status: "Em Andamento",
      category: "Inteligência Artificial",
      technologies: ["Python", "TensorFlow", "IoT", "Scikit-learn"],
      githubUrl: "https://github.com/Laboratorio-de-Informatica-Industrial/astroNAOta-chatbot",
      coordinator: "Dr. Professor Coordenador",
      team_members: ["Aluno 1", "Aluno 2"],
      start_date: "2023-01-15",
    },
    {
      id: "2",
      title: "Sistemas Embarcados para Monitoramento",
      description: "Criação de soluções embarcadas para controle e monitoramento de equipamentos.",
      full_description: "O projeto de Sistemas Embarcados visa criar hardware e software de baixo custo para o monitoramento em tempo real de equipamentos industriais. Utilizamos microcontroladores como ESP32 e Arduino para coletar dados de sensores e enviá-los para uma plataforma central de análise.",
      image: projectLEO,
      gallery_images: [projectChatbot, ProjectVr],
      status: "Concluído",
      category: "Sistemas Embarcados",
      technologies: ["C++", "Arduino", "ESP32", "MQTT"],
      githubUrl: "https://github.com/Laboratorio-de-Informatica-Industrial/astroNAOta-chatbot",
      coordinator: "Dr. Professor Coordenador",
      team_members: ["Aluno 3", "Aluno 4"],
      start_date: "2022-06-01",
      end_date: "2023-06-01",
    },
    {
      id: "3",
      title: "Automação Industrial 4.0",
      description: "Implementação de sistemas de automação para aumentar a eficiência de linhas de produção.",
      full_description: "Este projeto implementa conceitos da Indústria 4.0 para a automação de linhas de produção. O foco está na integração de sistemas ciberfísicos, utilizando CLPs (Controladores Lógicos Programáveis) e sistemas SCADA para um controle mais inteligente e flexível dos processos.",
      image: ProjectVr,
      gallery_images: [projectChatbot, projectLEO],
      status: "Em Andamento",
      category: "Automação",
      technologies: ["PLC", "SCADA", "Modbus", "OPC-UA"],
      githubUrl: "https://github.com/Laboratorio-de-Informatica-Industrial/astroNAOta-chatbot",
      coordinator: "Dr. Professor Coordenador",
       team_members: ["Aluno 5", "Aluno 6"],
      start_date: "2023-03-10",
    }
  ];