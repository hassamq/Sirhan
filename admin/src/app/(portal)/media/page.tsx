"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { api, getApiBase, getToken } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Media = {
  _id: string;
  filename: string;
  url: string;
  alt: string;
  size: number;
};

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [alt, setAlt] = useState("");
  const [uploading, setUploading] = useState(false);

  async function load() {
    const data = await api<{ media: Media[] }>("/api/admin/media");
    setMedia(data.media);
  }

  useEffect(() => {
    load().catch((e) => toast.error(e.message));
  }, []);

  async function onUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) return toast.error("Choose a file");

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("alt", alt);
      const token = getToken();
      const res = await fetch(`${getApiBase()}/api/admin/media`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      toast.success("Uploaded");
      setAlt("");
      form.reset();
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this media asset?")) return;
    try {
      await api(`/api/admin/media/${id}`, { method: "DELETE" });
      toast.success("Deleted");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Media</h1>
        <p className="text-sm text-muted-foreground">
          Upload images used for hero, blogs, and branding.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onUpload} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
            <div className="space-y-2">
              <Label htmlFor="file">File</Label>
              <Input id="file" name="file" type="file" accept="image/*" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alt">Alt text</Label>
              <Input id="alt" value={alt} onChange={(e) => setAlt(e.target.value)} />
            </div>
            <div className="flex items-end">
              <Button type="submit" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((item) => (
          <Card key={item._id} className="overflow-hidden">
            <div className="relative aspect-video bg-muted">
              <Image
                src={`${getApiBase()}${item.url}`}
                alt={item.alt || item.filename}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <CardContent className="space-y-2 p-4">
              <p className="truncate text-sm font-medium">{item.filename}</p>
              <p className="truncate text-xs text-muted-foreground">{item.url}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(item.url);
                    toast.success("URL copied");
                  }}
                >
                  Copy URL
                </Button>
                <Button size="sm" variant="destructive" onClick={() => remove(item._id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
