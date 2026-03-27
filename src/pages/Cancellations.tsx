import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface Cancellation {
  id: string; orderId: string; client: string; service: string; date: string; reason: string; refund: number; refundStatus: string;
}

const initialData: Cancellation[] = [
  { id: "CAN-001", orderId: "ORD-004", client: "نورة السالم", service: "تنظيف واجهات", date: "2026-03-26", reason: "تغيير الموعد", refund: 1200, refundStatus: "تم الإرجاع" },
  { id: "CAN-002", orderId: "ORD-012", client: "ماجد البلوي", service: "تنظيف منزل", date: "2026-03-24", reason: "عدم توفر العمال", refund: 450, refundStatus: "قيد المعالجة" },
  { id: "CAN-003", orderId: "ORD-018", client: "هند القحطاني", service: "تنظيف مكاتب", date: "2026-03-22", reason: "إلغاء من العميل", refund: 800, refundStatus: "تم الإرجاع" },
  { id: "CAN-004", orderId: "ORD-025", client: "عمر الدوسري", service: "تنظيف سجاد", date: "2026-03-20", reason: "ظروف طارئة", refund: 200, refundStatus: "قيد المعالجة" },
  { id: "CAN-005", orderId: "ORD-031", client: "لطيفة الرشيد", service: "تنظيف خزانات", date: "2026-03-18", reason: "تأخر الوصول", refund: 350, refundStatus: "تم الإرجاع" },
];

const reasons = ["تغيير الموعد", "عدم توفر العمال", "إلغاء من العميل", "ظروف طارئة", "تأخر الوصول", "أخرى"];
const emptyForm = { orderId: "", client: "", service: "", date: "", reason: "", refund: "", refundStatus: "قيد المعالجة" };

export default function Cancellations() {
  const [items, setItems] = useState<Cancellation[]>(initialData);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const handleOpen = (item?: Cancellation) => {
    if (item) {
      setEditId(item.id);
      setForm({ orderId: item.orderId, client: item.client, service: item.service, date: item.date, reason: item.reason, refund: String(item.refund), refundStatus: item.refundStatus });
    } else {
      setEditId(null);
      setForm(emptyForm);
    }
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.client || !form.orderId || !form.reason) {
      toast({ title: "خطأ", description: "يرجى تعبئة الحقول المطلوبة", variant: "destructive" });
      return;
    }
    if (editId) {
      setItems(items.map(i => i.id === editId ? { ...i, ...form, refund: Number(form.refund) } : i));
      toast({ title: "تم التحديث" });
    } else {
      setItems([{ id: `CAN-${String(items.length + 1).padStart(3, "0")}`, ...form, refund: Number(form.refund) }, ...items]);
      toast({ title: "تمت الإضافة", description: "تم تسجيل الإلغاء بنجاح" });
    }
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(i => i.id !== id));
    toast({ title: "تم الحذف" });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="الإلغاءات" description="سجل جميع الطلبات الملغاة وحالة الاسترداد">
        <Button className="gap-2" onClick={() => handleOpen()}>
          <Plus className="h-4 w-4" />
          تسجيل إلغاء
        </Button>
      </PageHeader>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>{editId ? "تعديل الإلغاء" : "تسجيل إلغاء جديد"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>رقم الطلب *</Label><Input value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })} /></div>
            <div className="space-y-2"><Label>اسم العميل *</Label><Input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} /></div>
            <div className="space-y-2"><Label>الخدمة</Label><Input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} /></div>
            <div className="space-y-2"><Label>التاريخ</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
            <div className="space-y-2">
              <Label>السبب *</Label>
              <Select value={form.reason} onValueChange={(v) => setForm({ ...form, reason: v })}>
                <SelectTrigger><SelectValue placeholder="اختر السبب" /></SelectTrigger>
                <SelectContent>{reasons.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>مبلغ الاسترداد</Label><Input type="number" value={form.refund} onChange={(e) => setForm({ ...form, refund: e.target.value })} /></div>
            <div className="space-y-2">
              <Label>حالة الاسترداد</Label>
              <Select value={form.refundStatus} onValueChange={(v) => setForm({ ...form, refundStatus: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="قيد المعالجة">قيد المعالجة</SelectItem>
                  <SelectItem value="تم الإرجاع">تم الإرجاع</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
            <Button onClick={handleSave}>{editId ? "حفظ" : "تسجيل"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((c) => (
                    <TableRow key={c.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-sm">{c.id}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">{c.orderId}</TableCell>
                      <TableCell className="text-sm font-medium">{c.client}</TableCell>
                      <TableCell className="text-sm">{c.service}</TableCell>
                      <TableCell className="text-sm">{c.date}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.reason}</TableCell>
                      <TableCell className="text-sm font-semibold">{c.refund} ر.س</TableCell>
                      <TableCell>
                        <Badge variant={c.refundStatus === "تم الإرجاع" ? "default" : "secondary"} className="text-xs">{c.refundStatus}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpen(c)}><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(c.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
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
