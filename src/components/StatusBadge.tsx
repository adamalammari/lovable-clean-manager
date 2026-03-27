import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "pending" | "in_progress" | "completed" | "cancelled" | "returned";

const statusConfig: Record<Status, { label: string; className: string }> = {
  pending: { label: "قيد الانتظار", className: "bg-warning/15 text-warning border-warning/30" },
  in_progress: { label: "قيد التنفيذ", className: "bg-info/15 text-info border-info/30" },
  completed: { label: "مكتمل", className: "bg-success/15 text-success border-success/30" },
  cancelled: { label: "ملغي", className: "bg-destructive/15 text-destructive border-destructive/30" },
  returned: { label: "مرتجع", className: "bg-muted text-muted-foreground border-muted" },
};

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", config.className)}>
      {config.label}
    </Badge>
  );
}
