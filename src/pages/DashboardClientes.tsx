
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Search, UserPlus, Edit, CheckCircle, XCircle } from "lucide-react";
import DashboardNavbar from '@/components/DashboardNavbar';

// Mock data for clients
const initialClients = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", phone: "555-1234", company: "Tecnología XYZ", status: "Activo" },
  { id: 2, name: "María García", email: "maria@example.com", phone: "555-5678", company: "Diseños ABC", status: "Activo" },
  { id: 3, name: "Carlos Rodríguez", email: "carlos@example.com", phone: "555-9012", company: "Consultora 123", status: "Inactivo" },
  { id: 4, name: "Ana Martínez", email: "ana@example.com", phone: "555-3456", company: "Servicios Web", status: "Activo" },
  { id: 5, name: "Roberto Sánchez", email: "roberto@example.com", phone: "555-7890", company: "Marketing Digital", status: "Inactivo" },
];

const DashboardClientes = () => {
  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', company: '' });
  const [editingClient, setEditingClient] = useState(null);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    
    const clientToAdd = {
      id: clients.length + 1,
      ...newClient,
      status: "Activo"
    };
    
    setClients([...clients, clientToAdd]);
    setNewClient({ name: '', email: '', phone: '', company: '' });
    
    toast({
      title: "Cliente agregado",
      description: `${newClient.name} ha sido agregado a la lista de clientes.`,
    });
    
    setIsDialogOpen(false);
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setIsEditDialogOpen(true);
  };

  const handleUpdateClient = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedClients = clients.map(client => 
      client.id === editingClient.id ? editingClient : client
    );
    
    setClients(updatedClients);
    
    toast({
      title: "Cliente actualizado",
      description: `${editingClient.name} ha sido actualizado correctamente.`,
    });
    
    setIsEditDialogOpen(false);
  };

  const toggleClientStatus = (clientId) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        const newStatus = client.status === "Activo" ? "Inactivo" : "Activo";
        return { ...client, status: newStatus };
      }
      return client;
    });
    
    setClients(updatedClients);
    
    const client = clients.find(c => c.id === clientId);
    const newStatus = client.status === "Activo" ? "Inactivo" : "Activo";
    
    toast({
      title: "Estado actualizado",
      description: `${client.name} ahora está ${newStatus}.`,
    });
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Gestión de Clientes</h2>
            <p className="text-muted-foreground">Administre la información de sus clientes</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Nuevo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl mb-4">Agregar Nuevo Cliente</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddClient} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input 
                    id="name" 
                    value={newClient.name} 
                    onChange={e => setNewClient({...newClient, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={newClient.email} 
                    onChange={e => setNewClient({...newClient, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input 
                    id="phone" 
                    value={newClient.phone} 
                    onChange={e => setNewClient({...newClient, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input 
                    id="company" 
                    value={newClient.company} 
                    onChange={e => setNewClient({...newClient, company: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Guardar Cliente</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Buscar por nombre, empresa o correo electrónico..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Tabs defaultValue="todos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="todos">Todos los Clientes</TabsTrigger>
            <TabsTrigger value="activos">Clientes Activos</TabsTrigger>
            <TabsTrigger value="inactivos">Clientes Inactivos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="todos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Lista de Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-4 font-medium text-muted-foreground border-b pb-2">
                    <div>Nombre</div>
                    <div>Empresa</div>
                    <div>Correo</div>
                    <div>Teléfono</div>
                    <div className="text-center">Estado</div>
                    <div className="text-right">Acciones</div>
                  </div>
                  
                  {filteredClients.length > 0 ? (
                    filteredClients.map(client => (
                      <div key={client.id} className="grid grid-cols-6 gap-4 py-3 border-b last:border-0">
                        <div className="font-medium">{client.name}</div>
                        <div>{client.company}</div>
                        <div>{client.email}</div>
                        <div>{client.phone}</div>
                        <div className="text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            client.status === "Activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            {client.status}
                          </span>
                        </div>
                        <div className="text-right flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditClient(client)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleClientStatus(client.id)}
                          >
                            {client.status === "Activo" ? 
                              <XCircle className="h-4 w-4 mr-1 text-red-500" /> : 
                              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            }
                            {client.status === "Activo" ? "Desactivar" : "Activar"}
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-muted-foreground">
                      No se encontraron clientes con ese criterio de búsqueda.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Clientes Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-4 font-medium text-muted-foreground border-b pb-2">
                    <div>Nombre</div>
                    <div>Empresa</div>
                    <div>Correo</div>
                    <div>Teléfono</div>
                    <div className="text-center">Estado</div>
                    <div className="text-right">Acciones</div>
                  </div>
                  
                  {filteredClients
                    .filter(client => client.status === "Activo")
                    .map(client => (
                      <div key={client.id} className="grid grid-cols-6 gap-4 py-3 border-b last:border-0">
                        <div className="font-medium">{client.name}</div>
                        <div>{client.company}</div>
                        <div>{client.email}</div>
                        <div>{client.phone}</div>
                        <div className="text-center">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {client.status}
                          </span>
                        </div>
                        <div className="text-right flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditClient(client)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleClientStatus(client.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1 text-red-500" />
                            Desactivar
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactivos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Clientes Inactivos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-4 font-medium text-muted-foreground border-b pb-2">
                    <div>Nombre</div>
                    <div>Empresa</div>
                    <div>Correo</div>
                    <div>Teléfono</div>
                    <div className="text-center">Estado</div>
                    <div className="text-right">Acciones</div>
                  </div>
                  
                  {filteredClients
                    .filter(client => client.status === "Inactivo")
                    .map(client => (
                      <div key={client.id} className="grid grid-cols-6 gap-4 py-3 border-b last:border-0">
                        <div className="font-medium">{client.name}</div>
                        <div>{client.company}</div>
                        <div>{client.email}</div>
                        <div>{client.phone}</div>
                        <div className="text-center">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {client.status}
                          </span>
                        </div>
                        <div className="text-right flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditClient(client)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleClientStatus(client.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            Activar
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Add Edit Client Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl mb-4">Editar Cliente</DialogTitle>
            </DialogHeader>
            {editingClient && (
              <form onSubmit={handleUpdateClient} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nombre Completo</Label>
                  <Input 
                    id="edit-name" 
                    value={editingClient.name} 
                    onChange={e => setEditingClient({...editingClient, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Correo Electrónico</Label>
                  <Input 
                    id="edit-email" 
                    type="email" 
                    value={editingClient.email} 
                    onChange={e => setEditingClient({...editingClient, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Teléfono</Label>
                  <Input 
                    id="edit-phone" 
                    value={editingClient.phone} 
                    onChange={e => setEditingClient({...editingClient, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-company">Empresa</Label>
                  <Input 
                    id="edit-company" 
                    value={editingClient.company} 
                    onChange={e => setEditingClient({...editingClient, company: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Actualizar Cliente</Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default DashboardClientes;
