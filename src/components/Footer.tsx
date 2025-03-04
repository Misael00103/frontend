
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { WhatsApp, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className="bg-primary-foreground dark:bg-gray-900 border-t">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/878bfc15-c4a7-4cea-8cb6-080496e51d7c.png" 
                alt="Logo" 
                className={`h-10 w-10 ${theme === 'dark' ? 'filter brightness-110' : ''}`}
              />
              <span className="text-xl font-bold">SoftwareSolutions</span>
            </Link>
            <p className="text-foreground/70 mt-2">
              Soluciones de software a medida para hacer crecer su negocio.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-foreground/70 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-primary">Inicio</Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/70 hover:text-primary">Servicios</Link>
              </li>
              <li>
                <Link to="/request-form" className="text-foreground/70 hover:text-primary">Solicitar Servicio</Link>
              </li>
              <li>
                <Link to="/login" className="text-foreground/70 hover:text-primary">Acceso Clientes</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Nuestros Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-foreground/70 hover:text-primary">Desarrollo Web</Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/70 hover:text-primary">Aplicaciones Móviles</Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/70 hover:text-primary">Sistemas a Medida</Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground/70 hover:text-primary">Consultoría IT</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-foreground/70">Av. Principal 123, Ciudad, País</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+123456789" className="text-foreground/70 hover:text-primary">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@example.com" className="text-foreground/70 hover:text-primary">info@example.com</a>
              </li>
              <li className="flex items-center gap-3">
                <WhatsApp className="h-5 w-5 text-green-500" />
                <a href="https://wa.me/123456789" className="text-foreground/70 hover:text-primary">WhatsApp: +1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-foreground/70">
          <p>&copy; {new Date().getFullYear()} SoftwareSolutions. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
