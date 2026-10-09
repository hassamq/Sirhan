"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";
import { useAdminQuery, adminMutate, liveSavedToast } from "@/lib/swr";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Settings = {
  colors: Record<string, string>;
  fonts: Record<string, string>;
  images: Record<string, string>;
  brandName?: string;
  tagline?: string;
};

const colorKeys = [
  "navy",
  "slate",
  "stone",
  "sage",
  "sageDeep",
  "sageSoft",
  "ivory",
  "ivoryDeep",
  "clay",
  "claySoft",
  "cream",
  "paper",
  "muted",
];

export default function BrandingPage() {
  const { data, isLoading, error } = useAdminQuery<{ settings: Settings }>(
    "/api/admin/settings"
  );
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.settings) setSettings(data.settings);
  }, [data]);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const result = await adminMutate<{ settings: Settings }>(
        "/api/admin/settings",
        { method: "PUT", body: JSON.stringify(settings) },
        ["/api/admin/settings"]
      );
      setSettings(result.settings);
      liveSavedToast(toast);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading || !settings) {
    return <p className="text-sm text-muted-foreground">Loading branding...</p>;
  }

  return (
    <form onSubmit={save} className="space-y-6">
      <PageHeader
        title="Branding"
        description="Colors, fonts, and images apply to the live public website after save."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Live sync on</Badge>
            <a
              href={process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
            >
              Preview site
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Button type="submit" disabled={saving}>
              {saving ? "Publishing..." : "Save & publish"}
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="colors">
        <TabsList>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="fonts">Fonts</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="mt-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Color palette</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {colorKeys.map((key) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>{key}</Label>
                  <div className="flex gap-2">
                    <Input
                      id={key}
                      type="color"
                      className="h-10 w-14 p-1"
                      value={settings.colors?.[key] || "#000000"}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          colors: { ...settings.colors, [key]: e.target.value },
                        })
                      }
                    />
                    <Input
                      value={settings.colors?.[key] || ""}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          colors: { ...settings.colors, [key]: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fonts" className="mt-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Typography</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              {(["display", "sans", "script"] as const).map((key) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={`font-${key}`}>{key} font</Label>
                  <Input
                    id={`font-${key}`}
                    value={settings.fonts?.[key] || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        fonts: { ...settings.fonts, [key]: e.target.value },
                      })
                    }
                    placeholder="Google Font family name"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="mt-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Brand images</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              {(["logo", "hero", "favicon"] as const).map((key) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={`img-${key}`}>{key} URL</Label>
                  <Input
                    id={`img-${key}`}
                    value={settings.images?.[key] || ""}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        images: { ...settings.images, [key]: e.target.value },
                      })
                    }
                    placeholder="/uploads/..."
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
