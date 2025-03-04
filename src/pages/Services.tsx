
import PageTransition from "@/components/PageTransition";

const Services = () => {
  return (
    <PageTransition>
      <div className="pt-24 pb-16">
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
                  description: "Creamos sitios web atractivos, responsivos y optimizados para motores de búsqueda que representan profesionalmente su marca en línea."
                },
                {
                  title: "Aplicaciones Web",
                  description: "Desarrollamos aplicaciones web personalizadas que automatizan sus procesos empresariales y mejoran la eficiencia operativa."
                },
                {
                  title: "Aplicaciones Móviles",
                  description: "Construimos apps nativas y multiplataforma para iOS y Android que conectan con sus clientes en cualquier momento y lugar."
                },
                {
                  title: "E-commerce",
                  description: "Implementamos tiendas online completas con pasarelas de pago seguras, gestión de inventario y experiencias de compra optimizadas."
                },
                {
                  title: "Base de Datos",
                  description: "Diseñamos y optimizamos bases de datos para almacenar, gestionar y recuperar información de manera eficiente y segura."
                },
                {
                  title: "Diseño UX/UI",
                  description: "Creamos interfaces de usuario intuitivas y atractivas que mejoran la experiencia del usuario y aumentan las conversiones."
                }
              ].map((service, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-foreground/70">{service.description}</p>
                </div>
              ))}
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
                  description: "Solución completa para la gestión de inventario, incluyendo seguimiento de productos, alertas de stock, reportes detallados y más."
                },
                {
                  title: "Sistema de Help-Desk",
                  description: "Plataforma para gestionar incidentes y solicitudes de soporte, con asignación de tickets, SLAs, base de conocimiento y más."
                }
              ].map((service, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-foreground/70">{service.description}</p>
                </div>
              ))}
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
                  description: "Sistema de contabilidad completo para la gestión financiera de su empresa. Próximamente disponible."
                },
                {
                  title: "Nómina",
                  description: "Solución para la gestión de nóminas, incluyendo cálculo de salarios, impuestos y beneficios. Próximamente disponible."
                },
                {
                  title: "Hospitales",
                  description: "Sistema de gestión hospitalaria para la administración eficiente de centros médicos. Próximamente disponible."
                }
              ].map((service, index) => (
                <div 
                  key={index}
                  className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-dashed border-accent/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full">Próximamente</span>
                  </div>
                  <p className="text-foreground/70">{service.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Services;
