import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Search, Calendar, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface Booking {
  id: string; client: string; phone: string; service: string; date: string; time: string;
  status: "pending" | "in_progress" | "completed" | "cancelled"; notes: string;
}

const initialBookings: Booking[] = [
  { id: "BK-001", client: "أحمد محمد", phone: "0501234567", service: "تنظيف شامل", date: "2026-03-28", time: "09:00", status: "pending", notes: "شقة 3 غرف" },
  { id: "BK-002", client: "ريم العنزي", phone: "0512345678", service: "تنظيف مكاتب", date: "2026-03-28", time: "11:00", status: "pending", notes: "طابقين" },
  { id: "BK-003", client: "عبدالرحمن الشهري", phone: "0545556677", service: "تنظيف خزانات", date: "2026-03-29", time: "08:00", status: "pending", notes: "خزان 10,000 لتر" },
  { id: "BK-004", client: "هدى المطيري", phone: "0556667788", service: "تنظيف سجاد", date: "2026-03-29", time: "14:00", status: "completed", notes: "5 سجاد كبير" },
  { id: "BK-005", client: "سلطان الغامدي", phone: "0567778899", service: "تنظيف واجهات", date: "2026-03-30", time: "07:00", status: "cancelled", notes: "فيلا دورين" },
];

const services = ["تنظيف شامل", "تنظيف مكاتب", "تنظيف سجاد", "تنظيف واجهات", "تنظيف خزانات", "تنظيف مسابح"];
const emptyForm = { client: "", phone: "", service: "", date: "", time: "", notes: "", status: "pending" as Booking["status"] };

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = bookings.filter(b => b.client.includes(search) || b.id.includes(search) || b.service.includes(search));

  const handleOpen = (booking?: Booking) => {
    if (booking) {
      setEditId(booking.id);
      setForm({ client: booking.client, phone: booking.phone, service: booking.service, date: booking.date, time: booking.time, notes: booking.notes, status: booking.status });
    } else {
      setEditId(null);
      setForm(emptyForm);
    }
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.client || !form.phone || !form.service || !form.date) {
      toast({ title: "خطأ", description: "يرجى تعبئة جميع الحقول المطلوبة", variant: "destructive" });
      return;
    }
    if (editId) {
      setBookings(bookings.map(b => b.id === editId ? { ...b, ...form } : b));
      toast({ title: "تم التحديث", description: "تم تعديل الحجز بنجاح" });
    } else {
      const newBooking: Booking = { id: `BK-${String(bookings.length + 1).padStart(3, "0")}`, ...form };
      setBookings([newBooking, ...bookings]);
      toast({ title: "تمت الإضافة", description: "تم إضافة الحجز بنجاح" });
    }
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
    toast({ title: "تم الحذف", description: "تم حذف الحجز" });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="الحجوزات" description="إدارة حجوزات العملاء القادمة">
        <Button className="gap-2" onClick={() => handleOpen()}>
          <Plus className="h-4 w-4" />
          حجز جديد
        </Button>
      </PageHeader>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? "تعديل الحجز" : "حجز جديد"}</DialogTitle>
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
              <Label>التاريخ *</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>الوقت</Label>
              <Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
            {editId && (
              <div className="space-y-2">
                <Label>الحالة</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as Booking["status"] })}>
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
            <div className="space-y-2 col-span-2">
              <Label>ملاحظات</Label>
              <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
            <Button onClick={handleSave}>{editId ? "حفظ التعديلات" : "إضافة الحجز"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((b) => (
                    <TableRow key={b.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-sm">{b.id}</TableCell>
                      <TableCell>
                        <p className="font-medium text-sm">{b.client}</p>
                        <p className="text-xs text-muted-foreground">{b.phone}</p>
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
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpen(b)}>
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(b.id)}>
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
