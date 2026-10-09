import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Support | Sirhan",
  description: "Request a Sirhan session, consultation, or programme registration.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
