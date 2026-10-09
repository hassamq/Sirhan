"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Settings = {
  brandName: string;
  tagline: string;
  siteTitle: string;
  siteDescription: string;
  contact: {
    phone: string;
    email: string;
    location: string;
    hours: string;
  };
  social: {
    instagram: string;
    facebook: string;
    youtube: string;
    linkedin: string;
  };
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<{ settings: Settings }>("/api/admin/settings")
      .then((data) => setSettings(data.settings))
      .catch((e) => toast.error(e.message));
  }, []);

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const data = await api<{ settings: Settings }>("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify(settings),
      });
      setSettings(data.settings);
      toast.success("Site settings saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!settings) {
    return <p className="text-sm text-muted-foreground">Loading settings...</p>;
  }

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Site Settings</h1>
          <p className="text-sm text-muted-foreground">
            Brand name, SEO, contact details, and social links.
          </p>
        </div>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save settings"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Brand name</Label>
            <Input
              value={settings.brandName}
              onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Tagline</Label>
            <Input
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Site title</Label>
            <Input
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label>Site description</Label>
            <Textarea
              rows={3}
              value={settings.siteDescription}
              onChange={(e) =>
                setSettings({ ...settings, siteDescription: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {(["phone", "email", "location"] as const).map((key) => (
            <div key={key} className="space-y-2">
              <Label className="capitalize">{key}</Label>
              <Input
                value={settings.contact?.[key] || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    contact: { ...settings.contact, [key]: e.target.value },
                  })
                }
              />
            </div>
          ))}
          <div className="space-y-2 sm:col-span-2">
            <Label>Hours</Label>
            <Textarea
              rows={3}
              value={settings.contact?.hours || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  contact: { ...settings.contact, hours: e.target.value },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {(["instagram", "facebook", "youtube", "linkedin"] as const).map((key) => (
            <div key={key} className="space-y-2">
              <Label className="capitalize">{key}</Label>
              <Input
                value={settings.social?.[key] || ""}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    social: { ...settings.social, [key]: e.target.value },
                  })
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </form>
  );
}
