
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className
}: StatCardProps) => {
  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-foreground/70">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  "text-xs font-medium flex items-center",
                  trend.positive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.positive ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-foreground/50 ml-1">vs. mes anterior</span>
            </div>
          )}
          
          {description && (
            <p className="text-xs text-foreground/50 mt-2">{description}</p>
          )}
        </div>
        
        <div className="bg-accent/10 p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
