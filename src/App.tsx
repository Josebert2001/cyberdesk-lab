import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ScrollToTop } from "./components/ScrollToTop";
import { Layout } from "./components/Layout";
import { AiPanelProvider } from "./components/AiPanelContext";
import { AiPanel } from "./components/AiPanel";
import { XPProvider } from "./components/XPContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthGuard } from "./components/AuthGuard";
import { PublicPageWrapper } from "./components/PublicPageWrapper";

const Lab = lazy(() => import("./pages/Lab"));
const Playground = lazy(() => import("./pages/Playground"));
const AskAnything = lazy(() => import("./pages/AskAnything"));
const ExamPrep = lazy(() => import("./pages/ExamPrep"));
const CbtPrep = lazy(() => import("./pages/CbtPrep"));
const Opportunities = lazy(() => import("./pages/Opportunities"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const Resources = lazy(() => import("./pages/Resources"));
const About = lazy(() => import("./pages/About"));
const Staff = lazy(() => import("./pages/Staff"));
const Showcase = lazy(() => import("./pages/Showcase"));
const Programmes = lazy(() => import("./pages/Programmes"));
const Research = lazy(() => import("./pages/Research"));
const Welcome = lazy(() => import("./pages/Welcome"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));

const routerFuture: NonNullable<Parameters<typeof BrowserRouter>[0]["future"]> = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

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
      <BrowserRouter future={routerFuture}>
        <ScrollToTop />
        <AuthProvider>
          <XPProvider>
            <AiPanelProvider>
              <Suspense fallback={<div className="min-h-screen bg-background" />}>
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
                <Route path="/about" element={<PublicPageWrapper><About /></PublicPageWrapper>} />
                <Route path="/programmes" element={<PublicPageWrapper><Programmes /></PublicPageWrapper>} />
                <Route path="/research" element={<PublicPageWrapper><Research /></PublicPageWrapper>} />
                <Route path="/staff" element={<PublicPageWrapper><Staff /></PublicPageWrapper>} />
                <Route path="/showcase" element={<PublicPageWrapper><Showcase /></PublicPageWrapper>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </Suspense>
              <AiPanel />
            </AiPanelProvider>
          </XPProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </ErrorBoundary>
);

export default App;
