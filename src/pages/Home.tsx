
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";

const Home = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/10 z-0" />
          <div className="absolute inset-0 bg-[url('/lovable-uploads/20ccc661-15ad-4a9b-89e9-e270b866cda7.png')] bg-cover bg-center opacity-20 z-0" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl animate-fade-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Soluciones Tecnológicas para su Negocio
              </h1>
              <p className="text-xl mb-8 text-foreground/80">
                Desarrollamos aplicaciones personalizadas que impulsan su crecimiento y mejoran su eficiencia operativa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/solicitud" 
                  className="px-8 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
                >
                  Solicitar Servicio
                </Link>
                <Link 
                  to="/servicios" 
                  className="px-8 py-3 rounded-lg border border-primary bg-transparent text-primary font-medium hover:bg-primary/5 transition-all"
                >
                  Ver Servicios
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nuestros Servicios</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Ofrecemos una amplia gama de servicios tecnológicos para satisfacer las necesidades específicas de su empresa.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Desarrollo Web",
                  description: "Sitios web modernos y responsivos para su presencia digital."
                },
                {
                  title: "Aplicaciones Web",
                  description: "Soluciones web personalizadas para optimizar sus procesos de negocio."
                },
                {
                  title: "Aplicaciones Móviles",
                  description: "Apps nativas y multiplataforma para iOS y Android."
                },
                {
                  title: "E-commerce",
                  description: "Tiendas online robustas y seguras para vender sus productos."
                },
                {
                  title: "Base de Datos",
                  description: "Diseño y optimización de bases de datos para el manejo eficiente de información."
                },
                {
                  title: "Diseño UX/UI",
                  description: "Interfaces intuitivas y atractivas centradas en la experiencia del usuario."
                }
              ].map((service, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:translate-y-[-5px]"
                >
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-foreground/70">{service.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/servicios" 
                className="text-accent hover:text-accent/80 font-medium"
              >
                Ver todos los servicios →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
