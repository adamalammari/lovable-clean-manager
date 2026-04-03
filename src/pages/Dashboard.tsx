import { ClipboardList, Users, DollarSign, TrendingUp, CalendarCheck, XCircle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";

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

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="لوحة التحكم" description="نظرة عامة على أداء الشركة" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard title="إجمالي الطلبات" value="1,284" icon={ClipboardList} trend="↑ 12% هذا الشهر" trendUp color="primary" delay={0} />
        <StatCard title="العمال النشطون" value="47" icon={Users} trend="3 جدد هذا الأسبوع" trendUp color="info" delay={0.1} />
        <StatCard title="الإيرادات" value="٥٤,٢٠٠ ر.س" icon={DollarSign} trend="↑ 8% عن الشهر السابق" trendUp color="success" delay={0.2} />
        <StatCard title="نسبة الإنجاز" value="94%" icon={TrendingUp} trend="↑ 2% تحسن" trendUp color="warning" delay={0.3} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">الإيرادات اليومية</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={dailyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }}
                    formatter={(value: number) => [`${value} ر.س`, "الإيرادات"]}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">أداء العمال (طلبات مكتملة)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={workerPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={90} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }}
                    formatter={(value: number, name: string) => {
                      if (name === "completed") return [`${value} طلب`, "مكتمل"];
                      return [`${value}`, "التقييم"];
                    }}
                  />
                  <Bar dataKey="completed" fill="hsl(var(--info))" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Second charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">توزيع الخدمات</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={serviceDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">عدد الطلبات اليومية</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dailyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 13 }}
                    formatter={(value: number) => [`${value} طلب`, "الطلبات"]}
                  />
                  <Line type="monotone" dataKey="orders" stroke="hsl(var(--success))" strokeWidth={3} dot={{ fill: "hsl(var(--success))", r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Orders + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">أحدث الطلبات</CardTitle>
            </CardHeader>
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

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">ملخص اليوم</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "طلبات جديدة", value: "12", icon: ClipboardList, color: "text-primary" },
                { label: "مواعيد مجدولة", value: "8", icon: CalendarCheck, color: "text-info" },
                { label: "طلبات مكتملة", value: "15", icon: TrendingUp, color: "text-success" },
                { label: "إلغاءات", value: "2", icon: XCircle, color: "text-destructive" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
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
  );
}