"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Home, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Blogs", href: "/dashboard/blogs", icon: FileText },
  { name: "Setting", href: "/dashboard/setting", icon: Settings },
];

type DashboardSidebarProps = {
  collapsed: boolean;
};

export function DashboardSidebar({ collapsed }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-background transition-[width] duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className={cn("p-6", collapsed && "px-4")}> 
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600">
            <span className="text-sm font-bold text-white">I</span>
          </div>
          {!collapsed ? <span className="text-lg font-semibold">Inkwell</span> : null}
        </Link>
      </div>

      <Separator />

      <nav className="flex-1 space-y-2 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.name : undefined}
              className={cn(
                "flex items-center rounded-xl text-sm font-medium transition-colors",
                collapsed ? "justify-center px-3 py-3" : "gap-3 px-3 py-2.5",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed ? item.name : null}
            </Link>
          );
        })}
      </nav>

      <Separator />

      <Link href="/dashboard/account" className="p-4 transition-colors hover:bg-accent">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}> 
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {!collapsed ? (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">John Doe</p>
                <p className="truncate text-xs text-muted-foreground">john@example.com</p>
              </div>
              <User className="h-4 w-4 text-muted-foreground" />
            </>
          ) : null}
        </div>
      </Link>
    </aside>
  );
}
