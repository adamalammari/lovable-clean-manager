import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Search, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const bookings = [
  { id: "BK-001", client: "أحمد محمد", phone: "0501234567", service: "تنظيف شامل", date: "2026-03-28", time: "09:00", status: "pending" as const, notes: "شقة 3 غرف" },
  { id: "BK-002", client: "ريم العنزي", phone: "0512345678", service: "تنظيف مكاتب", date: "2026-03-28", time: "11:00", status: "pending" as const, notes: "طابقين" },
  { id: "BK-003", client: "عبدالرحمن الشهري", phone: "0545556677", service: "تنظيف خزانات", date: "2026-03-29", time: "08:00", status: "pending" as const, notes: "خزان 10,000 لتر" },
  { id: "BK-004", client: "هدى المطيري", phone: "0556667788", service: "تنظيف سجاد", date: "2026-03-29", time: "14:00", status: "completed" as const, notes: "5 سجاد كبير" },
  { id: "BK-005", client: "سلطان الغامدي", phone: "0567778899", service: "تنظيف واجهات", date: "2026-03-30", time: "07:00", status: "cancelled" as const, notes: "فيلا دورين" },
];

export default function Bookings() {
  const [search, setSearch] = useState("");
  const filtered = bookings.filter(
    (b) => b.client.includes(search) || b.id.includes(search) || b.service.includes(search)
  );

  return (
    <div className="space-y-6">
      <PageHeader title="الحجوزات" description="إدارة حجوزات العملاء القادمة">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          حجز جديد
        </Button>
      </PageHeader>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-10" />
              </div>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">رقم الحجز</TableHead>
                    <TableHead className="text-right">العميل</TableHead>
                    <TableHead className="text-right">الخدمة</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">ملاحظات</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((b) => (
                    <TableRow key={b.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-sm">{b.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{b.client}</p>
                          <p className="text-xs text-muted-foreground">{b.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{b.service}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {b.date} - {b.time}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{b.notes}</TableCell>
                      <TableCell><StatusBadge status={b.status} /></TableCell>
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
