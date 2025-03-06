import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Iniciando handleSubmit');

    try {
      const apiUrl = import.meta.env.VITE_API_URL+'/api/auth';
      if (!apiUrl) {
        throw new Error('VITE_API_URL no está definida en .env');
      }
      const url = `${apiUrl}/login`;
      console.log('URL de la solicitud:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      console.log('Estado de la respuesta:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Datos de error:', errorData);
        throw new Error(errorData.message || `Error ${response.status}: Login failed`);
      }

      const { token } = await response.json();
      console.log('Token recibido:', token);
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true'); // Añadido para ProtectedRoute
      toast({ title: "Login exitoso", description: "Bienvenido al dashboard" });
      console.log('Antes de navegar a /dashboard');
      navigate('/dashboard', { replace: true }); // Usar replace para evitar volver atrás
      console.log('Navegación ejecutada');
    } catch (error) {
      console.error('Error en login:', error);
      toast({ 
        title: "Error", 
        description: error.message || 'No se pudo iniciar sesión', 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
      console.log('Finally ejecutado');
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <img 
          src="/lovable-uploads/878bfc15-c4a7-4cea-8cb6-080496e51d7c.png" // Ruta relativa desde public/
          alt="Arkit Logo" 
          className="h-16 w-auto"
          style={{ margin: '0 auto', display: 'block', marginBottom: '1rem', borderRadius: '50%' }}
        />
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@arkit.site"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••"
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;