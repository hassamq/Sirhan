import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteProvider } from "@/components/SiteProvider";
import { CmsTheme } from "@/components/CmsTheme";
import { getSiteData } from "@/lib/cms";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  let site = {
    settings: null as Awaited<ReturnType<typeof getSiteData>>["settings"],
    pages: [] as Awaited<ReturnType<typeof getSiteData>>["pages"],
    posts: [] as Awaited<ReturnType<typeof getSiteData>>["posts"],
    nav: [] as Awaited<ReturnType<typeof getSiteData>>["nav"],
  };

  try {
    site = await getSiteData();
  } catch (error) {
    console.error("CMS unavailable, using defaults:", error);
  }

  return (
    <SiteProvider value={site}>
      <CmsTheme colors={site.settings?.colors} fonts={site.settings?.fonts} />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Link href="/book" className="chat-fab" aria-label="Start a conversation">
        <MessageCircle className="h-5 w-5" strokeWidth={1.6} />
      </Link>
    </SiteProvider>
  );
}
