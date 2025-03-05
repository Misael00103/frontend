import { useState } from "react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { cn } from "@/lib/utils";

const socialNetworks = [
  "Facebook",
  "Instagram",
  "Twitter",
  "LinkedIn",
  "YouTube",
  "TikTok",
  "Google",
  "Recomendación",
  "Otro"
];

const RequestForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    service: "",
    description: "",
    foundUs: "",
    contactMethod: "whatsapp"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceTypeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      serviceType: e.target.value,
      service: "" // Reset the service when service type changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Enviando formulario:', formData); 

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) {
        throw new Error('VITE_API_URL no está definida en .env');
      }
      const url = `${apiUrl}/api/requests`; 
      console.log('URL de la solicitud:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      console.log('Estado de la respuesta:', response.status); // Depuración

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Datos de error:', errorData); // Depuración
        throw new Error(errorData.message || 'No se pudo enviar la solicitud');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data); // Depuración
      toast.success("Solicitud enviada correctamente", {
        description: "Nos pondremos en contacto con usted a la brevedad."
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        serviceType: "",
        service: "",
        description: "",
        foundUs: "",
        contactMethod: "whatsapp"
      });
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      toast.error("Error al enviar solicitud", {
        description: error.message || "Por favor, intenta nuevamente más tarde."
      });
    } finally {
      setLoading(false);
    }
  };

  const getServiceOptions = () => {
    switch (formData.serviceType) {
      case "custom":
        return [
          "Desarrollo Web",
          "Aplicaciones Web",
          "Aplicaciones Móviles",
          "E-commerce",
          "Base de Datos",
          "Diseño UX/UI"
        ];
      case "established":
        return [
          "Sistema de Inventario",
          "Sistema de Help-Desk"
        ];
      case "development":
        return [
          "Contabilidad",
          "Nómina",
          "Hospitales"
        ];
      default:
        return [];
    }
  };

  return (
    <PageTransition>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 text-center">Solicitar Servicio</h1>
            <p className="text-center text-foreground/70 mb-8">
              Complete el formulario a continuación y nos pondremos en contacto con usted a la brevedad.
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información Personal */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">Información Personal</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium">
                        Nombre Completo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-accent focus:ring-1 focus:ring-accent"
                        placeholder="Ingrese su nombre"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">
                        Correo Electrónico <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-accent focus:ring-1 focus:ring-accent"
                        placeholder="ejemplo@correo.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium">
                        Teléfono <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-accent focus:ring-1 focus:ring-accent"
                        placeholder="Ingrese su teléfono"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-sm font-medium">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-accent focus:ring-1 focus:ring-accent"
                        placeholder="Nombre de su empresa (opcional)"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Detalles del Servicio */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">Detalles del Servicio</h2>
                  
                  <div className="space-y-2">
                    <label htmlFor="serviceType" className="block text-sm font-medium">
                      Tipo de Servicio <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleServiceTypeChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-accent focus:ring-1 focus:ring-accent"
                    >
                      <option value="" disabled>Seleccione un tipo</option>
                      <option value="custom">Servicios a la Medida</option>
                      <option value="established">Servicios Establecidos</option>
                      <option value="development">Servicios en Desarrollo</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="service" className="block text-sm font-medium">
                      Servicio <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      disabled={!formData.serviceType || loading}
                      className={cn(
                        "w-full px-4 py-2 rounded-md border border-input focus:border-accent focus:ring-1 focus:ring-accent",
                        !formData.serviceType && "bg-gray-100 cursor-not-allowed",
                        formData.serviceType && "bg-background"
                      )}
                    >
                      <option value="" disabled>
                        {formData.serviceType ? "Seleccione un servicio" : "Primero seleccione un tipo"}
                      </option>
                      {getServiceOptions().map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium">
                      Descripción del Proyecto <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      rows={4}
                      className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-accent focus:ring-1 focus:ring-accent resize-none"
                      placeholder="Describa brevemente lo que necesita..."
                    ></textarea>
                  </div>
                </div>
                
                {/* Información Adicional */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">Información Adicional</h2>
                  
                  <div className="space-y-2">
                    <label htmlFor="foundUs" className="block text-sm font-medium">
                      ¿Cómo nos encontró? <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="foundUs"
                      name="foundUs"
                      value={formData.foundUs}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-2 rounded-md border border-input bg-background focus:border-accent focus:ring-1 focus:ring-accent"
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      {socialNetworks.map((network, index) => (
                        <option key={index} value={network.toLowerCase()}>
                          {network}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Método de Contacto Preferido <span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="whatsapp"
                          checked={formData.contactMethod === "whatsapp"}
                          onChange={handleChange}
                          disabled={loading}
                          className="w-4 h-4 text-accent"
                        />
                        <span className="ml-2">WhatsApp</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="call"
                          checked={formData.contactMethod === "call"}
                          onChange={handleChange}
                          disabled={loading}
                          className="w-4 h-4 text-accent"
                        />
                        <span className="ml-2">Llamada Telefónica</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "w-full py-3 rounded-lg font-medium transition-all",
                      loading
                        ? "bg-accent/70 cursor-not-allowed"
                        : "bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl"
                    )}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      "Enviar Solicitud"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default RequestForm;