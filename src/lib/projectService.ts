// src/lib/projectService.ts
import { projects as initialProjects } from "@/data/projects";

export type TProject = {
    id: string;
    title: string;
    description: string; // Descrição curta para o card
    full_description: string; // Descrição completa para a página do projeto
    category: string;
    status: "Em Andamento" | "Concluído" | "Planejado";
    technologies: string[];
    image?: string; // Imagem principal (em Base64)
    gallery_images?: string[]; // Galeria de imagens (em Base64)
    githubUrl?: string;
    coordinator?: string;
    team_members?: string[];
    start_date?: string;
    end_date?: string;
};

const PROJECTS_KEY = 'labind-projects';

const getProjects = (): TProject[] => {
    try {
        const projectsJson = localStorage.getItem(PROJECTS_KEY);
        if (projectsJson) {
            return JSON.parse(projectsJson);
        } else {
            localStorage.setItem(PROJECTS_KEY, JSON.stringify(initialProjects));
            return initialProjects;
        }
    } catch (error) {
        console.error("Failed to parse projects from localStorage", error);
        return initialProjects;
    }
};

const saveProjects = (projects: TProject[]) => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

export const listProjects = (): TProject[] => {
    return getProjects();
};

export const getProjectById = (id: string): TProject | undefined => {
    return getProjects().find(p => p.id === id);
};

export const addProject = (project: Omit<TProject, 'id'>) => {
    const projects = getProjects();
    const newProject: TProject = {
        ...project,
        id: new Date().getTime().toString()
    };
    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);
    return newProject;
};

export const updateProject = (id: string, updatedProjectData: Omit<TProject, 'id'>) => {
    const projects = getProjects();
    const updatedProjects = projects.map(p => 
        p.id === id ? { ...p, ...updatedProjectData, id } : p
    );
    saveProjects(updatedProjects);
};

export const deleteProject = (id: string) => {
    const projects = getProjects();
    const updatedProjects = projects.filter(p => p.id !== id);
    saveProjects(updatedProjects);
};