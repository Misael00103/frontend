"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Search, Download, DollarSign, TrendingUp, CreditCard, Calendar, Plus } from "lucide-react"
import DashboardNavbar from "@/components/DashboardNavbar"
import StatCard from "@/components/StatCard"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock data for revenue
const revenueData = [
  { month: "Ene", revenue: 12500 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Abr", revenue: 16500 },
  { month: "May", revenue: 21000 },
  { month: "Jun", revenue: 19500 },
  { month: "Jul", revenue: 22000 },
  { month: "Ago", revenue: 23500 },
  { month: "Sep", revenue: 25000 },
  { month: "Oct", revenue: 27500 },
  { month: "Nov", revenue: 26000 },
  { month: "Dic", revenue: 30000 },
]

// Mock data for revenue by service
const serviceRevenueData = [
  { name: "Desarrollo Web", value: 35000 },
  { name: "Aplicaciones Móviles", value: 25000 },
  { name: "E-commerce", value: 18000 },
  { name: "Diseño UX/UI", value: 12000 },
  { name: "Base de Datos", value: 10000 },
]

// Mock data for invoices
const initialInvoices = [
  {
    id: "INV-001",
    client: "Empresa ABC",
    amount: 2500,
    date: "2023-11-15",
    dueDate: "2023-12-15",
    status: "Pagado",
    service: "Desarrollo Web",
  },
  {
    id: "INV-002",
    client: "Corporación XYZ",
    amount: 3800,
    date: "2023-11-20",
    dueDate: "2023-12-20",
    status: "Pendiente",
    service: "Aplicaciones Móviles",
  },
  {
    id: "INV-003",
    client: "Tienda Online 123",
    amount: 1500,
    date: "2023-11-25",
    dueDate: "2023-12-25",
    status: "Pagado",
    service: "E-commerce",
  },
  {
    id: "INV-004",
    client: "Consultora Tech",
    amount: 4200,
    date: "2023-11-28",
    dueDate: "2023-12-28",
    status: "Vencido",
    service: "Base de Datos",
  },
  {
    id: "INV-005",
    client: "Startup Innovadora",
    amount: 2800,
    date: "2023-12-01",
    dueDate: "2024-01-01",
    status: "Pendiente",
    service: "Diseño UX/UI",
  },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const DashboardFinance = () => {
  const [invoices, setInvoices] = useState(initialInvoices)
  const [filteredInvoices, setFilteredInvoices] = useState(initialInvoices)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newInvoice, setNewInvoice] = useState({
    client: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    status: "Pendiente",
    service: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  // Calculate total revenue, pending, and overdue amounts
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const pendingAmount = invoices
    .filter((invoice) => invoice.status === "Pendiente")
    .reduce((sum, invoice) => sum + invoice.amount, 0)
  const overdueAmount = invoices
    .filter((invoice) => invoice.status === "Vencido")
    .reduce((sum, invoice) => sum + invoice.amount, 0)

  // Filter invoices based on search term and status
  useEffect(() => {
    let result = invoices

    if (searchTerm) {
      result = result.filter(
        (invoice) =>
          invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.service.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      result = result.filter((invoice) => invoice.status === statusFilter)
    }

    setFilteredInvoices(result)
  }, [invoices, searchTerm, statusFilter])

  const handleAddInvoice = (e) => {
    e.preventDefault()

    // Generate a new invoice ID
    const newId = `INV-${String(invoices.length + 1).padStart(3, "0")}`

    const invoiceToAdd = {
      ...newInvoice,
      id: newId,
      amount: Number.parseFloat(newInvoice.amount),
    }

    setInvoices([...invoices, invoiceToAdd])
    setNewInvoice({
      client: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      dueDate: "",
      status: "Pendiente",
      service: "",
    })

    toast({
      title: "Factura creada",
      description: `La factura ${newId} ha sido creada exitosamente.`,
    })

    setIsDialogOpen(false)
  }

  const handleStatusChange = (invoiceId, newStatus) => {
    setInvoices(invoices.map((invoice) => (invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice)))

    toast({
      title: "Estado actualizado",
      description: `La factura ${invoiceId} ahora está "${newStatus}".`,
    })
  }

  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case "Pagado":
        return "bg-green-100 text-green-800"
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "Vencido":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="py-4 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Gestión Financiera</h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Monitorea los ingresos y facturas de tu negocio
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto gap-2">
                    <Plus className="h-4 w-4" />
                    Nueva Factura
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl mb-4">Crear Nueva Factura</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddInvoice} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="client">Cliente</Label>
                      <Input
                        id="client"
                        value={newInvoice.client}
                        onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Servicio</Label>
                      <Input
                        id="service"
                        value={newInvoice.service}
                        onChange={(e) => setNewInvoice({ ...newInvoice, service: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Monto ($)</Label>
                      <Input
                        id="amount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={newInvoice.amount}
                        onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Fecha de Emisión</Label>
                        <Input
                          id="date"
                          type="date"
                          value={newInvoice.date}
                          onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dueDate">Fecha de Vencimiento</Label>
                        <Input
                          id="dueDate"
                          type="date"
                          value={newInvoice.dueDate}
                          onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Estado</Label>
                      <Select
                        value={newInvoice.status}
                        onValueChange={(value) => setNewInvoice({ ...newInvoice, status: value })}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendiente">Pendiente</SelectItem>
                          <SelectItem value="Pagado">Pagado</SelectItem>
                          <SelectItem value="Vencido">Vencido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full">
                      Crear Factura
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Ingresos Totales"
              value={`$${totalRevenue.toLocaleString()}`}
              trend={{ value: 12, positive: true }}
              icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Ingresos Mensuales"
              value="$27,500"
              trend={{ value: 8, positive: true }}
              icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Pagos Pendientes"
              value={`$${pendingAmount.toLocaleString()}`}
              trend={{ value: 5, positive: false }}
              icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Pagos Vencidos"
              value={`$${overdueAmount.toLocaleString()}`}
              trend={{ value: 2, positive: false }}
              icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Ingresos Mensuales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Ingresos"]} />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Ingresos por Servicio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceRevenueData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {serviceRevenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Ingresos"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <CardTitle className="text-lg sm:text-xl">Facturas</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar factura..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="Pagado">Pagado</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Servicio
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Monto
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Vencimiento
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">{invoice.id}</td>
                        <td className="px-4 py-4 truncate max-w-[150px]">{invoice.client}</td>
                        <td className="px-4 py-4 truncate max-w-[150px]">{invoice.service}</td>
                        <td className="px-4 py-4 whitespace-nowrap">${invoice.amount.toLocaleString()}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{new Date(invoice.date).toLocaleDateString()}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <Select
                            value={invoice.status}
                            onValueChange={(newStatus) => handleStatusChange(invoice.id, newStatus)}
                          >
                            <SelectTrigger
                              className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeClasses(invoice.status)}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Pendiente">Pendiente</SelectItem>
                              <SelectItem value="Pagado">Pagado</SelectItem>
                              <SelectItem value="Vencido">Vencido</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default DashboardFinance

