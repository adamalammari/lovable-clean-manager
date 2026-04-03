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
import { Plus, Search, Trash2, Edit, Star, Phone, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface Worker {
  id: string;
  name: string;
  phone: string;
  nationality: string;
  specialty: string;
  status: "active" | "inactive" | "on_leave";
  rating: number;
  completedOrders: number;
  joinDate: string;
  history: { orderId: string; service: string; date: string; rating: number }[];
}

const initialWorkers: Worker[] = [
  {
    id: "WRK-001", name: "محمد علي", phone: "0501234567", nationality: "سعودي", specialty: "تنظيف منازل",
    status: "active", rating: 4.8, completedOrders: 128, joinDate: "2024-06-15",
    history: [
      { orderId: "ORD-001", service: "تنظيف منزل كامل", date: "2026-03-27", rating: 5 },
      { orderId: "ORD-005", service: "تنظيف خزانات", date: "2026-03-25", rating: 4.5 },
      { orderId: "ORD-010", service: "تنظيف شامل", date: "2026-03-20", rating: 5 },
    ],
  },
  {
    id: "WRK-002", name: "عبدالله خالد", phone: "0559876543", nationality: "سعودي", specialty: "تنظيف مكاتب",
    status: "active", rating: 4.5, completedOrders: 95, joinDate: "2024-09-01",
    history: [
      { orderId: "ORD-002", service: "تنظيف مكاتب", date: "2026-03-27", rating: 4.5 },
      { orderId: "ORD-008", service: "تنظيف مكاتب", date: "2026-03-22", rating: 4 },
    ],
  },
  {
    id: "WRK-003", name: "يوسف أحمد", phone: "0541112233", nationality: "مصري", specialty: "تنظيف سجاد",
    status: "active", rating: 4.7, completedOrders: 82, joinDate: "2025-01-10",
    history: [
      { orderId: "ORD-003", service: "تنظيف سجاد", date: "2026-03-26", rating: 4.5 },
    ],
  },
  {
    id: "WRK-004", name: "فيصل سعد", phone: "0567778899", nationality: "سعودي", specialty: "تنظيف واجهات",
    status: "on_leave", rating: 4.3, completedOrders: 67, joinDate: "2025-03-20",
    history: [
      { orderId: "ORD-004", service: "تنظيف واجهات", date: "2026-03-26", rating: 4 },
    ],
  },
  {
    id: "WRK-005", name: "سعود ناصر", phone: "0534445566", nationality: "سعودي", specialty: "تنظيف مسابح",
    status: "inactive", rating: 4.6, completedOrders: 53, joinDate: "2025-05-01",
    history: [],
  },
];

const specialties = ["تنظيف منازل", "تنظيف مكاتب", "تنظيف سجاد", "تنظيف واجهات", "تنظيف خزانات", "تنظيف مسابح"];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  active: { label: "نشط", variant: "default" },
  inactive: { label: "غير نشط", variant: "secondary" },
  on_leave: { label: "في إجازة", variant: "outline" },
};

const emptyForm = { name: "", phone: "", nationality: "", specialty: "", status: "active" as Worker["status"], joinDate: "" };

