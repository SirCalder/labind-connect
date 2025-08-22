// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from '@/lib/authService';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        setError('');
        if (login(username, password)) {
            toast({ title: "Login realizado com sucesso!" });
            navigate('/admin');
        } else {
            setError('Usuário ou senha inválidos.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-gray-900">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Acesso Restrito</CardTitle>
                    <CardDescription>
                        Faça login para acessar o painel de administração.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Usuário</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="admin"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button onClick={handleLogin} className="w-full">
                            Entrar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;