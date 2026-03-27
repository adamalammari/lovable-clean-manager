import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const cancellations = [
  { id: "CAN-001", orderId: "ORD-004", client: "نورة السالم", service: "تنظيف واجهات", date: "2026-03-26", reason: "تغيير الموعد", refund: 1200, refundStatus: "تم الإرجاع" },
  { id: "CAN-002", orderId: "ORD-012", client: "ماجد البلوي", service: "تنظيف منزل", date: "2026-03-24", reason: "عدم توفر العمال", refund: 450, refundStatus: "قيد المعالجة" },
  { id: "CAN-003", orderId: "ORD-018", client: "هند القحطاني", service: "تنظيف مكاتب", date: "2026-03-22", reason: "إلغاء من العميل", refund: 800, refundStatus: "تم الإرجاع" },
  { id: "CAN-004", orderId: "ORD-025", client: "عمر الدوسري", service: "تنظيف سجاد", date: "2026-03-20", reason: "ظروف طارئة", refund: 200, refundStatus: "قيد المعالجة" },
  { id: "CAN-005", orderId: "ORD-031", client: "لطيفة الرشيد", service: "تنظيف خزانات", date: "2026-03-18", reason: "تأخر الوصول", refund: 350, refundStatus: "تم الإرجاع" },
];

export default function Cancellations() {
  return (
    <div className="space-y-6">
      <PageHeader title="الإلغاءات" description="سجل جميع الطلبات الملغاة وحالة الاسترداد" />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">رقم الإلغاء</TableHead>
                    <TableHead className="text-right">رقم الطلب</TableHead>
                    <TableHead className="text-right">العميل</TableHead>
                    <TableHead className="text-right">الخدمة</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">السبب</TableHead>
                    <TableHead className="text-right">الاسترداد</TableHead>
                    <TableHead className="text-right">حالة الاسترداد</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cancellations.map((c) => (
                    <TableRow key={c.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-sm">{c.id}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">{c.orderId}</TableCell>
                      <TableCell className="text-sm font-medium">{c.client}</TableCell>
                      <TableCell className="text-sm">{c.service}</TableCell>
                      <TableCell className="text-sm">{c.date}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.reason}</TableCell>
                      <TableCell className="text-sm font-semibold">{c.refund} ر.س</TableCell>
                      <TableCell>
                        <Badge variant={c.refundStatus === "تم الإرجاع" ? "default" : "secondary"} className="text-xs">
                          {c.refundStatus}
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
