import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { Layout } from "./components/Layout";
import { AiPanelProvider } from "./components/AiPanelContext";
import { AiPanel } from "./components/AiPanel";
import { XPProvider } from "./components/XPContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthGuard } from "./components/AuthGuard";
import Lab from "./pages/Lab";
import Playground from "./pages/Playground";
import AskAnything from "./pages/AskAnything";
import ExamPrep from "./pages/ExamPrep";
import CbtPrep from "./pages/CbtPrep";
import Opportunities from "./pages/Opportunities";
import Roadmap from "./pages/Roadmap";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Staff from "./pages/Staff";
import Showcase from "./pages/Showcase";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const protect = (el: JSX.Element) => (
  <AuthGuard>
    <Layout>{el}</Layout>
  </AuthGuard>
);

const App = () => (
  <ErrorBoundary>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true } as any}
      >
        <ScrollToTop />
        <AuthProvider>
          <XPProvider>
            <AiPanelProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/welcome" replace />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/lab" element={protect(<Lab />)} />
                <Route path="/playground" element={protect(<Playground />)} />
                <Route path="/ask" element={protect(<AskAnything />)} />
                <Route path="/exam-prep" element={protect(<ExamPrep />)} />
                <Route path="/cbt-prep" element={protect(<CbtPrep />)} />
                <Route path="/opportunities" element={protect(<Opportunities />)} />
                <Route path="/roadmap" element={protect(<Roadmap />)} />
                <Route path="/resources" element={protect(<Resources />)} />
                <Route path="/about" element={protect(<About />)} />
                <Route path="/staff" element={protect(<Staff />)} />
                <Route path="/showcase" element={protect(<Showcase />)} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <AiPanel />
            </AiPanelProvider>
          </XPProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </ErrorBoundary>
);

export default App;
