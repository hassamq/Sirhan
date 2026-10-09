"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type PostForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string;
  author: string;
  published: boolean;
};

const empty: PostForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "General",
  tags: "",
  author: "Sirhan Team",
  published: false,
};

export default function BlogEditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = params.id === "new";
  const [form, setForm] = useState<PostForm>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) return;
    api<{ post: PostForm & { tags?: string[] } }>(`/api/admin/blogs/${params.id}`)
      .then((data) =>
        setForm({
          title: data.post.title || "",
          slug: data.post.slug || "",
          excerpt: data.post.excerpt || "",
          content: data.post.content || "",
          coverImage: data.post.coverImage || "",
          category: data.post.category || "General",
          tags: (data.post.tags || []).join(", "),
          author: data.post.author || "Sirhan Team",
          published: Boolean(data.post.published),
        })
      )
      .catch((e) => toast.error(e.message));
  }, [isNew, params.id]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (isNew) {
        const data = await api<{ post: { _id: string } }>("/api/admin/blogs", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast.success("Post created");
        router.replace(`/blogs/${data.post._id}`);
      } else {
        await api(`/api/admin/blogs/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast.success("Post updated");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isNew ? "New blog post" : "Edit blog post"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Markdown-friendly content body is supported.
          </p>
        </div>
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save post"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-from-title if empty"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Author</Label>
              <Input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Cover image URL</Label>
              <Input
                value={form.coverImage}
                onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Tags (comma separated)</Label>
            <Input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Excerpt</Label>
            <Textarea
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <Textarea
              rows={14}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={form.published}
              onCheckedChange={(published) => setForm({ ...form, published })}
            />
            <Label>Published</Label>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
