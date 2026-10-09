"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  FileText,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Navigation,
  Newspaper,
  Palette,
  Settings2,
  Sparkles,
} from "lucide-react";
import { clearToken } from "@/lib/api";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/branding", label: "Branding", icon: Palette },
  { href: "/content", label: "Page Content", icon: FileText },
  { href: "/blogs", label: "Blogs", icon: Newspaper },
  { href: "/media", label: "Media", icon: ImageIcon },
  { href: "/navigation", label: "Navigation", icon: Navigation },
  { href: "/settings", label: "Site Settings", icon: Settings2 },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const activeLabel =
    links.find(
      (link) => pathname === link.href || pathname.startsWith(`${link.href}/`)
    )?.label || "Admin";

  function logout() {
    clearToken();
    router.replace("/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">
              Sirhan Admin
            </p>
            <p className="truncate text-xs text-muted-foreground">CMS Portal</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Manage
          </p>
          {links.map((link) => {
            const Icon = link.icon;
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3 border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg bg-muted/60 px-3 py-2.5">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                SA
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Admin</p>
              <p className="truncate text-xs text-muted-foreground">
                admin@sirhan.care
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b bg-card/90 px-4 backdrop-blur md:px-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-semibold tracking-tight">
                {activeLabel}
              </h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Live CMS
              </Badge>
            </div>
            <p className="truncate text-sm text-muted-foreground">
              Edit content that powers the public Sirhan website
            </p>
          </div>
          <a
            href={process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "gap-1.5"
            )}
          >
            View site
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </header>

        <main className="flex-1 bg-muted/40 p-4 md:p-8">
          <div className="mx-auto w-full max-w-6xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
