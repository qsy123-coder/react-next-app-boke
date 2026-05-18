"use client";

import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardShellProps = {
  children: React.ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar collapsed={collapsed} />
      <div
        className={cn(
          "sticky top-0 z-30 flex h-16 items-center border-b bg-background/80 px-4 backdrop-blur transition-[margin] duration-300",
          collapsed ? "ml-20" : "ml-64"
        )}
      >
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-full"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "展开导航栏" : "折叠导航栏"}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </div>
      <main
        className={cn(
          "min-h-[calc(100vh-4rem)] transition-[margin] duration-300",
          collapsed ? "ml-20" : "ml-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
