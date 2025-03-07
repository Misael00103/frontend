import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle, MessageSquare, Phone } from 'lucide-react'
import { CustomCarousel } from "@/components/ui/custom-carousel"

const ServiceCard = ({ title, description, category }: { title: string; description: string; category: string }) => {
  // Imágenes para el carrusel dentro de cada tarjeta
  const cardImages = [
    "/placeholder.svg?height=200&width=400",
    "/placeholder.svg?height=200&width=400",
    "/placeholder.svg?height=200&width=400"
  ];

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader>
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{category}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Carrusel dentro de cada tarjeta */}
        <CustomCarousel 
          images={cardImages} 
          className="rounded-lg overflow-hidden h-40 mb-4"
          showControls={true}
          showDots={true}
        />
      </CardContent>
      <CardFooter className="pt-4">
        <Link to="/request-form" className="w-full">
          <Button variant="outline" className="w-full group">
            Solicitar servicio
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const Index = () => {
  const customServices = [
    {
      title: "Desarrollo Web",
      description: "Sitios web personalizados con diseño responsive",
      category: "A la medida",
    },
    { title: "Aplicaciones Web", description: "Aplicaciones web progresivas y escalables", category: "A la medida" },
    { title: "Aplicaciones Móviles", description: "Apps nativas para iOS y Android", category: "A la medida" },
    {
      title: "E-commerce",
      description: "Tiendas en línea personalizadas con pasarelas de pago",
      category: "A la medida",
    },
    {
      title: "Base de Datos",
      description: "Diseño e implementación de bases de datos optimizadas",
      category: "A la medida",
    },
    {
      title: "Diseño UX/UI",
      description: "Interfaces de usuario intuitivas y experiencias memorables",
      category: "A la medida",
    },
  ]

  const establishedServices = [
    {
      title: "Sistema de Inventario",
      description: "Gestión eficiente de inventario para cualquier negocio",
      category: "Establecido",
    },
    {
      title: "Sistema de Help-Desk",
      description: "Plataforma de soporte al cliente y gestión de tickets",
      category: "Establecido",
    },
  ]

  const inDevelopmentServices = [
    {
      title: "Contabilidad",
      description: "Sistema de contabilidad para empresas (próximamente)",
      category: "En desarrollo",
    },
    { title: "Nómina", description: "Gestión de nóminas y recursos humanos (próximamente)", category: "En desarrollo" },
    {
      title: "Hospitales",
      description: "Software para gestión hospitalaria (próximamente)",
      category: "En desarrollo",
    },
  ]

  // Imágenes para el carrusel
  const carouselImages = [
    "/placeholder.svg?height=400&width=800",
    "/placeholder.svg?height=400&width=800",
    "/placeholder.svg?height=400&width=800",
    "/placeholder.svg?height=400&width=800",
    "/placeholder.svg?height=400&width=800",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/90 to-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
            Soluciones Tecnológicas Para Su Empresa
          </h1>
          <p
            className="text-xl md:text-2xl mb-10 text-primary-foreground/80 max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            Ofrecemos servicios de desarrollo a medida y soluciones establecidas para potenciar su negocio.
          </p>


          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            <Link to="/request-form">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Solicitar servicio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20"
              >
                Ver servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service categories section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Servicios a la Medida</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {customServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Servicios Establecidos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {establishedServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Servicios en Desarrollo</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {inDevelopmentServices.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact methods section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">¿Cómo Prefiere que lo Contactemos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className="text-center hover:shadow-md transition-all">
              <CardHeader>
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Llamada Telefónica</CardTitle>
                <CardDescription>Hable directamente con nuestro equipo</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Atención personalizada</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Respuesta inmediata</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/request-form" className="w-full">
                  <Button variant="outline" className="w-full">
                    Prefiero llamada
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="text-center hover:shadow-md transition-all">
              <CardHeader>
                <div className="mx-auto bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>WhatsApp</CardTitle>
                <CardDescription>Comuníquese por mensajería instantánea</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Flexible y conveniente</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Comparta archivos fácilmente</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to="/request-form" className="w-full">
                  <Button variant="outline" className="w-full">
                    Prefiero WhatsApp
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para Transformar su Negocio?</h2>
          <p className="text-xl mb-8 text-accent-foreground/80 max-w-2xl mx-auto">
            Complete nuestro formulario de solicitud y en breve un asesor se pondrá en contacto con usted para discutir
            su proyecto.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/request-form">
              <Button size="lg" className="bg-accent-foreground text-accent hover:bg-accent-foreground/90">
                Solicitar información
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Index
