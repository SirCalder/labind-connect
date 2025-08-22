// src/lib/publicationService.ts
import { publications as initialPublications } from "@/data/publications";

export type TPublication = {
    id: string;
    title: string;
    authors: string[];
    year: number;
    venue: string;
    doi?: string;
    pdf_url?: string;
    external_url?: string;
    type: "Artigo" | "Capítulo de Livro" | "Congresso" | "Tese" | "Dissertação";
};

const PUBLICATIONS_KEY = 'labind-publications';

const getPublications = (): TPublication[] => {
    try {
        const publicationsJson = localStorage.getItem(PUBLICATIONS_KEY);
        if (publicationsJson) {
            return JSON.parse(publicationsJson);
        } else {
            localStorage.setItem(PUBLICATIONS_KEY, JSON.stringify(initialPublications));
            return initialPublications;
        }
    } catch (error) {
        console.error("Failed to parse publications from localStorage", error);
        return initialPublications;
    }
};

const savePublications = (publications: TPublication[]) => {
    localStorage.setItem(PUBLICATIONS_KEY, JSON.stringify(publications));
};

export const listPublications = (): TPublication[] => {
    return getPublications().sort((a, b) => b.year - a.year); // Ordena por ano, mais recente primeiro
};

export const getPublicationById = (id: string): TPublication | undefined => {
    return getPublications().find(p => p.id === id);
};

export const addPublication = (publication: Omit<TPublication, 'id'>) => {
    const publications = getPublications();
    const newPublication: TPublication = {
        ...publication,
        id: new Date().getTime().toString()
    };
    const updatedPublications = [newPublication, ...publications];
    savePublications(updatedPublications);
    return newPublication;
};

export const updatePublication = (id: string, updatedPublicationData: Omit<TPublication, 'id'>) => {
    const publications = getPublications();
    const updatedPublications = publications.map(p =>
        p.id === id ? { ...p, ...updatedPublicationData, id } : p
    );
    savePublications(updatedPublications);
};

export const deletePublication = (id: string) => {
    const publications = getPublications();
    const updatedPublications = publications.filter(p => p.id !== id);
    savePublications(updatedPublications);
};