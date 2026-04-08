import { useState } from "react";
import { useNotifications } from "@/contexts/NotificationsContext";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Search, Trash2, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface Order {
  id: string; client: string; phone: string; service: string; date: string; time: string;
  status: "pending" | "in_progress" | "completed" | "cancelled" | "returned"; amount: number; worker: string;
}

const initialOrders: Order[] = [
  { id: "ORD-001", client: "أحمد محمد", phone: "0501234567", service: "تنظيف منزل كامل", date: "2026-03-27", time: "09:00", status: "completed", amount: 450, worker: "محمد علي" },
  { id: "ORD-002", client: "سارة العلي", phone: "0559876543", service: "تنظيف مكاتب", date: "2026-03-27", time: "10:30", status: "in_progress", amount: 800, worker: "عبدالله خالد" },
  { id: "ORD-003", client: "خالد الحربي", phone: "0541112233", service: "تنظيف سجاد", date: "2026-03-26", time: "14:00", status: "pending", amount: 200, worker: "يوسف أحمد" },
  { id: "ORD-004", client: "نورة السالم", phone: "0567778899", service: "تنظيف واجهات", date: "2026-03-26", time: "08:00", status: "cancelled", amount: 1200, worker: "فيصل سعد" },
  { id: "ORD-005", client: "فهد العتيبي", phone: "0523334455", service: "تنظيف خزانات", date: "2026-03-25", time: "11:00", status: "completed", amount: 350, worker: "محمد علي" },
];

const services = ["تنظيف منزل كامل", "تنظيف مكاتب", "تنظيف سجاد", "تنظيف واجهات", "تنظيف خزانات", "تنظيف مسابح"];
const workers = ["محمد علي", "عبدالله خالد", "يوسف أحمد", "فيصل سعد"];

const emptyForm = { client: "", phone: "", service: "", date: "", time: "", amount: "", worker: "", status: "pending" as Order["status"] };

export default function Orders() {
  const { addNotification } = useNotifications();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = orders.filter(
    (o) => o.client.includes(search) || o.id.includes(search) || o.service.includes(search)
  );

  const handleOpen = (order?: Order) => {
    if (order) {
      setEditId(order.id);
      setForm({ client: order.client, phone: order.phone, service: order.service, date: order.date, time: order.time, amount: String(order.amount), worker: order.worker, status: order.status });
    } else {
      setEditId(null);
      setForm(emptyForm);
    }
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.client || !form.phone || !form.service || !form.date || !form.amount) {
      toast({ title: "خطأ", description: "يرجى تعبئة جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }
    if (editId) {
      setOrders(orders.map(o => o.id === editId ? { ...o, ...form, amount: Number(form.amount) } : o));
      toast({ title: "تم التحديث", description: "تم تعديل الطلب بنجاح" });
    } else {
      const newOrder: Order = { id: `ORD-${String(orders.length + 1).padStart(3, "0")}`, ...form, amount: Number(form.amount) };
      setOrders([newOrder, ...orders]);
      toast({ title: "تمت الإضافة", description: "تم إضافة الطلب بنجاح" });
    }
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
    toast({ title: "تم الحذف", description: "تم حذف الطلب" });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="إدارة الطلبات" description="عرض وإدارة جميع طلبات التنظيف">
        <Button className="gap-2" onClick={() => handleOpen()}>
          <Plus className="h-4 w-4" />
          طلب جديد
        </Button>
      </PageHeader>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? "تعديل الطلب" : "طلب جديد"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>اسم العميل *</Label>
              <Input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>رقم الهاتف *</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>الخدمة *</Label>
              <Select value={form.service} onValueChange={(v) => setForm({ ...form, service: v })}>
                <SelectTrigger><SelectValue placeholder="اختر الخدمة" /></SelectTrigger>
                <SelectContent>{services.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>العامل</Label>
              <Select value={form.worker} onValueChange={(v) => setForm({ ...form, worker: v })}>
                <SelectTrigger><SelectValue placeholder="اختر العامل" /></SelectTrigger>
                <SelectContent>{workers.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>التاريخ *</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>الوقت</Label>
              <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>المبلغ (ر.س) *</Label>
              <Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </div>
            {editId && (
              <div className="space-y-2">
                <Label>الحالة</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as Order["status"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">قيد الانتظار</SelectItem>
                    <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                    <SelectItem value="completed">مكتمل</SelectItem>
                    <SelectItem value="cancelled">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
            <Button onClick={handleSave}>{editId ? "حفظ التعديلات" : "إضافة الطلب"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث بالاسم أو رقم الطلب..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-10" />
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
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-sm">{order.id}</TableCell>
                      <TableCell>
                        <p className="font-medium text-sm">{order.client}</p>
                        <p className="text-xs text-muted-foreground">{order.phone}</p>
                      </TableCell>
                      <TableCell className="text-sm">{order.service}</TableCell>
                      <TableCell className="text-sm">{order.worker}</TableCell>
                      <TableCell className="text-sm">{order.date} - {order.time}</TableCell>
                      <TableCell className="font-semibold text-sm">{order.amount} ر.س</TableCell>
                      <TableCell><StatusBadge status={order.status} /></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpen(order)}>
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(order.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
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
