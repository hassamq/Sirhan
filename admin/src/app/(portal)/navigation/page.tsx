"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { liveSavedToast } from "@/lib/swr";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

type NavItem = {
  _id: string;
  label: string;
  href: string;
  order: number;
  visible: boolean;
};

export default function NavigationPage() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<{ items: NavItem[] }>("/api/admin/nav")
      .then((data) => setItems(data.items))
      .catch((e) => toast.error(e.message));
  }, []);

  async function save() {
    setSaving(true);
    try {
      const data = await api<{ items: NavItem[] }>("/api/admin/nav", {
        method: "PUT",
        body: JSON.stringify({
          items: items.map((item, index) => ({
            id: item._id,
            label: item.label,
            href: item.href,
            order: index,
            visible: item.visible,
          })),
        }),
      });
      setItems(data.items);
      liveSavedToast(toast, "Navigation published to the live website");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Navigation"
        description="Control primary menu labels, links, and visibility on the public site."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{items.length} items</Badge>
            <a
              href={process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
            >
              Preview site
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Button onClick={save} disabled={saving}>
              {saving ? "Publishing..." : "Save & publish"}
            </Button>
          </div>
        }
      />

      <div className="space-y-3">
        {items.map((item, index) => (
          <Card key={item._id} className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Item {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
              <Input
                value={item.label}
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((row) =>
                      row._id === item._id ? { ...row, label: e.target.value } : row
                    )
                  )
                }
              />
              <Input
                value={item.href}
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((row) =>
                      row._id === item._id ? { ...row, href: e.target.value } : row
                    )
                  )
                }
              />
              <div className="flex items-center gap-2">
                <Switch
                  checked={item.visible}
                  onCheckedChange={(visible) =>
                    setItems((prev) =>
                      prev.map((row) =>
                        row._id === item._id ? { ...row, visible } : row
                      )
                    )
                  }
                />
                <span className="text-sm text-muted-foreground">Visible</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
