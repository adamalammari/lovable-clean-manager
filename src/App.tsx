import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Scheduling from "./pages/Scheduling";
import Bookings from "./pages/Bookings";
import Reports from "./pages/Reports";
import Cancellations from "./pages/Cancellations";
import Returns from "./pages/Returns";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/scheduling" element={<Scheduling />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/cancellations" element={<Cancellations />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
