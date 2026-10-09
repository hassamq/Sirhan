import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SWRConfig } from "swr";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sirhan Admin",
  description: "CMS portal for Sirhan Center for Well-Being",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <SWRConfig
          value={{
            revalidateOnFocus: true,
            dedupingInterval: 2000,
            shouldRetryOnError: false,
          }}
        >
          <TooltipProvider>
            {children}
            <Toaster richColors position="top-right" closeButton />
          </TooltipProvider>
        </SWRConfig>
      </body>
    </html>
  );
}
