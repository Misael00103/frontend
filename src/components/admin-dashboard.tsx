"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardNavbar from "@/components/DashboardNavbar";


import {
  BarChart3,
  Users,
  DollarSign,
  ClipboardList,
  UserCog,
} from "lucide-react";
import DashboardEmployees from "./Dashboard-Employees";
import DashboardFinance from "./Dashboard-finance";
import DashboardSolicitudes from "@/pages/DashboardSolicitudes";
import DashboardClientes from "@/pages/DashboardClientes";
import Dashboard from "@/pages/admin/Dashboard";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <main className="py-4 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 w-full">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">General</span>
              </TabsTrigger>
              <TabsTrigger value="clients" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Clientes</span>
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                <span className="hidden sm:inline">Solicitudes</span>
              </TabsTrigger>
              <TabsTrigger value="finance" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Finanzas</span>
              </TabsTrigger>
              <TabsTrigger
                value="employees"
                className="flex items-center gap-2"
              >
                <UserCog className="h-4 w-4" />
                <span className="hidden sm:inline">Empleados</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Dashboard />
            </TabsContent>

            <TabsContent value="clients" className="mt-6">
              <DashboardClientes />
            </TabsContent>

            <TabsContent value="requests" className="mt-6">
              <DashboardSolicitudes />
            </TabsContent>

            <TabsContent value="finance" className="mt-6">
              <DashboardFinance />
            </TabsContent>

            <TabsContent value="employees" className="mt-6">
              <DashboardEmployees />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
