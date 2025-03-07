"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Search,
  UserPlus,
  Edit,
  CheckCircle,
  XCircle,
  Trash2,
  Mail,
  Calendar,
  DollarSign,
  Users,
  Download,
  FileText,
} from "lucide-react"
import DashboardNavbar from "@/components/DashboardNavbar"
import StatCard from "@/components/StatCard"

// Mock data for employees
const initialEmployees = [
  {
    id: "EMP-001",
    name: "Juan Pérez",
    email: "juan.perez@empresa.com",
    phone: "555-123-4567",
    position: "Desarrollador Frontend",
    department: "Desarrollo",
    hireDate: "2021-05-15",
    salary: 45000,
    status: "Activo",
  },
  {
    id: "EMP-002",
    name: "María Rodríguez",
    email: "maria.rodriguez@empresa.com",
    phone: "555-234-5678",
    position: "Desarrollador Backend",
    department: "Desarrollo",
    hireDate: "2020-08-10",
    salary: 48000,
    status: "Activo",
  },
  {
    id: "EMP-003",
    name: "Carlos Gómez",
    email: "carlos.gomez@empresa.com",
    phone: "555-345-6789",
    position: "Diseñador UX/UI",
    department: "Diseño",
    hireDate: "2022-01-20",
    salary: 42000,
    status: "Activo",
  },
  {
    id: "EMP-004",
    name: "Ana Martínez",
    email: "ana.martinez@empresa.com",
    phone: "555-456-7890",
    position: "Gerente de Proyecto",
    department: "Administración",
    hireDate: "2019-11-05",
    salary: 60000,
    status: "Activo",
  },
  {
    id: "EMP-005",
    name: "Roberto Sánchez",
    email: "roberto.sanchez@empresa.com",
    phone: "555-567-8901",
    position: "Especialista en QA",
    department: "Calidad",
    hireDate: "2021-09-15",
    salary: 40000,
    status: "Inactivo",
  },
]

// Department data
const departments = [
  { name: "Desarrollo", employeeCount: 15, budget: 720000 },
  { name: "Diseño", employeeCount: 8, budget: 336000 },
  { name: "Administración", employeeCount: 5, budget: 300000 },
  { name: "Calidad", employeeCount: 6, budget: 240000 },
  { name: "Ventas", employeeCount: 7, budget: 350000 },
]

