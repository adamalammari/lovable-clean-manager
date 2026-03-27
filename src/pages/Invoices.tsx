import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Printer, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

interface Invoice {
  id: string; orderId: string; client: string; phone: string; service: string; date: string;
  amount: number; tax: number; total: number; status: string;
  items: { description: string; qty: number; price: number }[];
}

const invoices: Invoice[] = [
  { id: "INV-001", orderId: "ORD-001", client: "أحمد محمد", phone: "0501234567", service: "تنظيف منزل كامل", date: "2026-03-27", amount: 450, tax: 67.5, total: 517.5, status: "مدفوعة",
    items: [{ description: "تنظيف غرف (3 غرف)", qty: 3, price: 100 }, { description: "تنظيف مطبخ", qty: 1, price: 80 }, { description: "تنظيف حمامات (2)", qty: 2, price: 35 }] },
  { id: "INV-002", orderId: "ORD-002", client: "سارة العلي", phone: "0559876543", service: "تنظيف مكاتب", date: "2026-03-27", amount: 800, tax: 120, total: 920, status: "مدفوعة",
    items: [{ description: "تنظيف مكاتب (طابق كامل)", qty: 1, price: 500 }, { description: "تنظيف زجاج", qty: 1, price: 200 }, { description: "تعقيم", qty: 1, price: 100 }] },
  { id: "INV-003", orderId: "ORD-003", client: "خالد الحربي", phone: "0541112233", service: "تنظيف سجاد", date: "2026-03-26", amount: 200, tax: 30, total: 230, status: "غير مدفوعة",
    items: [{ description: "غسيل سجاد كبير", qty: 2, price: 60 }, { description: "غسيل سجاد صغير", qty: 2, price: 40 }] },
  { id: "INV-004", orderId: "ORD-005", client: "فهد العتيبي", phone: "0523334455", service: "تنظيف خزانات", date: "2026-03-25", amount: 350, tax: 52.5, total: 402.5, status: "مدفوعة",
    items: [{ description: "تنظيف خزان علوي", qty: 1, price: 200 }, { description: "تعقيم خزان", qty: 1, price: 150 }] },
  { id: "INV-005", orderId: "ORD-006", client: "منى الشمري", phone: "0534445566", service: "تنظيف مسابح", date: "2026-03-25", amount: 600, tax: 90, total: 690, status: "غير مدفوعة",
    items: [{ description: "تنظيف مسبح", qty: 1, price: 400 }, { description: "معالجة مياه", qty: 1, price: 200 }] },
];

export default function Invoices() {
  const [search, setSearch] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filtered = invoices.filter(
    (i) => i.client.includes(search) || i.id.includes(search) || i.orderId.includes(search)
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <PageHeader title="الفواتير" description="عرض وطباعة فواتير الخدمات" />

      <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
        <DialogContent className="sm:max-w-xl">
          {selectedInvoice && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>فاتورة {selectedInvoice.id}</span>
                  <Button variant="outline" size="sm" className="gap-2" onClick={handlePrint}>
                    <Printer className="h-4 w-4" />
                    طباعة
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">نظافة برو</h3>
                    <p className="text-sm text-muted-foreground">شركة خدمات التنظيف المتكاملة</p>
                    <p className="text-xs text-muted-foreground">الرقم الضريبي: 300012345600003</p>
                  </div>
                  <div className="text-left text-sm">
                    <p><span className="text-muted-foreground">التاريخ:</span> {selectedInvoice.date}</p>
                    <p><span className="text-muted-foreground">رقم الطلب:</span> {selectedInvoice.orderId}</p>
                  </div>
                </div>

                <Separator />

                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium">{selectedInvoice.client}</p>
                  <p className="text-xs text-muted-foreground">{selectedInvoice.phone}</p>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-right">الوصف</TableHead>
                        <TableHead className="text-right">الكمية</TableHead>
                        <TableHead className="text-right">السعر</TableHead>
                        <TableHead className="text-right">الإجمالي</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="text-sm">{item.description}</TableCell>
                          <TableCell className="text-sm">{item.qty}</TableCell>
                          <TableCell className="text-sm">{item.price} ر.س</TableCell>
                          <TableCell className="text-sm font-medium">{item.qty * item.price} ر.س</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-2 bg-muted/30 rounded-lg p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">المجموع الفرعي</span>
                    <span>{selectedInvoice.amount} ر.س</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ضريبة القيمة المضافة (15%)</span>
                    <span>{selectedInvoice.tax} ر.س</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>الإجمالي</span>
                    <span className="text-primary">{selectedInvoice.total} ر.س</span>
                  </div>
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
                <Input placeholder="بحث بالاسم أو رقم الفاتورة..." value={search} onChange={(e) => setSearch(e.target.value)} className="pr-10" />
              </div>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="text-right">رقم الفاتورة</TableHead>
                    <TableHead className="text-right">رقم الطلب</TableHead>
                    <TableHead className="text-right">العميل</TableHead>
                    <TableHead className="text-right">الخدمة</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">الإجمالي</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">عرض</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((inv) => (
                    <TableRow key={inv.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-sm">{inv.id}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">{inv.orderId}</TableCell>
                      <TableCell>
                        <p className="text-sm font-medium">{inv.client}</p>
                        <p className="text-xs text-muted-foreground">{inv.phone}</p>
                      </TableCell>
                      <TableCell className="text-sm">{inv.service}</TableCell>
                      <TableCell className="text-sm">{inv.date}</TableCell>
                      <TableCell className="text-sm font-semibold">{inv.total} ر.س</TableCell>
                      <TableCell>
                        <Badge variant={inv.status === "مدفوعة" ? "default" : "secondary"} className="text-xs">{inv.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedInvoice(inv)}>
                          <Eye className="h-4 w-4" />
                        </Button>
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
