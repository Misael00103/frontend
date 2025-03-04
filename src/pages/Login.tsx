
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useTheme } from "@/components/ThemeProvider";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login - in a real app, this would validate against a backend
    if (email === 'arkit@gmail.com' && password === 'Arkit2025.') {
      // Set some basic auth in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ 
        name: 'Administrador', 
        email: email, 
        role: 'admin' 
      }));
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al dashboard de administración",
      });
      
      navigate('/dashboard');
    } else {
      toast({
        title: "Error de inicio de sesión",
        description: "Credenciales inválidas. Intente con admin@example.com / password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-24 h-24 mb-4">
            <img 
              src="/lovable-uploads/878bfc15-c4a7-4cea-8cb6-080496e51d7c.png" 
              alt="Logo de la empresa" 
              className={`w-full h-full object-contain ${theme === 'dark' ? 'filter brightness-110' : ''}`}
              style={{ borderRadius: '50px' }}
            />
          </div>
          <CardTitle className="text-2xl font-bold">Panel de Administración</CardTitle>
          <CardDescription>
            Ingrese sus credenciales para acceder al sistema
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