const DashboardEmployees = () => {
  const [employees, setEmployees] = useState(initialEmployees)
  const [filteredEmployees, setFilteredEmployees] = useState(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    hireDate: new Date().toISOString().split("T")[0],
    salary: "",
    status: "Activo",
  })
  const [editingEmployee, setEditingEmployee] = useState(null)
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Calculate total employees and active employees
  const totalEmployees = employees.length
  const activeEmployees = employees.filter((emp) => emp.status === "Activo").length
  const totalSalaries = employees.reduce((sum, emp) => sum + emp.salary, 0)
  const avgSalary = totalEmployees > 0 ? totalSalaries / totalEmployees : 0

  // Filter employees based on search term, status, and department
  useEffect(() => {
    let result = employees

    if (searchTerm) {
      result = result.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.position.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      result = result.filter((employee) => employee.status === statusFilter)
    }

    if (departmentFilter !== "all") {
      result = result.filter((employee) => employee.department === departmentFilter)
    }

    setFilteredEmployees(result)
  }, [employees, searchTerm, statusFilter, departmentFilter])

  const handleAddEmployee = (e) => {
    e.preventDefault()

    // Generate a new employee ID
    const newId = `EMP-${String(employees.length + 1).padStart(3, "0")}`

    const employeeToAdd = {
      ...newEmployee,
      id: newId,
      salary: Number.parseFloat(newEmployee.salary),
    }

    setEmployees([...employees, employeeToAdd])
    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      hireDate: new Date().toISOString().split("T")[0],
      salary: "",
      status: "Activo",
    })

    toast({
      title: "Empleado agregado",
      description: `${employeeToAdd.name} ha sido agregado a la plantilla.`,
    })

    setIsDialogOpen(false)
  }

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee)
    setIsEditDialogOpen(true)
  }

  const handleUpdateEmployee = (e) => {
    e.preventDefault()

    setEmployees(
      employees.map((emp) =>
        emp.id === editingEmployee.id ? { ...editingEmployee, salary: Number.parseFloat(editingEmployee.salary) } : emp,
      ),
    )

    toast({
      title: "Empleado actualizado",
      description: `La información de ${editingEmployee.name} ha sido actualizada.`,
    })

    setIsEditDialogOpen(false)
  }

  const toggleEmployeeStatus = (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId)
    const newStatus = employee.status === "Activo" ? "Inactivo" : "Activo"

    setEmployees(employees.map((emp) => (emp.id === employeeId ? { ...emp, status: newStatus } : emp)))

    toast({
      title: "Estado actualizado",
      description: `${employee.name} ahora está ${newStatus}.`,
    })
  }

  const handleDeleteEmployee = (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId)

    setEmployees(employees.filter((emp) => emp.id !== employeeId))

    toast({
      title: "Empleado eliminado",
      description: `${employee.name} ha sido eliminado de la plantilla.`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="py-4 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Gestión de Empleados</h2>
              <p className="text-muted-foreground text-sm sm:text-base">Administra la información de tu equipo</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto gap-2">
                  <UserPlus className="h-4 w-4" />
                  Nuevo Empleado
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-lg sm:text-xl mb-4">Agregar Nuevo Empleado</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddEmployee} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Cargo</Label>
                    <Input
                      id="position"
                      value={newEmployee.position}
                      onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Select
                      value={newEmployee.department}
                      onValueChange={(value) => setNewEmployee({ ...newEmployee, department: value })}
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Seleccionar departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Desarrollo">Desarrollo</SelectItem>
                        <SelectItem value="Diseño">Diseño</SelectItem>
                        <SelectItem value="Administración">Administración</SelectItem>
                        <SelectItem value="Calidad">Calidad</SelectItem>
                        <SelectItem value="Ventas">Ventas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hireDate">Fecha de Contratación</Label>
                      <Input
                        id="hireDate"
                        type="date"
                        value={newEmployee.hireDate}
                        onChange={(e) => setNewEmployee({ ...newEmployee, hireDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salario Anual ($)</Label>
                      <Input
                        id="salary"
                        type="number"
                        min="0"
                        step="1000"
                        value={newEmployee.salary}
                        onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Guardar Empleado
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Empleados"
              value={totalEmployees}
              trend={{ value: 4, positive: true }}
              icon={<UserPlus className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Empleados Activos"
              value={activeEmployees}
              trend={{ value: 2, positive: true }}
              icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Salario Promedio"
              value={`$${avgSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              trend={{ value: 5, positive: true }}
              icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Departamentos"
              value={departments.length}
              trend={{ value: 0, positive: true }}
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Distribución por Departamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                          Departamento
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                          Empleados
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                          Presupuesto Anual
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                          Promedio por Empleado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {departments.map((dept) => (
                        <tr key={dept.name} className="hover:bg-secondary/30 transition-colors">
                          <td className="px-4 py-4">{dept.name}</td>
                          <td className="px-4 py-4">{dept.employeeCount}</td>
                          <td className="px-4 py-4">${dept.budget.toLocaleString()}</td>
                          <td className="px-4 py-4">
                            ${Math.round(dept.budget / dept.employeeCount).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Enviar Comunicado
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Programar Reunión
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar Nómina
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Generar Reporte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar empleado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter} className="w-full sm:w-[180px]">
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Activo">Activos</SelectItem>
                <SelectItem value="Inactivo">Inactivos</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter} className="w-full sm:w-[180px]">
              <SelectTrigger>
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Desarrollo">Desarrollo</SelectItem>
                <SelectItem value="Diseño">Diseño</SelectItem>
                <SelectItem value="Administración">Administración</SelectItem>
                <SelectItem value="Calidad">Calidad</SelectItem>
                <SelectItem value="Ventas">Ventas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Lista de Empleados</CardTitle>
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
                        Nombre
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Cargo
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Departamento
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Contacto
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Salario
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-foreground/70 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">{employee.id}</td>
                        <td className="px-4 py-4 truncate max-w-[150px]">{employee.name}</td>
                        <td className="px-4 py-4 truncate max-w-[150px]">{employee.position}</td>
                        <td className="px-4 py-4">{employee.department}</td>
                        <td className="px-4 py-4 truncate max-w-[150px]">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">{employee.email}</span>
                            <span>{employee.phone}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">${employee.salary.toLocaleString()}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              employee.status === "Activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {employee.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditEmployee(employee)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleEmployeeStatus(employee.id)}
                              className={
                                employee.status === "Activo"
                                  ? "text-red-600 hover:text-red-900"
                                  : "text-green-600 hover:text-green-900"
                              }
                            >
                              {employee.status === "Activo" ? (
                                <XCircle className="h-4 w-4" />
                              ) : (
                                <CheckCircle className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteEmployee(employee.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="w-full max-w-md">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl mb-4">Editar Empleado</DialogTitle>
              </DialogHeader>
              {editingEmployee && (
                <form onSubmit={handleUpdateEmployee} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nombre Completo</Label>
                    <Input
                      id="edit-name"
                      value={editingEmployee.name}
                      onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Correo Electrónico</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editingEmployee.email}
                      onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Teléfono</Label>
                    <Input
                      id="edit-phone"
                      value={editingEmployee.phone}
                      onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-position">Cargo</Label>
                    <Input
                      id="edit-position"
                      value={editingEmployee.position}
                      onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-department">Departamento</Label>
                    <Select
                      value={editingEmployee.department}
                      onValueChange={(value) => setEditingEmployee({ ...editingEmployee, department: value })}
                    >
                      <SelectTrigger id="edit-department">
                        <SelectValue placeholder="Seleccionar departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Desarrollo">Desarrollo</SelectItem>
                        <SelectItem value="Diseño">Diseño</SelectItem>
                        <SelectItem value="Administración">Administración</SelectItem>
                        <SelectItem value="Calidad">Calidad</SelectItem>
                        <SelectItem value="Ventas">Ventas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-hireDate">Fecha de Contratación</Label>
                      <Input
                        id="edit-hireDate"
                        type="date"
                        value={editingEmployee.hireDate}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, hireDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-salary">Salario Anual ($)</Label>
                      <Input
                        id="edit-salary"
                        type="number"
                        min="0"
                        step="1000"
                        value={editingEmployee.salary}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, salary: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Actualizar Empleado
                  </Button>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}

export default DashboardEmployees

