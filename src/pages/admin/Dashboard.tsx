"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/DashboardLayout"
import StatCard from "@/components/StatCard"
import NotificationsPanel from "@/components/NotificationsPanel"
import { Link } from "react-router-dom"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Button } from "@/components/ui/button"

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    activeClients: 0,
    avgResponseTime: 0,
    serviceBreakdown: [],
    sourceBreakdown: [],
  })
  const [recentRequests, setRecentRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Datos estáticos de visitas (mock)
  const visitData = [
    { name: "Lun", value: 120 },
    { name: "Mar", value: 150 },
    { name: "Mié", value: 180 },
    { name: "Jue", value: 170 },
    { name: "Vie", value: 190 },
    { name: "Sáb", value: 110 },
    { name: "Dom", value: 85 },
  ]

  const getAuthToken = () => {
    return localStorage.getItem("token")
  }

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error("No hay token de autenticación. Por favor, inicia sesión.")
      }

      // Fetch stats
      const statsResponse = await fetch("https://backend-wmsi.onrender.com/api/requests/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!statsResponse.ok) {
        const errorData = await statsResponse.json()
        throw new Error(errorData.message || "Error fetching stats")
      }
      const statsData = await statsResponse.json()
      console.log("Stats data:", statsData)
      setStats({
        totalRequests: statsData.totalRequests || 0,
        activeClients: statsData.activeClients || 0,
        avgResponseTime: statsData.avgResponseTime / (1000 * 60 * 60) || 0,
        serviceBreakdown: statsData.serviceBreakdown || [],
        sourceBreakdown: statsData.sourceBreakdown || [],
      })

      // Fetch recent requests
      const recentResponse = await fetch("https://backend-wmsi.onrender.com/api/requests/recent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!recentResponse.ok) {
        const errorData = await recentResponse.json()
        throw new Error(errorData.message || "Error fetching recent requests")
      }
      const recentData = await recentResponse.json()
      console.log("Recent requests data:", recentData)
      setRecentRequests(
        recentData.map((request) => ({
          id: request._id,
          name: request.name || "Anónimo",
          service: request.service || "Sin servicio",
          date: new Date(request.date).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          status: request.status || "Pendiente",
        })),
      )
    } catch (error) {
      console.error("Error fetching data:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData() // Carga inicial
  }, []) // Removed fetchData from dependencies

  const serviceData = stats.serviceBreakdown.map((item) => ({
    name: item._id ? item._id.slice(0, 9) : "Desconocido",
    value: item.count || 0,
  }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  const referralData = stats.sourceBreakdown.map((item) => ({
    name: item._id ? item._id.charAt(0).toUpperCase() + item._id.slice(1) : "Desconocido",
    value: item.count || 0,
  }))

  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "En Proceso":
        return "bg-blue-100 text-blue-800"
      case "Completado":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <p className="text-muted-foreground">Cargando datos...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <p className="text-red-500">Error: {error}</p>
          <Button onClick={fetchData} className="mt-4">
            Reintentar
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">Panel de Control</h2>
          <Button onClick={fetchData} className="w-full sm:w-auto">
            Actualizar Datos
          </Button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <StatCard
            title="Total Solicitudes"
            value={stats.totalRequests}
            trend={{ value: 12, positive: true }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            }
          />
          <StatCard
            title="Visitas"
            value="1,543" // Mock
            trend={{ value: 8, positive: true }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            }
          />
          <StatCard
            title="Clientes Activos"
            value={stats.activeClients}
            trend={{ value: 5, positive: true }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
          <StatCard
            title="Tasa de Conversión"
            value="15.8%" // Mock
            trend={{ value: 2.3, positive: false }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            }
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Visitas Diarias */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                <h3 className="text-lg font-semibold mb-2 sm:mb-0">Visitas Diarias</h3>
                <select className="text-sm border border-input rounded-md px-2 py-1 w-full sm:w-auto">
                  <option>Última Semana</option>
                  <option>Último Mes</option>
                  <option>Último Año</option>
                </select>
              </div>
              <div className="h-48 sm:h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth="2" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráficos de Servicios y Fuentes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4">Servicios Solicitados</h3>
                <div className="h-48 sm:h-56 md:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius="80%"
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4">Fuentes de Referencia</h3>
                <div className="h-48 sm:h-56 md:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={referralData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={60} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Solicitudes Recientes */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 border-b border-border flex flex-col sm:flex-row items-center justify-between">
                <h3 className="text-lg font-semibold mb-2 sm:mb-0">Solicitudes Recientes</h3>
                <Link to="/admin/requests" className="text-accent hover:text-accent/80 text-sm">
                  Ver Todas
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Servicio
                      </th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentRequests.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-3 py-4 sm:px-4 sm:py-4 text-center text-muted-foreground">
                          No hay solicitudes recientes
                        </td>
                      </tr>
                    ) : (
                      recentRequests.map((request) => (
                        <tr key={request.id} className="hover:bg-secondary/30 transition-colors">
                          <td className="px-3 py-2 sm:px-4 sm:py-4 whitespace-nowrap">{request.id.slice(-6)}</td>
                          <td className="px-3 py-2 sm:px-4 sm:py-4 truncate max-w-[80px] sm:max-w-[120px] md:max-w-[150px]">
                            {request.name}
                          </td>
                          <td className="px-3 py-2 sm:px-4 sm:py-4 truncate max-w-[80px] sm:max-w-[120px] md:max-w-[150px]">
                            {request.service}
                          </td>
                          <td className="px-3 py-2 sm:px-4 sm:py-4 whitespace-nowrap">{request.date}</td>
                          <td className="px-3 py-2 sm:px-4 sm:py-4 whitespace-nowrap">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClasses(request.status)}`}>
                              {request.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Panel de Notificaciones y Acciones */}
          <div className="space-y-4 sm:space-y-6">
            <NotificationsPanel />
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <Link
                  to="/admin/clients/new"
                  className="flex items-center p-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="bg-accent/10 p-2 rounded-md mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <line x1="20" y1="8" x2="20" y2="14" />
                      <line x1="23" y1="11" x2="17" y2="11" />
                    </svg>
                  </div>
                  <span className="text-sm">Agregar Cliente</span>
                </Link>
                <Link
                  to="/admin/requests"
                  className="flex items-center p-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="bg-accent/10 p-2 rounded-md mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <span className="text-sm">Ver Solicitudes Pendientes</span>
                </Link>
                <Link
                  to="/admin/metrics"
                  className="flex items-center p-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="bg-accent/10 p-2 rounded-md mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent"
                    >
                      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                      <path d="M22 12A10 10 0 0 0 12 2v10z" />
                    </svg>
                  </div>
                  <span className="text-sm">Analizar Métricas</span>
                </Link>
                <Link
                  to="/admin/settings"
                  className="flex items-center p-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <div className="bg-accent/10 p-2 rounded-md mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1-2.83 0 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </div>
                  <span className="text-sm">Actualizar Configuración</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard

