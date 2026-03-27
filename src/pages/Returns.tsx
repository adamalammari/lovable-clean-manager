import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const returns = [
  { id: "RET-001", orderId: "ORD-006", client: "منى الشمري", service: "تنظيف مسابح", date: "2026-03-25", reason: "جودة غير مرضية", amount: 600, action: "إعادة الخدمة" },
  { id: "RET-002", orderId: "ORD-015", client: "سلمان الزهراني", service: "تنظيف سجاد", date: "2026-03-23", reason: "بقع لم تُزال", amount: 200, action: "استرداد جزئي" },
  { id: "RET-003", orderId: "ORD-022", client: "مريم الحمود", service: "تنظيف منزل", date: "2026-03-21", reason: "عدم اكتمال العمل", amount: 450, action: "إعادة الخدمة" },
  { id: "RET-004", orderId: "ORD-028", client: "تركي الشريف", service: "تنظيف واجهات", date: "2026-03-19", reason: "تلف في الممتلكات", amount: 1200, action: "تعويض كامل" },
];

const actionColors: Record<string, string> = {
  "إعادة الخدمة": "bg-info/15 text-info border-info/30",
  "استرداد جزئي": "bg-warning/15 text-warning border-warning/30",
  "تعويض كامل": "bg-destructive/15 text-destructive border-destructive/30",
};

export default function Returns() {
  return (
    <div className="space-y-6">
      <PageHeader title="المرتجعات" description="إدارة طلبات الإرجاع والتعويضات" />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">رقم المرتجع</TableHead>
                    <TableHead className="text-right">رقم الطلب</TableHead>
                    <TableHead className="text-right">العميل</TableHead>
                    <TableHead className="text-right">الخدمة</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">السبب</TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">الإجراء</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {returns.map((r) => (
                    <TableRow key={r.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-sm">{r.id}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">{r.orderId}</TableCell>
                      <TableCell className="text-sm font-medium">{r.client}</TableCell>
                      <TableCell className="text-sm">{r.service}</TableCell>
                      <TableCell className="text-sm">{r.date}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.reason}</TableCell>
                      <TableCell className="text-sm font-semibold">{r.amount} ر.س</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${actionColors[r.action] || ""}`}>
                          {r.action}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
