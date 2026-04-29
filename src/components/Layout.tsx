import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { BottomNav } from "./BottomNav";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto min-h-screen md:ml-0 pb-20 md:pb-0">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
