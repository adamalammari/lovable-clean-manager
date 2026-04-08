import { ClipboardList, Users, DollarSign, TrendingUp, CalendarCheck, XCircle, UserCheck, ReceiptText, Undo2, Star } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const recentOrders = [
  { id: "ORD-001", client: "أحمد محمد", service: "تنظيف منزل كامل", date: "2026-03-27", status: "completed" as const, amount: 450 },
  { id: "ORD-002", client: "سارة العلي", service: "تنظيف مكاتب", date: "2026-03-27", status: "in_progress" as const, amount: 800 },
  { id: "ORD-003", client: "خالد الحربي", service: "تنظيف سجاد", date: "2026-03-26", status: "pending" as const, amount: 200 },
  { id: "ORD-004", client: "نورة السالم", service: "تنظيف واجهات", date: "2026-03-26", status: "cancelled" as const, amount: 1200 },
  { id: "ORD-005", client: "فهد العتيبي", service: "تنظيف خزانات", date: "2026-03-25", status: "completed" as const, amount: 350 },
];

const dailyRevenue = [
  { day: "السبت", revenue: 3200, orders: 8 },
  { day: "الأحد", revenue: 4500, orders: 12 },
  { day: "الإثنين", revenue: 3800, orders: 10 },
  { day: "الثلاثاء", revenue: 5100, orders: 14 },
  { day: "الأربعاء", revenue: 4200, orders: 11 },
  { day: "الخميس", revenue: 6300, orders: 17 },
  { day: "الجمعة", revenue: 2100, orders: 5 },
];

const workerPerformance = [
  { name: "محمد علي", completed: 28, rating: 4.8 },
  { name: "عبدالله خالد", completed: 24, rating: 4.5 },
  { name: "يوسف أحمد", completed: 20, rating: 4.7 },
  { name: "فيصل سعد", completed: 18, rating: 4.3 },
  { name: "سعود ناصر", completed: 15, rating: 4.6 },
];

const serviceDistribution = [
  { name: "تنظيف منازل", value: 35, color: "hsl(var(--primary))" },
  { name: "تنظيف مكاتب", value: 25, color: "hsl(var(--info))" },
  { name: "تنظيف سجاد", value: 15, color: "hsl(var(--success))" },
  { name: "تنظيف واجهات", value: 15, color: "hsl(var(--warning))" },
  { name: "تنظيف خزانات", value: 10, color: "hsl(var(--destructive))" },
];

const monthlyTrend = [
  { month: "يناير", revenue: 42000, clients: 65 },
  { month: "فبراير", revenue: 38000, clients: 58 },
  { month: "مارس", revenue: 54200, clients: 82 },
  { month: "أبريل", revenue: 45000, clients: 71 },
  { month: "مايو", revenue: 51000, clients: 79 },
  { month: "يونيو", revenue: 48000, clients: 74 },
];

const topClients = [
  { name: "شركة الأفق", orders: 24, total: "18,500 ر.س" },
  { name: "مؤسسة النور", orders: 18, total: "14,200 ر.س" },
  { name: "أحمد محمد", orders: 12, total: "8,400 ر.س" },
  { name: "مجمع الرياض التجاري", orders: 10, total: "12,000 ر.س" },
];

const tooltipStyle = { backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 };

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="لوحة التحكم" description="نظرة عامة على أداء الشركة" />

      {/* Stats Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="إجمالي الطلبات" value="1,284" icon={ClipboardList} trend="↑ 12% هذا الشهر" trendUp color="primary" delay={0} />
        <StatCard title="العمال النشطون" value="47" icon={Users} trend="3 جدد هذا الأسبوع" trendUp color="info" delay={0.1} />
        <StatCard title="الإيرادات" value="٥٤,٢٠٠ ر.س" icon={DollarSign} trend="↑ 8% عن الشهر السابق" trendUp color="success" delay={0.2} />
        <StatCard title="نسبة الإنجاز" value="94%" icon={TrendingUp} trend="↑ 2% تحسن" trendUp color="warning" delay={0.3} />
      </div>

      {/* Stats Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="العملاء" value="312" icon={UserCheck} trend="↑ 15 عميل جديد" trendUp color="primary" delay={0.1} />
        <StatCard title="الحجوزات المعلقة" value="23" icon={CalendarCheck} trend="5 اليوم" trendUp={false} color="warning" delay={0.15} />
        <StatCard title="الفواتير" value="٤٥,٨٠٠ ر.س" icon={ReceiptText} trend="12 فاتورة" trendUp color="info" delay={0.2} />
        <StatCard title="المرتجعات" value="7" icon={Undo2} trend="↓ 3% أقل" trendUp color="destructive" delay={0.25} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-lg">الإيرادات اليومية</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={dailyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value} ر.س`, "الإيرادات"]} />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-lg">الإيرادات الشهرية والعملاء</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [name === "revenue" ? `${value.toLocaleString()} ر.س` : value, name === "revenue" ? "الإيرادات" : "العملاء"]} />
                  <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.15)" strokeWidth={2} />
                  <Area type="monotone" dataKey="clients" stroke="hsl(var(--info))" fill="hsl(var(--info)/0.1)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-lg">توزيع الخدمات</CardTitle></CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={serviceDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-lg">أداء العمال</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={workerPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={90} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [name === "completed" ? `${value} طلب` : value, name === "completed" ? "مكتمل" : "التقييم"]} />
                  <Bar dataKey="completed" fill="hsl(var(--info))" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-lg">عدد الطلبات اليومية</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dailyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`${value} طلب`, "الطلبات"]} />
                  <Line type="monotone" dataKey="orders" stroke="hsl(var(--success))" strokeWidth={3} dot={{ fill: "hsl(var(--success))", r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-lg">أحدث الطلبات</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ClipboardList className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{order.client}</p>
                        <p className="text-xs text-muted-foreground">{order.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">{order.amount} ر.س</span>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="text-lg">أفضل العملاء</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topClients.map((client, idx) => (
                    <div key={client.name} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{idx + 1}</div>
                        <div>
                          <p className="text-sm font-medium">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.orders} طلب</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold">{client.total}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="text-lg">ملخص اليوم</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "طلبات جديدة", value: "12", icon: ClipboardList, color: "text-primary" },
                  { label: "مواعيد مجدولة", value: "8", icon: CalendarCheck, color: "text-info" },
                  { label: "طلبات مكتملة", value: "15", icon: TrendingUp, color: "text-success" },
                  { label: "إلغاءات", value: "2", icon: XCircle, color: "text-destructive" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <span className="text-lg font-bold">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
