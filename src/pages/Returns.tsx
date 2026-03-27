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
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface Return {
  id: string; orderId: string; client: string; service: string; date: string; reason: string; amount: number; action: string;
}

const initialData: Return[] = [
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

const actions = ["إعادة الخدمة", "استرداد جزئي", "تعويض كامل"];
const emptyForm = { orderId: "", client: "", service: "", date: "", reason: "", amount: "", action: "إعادة الخدمة" };

export default function Returns() {
  const [items, setItems] = useState<Return[]>(initialData);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const handleOpen = (item?: Return) => {
    if (item) {
      setEditId(item.id);
      setForm({ orderId: item.orderId, client: item.client, service: item.service, date: item.date, reason: item.reason, amount: String(item.amount), action: item.action });
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
      setItems(items.map(i => i.id === editId ? { ...i, ...form, amount: Number(form.amount) } : i));
      toast({ title: "تم التحديث" });
    } else {
      setItems([{ id: `RET-${String(items.length + 1).padStart(3, "0")}`, ...form, amount: Number(form.amount) }, ...items]);
      toast({ title: "تمت الإضافة", description: "تم تسجيل المرتجع بنجاح" });
    }
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(i => i.id !== id));
    toast({ title: "تم الحذف" });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="المرتجعات" description="إدارة طلبات الإرجاع والتعويضات">
        <Button className="gap-2" onClick={() => handleOpen()}>
          <Plus className="h-4 w-4" />
          تسجيل مرتجع
        </Button>
      </PageHeader>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>{editId ? "تعديل المرتجع" : "تسجيل مرتجع جديد"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>رقم الطلب *</Label><Input value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })} /></div>
            <div className="space-y-2"><Label>اسم العميل *</Label><Input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} /></div>
            <div className="space-y-2"><Label>الخدمة</Label><Input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} /></div>
            <div className="space-y-2"><Label>التاريخ</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
            <div className="space-y-2"><Label>السبب *</Label><Input value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} /></div>
            <div className="space-y-2"><Label>المبلغ</Label><Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></div>
            <div className="space-y-2 col-span-2">
              <Label>الإجراء</Label>
              <Select value={form.action} onValueChange={(v) => setForm({ ...form, action: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{actions.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
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
                    <TableHead className="text-right">رقم المرتجع</TableHead>
                    <TableHead className="text-right">رقم الطلب</TableHead>
                    <TableHead className="text-right">العميل</TableHead>
                    <TableHead className="text-right">الخدمة</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">السبب</TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">الإجراء</TableHead>
                    <TableHead className="text-right">تعديل</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((r) => (
                    <TableRow key={r.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-sm">{r.id}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">{r.orderId}</TableCell>
                      <TableCell className="text-sm font-medium">{r.client}</TableCell>
                      <TableCell className="text-sm">{r.service}</TableCell>
                      <TableCell className="text-sm">{r.date}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.reason}</TableCell>
                      <TableCell className="text-sm font-semibold">{r.amount} ر.س</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${actionColors[r.action] || ""}`}>{r.action}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpen(r)}><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(r.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
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
