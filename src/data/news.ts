// src/data/news.ts
import { TNews } from "@/lib/newsService";

export const news: TNews[] = [
    {
        id: "1",
        title: "LABIND participa da Feira de Tecnologia Industrial 2024",
        summary: "Nosso laboratório apresentou três projetos inovadores na maior feira de tecnologia industrial do sul do Brasil.",
        content: "O Laboratório de Informática Industrial (LABIND) da UDESC teve uma participação de destaque na Feira de Tecnologia Industrial 2024, realizada em Joinville. Apresentamos nossos mais recentes avanços em automação e inteligência artificial, incluindo o projeto 'AstroNAOta Chatbot', que atraiu grande interesse do público e de empresas do setor.",
        image_url: "/api/placeholder/400/250",
        published_date: "2024-03-15",
        is_featured: true,
        tags: ["Eventos", "Inovação"]
    },
    {
        id: "2",
        title: "Novo projeto de IA aprovado pela FAPESC",
        summary: "Recebemos financiamento para desenvolver sistema de manutenção preditiva usando inteligência artificial.",
        content: "Com grande satisfação, anunciamos que nosso projeto 'Sistema Preditivo de Falhas em Motores Industriais' foi aprovado para financiamento pela FAPESC. O projeto utilizará técnicas de machine learning para prever falhas em equipamentos, reduzindo custos de manutenção e aumentando a eficiência da produção.",
        image_url: "/api/placeholder/400/250",
        published_date: "2024-03-10",
        is_featured: true,
        tags: ["Pesquisa", "IA"]
    },
];