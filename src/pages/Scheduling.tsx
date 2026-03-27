import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Clock, MapPin, User } from "lucide-react";

const days = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء"];

const scheduleData = [
  { worker: "محمد علي", role: "فني تنظيف أول", tasks: [
    { day: 0, time: "09:00 - 12:00", client: "أحمد محمد", location: "حي النرجس", type: "تنظيف منزل" },
    { day: 1, time: "10:00 - 13:00", client: "فهد العتيبي", location: "حي الياسمين", type: "تنظيف خزانات" },
    { day: 3, time: "08:00 - 11:00", client: "سعد المالكي", location: "حي الملقا", type: "تنظيف مكاتب" },
  ]},
  { worker: "عبدالله خالد", role: "فني تنظيف", tasks: [
    { day: 0, time: "13:00 - 16:00", client: "سارة العلي", location: "حي العليا", type: "تنظيف مكاتب" },
    { day: 2, time: "09:00 - 12:00", client: "منى الشمري", location: "حي الروضة", type: "تنظيف مسابح" },
    { day: 4, time: "10:00 - 14:00", client: "هند القحطاني", location: "حي الصحافة", type: "تنظيف واجهات" },
  ]},
  { worker: "يوسف أحمد", role: "فني تنظيف", tasks: [
    { day: 1, time: "08:00 - 11:00", client: "خالد الحربي", location: "حي الورود", type: "تنظيف سجاد" },
    { day: 2, time: "14:00 - 17:00", client: "عمر الدوسري", location: "حي الغدير", type: "تنظيف منزل" },
  ]},
  { worker: "فيصل سعد", role: "فني واجهات", tasks: [
    { day: 0, time: "08:00 - 12:00", client: "نورة السالم", location: "حي التعاون", type: "تنظيف واجهات" },
    { day: 3, time: "09:00 - 13:00", client: "لطيفة الرشيد", location: "حي الملك فهد", type: "تنظيف واجهات" },
    { day: 4, time: "08:00 - 11:00", client: "ماجد البلوي", location: "حي السليمانية", type: "تنظيف واجهات" },
  ]},
];

const typeColors: Record<string, string> = {
  "تنظيف منزل": "bg-primary/10 text-primary border-primary/20",
  "تنظيف مكاتب": "bg-info/10 text-info border-info/20",
  "تنظيف سجاد": "bg-warning/10 text-warning border-warning/20",
  "تنظيف خزانات": "bg-success/10 text-success border-success/20",
  "تنظيف واجهات": "bg-accent/10 text-accent-foreground border-accent/20",
  "تنظيف مسابح": "bg-destructive/10 text-destructive border-destructive/20",
};

export default function Scheduling() {
  return (
    <div className="space-y-6">
      <PageHeader title="جدولة العمال" description="إدارة مواعيد وجداول فريق العمل" />

      <div className="space-y-4">
        {scheduleData.map((worker, wIdx) => (
          <motion.div key={worker.worker} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: wIdx * 0.1 }}>
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{worker.worker}</CardTitle>
                    <p className="text-xs text-muted-foreground">{worker.role}</p>
                  </div>
                  <Badge variant="secondary" className="mr-auto">{worker.tasks.length} مهام</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {days.map((day, dIdx) => {
                    const task = worker.tasks.find((t) => t.day === dIdx);
                    return (
                      <div key={day} className="space-y-1">
                        <p className="text-xs font-medium text-center text-muted-foreground">{day}</p>
                        {task ? (
                          <div className={`p-2.5 rounded-lg border text-xs space-y-1.5 ${typeColors[task.type] || "bg-muted"}`}>
                            <p className="font-semibold">{task.type}</p>
                            <div className="flex items-center gap-1 opacity-80">
                              <Clock className="h-3 w-3" />
                              <span>{task.time}</span>
                            </div>
                            <div className="flex items-center gap-1 opacity-80">
                              <MapPin className="h-3 w-3" />
                              <span>{task.location}</span>
                            </div>
                            <p className="opacity-70">{task.client}</p>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-lg border border-dashed border-muted text-center text-xs text-muted-foreground min-h-[80px] flex items-center justify-center">
                            متاح
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
