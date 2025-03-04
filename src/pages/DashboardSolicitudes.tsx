import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Trash2 } from "lucide-react";
import DashboardNavbar from '@/components/DashboardNavbar';
import { useToast } from "@/components/ui/use-toast";

const statusOptions = [
  { value: "all", label: "Todos" },
  { value: "Nuevo", label: "Nuevo" },
  { value: "Contactado", label: "Contactado" },
  { value: "En proceso", label: "En proceso" },
  { value: "Completado", label: "Completado" },
  { value: "Cancelado", label: "Cancelado" },
];

const actionableStatusOptions = [
  { value: "Nuevo", label: "Nuevo" },
  { value: "Contactado", label: "Contactado" },
  { value: "En proceso", label: "En proceso" },
  { value: "Completado", label: "Completado" },
  { value: "Cancelado", label: "Cancelado" },
];

const serviceOptions = [
  { value: "all", label: "Todos" },
  { value: "Desarrollo Web", label: "Desarrollo Web" },
  { value: "Aplicaciones Web", label: "Aplicaciones Web" },
  { value: "Aplicaciones Móviles", label: "Aplicaciones Móviles" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "Base de Datos", label: "Base de Datos" },
  { value: "Diseño UX/UI", label: "Diseño UX/UI" },
  { value: "Sistema de Inventario", label: "Sistema de Inventario" },
  { value: "Sistema de Help-Desk", label: "Sistema de Help-Desk" },
  { value: "Contabilidad", label: "Contabilidad" },
  { value: "Nómina", label: "Nómina" },
  { value: "Hospitales", label: "Hospitales" },
];

const DashboardSolicitudes = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const params = new URLSearchParams({
        status: statusFilter,
        service: serviceFilter,
        ...(searchTerm && { search: searchTerm })
      });
      console.log('Fetching requests with params:', params.toString());
      const response = await fetch(`https://arkit-backend.onrender.com/api/requests?${params}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error fetching requests');
      }
      const data = await response.json();
      console.log('Requests fetched:', data);
      setRequests(data);
      setFilteredRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las solicitudes.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [statusFilter, serviceFilter, searchTerm]);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      console.log(`Updating status of request ${requestId} to ${newStatus}`);
      const response = await fetch(`https://arkit-backend.onrender.com/api/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating status');
      }
      const updatedRequest = await response.json();
      console.log('Updated request:', updatedRequest);

      setRequests(prev => prev.map(req => req._id === requestId ? updatedRequest : req));
      setFilteredRequests(prev => prev.map(req => req._id === requestId ? updatedRequest : req));

      toast({
        title: "Estado actualizado",
        description: `La solicitud ahora está "${newStatus}".`,
      });
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el estado.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (requestId) => {
    try {
      console.log(`Deleting request ${requestId}`);
      const response = await fetch(`https://arkit-backend.onrender.com/api/requests/${requestId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error deleting request');
      }

      setRequests(prev => prev.filter(req => req._id !== requestId));
      setFilteredRequests(prev => prev.filter(req => req._id !== requestId));

      toast({
        title: "Solicitud eliminada",
        description: "La solicitud ha sido eliminada correctamente.",
      });
    } catch (error) {
      console.error('Error deleting request:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la solicitud.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case "Nuevo": return "bg-yellow-100 text-yellow-800";
      case "Contactado": return "bg-blue-100 text-blue-800";
      case "En proceso": return "bg-orange-100 text-orange-800";
      case "Completado": return "bg-green-100 text-green-800";
      case "Cancelado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Gestión de Solicitudes</h2>
            <p className="text-muted-foreground">Administre las solicitudes de servicio</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Buscar por nombre, email o servicio..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={serviceFilter} onValueChange={setServiceFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por servicio" />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Lista de Solicitudes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Teléfono</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Servicio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Descripción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredRequests.map((request) => (
                    <tr key={request._id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{request.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{request.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{request.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{request.service}</td>
                      <td className="px-6 py-4 text-sm max-w-xs truncate">{request.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Select
                          value={request.status}
                          onValueChange={(newStatus) => handleStatusChange(request._id, newStatus)}
                        >
                          <SelectTrigger className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClasses(request.status)}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {actionableStatusOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(request._id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500 mr-1" />
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashboardSolicitudes;