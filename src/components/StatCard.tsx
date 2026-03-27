import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: "primary" | "success" | "warning" | "info" | "destructive";
  delay?: number;
}

const colorMap = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  info: "bg-info/10 text-info",
  destructive: "bg-destructive/10 text-destructive",
};

export function StatCard({ title, value, icon: Icon, trend, trendUp, color = "primary", delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
              {trend && (
                <p className={`text-xs font-medium ${trendUp ? "text-success" : "text-destructive"}`}>
                  {trend}
                </p>
              )}
            </div>
            <div className={`p-3 rounded-xl ${colorMap[color]}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
