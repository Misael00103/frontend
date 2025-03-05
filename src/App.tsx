import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import RequestForm from "./pages/RequestForm";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import Dashboard from "./pages/Dashboard";
import DashboardSolicitudes from "./pages/DashboardSolicitudes";
import DashboardClientes from "./pages/DashboardClientes";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated); // Depuración
  
  if (!isAuthenticated) {
    return <Navigate to="/api/login" replace />;
  }
  
  return children;
};

// Layout component for public pages
const PublicLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
            <Route path="/request-form" element={<PublicLayout><RequestForm /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} /> {/* Añadí PublicLayout */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected dashboard routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/solicitudes" 
              element={
                <ProtectedRoute>
                  <DashboardSolicitudes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/clientes" 
              element={
                <ProtectedRoute>
                  <DashboardClientes />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;