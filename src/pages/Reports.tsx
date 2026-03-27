import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { month: "يناير", revenue: 42000, orders: 98 },
  { month: "فبراير", revenue: 38000, orders: 85 },
  { month: "مارس", revenue: 54200, orders: 120 },
  { month: "أبريل", revenue: 45000, orders: 105 },
  { month: "مايو", revenue: 51000, orders: 115 },
  { month: "يونيو", revenue: 48000, orders: 108 },
];

const serviceData = [
  { name: "تنظيف منازل", value: 40, color: "hsl(168, 55%, 42%)" },
  { name: "تنظيف مكاتب", value: 25, color: "hsl(205, 75%, 50%)" },
  { name: "تنظيف واجهات", value: 15, color: "hsl(40, 85%, 55%)" },
  { name: "تنظيف خزانات", value: 12, color: "hsl(145, 60%, 42%)" },
  { name: "أخرى", value: 8, color: "hsl(200, 10%, 45%)" },
];

const topClients = [
  { name: "شركة الأفق", orders: 24, total: "18,500 ر.س" },
  { name: "مؤسسة النور", orders: 18, total: "14,200 ر.س" },
  { name: "أحمد محمد", orders: 12, total: "8,400 ر.س" },
  { name: "مجمع الرياض التجاري", orders: 10, total: "12,000 ر.س" },
  { name: "فهد العتيبي", orders: 8, total: "5,600 ر.س" },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader title="تقارير المبيعات" description="تحليل شامل لأداء المبيعات والخدمات" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">الإيرادات الشهرية</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(168, 20%, 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: "0.75rem", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    formatter={(value: number) => [`${value.toLocaleString()} ر.س`, "الإيرادات"]}
                  />
                  <Bar dataKey="revenue" fill="hsl(168, 55%, 42%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">توزيع الخدمات</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={serviceData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                    {serviceData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, "النسبة"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {serviceData.map((s) => (
                  <div key={s.name} className="flex items-center gap-1.5 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span>{s.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">أفضل العملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topClients.map((client, idx) => (
                <div key={client.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.orders} طلب</p>
                    </div>
                  </div>
                  <span className="font-semibold text-sm">{client.total}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
