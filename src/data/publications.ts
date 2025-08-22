// src/data/publications.ts
import { TPublication } from "@/lib/publicationService";

export const publications: TPublication[] = [
    {
        id: "1",
        title: "Um Sistema de Manutenção Preditiva Baseado em Aprendizagem de Máquina para Motores Industriais",
        authors: ["Dr. Professor Coordenador", "Maria Pesquisadora"],
        year: 2023,
        venue: "Anais do Congresso Brasileiro de Automática (CBA)",
        doi: "10.1234/cba.2023.5678",
        type: "Congresso"
    },
    {
        id: "2",
        title: "Desenvolvimento de um Sistema Embarcado de Baixo Custo para Monitoramento de Vibração em Tempo Real",
        authors: ["Maria Pesquisadora", "Aluno 3", "Aluno 4"],
        year: 2022,
        venue: "Revista Brasileira de Engenharia de Computação",
        doi: "10.5678/rbec.2022.1234",
        type: "Artigo"
    }
];