import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AiPanelProvider } from "./components/AiPanelContext";
import { AiPanel } from "./components/AiPanel";
import { XPProvider } from "./components/XPContext";
import Lab from "./pages/Lab";
import Playground from "./pages/Playground";
import AskAnything from "./pages/AskAnything";
import ExamPrep from "./pages/ExamPrep";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <XPProvider>
          <AiPanelProvider>
            <Routes>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/" element={<Layout><Lab /></Layout>} />
              <Route path="/playground" element={<Layout><Playground /></Layout>} />
              <Route path="/ask" element={<Layout><AskAnything /></Layout>} />
              <Route path="/exam-prep" element={<Layout><ExamPrep /></Layout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AiPanel />
          </AiPanelProvider>
        </XPProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
