// src/lib/contactService.ts
import { contactInfo as initialContactInfo } from "@/data/contact";

export type TContactInfo = {
    address_line1: string;
    address_line2: string;
    cep: string;
    email: string;
    phone: string;
    linkedin_url: string;
    github_url: string;
    instagram_url: string; // Novo campo
};

const CONTACT_KEY = 'labind-contact';

export const getContactInfo = (): TContactInfo => {
    try {
        const contactJson = localStorage.getItem(CONTACT_KEY);
        if (contactJson) {
            return JSON.parse(contactJson);
        } else {
            localStorage.setItem(CONTACT_KEY, JSON.stringify(initialContactInfo));
            return initialContactInfo;
        }
    } catch (error) {
        console.error("Failed to parse contact info from localStorage", error);
        return initialContactInfo;
    }
};

export const updateContactInfo = (newInfo: TContactInfo) => {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(newInfo));
};