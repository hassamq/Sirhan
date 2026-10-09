"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Post = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  updatedAt: string;
};

export default function BlogsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  async function load() {
    const data = await api<{ posts: Post[] }>("/api/admin/blogs");
    setPosts(data.posts);
  }

  useEffect(() => {
    load().catch((e) => toast.error(e.message));
  }, []);

  async function remove(id: string) {
    if (!confirm("Delete this blog post?")) return;
    try {
      await api(`/api/admin/blogs/${id}`, { method: "DELETE" });
      toast.success("Post deleted");
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blogs"
        description="Create and publish articles for the resources section."
        actions={
          <Link href="/blogs/new" className={cn(buttonVariants())}>
            New post
          </Link>
        }
      />

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post._id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <Link
                    href={`/blogs/${post._id}`}
                    className={cn(buttonVariants({ size: "sm", variant: "outline" }))}
                  >
                    Edit
                  </Link>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => remove(post._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No posts yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
