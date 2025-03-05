
import PageTransition from "@/components/PageTransition";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Globe, 
  Code, 
  Smartphone, 
  ShoppingCart, 
  Database, 
  Layers, 
  ClipboardList, 
  Calculator,
  Clock,
  Building2
} from "lucide-react";

const Services = () => {
  return (
    <PageTransition>
      <div className="pt-16 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-12 text-center">Nuestros Servicios</h1>
          
          {/* Servicios a la Medida */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 inline-block border-b-2 border-accent pb-2">
              Servicios a la Medida
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Desarrollo Web",
                  description: "Creamos sitios web atractivos, responsivos y optimizados para motores de búsqueda que representan profesionalmente su marca en línea.",
                  icon: Globe
                },
                {
                  title: "Aplicaciones Web",
                  description: "Desarrollamos aplicaciones web personalizadas que automatizan sus procesos empresariales y mejoran la eficiencia operativa.",
                  icon: Code
                },
                {
                  title: "Aplicaciones Móviles",
                  description: "Construimos apps nativas y multiplataforma para iOS y Android que conectan con sus clientes en cualquier momento y lugar.",
                  icon: Smartphone
                },
                {
                  title: "E-commerce",
                  description: "Implementamos tiendas online completas con pasarelas de pago seguras, gestión de inventario y experiencias de compra optimizadas.",
                  icon: ShoppingCart
                },
                {
                  title: "Base de Datos",
                  description: "Diseñamos y optimizamos bases de datos para almacenar, gestionar y recuperar información de manera eficiente y segura.",
                  icon: Database
                },
                {
                  title: "Diseño UX/UI",
                  description: "Creamos interfaces de usuario intuitivas y atractivas que mejoran la experiencia del usuario y aumentan las conversiones.",
                  icon: Layers
                }
              ].map((service, index) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                    </div>
                    <p className="text-foreground/70">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
          
          {/* Servicios Establecidos */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 inline-block border-b-2 border-accent pb-2">
              Servicios Establecidos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Sistema de Inventario",
                  description: "Solución completa para la gestión de inventario, incluyendo seguimiento de productos, alertas de stock, reportes detallados y más.",
                  icon: ClipboardList
                },
                {
                  title: "Sistema de Help-Desk",
                  description: "Plataforma para gestionar incidentes y solicitudes de soporte, con asignación de tickets, SLAs, base de conocimiento y más.",
                  icon: ClipboardList
                }
              ].map((service, index) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                    </div>
                    <p className="text-foreground/70">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
          
          {/* Servicios en Desarrollo */}
          <section>
            <h2 className="text-2xl font-semibold mb-8 inline-block border-b-2 border-accent pb-2">
              Servicios en Desarrollo
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Contabilidad",
                  description: "Sistema de contabilidad completo para la gestión financiera de su empresa. Próximamente disponible.",
                  icon: Calculator
                },
                {
                  title: "Nómina",
                  description: "Solución para la gestión de nóminas, incluyendo cálculo de salarios, impuestos y beneficios. Próximamente disponible.",
                  icon: Clock
                },
                {
                  title: "Hospitales",
                  description: "Sistema de gestión hospitalaria para la administración eficiente de centros médicos. Próximamente disponible.",
                  icon: Building2
                }
              ].map((service, index) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-dashed border-accent/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold">{service.title}</h3>
                      </div>
                      <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">Próximamente</span>
                    </div>
                    <p className="text-foreground/70">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Services;
