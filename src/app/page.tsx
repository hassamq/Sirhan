import { Hero } from "@/components/Hero";
import { SupportGrid } from "@/components/SupportGrid";
import { FreeTools } from "@/components/FreeTools";
import { ExploreTopics } from "@/components/ExploreTopics";
import { WorkshopsQuote } from "@/components/WorkshopsQuote";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SupportGrid />
      <FreeTools />
      <ExploreTopics />
      <WorkshopsQuote />
    </>
  );
}
