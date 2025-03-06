"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Search, UserPlus, Edit, CheckCircle, XCircle } from "lucide-react"
import DashboardNavbar from "@/components/DashboardNavbar"

const DashboardClientes = () => {
  const [clients, setClients] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newClient, setNewClient] = useState({ name: "", email: "", phone: "", company: "" })
  const [editingClient, setEditingClient] = useState(null)
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const getAuthToken = () => localStorage.getItem("token")

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = getAuthToken()
        if (!token) throw new Error("No hay token de autenticación. Por favor, inicia sesión.")

        const response = await fetch("https://backend-wmsi.onrender.com/api/clients", {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log("Fetch clients response status:", response.status)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error fetching clients")
        }
        const data = await response.json()
        console.log("Clients fetched:", data)
        setClients(data)
      } catch (error) {
        console.error("Error fetching clients:", error)
        toast({
          title: "Error",
          description: error.message || "No se pudieron cargar los clientes.",
          variant: "destructive",
        })
      }
    }
    fetchClients()
  }, [toast])

  const handleAddClient = async (e) => {
    e.preventDefault()
    try {
      const token = getAuthToken()
      if (!token) throw new Error("No hay token de autenticación. Por favor, inicia sesión.")

      const response = await fetch("https://backend-wmsi.onrender.com/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newClient),
      })

      console.log("Add client response status:", response.status)
      if (!response.ok) {
        const errorData = await response.json()
        console.log("Error data:", errorData)
        throw new Error(errorData.message || "Error al agregar cliente")
      }

      const addedClient = await response.json()
      console.log("Added client:", addedClient)
      setClients([...clients, addedClient])
      setNewClient({ name: "", email: "", phone: "", company: "" })

      toast({
        title: "Cliente agregado",
        description: `${addedClient.name} ha sido agregado a la lista de clientes.`,
      })
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error adding client:", error)
      toast({
        title: "Error",
        description: error.message || "No se pudo agregar el cliente.",
        variant: "destructive",
      })
    }
  }

  const handleEditClient = (client) => {
    setEditingClient(client)
    setIsEditDialogOpen(true)
  }

  const handleUpdateClient = async (e) => {
    e.preventDefault()
    try {
      const token = getAuthToken()
      if (!token) throw new Error("No hay token de autenticación. Por favor, inicia sesión.")

      const response = await fetch(`https://backend-wmsi.onrender.com/api/clients/${editingClient._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingClient),
      })

      console.log("Update client response status:", response.status)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error updating client")
      }
      const updatedClient = await response.json()
      console.log("Updated client:", updatedClient)

      setClients(clients.map((client) => (client._id === updatedClient._id ? updatedClient : client)))

      toast({
        title: "Cliente actualizado",
        description: `${updatedClient.name} ha sido actualizado correctamente.`,
      })
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Error updating client:", error)
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el cliente.",
        variant: "destructive",
      })
    }
  }

  const toggleClientStatus = async (clientId) => {
    const client = clients.find((c) => c._id === clientId)
    const newStatus = client.status === "Activo" ? "Inactivo" : "Activo"

    try {
      const token = getAuthToken()
      if (!token) throw new Error("No hay token de autenticación. Por favor, inicia sesión.")

      const response = await fetch(`https://backend-wmsi.onrender.com/api/clients/${clientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...client, status: newStatus }),
      })

      console.log("Toggle status response status:", response.status)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error toggling client status")
      }
      const updatedClient = await response.json()
      console.log("Updated client status:", updatedClient)

      setClients(clients.map((client) => (client._id === clientId ? updatedClient : client)))

      toast({
        title: "Estado actualizado",
        description: `${client.name} ahora está ${newStatus}.`,
      })
    } catch (error) {
      console.error("Error toggling client status:", error)
      toast({
        title: "Error",
        description: error.message || "No se pudo cambiar el estado del cliente.",
        variant: "destructive",
      })
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="py-4 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Gestión de Clientes</h2>
              <p className="text-muted-foreground text-sm sm:text-base">Administre la información de sus clientes</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto gap-2">
                  <UserPlus className="h-4 w-4" />
                  Nuevo Cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-lg sm:text-xl mb-4">Agregar Nuevo Cliente</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddClient} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      value={newClient.company}
                      onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
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
              placeholder="Buscar por nombre, empresa o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          <Tabs defaultValue="todos" className="space-y-4">
            <TabsList className="flex flex-wrap justify-start col-gap-2">
              <TabsTrigger value="todos" className="flex-1 sm:flex-none min-w-[100px]">Todos</TabsTrigger>
              <TabsTrigger value="activos" className="flex-1 sm:flex-none min-w-[100px]">Activos</TabsTrigger>
              <TabsTrigger value="inactivos" className="flex-1 sm:flex-none min-w-[100px]">Inactivos</TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Lista de Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Nombre</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Empresa</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Correo</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Teléfono</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Estado</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredClients.length > 0 ? (
                          filteredClients.map((client) => (
                            <tr key={client._id}>
                              <td className="px-2 py-2 truncate max-w-[100px] sm:max-w-[150px]">{client.name}</td>
                              <td className="px-2 py-2 truncate max-w-[100px] sm:max-w-[150px]">{client.company}</td>
                              <td className="px-2 py-2 truncate max-w-[120px] sm:max-w-[200px]">{client.email}</td>
                              <td className="px-2 py-2 whitespace-nowrap">{client.phone}</td>
                              <td className="px-2 py-2 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                  client.status === "Activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                }`}>
                                  {client.status}
                                </span>
                              </td>
                              <td className="px-2 py-2 flex flex-wrap gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditClient(client)}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  <span className="text-xs">Editar</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleClientStatus(client._id)}
                                  className={client.status === "Activo" ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}
                                >
                                  {client.status === "Activo" ? (
                                    <XCircle className="h-4 w-4 mr-1" />
                                  ) : (
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                  )}
                                  <span className="text-xs">{client.status === "Activo" ? "Desactivar" : "Activar"}</span>
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-2 py-4 text-center text-muted-foreground">
                              No se encontraron clientes con ese criterio de búsqueda.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Clientes Activos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Nombre</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Empresa</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Correo</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Teléfono</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Estado</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredClients.filter((client) => client.status === "Activo").map((client) => (
                          <tr key={client._id}>
                            <td className="px-2 py-2 truncate max-w-[100px] sm:max-w-[150px]">{client.name}</td>
                            <td className="px-2 py-2 truncate max-w-[100px] sm:max-w-[150px]">{client.company}</td>
                            <td className="px-2 py-2 truncate max-w-[120px] sm:max-w-[200px]">{client.email}</td>
                            <td className="px-2 py-2 whitespace-nowrap">{client.phone}</td>
                            <td className="px-2 py-2 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                {client.status}
                              </span>
                            </td>
                            <td className="px-2 py-2 flex flex-wrap gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditClient(client)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                <span className="text-xs">Editar</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleClientStatus(client._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                <span className="text-xs">Desactivar</span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inactivos" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Clientes Inactivos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Nombre</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Empresa</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Correo</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Teléfono</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Estado</th>
                          <th className="px-2 py-2 text-left font-medium text-blue-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredClients.filter((client) => client.status === "Inactivo").map((client) => (
                          <tr key={client._id}>
                            <td className="px-2 py-2 truncate max-w-[100px] sm:max-w-[150px]">{client.name}</td>
                            <td className="px-2 py-2 truncate max-w-[100px] sm:max-w-[150px]">{client.company}</td>
                            <td className="px-2 py-2 truncate max-w-[120px] sm:max-w-[200px]">{client.email}</td>
                            <td className="px-2 py-2 whitespace-nowrap">{client.phone}</td>
                            <td className="px-2 py-2 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                {client.status}
                              </span>
                            </td>
                            <td className="px-2 py-2 flex flex-wrap gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditClient(client)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                <span className="text-xs">Editar</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleClientStatus(client._id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                <span className="text-xs">Activar</span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="w-full max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl mb-4">Editar Cliente</DialogTitle>
              </DialogHeader>
              {editingClient && (
                <form onSubmit={handleUpdateClient} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nombre Completo</Label>
                    <Input
                      id="edit-name"
                      value={editingClient.name}
                      onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Correo Electrónico</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editingClient.email}
                      onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Teléfono</Label>
                    <Input
                      id="edit-phone"
                      value={editingClient.phone}
                      onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-company">Empresa</Label>
                    <Input
                      id="edit-company"
                      value={editingClient.company}
                      onChange={(e) => setEditingClient({ ...editingClient, company: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Actualizar Cliente</Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}

export default DashboardClientes