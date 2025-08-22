// src/lib/authService.ts

const AUTH_KEY = 'labind-auth-token';

// ATENÇÃO: Em um projeto real, NUNCA armazene credenciais no código.
// Isso é apenas para fins de prototipagem.
const MOCK_USER = 'admin';
const MOCK_PASS = 'labind2024';

export const login = (username?: string, password?: string): boolean => {
    if (username === MOCK_USER && password === MOCK_PASS) {
        // Em um app real, aqui você receberia um token do backend.
        // Para o protótipo, apenas salvamos um valor simples.
        localStorage.setItem(AUTH_KEY, 'mock-token-logged-in');
        return true;
    }
    return false;
};

export const logout = () => {
    localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
    return localStorage.getItem(AUTH_KEY) !== null;
};