"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";
import { useAdminQuery, adminMutate, liveSavedToast } from "@/lib/swr";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PageDoc = {
  _id: string;
  slug: string;
  title: string;
  sections: Record<string, Record<string, string>>;
};

export default function ContentPage() {
  const { data, isLoading, error } = useAdminQuery<{ pages: PageDoc[] }>(
    "/api/admin/pages"
  );
  const pages = data?.pages || [];
  const [selectedId, setSelectedId] = useState("");
  const [draft, setDraft] = useState<PageDoc | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (!pages.length) return;
    if (!selectedId) {
      setSelectedId(pages[0]._id);
      setDraft(structuredClone(pages[0]));
      return;
    }
    const current = pages.find((p) => p._id === selectedId);
    if (current && (!draft || draft._id !== selectedId)) {
      setDraft(structuredClone(current));
    }
  }, [pages, selectedId, draft]);

  function selectPage(id: string) {
    const page = pages.find((p) => p._id === id);
    setSelectedId(id);
    setDraft(page ? structuredClone(page) : null);
  }

  async function save() {
    if (!draft) return;
    setSaving(true);
    try {
      const result = await adminMutate<{ page: PageDoc }>(
        `/api/admin/pages/${draft._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title: draft.title,
            slug: draft.slug,
            sections: draft.sections,
          }),
        },
        ["/api/admin/pages"]
      );
      setDraft(result.page);
      liveSavedToast(toast, `“${result.page.title}” published to the live site`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading pages...</p>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Page Content"
        description="Edit section copy for every public page. Changes go live immediately after save."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{pages.length} pages</Badge>
            <a
              href={
                draft
                  ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}${draft.slug === "home" ? "/" : `/${draft.slug}`}`
                  : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
              }
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
            >
              Preview page
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Button onClick={save} disabled={!draft || saving}>
              {saving ? "Publishing..." : "Save & publish"}
            </Button>
          </div>
        }
      />

      <div className="max-w-sm space-y-2">
        <Label>Select page</Label>
        <Select
          value={selectedId}
          onValueChange={(id) => {
            if (id) selectPage(id);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a page" />
          </SelectTrigger>
          <SelectContent>
            {pages.map((page) => (
              <SelectItem key={page._id} value={page._id}>
                {page.title} ({page.slug})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {draft && (
        <div className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Page meta</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={draft.slug}
                  onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {Object.entries(draft.sections || {}).map(([sectionKey, fields]) => (
            <Card key={sectionKey} className="shadow-sm">
              <CardHeader>
                <CardTitle className="capitalize">{sectionKey} section</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {Object.entries(fields || {}).map(([fieldKey, value]) => (
                  <div key={fieldKey} className="space-y-2">
                    <Label className="capitalize">{fieldKey}</Label>
                    {String(value).length > 80 ? (
                      <Textarea
                        rows={4}
                        value={String(value)}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            sections: {
                              ...draft.sections,
                              [sectionKey]: {
                                ...draft.sections[sectionKey],
                                [fieldKey]: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    ) : (
                      <Input
                        value={String(value)}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            sections: {
                              ...draft.sections,
                              [sectionKey]: {
                                ...draft.sections[sectionKey],
                                [fieldKey]: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
