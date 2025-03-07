import PageTransition from "@/components/PageTransition"
import { CustomCarousel } from "@/components/ui/custom-carousel"
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
  Building2,
} from "lucide-react"

const Services = () => {
  const services = {
    custom: [
      {
        title: "Desarrollo Web",
        description:
          "Creamos sitios web atractivos, responsivos y optimizados para motores de búsqueda que representan profesionalmente su marca en línea.",
        icon: Globe,
        images: ["../../public/UIUX.jpg", "/images/web-dev-2.jpg", "/images/web-dev-3.jpg"],
      },
      {
        title: "Aplicaciones Web",
        description:
          "Desarrollamos aplicaciones web personalizadas que automatizan sus procesos empresariales y mejoran la eficiencia operativa.",
        icon: Code,
        images: ["/images/web-app-1.jpg", "/images/web-app-2.jpg", "/images/web-app-3.jpg"],
      },
      {
        title: "Aplicaciones Móviles",
        description:
          "Construimos apps nativas y multiplataforma para iOS y Android que conectan con sus clientes en cualquier momento y lugar.",
        icon: Smartphone,
        images: ["/images/mobile-app-1.jpg", "/images/mobile-app-2.jpg", "/images/mobile-app-3.jpg"],
      },
      {
        title: "E-commerce",
        description:
          "Implementamos tiendas online completas con pasarelas de pago seguras, gestión de inventario y experiencias de compra optimizadas.",
        icon: ShoppingCart,
        images: ["/images/ecommerce-1.jpg", "/images/ecommerce-2.jpg", "/images/ecommerce-3.jpg"],
      },
      {
        title: "Base de Datos",
        description:
          "Diseñamos y optimizamos bases de datos para almacenar, gestionar y recuperar información de manera eficiente y segura.",
        icon: Database,
        images: ["/images/database-1.jpg", "/images/database-2.jpg", "/images/database-3.jpg"],
      },
      {
        title: "Diseño UX/UI",
        description:
          "Creamos interfaces de usuario intuitivas y atractivas que mejoran la experiencia del usuario y aumentan las conversiones.",
        icon: Layers,
        images: ["../../public/UIUX.jpg", "../../public/5810325.jpg", "../../public/5815773.jpg"],
      },
    ],
    established: [
      {
        title: "Sistema de Inventario",
        description:
          "Solución completa para la gestión de inventario, incluyendo seguimiento de productos, alertas de stock, reportes detallados y más.",
        icon: ClipboardList,
        images: ["/images/inventory-1.jpg", "/images/inventory-2.jpg", "/images/inventory-3.jpg"],
      },
      {
        title: "Sistema de Help-Desk",
        description:
          "Plataforma para gestionar incidentes y solicitudes de soporte, con asignación de tickets, SLAs, base de conocimiento y más.",
        icon: ClipboardList,
        images: ["/images/helpdesk-1.jpg", "/images/helpdesk-2.jpg", "/images/helpdesk-3.jpg"],
      },
    ],
    inDevelopment: [
      {
        title: "Contabilidad",
        description:
          "Sistema de contabilidad completo para la gestión financiera de su empresa. Próximamente disponible.",
        icon: Calculator,
        images: ["/images/accounting-1.jpg", "/images/accounting-2.jpg", "/images/accounting-3.jpg"],
      },
      {
        title: "Nómina",
        description:
          "Solución para la gestión de nóminas, incluyendo cálculo de salarios, impuestos y beneficios. Próximamente disponible.",
        icon: Clock,
        images: ["/images/payroll-1.jpg", "/images/payroll-2.jpg", "/images/payroll-3.jpg"],
      },
      {
        title: "Hospitales",
        description:
          "Sistema de gestión hospitalaria para la administración eficiente de centros médicos. Próximamente disponible.",
        icon: Building2,
        images: ["/images/hospital-1.jpg", "/images/hospital-2.jpg", "/images/hospital-3.jpg"],
      },
    ],
  }

  const ServiceCard = ({ service, isDevelopment = false }) => {
    const Icon = service.icon
    return (
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col ${
          isDevelopment ? "border border-dashed border-accent/50" : ""
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">{service.title}</h3>
          {isDevelopment && (
            <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full ml-auto">Próximamente</span>
          )}
        </div>
        <p className="text-foreground/70 mb-4">{service.description}</p>

        <div className="mt-auto mb-4 flex-grow">
          <CustomCarousel
            images={service.images}
            className="rounded-lg overflow-hidden h-64"
            showControls={true}
            showDots={true}
          />
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="pt-16 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-12 text-center">Nuestros Servicios</h1>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 inline-block border-b-2 border-accent pb-2">
              Servicios a la Medida
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.custom.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 inline-block border-b-2 border-accent pb-2">
              Servicios Establecidos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.established.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-8 inline-block border-b-2 border-accent pb-2">
              Servicios en Desarrollo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.inDevelopment.map((service, index) => (
                <ServiceCard key={index} service={service} isDevelopment={true} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  )
}

export default Services

