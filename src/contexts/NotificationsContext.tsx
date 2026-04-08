import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "order" | "booking" | "cancel" | "return" | "worker" | "info";
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, "id" | "time" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | null>(null);

const initialNotifications: Notification[] = [
  { id: "n1", title: "طلب جديد", description: "تم إضافة طلب ORD-006 من سعد المالكي", time: "منذ 5 دقائق", read: false, type: "order" },
  { id: "n2", title: "حجز مؤكد", description: "تم تأكيد حجز BK-004 لخدمة تنظيف مكاتب", time: "منذ 15 دقيقة", read: false, type: "booking" },
  { id: "n3", title: "إلغاء طلب", description: "تم إلغاء الطلب ORD-004 من نورة السالم", time: "منذ 30 دقيقة", read: false, type: "cancel" },
  { id: "n4", title: "عامل جديد", description: "تم إضافة العامل خالد سعيد للفريق", time: "منذ ساعة", read: true, type: "worker" },
  { id: "n5", title: "مرتجع", description: "طلب مرتجع RET-003 بانتظار المراجعة", time: "منذ ساعتين", read: true, type: "return" },
];

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const addNotification = useCallback((n: Omit<Notification, "id" | "time" | "read">) => {
    const newN: Notification = { ...n, id: `n-${Date.now()}`, time: "الآن", read: false };
    setNotifications(prev => [newN, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const clearAll = useCallback(() => setNotifications([]), []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead, clearAll }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
}
