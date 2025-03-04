import { useState, useEffect } from "react";
import NotificationItem from "./NotificationItem";

const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/notifications');
        if (!response.ok) throw new Error('Error fetching notifications');
        const data = await response.json();
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.read).length);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Error marking as read');
      const updatedNotification = await response.json();
      setNotifications(prev => 
        prev.map(n => n._id === id ? updatedNotification : n)
      );
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notifications/read-all', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Error marking all as read');
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
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
              key={notification._id}
              id={notification._id}
              title={notification.title}
              message={notification.description}
              time={new Date(notification.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
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