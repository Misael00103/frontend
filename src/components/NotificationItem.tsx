
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  onRead: (id: string) => void;
}

const NotificationItem = ({
  id,
  title,
  message,
  time,
  read,
  onRead
}: NotificationItemProps) => {
  const [isRead, setIsRead] = useState(read);
  
  const handleMarkAsRead = () => {
    setIsRead(true);
    onRead(id);
  };
  
  return (
    <div
      className={cn(
        "border-b border-border last:border-0 px-4 py-3 transition-colors",
        !isRead && "bg-accent/5"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-xs text-foreground/70 mt-1 line-clamp-2">{message}</p>
          <p className="text-xs text-foreground/50 mt-2">{time}</p>
        </div>
        
        {!isRead && (
          <button
            onClick={handleMarkAsRead}
            className="text-accent text-xs hover:text-accent/80 mt-1"
          >
            Marcar como leído
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
