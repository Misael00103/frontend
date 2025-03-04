import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Clock, ClipboardList } from "lucide-react";
import DashboardNavbar from '@/components/DashboardNavbar';
import StatCard from "@/components/StatCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    activeClients: 0,
    avgResponseTime: 0
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [services, setServices] = useState([]);
  const [sources, setSources] = useState([]);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      console.log('Fetching stats...');
      const statsResponse = await fetch('https://arkit-backend.onrender.com/api/requests/stats');
      if (!statsResponse.ok) {
        const errorData = await statsResponse.json();
        throw new Error(errorData.message || 'Error fetching stats');
      }
      const statsData = await statsResponse.json();
      console.log('Stats data:', statsData);
      setStats({
        totalRequests: statsData.totalRequests,
        activeClients: statsData.activeClients,
        avgResponseTime: statsData.avgResponseTime / (1000 * 60 * 60)
      });
      setServices(statsData.serviceBreakdown.map(item => ({
        service: item._id,
        count: item.count,
        percentage: `${Math.round((item.count / statsData.totalRequests) * 100) || 0}%`
      })).slice(0, 4));
      setSources(statsData.sourceBreakdown.map(item => ({
        source: item._id.charAt(0).toUpperCase() + item._id.slice(1),
        count: item.count,
        percentage: `${Math.round((item.count / statsData.totalRequests) * 100) || 0}%`
      })).slice(0, 4));
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError(error.message);
    }
  };

  const fetchRecentRequests = async () => {
    try {
      console.log('Fetching recent requests...');
      const recentResponse = await fetch('https://arkit-backend.onrender.com/api/requests/recent');
      if (!recentResponse.ok) {
        const errorData = await recentResponse.json();
        throw new Error(errorData.message || 'Error fetching recent requests');
      }
      const recentData = await recentResponse.json();
      console.log('Recent requests data:', recentData);
      const mappedRecent = recentData.map(request => ({
        name: request.name,
        service: request.service,
        date: new Date(request.date).toLocaleString('es-ES', { 
          day: '2-digit', 
          month: 'short', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        status: request.status
      }));
      console.log('Mapped recent requests:', mappedRecent);
      setRecentRequests(mappedRecent);
    } catch (error) {
      console.error('Error fetching recent requests:', error);
      setError(prev => prev ? `${prev}; ${error.message}` : error.message);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecentRequests();
    const interval = setInterval(() => {
      fetchStats();
      fetchRecentRequests();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  if (error && recentRequests.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNavbar />
        <main className="flex-1 py-8">
          <div className="container">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Resumen General</h2>
            <p className="text-muted-foreground">Visualiza el rendimiento de tu negocio</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Solicitudes Totales"
              value={stats.totalRequests}
              trend={{ value: 4, positive: true }}
              icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Clientes Activos"
              value={stats.activeClients}
              trend={{ value: 12, positive: true }}
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Tiempo de Respuesta"
              value={`${stats.avgResponseTime.toFixed(1)}h`}
              trend={{ value: 15, positive: false }}
              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Tasa de Conversión"
              value="24%"
              trend={{ value: 2, positive: true }}
              icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
          
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
                    {recentRequests.length === 0 ? (
                      <p className="text-muted-foreground">No hay solicitudes recientes.</p>
                    ) : (
                      recentRequests.map((item, i) => (
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
                      ))
                    )}
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
                    {services.map((item, i) => (
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
                    {sources.map((item, i) => (
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