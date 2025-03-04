
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CalendarIcon, MoreHorizontal, Phone, Search } from "lucide-react";
import DashboardNavbar from '@/components/DashboardNavbar';
import { useToast } from '@/components/ui/use-toast';

// Mock data for requests
const initialRequests = [
  { 
    id: 1, 
    clientName: "Juan Pérez", 
    email: "juan@example.com",
    phone: "555-1234",
    service: "Desarrollo Web",
    date: "2023-05-15",
    status: "Nuevo",
    contactMethod: "Llamada",
    source: "Google" 
  },
  { 
    id: 2, 
    clientName: "María García", 
    email: "maria@example.com",
    phone: "555-5678",
    service: "Aplicación Móvil", 
    date: "2023-05-14",
    status: "Contactado",
    contactMethod: "WhatsApp",
    source: "Facebook" 
  },
  { 
    id: 3, 
    clientName: "Carlos Rodríguez", 
    email: "carlos@example.com",
    phone: "555-9012",
    service: "E-commerce", 
    date: "2023-05-10",
    status: "En proceso",
    contactMethod: "Llamada",
    source: "Referido" 
  },
  { 
    id: 4, 
    clientName: "Ana Martínez", 
    email: "ana@example.com",
    phone: "555-3456",
    service: "Sistema de Inventario", 
    date: "2023-05-08",
    status: "Completado",
    contactMethod: "WhatsApp",
    source: "Instagram" 
  },
  { 
    id: 5, 
    clientName: "Roberto Sánchez", 
    email: "roberto@example.com",
    phone: "555-7890",
    service: "Diseño UX/UI", 
    date: "2023-05-05",
    status: "Cancelado",
    contactMethod: "Llamada",
    source: "LinkedIn" 
  },
];

// Status colors mapping
const statusColors: Record<string, string> = {
  "Nuevo": "bg-blue-100 text-blue-800",
  "Contactado": "bg-purple-100 text-purple-800",
  "En proceso": "bg-yellow-100 text-yellow-800",
  "Completado": "bg-green-100 text-green-800",
  "Cancelado": "bg-red-100 text-red-800"
};

