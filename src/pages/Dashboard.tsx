
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Clock, ClipboardList } from "lucide-react";
import DashboardNavbar from '@/components/DashboardNavbar';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      
      {/* Main content */}
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Resumen General</h2>
            <p className="text-muted-foreground">Visualiza el rendimiento de tu negocio</p>
          </div>
          
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Solicitudes Totales</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+4% desde el mes pasado</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tiempo de Respuesta</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2h</div>
                <p className="text-xs text-muted-foreground">-15min desde el mes pasado</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24%</div>
                <p className="text-xs text-muted-foreground">+2% desde el mes pasado</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs for different dashboards */}
          <Tabs defaultValue="solicitudes" className="space-y-4">
            <TabsList>
              <TabsTrigger value="solicitudes">Solicitudes Recientes</TabsTrigger>
              <TabsTrigger value="servicios">Servicios Populares</TabsTrigger>
              <TabsTrigger value="fuentes">Fuentes de Tráfico</TabsTrigger>
            </TabsList>
            
            <TabsContent value="solicitudes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Solicitudes Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Juan Pérez", service: "Desarrollo Web", date: "Hoy, 14:30", status: "Nuevo" },
                      { name: "María García", service: "Aplicación Móvil", date: "Ayer, 10:15", status: "Contactado" },
                      { name: "Carlos Rodríguez", service: "E-commerce", date: "22 Mayo, 09:45", status: "En proceso" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.service}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{item.date}</p>
                          <p className="text-xs font-medium text-blue-500">{item.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="servicios" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Servicios Más Solicitados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { service: "Desarrollo Web", count: 42, percentage: "33%" },
                      { service: "Aplicaciones Móviles", count: 27, percentage: "21%" },
                      { service: "E-commerce", count: 24, percentage: "19%" },
                      { service: "Sistema de Inventario", count: 18, percentage: "14%" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <p className="font-medium">{item.service}</p>
                        <div className="text-right">
                          <p className="text-sm">{item.count} solicitudes</p>
                          <p className="text-xs text-muted-foreground">{item.percentage} del total</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="fuentes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fuentes de Tráfico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { source: "Google", count: 56, percentage: "44%" },
                      { source: "Redes Sociales", count: 38, percentage: "30%" },
                      { source: "Referidos", count: 21, percentage: "16%" },
                      { source: "Otros", count: 12, percentage: "10%" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <p className="font-medium">{item.source}</p>
                        <div className="text-right">
                          <p className="text-sm">{item.count} visitas</p>
                          <p className="text-xs text-muted-foreground">{item.percentage} del total</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
