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
  const firstSection = chapter.sections[0];
  const firstTopic = firstSection.topics[0];
  redirect(
    `/chapter/${chapterSlug}/${firstSection.slug}/${firstTopic?.slug ?? ""}`
  );
}
