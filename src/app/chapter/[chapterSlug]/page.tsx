import { redirect } from "next/navigation";
import { chapters } from "@/content/chapters";

/**
 * Chapter page redirects to the first section's first topic.
 */
export function generateStaticParams() {
  return chapters.map((ch) => ({ chapterSlug: ch.slug }));
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>;
}) {
  const { chapterSlug } = await params;
  const chapter = chapters.find((c) => c.slug === chapterSlug);
  if (!chapter || chapter.sections.length === 0) {
    redirect("/");
  }

  // Find the first section that actually has topics
  const firstSectionWithTopics = chapter.sections.find(
    (s) => s.topics.length > 0
  );
  if (!firstSectionWithTopics) {
    redirect("/");
  }
  redirect(
    `/chapter/${chapterSlug}/${firstSectionWithTopics.slug}/${firstSectionWithTopics.topics[0].slug}`
  );
}
