import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "online" | "offline" | "checking";
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        {
          "bg-success/10 text-success animate-status-pulse": status === "online",
          "bg-error/10 text-error": status === "offline",
          "bg-primary/10 text-primary animate-status-pulse": status === "checking",
        },
        className
      )}
    >
      <div
        className={cn("w-2 h-2 rounded-full mr-2", {
          "bg-success": status === "online",
          "bg-error": status === "offline",
          "bg-primary": status === "checking",
        })}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};