export default function Workers() {
  const [workers, setWorkers] = useState<Worker[]>(initialWorkers);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = workers.filter(w => w.name.includes(search) || w.id.includes(search) || w.specialty.includes(search));

  const handleOpen = (worker?: Worker) => {
    if (worker) {
      setEditId(worker.id);
      setForm({ name: worker.name, phone: worker.phone, nationality: worker.nationality, specialty: worker.specialty, status: worker.status, joinDate: worker.joinDate });
    } else {
      setEditId(null);
      setForm(emptyForm);
    }
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.phone || !form.specialty) {
      toast({ title: "خطأ", description: "يرجى تعبئة الحقول المطلوبة", variant: "destructive" });
      return;
    }
    if (editId) {
      setWorkers(workers.map(w => w.id === editId ? { ...w, ...form } : w));
      toast({ title: "تم التحديث", description: "تم تعديل بيانات العامل" });
    } else {
      const newWorker: Worker = {
        id: `WRK-${String(workers.length + 1).padStart(3, "0")}`,
        ...form,
        rating: 0,
        completedOrders: 0,
        history: [],
      };
      setWorkers([newWorker, ...workers]);
      toast({ title: "تمت الإضافة", description: "تم إضافة العامل بنجاح" });
    }
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    setWorkers(workers.filter(w => w.id !== id));
    toast({ title: "تم الحذف" });
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? "fill-warning text-warning" : "text-muted-foreground/30"}`} />
      ))}
      <span className="text-xs text-muted-foreground mr-1">{rating > 0 ? rating.toFixed(1) : "-"}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader title="إدارة العمال" description="بيانات العمال وتقييماتهم وسجل أعمالهم">
        <Button className="gap-2" onClick={() => handleOpen()}>
          <Plus className="h-4 w-4" />
          إضافة عامل
        </Button>
      </PageHeader>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>{editId ? "تعديل بيانات العامل" : "إضافة عامل جديد"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label>الاسم *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-2"><Label>رقم الهاتف *</Label><Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
            <div className="space-y-2"><Label>الجنسية</Label><Input value={form.nationality} onChange={e => setForm({ ...form, nationality: e.target.value })} /></div>
            <div className="space-y-2">
              <Label>التخصص *</Label>
              <Select value={form.specialty} onValueChange={v => setForm({ ...form, specialty: v })}>
                <SelectTrigger><SelectValue placeholder="اختر التخصص" /></SelectTrigger>
                <SelectContent>{specialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>تاريخ الانضمام</Label><Input type="date" value={form.joinDate} onChange={e => setForm({ ...form, joinDate: e.target.value })} /></div>
            <div className="space-y-2">
              <Label>الحالة</Label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v as Worker["status"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                  <SelectItem value="on_leave">في إجازة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
            <Button onClick={handleSave}>{editId ? "حفظ التعديلات" : "إضافة العامل"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-lg">
          {selectedWorker && (
            <>
              <DialogHeader><DialogTitle>سجل أعمال: {selectedWorker.name}</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <p className="text-2xl font-bold text-primary">{selectedWorker.completedOrders}</p>
                    <p className="text-xs text-muted-foreground">طلب مكتمل</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <div className="flex justify-center">{renderStars(selectedWorker.rating)}</div>
                    <p className="text-xs text-muted-foreground mt-1">التقييم العام</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">آخر الأعمال</h4>
                  {selectedWorker.history.length > 0 ? (
                    <div className="space-y-2">
                      {selectedWorker.history.map((h, i) => (
                        <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 text-sm">
                          <div>
                            <span className="font-mono text-xs text-muted-foreground">{h.orderId}</span>
                            <span className="mx-2">·</span>
                            <span>{h.service}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{h.date}</span>
                            <div className="flex items-center gap-0.5">
                              <Star className="h-3 w-3 fill-warning text-warning" />
                              <span className="text-xs">{h.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">لا يوجد سجل أعمال بعد</p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="بحث بالاسم أو التخصص..." value={search} onChange={e => setSearch(e.target.value)} className="pr-10" />
              </div>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">الرقم</TableHead>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">التخصص</TableHead>
                    <TableHead className="text-right">التقييم</TableHead>
                    <TableHead className="text-right">طلبات مكتملة</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(w => (
                    <TableRow key={w.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-sm">{w.id}</TableCell>
                      <TableCell>
                        <p className="font-medium text-sm">{w.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" />{w.phone}</p>
                      </TableCell>
                      <TableCell className="text-sm">{w.specialty}</TableCell>
                      <TableCell>{renderStars(w.rating)}</TableCell>
                      <TableCell className="text-sm font-semibold">{w.completedOrders}</TableCell>
                      <TableCell>
                        <Badge variant={statusMap[w.status]?.variant || "secondary"}>{statusMap[w.status]?.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setSelectedWorker(w); setDetailOpen(true); }}>
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpen(w)}>
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(w.id)}>
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