import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "./components/SiteLayout";
import Index from "./pages/Index";
import Overview from "./pages/Overview";
import Findings from "./pages/Findings";
import AttackDemo from "./pages/AttackDemo";
import Policies from "./pages/Policies";
import Evidence from "./pages/Evidence";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Playground from "./pages/Playground";
import Docs from "./pages/Docs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SiteLayout><Index /></SiteLayout>} />
          <Route path="/overview" element={<SiteLayout><Overview /></SiteLayout>} />
          <Route path="/findings" element={<SiteLayout><Findings /></SiteLayout>} />
          <Route path="/attack-demo" element={<SiteLayout><AttackDemo /></SiteLayout>} />
          <Route path="/policies" element={<SiteLayout><Policies /></SiteLayout>} />
          <Route path="/evidence" element={<SiteLayout><Evidence /></SiteLayout>} />
          <Route path="/reports" element={<SiteLayout><Reports /></SiteLayout>} />
          <Route path="/playground" element={<SiteLayout><Playground /></SiteLayout>} />
          <Route path="/docs" element={<SiteLayout><Docs /></SiteLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
