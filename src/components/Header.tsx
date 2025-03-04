
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeProvider";
import { useTheme } from './ThemeProvider';
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="border-b bg-background sticky top-0 z-30">
      <div className="container mx-auto flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col h-full pt-6">
                <Link to="/" className="flex items-center gap-2 mb-6" onClick={() => setIsMobileMenuOpen(false)}>
                  <img 
                    src="/lovable-uploads/878bfc15-c4a7-4cea-8cb6-080496e51d7c.png" 
                    alt="Logo" 
                    className={`h-8 w-8 ${theme === 'dark' ? 'filter brightness-110' : ''}`}
                  />
                  <span className="font-semibold">Arkit</span>
                </Link>
                <nav className="space-y-2">
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Inicio</Button>
                  </Link>
                  <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Servicios</Button>
                  </Link>
                  <Link to="/request-form" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Solicitar Servicio</Button>
                  </Link>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">Acceder</Button>
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/878bfc15-c4a7-4cea-8cb6-080496e51d7c.png" 
              alt="Logo" 
              className={`h-8 w-8 ${theme === 'dark' ? 'filter brightness-110' : ''}`}
              style={{ borderRadius: '20px' }}
            />
            <h1 className="text-xl font-semibold hidden sm:block">Arkit</h1>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">Inicio</Button>
          </Link>
          <Link to="/services">
            <Button variant="ghost">Servicios</Button>
          </Link>
          <Link to="/request-form">
            <Button variant="ghost">Solicitar Servicio</Button>
          </Link>
        </nav>
        
        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login">
            <Button>Acceder</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
