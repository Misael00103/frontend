import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BarChart3, Bell, ClipboardList, LogOut, Menu, Users, X } from "lucide-react";
import { ThemeToggle } from "./ThemeProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';
import logoArkit from "@/assets/logoarkit.png"; 
const DashboardNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  
  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const NavItem = ({ href, icon: Icon, children }) => {
    const isActive = location.pathname === href;
    
    return (
      <Link to={href}>
        <Button 
          variant={isActive ? "default" : "ghost"} 
          className={cn(
            "flex items-center gap-2 w-full justify-start", 
            isActive && "bg-primary text-primary-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
          <span>{children}</span>
        </Button>
      </Link>
    );
  };

  return (
    <header className="border-b bg-card sticky top-0 z-30">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4">
          {/* Mobile menu trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <img 
                      src={logoArkit}
                      alt="Logo" 
                      className={`h-8 w-8 ${theme === 'dark' ? 'filter brightness-110' : ''}`}
                    />
                    <span className="font-semibold">Admin Panel</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="space-y-2">
                  <NavItem href="/dashboard" icon={BarChart3}>Dashboard</NavItem>
                  <NavItem href="/dashboard/solicitudes" icon={ClipboardList}>Solicitudes</NavItem>
                  <NavItem href="/dashboard/clientes" icon={Users}>Clientes</NavItem>
                </nav>
                <div className="mt-auto pt-6">
                  <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Logo and title */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <img 
              src={logoArkit} 
              alt="Logo" 
              className={`h-8 w-8 ${theme === 'dark' ? 'filter brightness-110' : ''}`}
              style={{ borderRadius: '20px' }}
            />
            <h1 className="text-xl font-semibold hidden sm:block">panel de administración</h1>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavItem href="/dashboard" icon={BarChart3}>Dashboard</NavItem>
          <NavItem href="/dashboard/solicitudes" icon={ClipboardList}>Solicitudes</NavItem>
          <NavItem href="/dashboard/clientes" icon={Users}>Clientes</NavItem>
        </nav>
        
        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              3
            </Badge>
          </Button>
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;