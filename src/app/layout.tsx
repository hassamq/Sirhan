import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Great_Vibes } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Sirhan | Center for Well-Being",
  description:
    "Practical psychological support, career guidance, learning, and community wellbeing — accessible, confidential, and compassionate.",
  openGraph: {
    title: "Sirhan | Center for Well-Being",
    description:
      "Better minds. Stronger communities. Wellness support for mind, life & community.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${script.variable} h-full`}
    >
      <body className="min-h-full flex flex-col texture-paper antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