const DashboardSolicitudes = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [openAlertId, setOpenAlertId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleStatusChange = (requestId: number, newStatus: string) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: newStatus } 
        : request
    ));
    
    toast({
      title: "Estado actualizado",
      description: `La solicitud ha sido marcada como "${newStatus}".`,
    });
  };

  const handleDeleteRequest = (requestId: number) => {
    setRequests(requests.filter(request => request.id !== requestId));
    setOpenAlertId(null);
    
    toast({
      title: "Solicitud eliminada",
      description: "La solicitud ha sido eliminada permanentemente.",
      variant: "destructive",
    });
  };

  // Get unique services for filter
  const uniqueServices = Array.from(new Set(requests.map(request => request.service)));

  // Filter requests
  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesService = filterService === 'all' || request.service === filterService;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      
      <main className="container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Solicitudes de Servicios</h2>
          <p className="text-muted-foreground">Gestione las solicitudes de servicios de sus clientes</p>
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
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="Nuevo">Nuevo</SelectItem>
              <SelectItem value="Contactado">Contactado</SelectItem>
              <SelectItem value="En proceso">En proceso</SelectItem>
              <SelectItem value="Completado">Completado</SelectItem>
              <SelectItem value="Cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterService} onValueChange={setFilterService}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por servicio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los servicios</SelectItem>
              {uniqueServices.map(service => (
                <SelectItem key={service} value={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="todos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="todos">Todas las Solicitudes</TabsTrigger>
            <TabsTrigger value="nuevos">Nuevos</TabsTrigger>
            <TabsTrigger value="contactados">Contactados</TabsTrigger>
            <TabsTrigger value="en-proceso">En Proceso</TabsTrigger>
          </TabsList>
          
          <TabsContent value="todos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Lista de Solicitudes</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredRequests.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-7 gap-4 font-medium text-muted-foreground border-b pb-2">
                      <div>Cliente</div>
                      <div>Servicio</div>
                      <div>Fecha</div>
                      <div>Contacto</div>
                      <div>Fuente</div>
                      <div className="text-center">Estado</div>
                      <div className="text-right">Acciones</div>
                    </div>
                    
                    {filteredRequests.map(request => (
                      <div key={request.id} className="grid grid-cols-7 gap-4 py-3 border-b last:border-0">
                        <div>
                          <p className="font-medium">{request.clientName}</p>
                          <p className="text-xs text-muted-foreground">{request.email}</p>
                        </div>
                        <div>{request.service}</div>
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          {request.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{request.contactMethod}</span>
                        </div>
                        <div>{request.source}</div>
                        <div className="text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                            {request.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleStatusChange(request.id, "Nuevo")}>
                                Marcar como Nuevo
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(request.id, "Contactado")}>
                                Marcar como Contactado
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(request.id, "En proceso")}>
                                Marcar como En Proceso
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(request.id, "Completado")}>
                                Marcar como Completado
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(request.id, "Cancelado")}>
                                Marcar como Cancelado
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => setOpenAlertId(request.id)}
                              >
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          
                          <AlertDialog open={openAlertId === request.id} onOpenChange={() => setOpenAlertId(null)}>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar esta solicitud?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Esto eliminará permanentemente la solicitud de {request.clientName}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteRequest(request.id)}>
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-muted-foreground">
                    No se encontraron solicitudes con ese criterio de búsqueda.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="nuevos">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Solicitudes Nuevas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRequests
                    .filter(request => request.status === "Nuevo")
                    .map(request => (
                      <Card key={request.id} className="p-4">
                        <div className="flex justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{request.clientName}</h3>
                            <p className="text-sm text-muted-foreground">{request.email}</p>
                          </div>
                          <Badge className={statusColors[request.status]}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2"><strong>Servicio:</strong> {request.service}</p>
                        <p className="text-sm mb-2"><strong>Método de contacto:</strong> {request.contactMethod}</p>
                        <p className="text-sm mb-2"><strong>Fuente:</strong> {request.source}</p>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(request.id, "Contactado")}
                          >
                            Marcar como Contactado
                          </Button>
                        </div>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contactados">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Clientes Contactados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRequests
                    .filter(request => request.status === "Contactado")
                    .map(request => (
                      <Card key={request.id} className="p-4">
                        <div className="flex justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{request.clientName}</h3>
                            <p className="text-sm text-muted-foreground">{request.email}</p>
                          </div>
                          <Badge className={statusColors[request.status]}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2"><strong>Servicio:</strong> {request.service}</p>
                        <p className="text-sm mb-2"><strong>Método de contacto:</strong> {request.contactMethod}</p>
                        <p className="text-sm mb-2"><strong>Fuente:</strong> {request.source}</p>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(request.id, "En proceso")}
                          >
                            Marcar como En Proceso
                          </Button>
                        </div>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="en-proceso">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Servicios En Proceso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredRequests
                    .filter(request => request.status === "En proceso")
                    .map(request => (
                      <Card key={request.id} className="p-4">
                        <div className="flex justify-between mb-2">
                          <div>
                            <h3 className="font-medium">{request.clientName}</h3>
                            <p className="text-sm text-muted-foreground">{request.email}</p>
                          </div>
                          <Badge className={statusColors[request.status]}>
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2"><strong>Servicio:</strong> {request.service}</p>
                        <p className="text-sm mb-2"><strong>Método de contacto:</strong> {request.contactMethod}</p>
                        <p className="text-sm mb-2"><strong>Fuente:</strong> {request.source}</p>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(request.id, "Completado")}
                          >
                            Marcar como Completado
                          </Button>
                        </div>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DashboardSolicitudes;
