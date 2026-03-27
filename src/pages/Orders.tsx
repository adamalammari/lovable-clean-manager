import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { motion } from "framer-motion";

const orders = [
  { id: "ORD-001", client: "أحمد محمد", phone: "0501234567", service: "تنظيف منزل كامل", date: "2026-03-27", time: "09:00", status: "completed" as const, amount: 450, worker: "محمد علي" },
  { id: "ORD-002", client: "سارة العلي", phone: "0559876543", service: "تنظيف مكاتب", date: "2026-03-27", time: "10:30", status: "in_progress" as const, amount: 800, worker: "عبدالله خالد" },
  { id: "ORD-003", client: "خالد الحربي", phone: "0541112233", service: "تنظيف سجاد", date: "2026-03-26", time: "14:00", status: "pending" as const, amount: 200, worker: "يوسف أحمد" },
  { id: "ORD-004", client: "نورة السالم", phone: "0567778899", service: "تنظيف واجهات", date: "2026-03-26", time: "08:00", status: "cancelled" as const, amount: 1200, worker: "فيصل سعد" },
  { id: "ORD-005", client: "فهد العتيبي", phone: "0523334455", service: "تنظيف خزانات", date: "2026-03-25", time: "11:00", status: "completed" as const, amount: 350, worker: "محمد علي" },
  { id: "ORD-006", client: "منى الشمري", phone: "0534445566", service: "تنظيف مسابح", date: "2026-03-25", time: "13:00", status: "returned" as const, amount: 600, worker: "عبدالله خالد" },
];

export default function Orders() {
  const [search, setSearch] = useState("");
  const filtered = orders.filter(
    (o) => o.client.includes(search) || o.id.includes(search) || o.service.includes(search)
  );

  return (
    <div className="space-y-6">
      <PageHeader title="إدارة الطلبات" description="عرض وإدارة جميع طلبات التنظيف">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          طلب جديد
        </Button>
      </PageHeader>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="بحث بالاسم أو رقم الطلب..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">رقم الطلب</TableHead>
                    <TableHead className="text-right">العميل</TableHead>
                    <TableHead className="text-right">الخدمة</TableHead>
                    <TableHead className="text-right">العامل</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/30 cursor-pointer transition-colors">
                      <TableCell className="font-mono text-sm">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{order.client}</p>
                          <p className="text-xs text-muted-foreground">{order.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{order.service}</TableCell>
                      <TableCell className="text-sm">{order.worker}</TableCell>
                      <TableCell className="text-sm">{order.date} - {order.time}</TableCell>
                      <TableCell className="font-semibold text-sm">{order.amount} ر.س</TableCell>
                      <TableCell><StatusBadge status={order.status} /></TableCell>
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
