// src/lib/teamService.ts
import { team as initialTeam } from "@/data/team";

export type TTeamMember = {
    id: string;
    name: string;
    role: "Coordenador" | "Pesquisador" | "Mestrando" | "Graduando";
    title: string;
    area_of_interest: string;
    bio?: string;
    photo_url?: string;
    lattes_url?: string;
    linkedin_url?: string;
    github_url?: string; // Novo campo
};

// ... (o resto do arquivo continua igual)
const TEAM_KEY = 'labind-team';

const getTeam = (): TTeamMember[] => {
    try {
        const teamJson = localStorage.getItem(TEAM_KEY);
        if (teamJson) {
            return JSON.parse(teamJson);
        } else {
            localStorage.setItem(TEAM_KEY, JSON.stringify(initialTeam));
            return initialTeam;
        }
    } catch (error) {
        console.error("Failed to parse team from localStorage", error);
        return initialTeam;
    }
};

const saveTeam = (team: TTeamMember[]) => {
    localStorage.setItem(TEAM_KEY, JSON.stringify(team));
};

export const listTeam = (): TTeamMember[] => {
    return getTeam();
};

export const getTeamMemberById = (id: string): TTeamMember | undefined => {
    return getTeam().find(m => m.id === id);
};

export const addTeamMember = (member: Omit<TTeamMember, 'id'>) => {
    const team = getTeam();
    const newMember: TTeamMember = {
        ...member,
        id: new Date().getTime().toString()
    };
    const updatedTeam = [...team, newMember];
    saveTeam(updatedTeam);
    return newMember;
};

export const updateTeamMember = (id: string, updatedMemberData: Omit<TTeamMember, 'id'>) => {
    const team = getTeam();
    const updatedTeam = team.map(m =>
        m.id === id ? { ...m, ...updatedMemberData, id } : m
    );
    saveTeam(updatedTeam);
};

export const deleteTeamMember = (id: string) => {
    const team = getTeam();
    const updatedTeam = team.filter(m => m.id !== id);
    saveTeam(updatedTeam);
};