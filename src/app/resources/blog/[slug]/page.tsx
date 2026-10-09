import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDb } from "@/lib/db";
import { BlogPost } from "@/lib/models";
import { ensureSeeded } from "@/lib/seed";
import { PageHero } from "@/components/PageHero";
import { ContentBlock } from "@/components/PageSections";

type Params = { params: Promise<{ slug: string }> };

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  await ensureSeeded();
  await connectDb();
  const post = await BlogPost.findOne({ slug, published: true }).lean();
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={post.category || "Blog"}
        title={post.title}
        description={post.excerpt || ""}
        ctas={[{ label: "Back to resources", href: "/resources", variant: "ghost" }]}
      />
      <ContentBlock>
        <article className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm text-muted">
            By {post.author || "Sirhan Team"}
            {post.publishedAt
              ? ` · ${new Date(post.publishedAt).toLocaleDateString()}`
              : ""}
          </p>
          <div className="space-y-4 whitespace-pre-wrap text-[1.05rem] leading-relaxed text-stone">
            {post.content}
          </div>
          <Link href="/resources" className="link-arrow mt-10">
            ← All resources
          </Link>
        </article>
      </ContentBlock>
    </>
  );
}
