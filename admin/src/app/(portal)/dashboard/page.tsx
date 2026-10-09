"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  ImageIcon,
  Newspaper,
  Palette,
  ArrowRight,
} from "lucide-react";
import { api } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    blogs: 0,
    pages: 0,
    media: 0,
    brand: "Sirhan",
  });

  useEffect(() => {
    async function load() {
      const [blogs, pages, media, settings] = await Promise.all([
        api<{ posts: unknown[] }>("/api/admin/blogs"),
        api<{ pages: unknown[] }>("/api/admin/pages"),
        api<{ media: unknown[] }>("/api/admin/media"),
        api<{ settings: { brandName?: string } }>("/api/admin/settings"),
      ]);
      setStats({
        blogs: blogs.posts.length,
        pages: pages.pages.length,
        media: media.media.length,
        brand: settings.settings?.brandName || "Sirhan",
      });
    }
    load().catch(() => undefined);
  }, []);

  const cards = [
    {
      label: "Blog posts",
      value: stats.blogs,
      href: "/blogs",
      icon: Newspaper,
      hint: "Publish articles",
    },
    {
      label: "Pages",
      value: stats.pages,
      href: "/content",
      icon: FileText,
      hint: "Edit website copy",
    },
    {
      label: "Media assets",
      value: stats.media,
      href: "/media",
      icon: ImageIcon,
      hint: "Images & uploads",
    },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description={`Overview of content powering the ${stats.brand} website.`}
        actions={
          <Link href="/branding" className={cn(buttonVariants(), "gap-2")}>
            <Palette className="h-4 w-4" />
            Edit branding
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label} className="shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardDescription>{card.label}</CardDescription>
                  <CardTitle className="mt-1 text-3xl font-semibold tabular-nums">
                    {card.value}
                  </CardTitle>
                </div>
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{card.hint}</p>
                <Link
                  href={card.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "gap-1 px-2"
                  )}
                >
                  Manage
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
          <CardDescription>
            Jump into the most common CMS workflows.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Link href="/branding" className={cn(buttonVariants())}>
            Colors & fonts
          </Link>
          <Link
            href="/blogs/new"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            New blog post
          </Link>
          <Link
            href="/media"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Upload media
          </Link>
          <Link
            href="/content"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Edit page content
          </Link>
          <Link
            href="/settings"
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Site settings
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
