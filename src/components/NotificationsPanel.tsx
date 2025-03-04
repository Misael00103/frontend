
import { useState, useEffect } from "react";
import NotificationItem from "./NotificationItem";

// Simular notificaciones
const mockNotifications = [
  {
    id: "1",
    title: "Nueva Solicitud",
    message: "Juan Pérez ha enviado una solicitud para Desarrollo Web.",
    time: "Hace 5 minutos",
    read: false
  },
  {
    id: "2",
    title: "Nueva Solicitud",
    message: "María García ha enviado una solicitud para Sistema de Inventario.",
    time: "Hace 30 minutos",
    read: false
  },
  {
    id: "3",
    title: "Actualización de Perfil",
    message: "Se han actualizado los datos de la empresa.",
    time: "Hace 2 horas",
    read: true
  },
  {
    id: "4",
    title: "Nuevo Cliente",
    message: "Se ha agregado un nuevo cliente: Empresa XYZ.",
    time: "Ayer",
    read: true
  }
];

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(0);
  
  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Notificaciones</h3>
          <p className="text-xs text-foreground/60 mt-1">
            {unreadCount === 0 ? 'No tienes notificaciones sin leer' : `Tienes ${unreadCount} notificaciones sin leer`}
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-xs text-accent hover:text-accent/80"
          >
            Marcar todas como leídas
          </button>
        )}
      </div>
      
      <div className="divide-y divide-border max-h-96 overflow-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-foreground/60">
            No hay notificaciones
          </div>
        ) : (
          notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              id={notification.id}
              title={notification.title}
              message={notification.message}
              time={notification.time}
              read={notification.read}
              onRead={handleMarkAsRead}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;
