
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logoArkit from "@/assets/logoarkit.png"; 
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
                src={logoArkit} 
                alt="Logo" 
                className={`h-10 w-10 ${theme === 'dark' ? 'filter brightness-110' : ''}`}
                style={{ borderRadius: '20px' }}
              />
              <span className="text-xl font-bold">Arkit</span>
            </Link>
            <p className="text-foreground/70 mt-2">
              Soluciones de software a medida para hacer crecer su negocio.
            </p>
            <div className="flex space-x-4 mt-4">
              <a target='_blank' href="https://www.facebook.com/profile.php?id=61573879887989" className="text-foreground/70 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a target='_blank' href="https://www.instagram.com/arkit885/" className="text-foreground/70 hover:text-primary">
                <Instagram size={20} />
              </a>
              <a target='_blank' href="https://www.linkedin.com/company/arkitenterprise/?viewAsMember=true" className="text-foreground/70 hover:text-primary">
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
                <span className="text-foreground/70">Dsitrito Nacional, Rep Dom</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+8494096331" className="text-foreground/70 hover:text-primary">+1 849 409 6331</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:arkitenterprise@gmail.com" className="text-foreground/70 hover:text-primary">arkitenterprise@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="https://wa.me/8494096331" className="text-foreground/70 hover:text-primary">WhatsApp: +1 849 409 6331</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-foreground/70">
          <p>&copy; {new Date().getFullYear()} Arkit. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
