// components/sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageCircle,
  User2,
  CreditCard,
  LineChart,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Chatbot",
    href: "/chatbot",
    icon: MessageCircle,
  },
  {
    label: "Report Editor",
    href: "/reports",
    icon: LineChart,
  },
  {
    label: "Manage Subscription",
    href: "/subscription",
    icon: CreditCard,
  },
  {
    label: "Account & Settings",
    href: "/profile",
    icon: User2,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 border-r bg-white dark:bg-zinc-950 px-4 py-6">
      <div className="mb-6 text-xl font-bold text-primary">be-luma</div>
      <nav className="space-y-2">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
              pathname === href
                ? "bg-muted text-primary"
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
