"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Users, Clock, ClipboardList } from "lucide-react"
import DashboardNavbar from "@/components/DashboardNavbar"
import StatCard from "@/components/StatCard"
import { Button } from "@/components/ui/button"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    activeClients: 0,
    avgResponseTime: 0,
  })
  const [recentRequests, setRecentRequests] = useState([])
  const [services, setServices] = useState([])
  const [sources, setSources] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const getAuthToken = () => localStorage.getItem("token")

  const fetchStats = async () => {
    try {
      const token = getAuthToken()
      if (!token) throw new Error("No hay token de autenticación. Por favor, inicia sesión.")

      console.log("Fetching stats...")
      const response = await fetch("https://backend-wmsi.onrender.com/api/requests/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al obtener estadísticas")
      }
      const data = await response.json()
      console.log("Stats data:", data)
      setStats({
        totalRequests: data.totalRequests || 0,
        activeClients: data.activeClients || 0,
        avgResponseTime: data.avgResponseTime / (1000 * 60 * 60) || 0,
      })
      setServices(
        data.serviceBreakdown
          ?.map((item) => ({
            service: item._id || "Desconocido",
            count: item.count || 0,
            percentage: `${Math.round((item.count / (data.totalRequests || 1)) * 100) || 0}%`,
          }))
          .slice(0, 4) || [],
      )
      setSources(
        data.sourceBreakdown
          ?.map((item) => ({
            source: item._id ? item._id.charAt(0).toUpperCase() + item._id.slice(1) : "Desconocido",
            count: item.count || 0,
            percentage: `${Math.round((item.count / (data.totalRequests || 1)) * 100) || 0}%`,
          }))
          .slice(0, 4) || [],
      )
    } catch (error) {
      console.error("Error fetching stats:", error)
      throw error
    }
  }

  

  const fetchRecentRequests = async () => {
    try {
      const token = getAuthToken()
      if (!token) throw new Error("No hay token de autenticación. Por favor, inicia sesión.")

      console.log("Fetching recent requests...")
      const response = await fetch("https://backend-wmsi.onrender.com/api/requests/recent", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al obtener solicitudes recientes")
      }
      const data = await response.json()
      console.log("Recent requests data:", data)
      const mappedRecent = data.map((request) => ({
        name: request.name || "Anónimo",
        service: request.service || "Sin servicio",
        date: new Date(request.date).toLocaleString("es-ES", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: request.status || "Pendiente",
      }))
      console.log("Mapped recent requests:", mappedRecent)
      setRecentRequests(mappedRecent)
    } catch (error) {
      console.error("Error fetching recent requests:", error)
      throw error
    }
  }

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      await Promise.all([fetchStats(), fetchRecentRequests()])
    } catch (error) {
      setError(error.message || "Error al cargar los datos. Por favor, intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNavbar />
        <main className="flex-1 py-4 px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <p className="text-muted-foreground">Cargando datos...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNavbar />
        <main className="flex-1 py-4 px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <p className="text-red-500">{error}</p>
            <Button onClick={loadData} className="mt-4">
              Reintentar
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="flex-1 py-4 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Resumen General</h2>
              <p className="text-muted-foreground text-sm sm:text-base">Visualiza el rendimiento de tu negocio</p>
            </div>
            <Button onClick={loadData} className="w-full sm:w-auto">
              Actualizar Datos
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

          <Tabs defaultValue="solicitudes" className="space-y-6">
            <TabsList className="grid grid-cols-3 gap-2 w-full mb-8 max-w-3xl mx-auto">
              <TabsTrigger
                value="solicitudes"
                className="py-2 px-4 text-xs sm:text-sm font-medium rounded-md transition-colors 
                  data-[state=active]:bg-accent data-[state=active]:text-accent-foreground 
                  hover:bg-muted hover:text-muted-foreground"
              >
                <span className="hidden sm:inline">Solicitudes</span>
                <span className="sm:hidden">Solic.</span>
              </TabsTrigger>
              <TabsTrigger
                value="servicios"
                className="py-2 px-4 text-xs sm:text-sm font-medium rounded-md transition-colors 
                  data-[state=active]:bg-accent data-[state=active]:text-accent-foreground 
                  hover:bg-muted hover:text-muted-foreground"
              >
                <span className="hidden sm:inline">Servicios</span>
                <span className="sm:hidden">Serv.</span>
              </TabsTrigger>
              <TabsTrigger
                value="fuentes"
                className="py-2 px-4 text-xs sm:text-sm font-medium rounded-md transition-colors 
                  data-[state=active]:bg-accent data-[state=active]:text-accent-foreground 
                  hover:bg-muted hover:text-muted-foreground"
              >
                <span className="hidden sm:inline">Fuentes</span>
                <span className="sm:hidden">Fuentes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="solicitudes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Solicitudes Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    {recentRequests.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">No hay solicitudes recientes.</p>
                    ) : (
                      <table className="w-full text-sm">
                        <thead className="bg-secondary/50">
                          <tr>
                            <th className="px-2 py-2 text-left font-medium text-foreground/70">Nombre</th>
                            <th className="px-2 py-2 text-left font-medium text-foreground/70">Servicio</th>
                            <th className="px-2 py-2 text-left font-medium text-foreground/70">Fecha</th>
                            <th className="px-2 py-2 text-left font-medium text-foreground/70">Estado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {recentRequests.map((item, i) => (
                            <tr key={i}>
                              <td className="px-2 py-2 truncate max-w-[100px] sm:max-w-[150px]">{item.name}</td>
                              <td className="px-2 py-2 truncate max-w-[100px] sm:max-w-[150px]">{item.service}</td>
                              <td className="px-2 py-2 whitespace-nowrap">{item.date}</td>
                              <td className="px-2 py-2 whitespace-nowrap">
                                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="servicios" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Servicios Más Solicitados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    {services.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">No hay datos de servicios.</p>
                    ) : (
                      <table className="w-full text-sm">
                        <thead className="bg-secondary/50">
                          <tr>
                            <th className="px-2 py-2 text-left font-medium text-foreground/70">Servicio</th>
                            <th className="px-2 py-2 text-left font-medium text-foreground/70">Solicitudes</th>
                            <th className="px-2 py-2 text-left font-medium text-foreground/70">Porcentaje</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {services.map((item, i) => (
                            <tr key={i}>
                              <td className="px-2 py-2 truncate max-w-[120px] sm:max-w-[200px]">{item.service}</td>
                              <td className="px-2 py-2">{item.count}</td>
                              <td className="px-2 py-2">{item.percentage}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fuentes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Fuentes de Tráfico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    {sources.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">No hay datos de fuentes.</p>
                    ) : (
                      <table className="w-full text-sm">
                        <thead className="bg-secondary/50">
                          <tr>
                            <th className="px-2 py-2 text-left font-medium text-foreground/70">Fuente</th>
                            <th className="px-2 py-2 text-left font-medium text-foreground/70">Visitas</th>
                            <th className="px-2 py-2 text-left font-medium text-foreground/70">Porcentaje</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {sources.map((item, i) => (
                            <tr key={i}>
                              <td className="px-2 py-2 truncate max-w-[120px] sm:max-w-[200px]">{item.source}</td>
                              <td className="px-2 py-2">{item.count}</td>
                              <td className="px-2 py-2">{item.percentage}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

