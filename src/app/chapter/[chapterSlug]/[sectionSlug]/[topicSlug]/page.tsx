import { notFound } from "next/navigation";
import { chapters } from "@/content/chapters";
import { TopicPage } from "@/components/ui/TopicPage";

/**
 * Topic page — the main content page.
 * Renders explanation blocks, examples, and practice problems.
 */
export function generateStaticParams() {
  const params: {
    chapterSlug: string;
    sectionSlug: string;
    topicSlug: string;
  }[] = [];
  for (const ch of chapters) {
    for (const sec of ch.sections) {
      for (const topic of sec.topics) {
        params.push({
          chapterSlug: ch.slug,
          sectionSlug: sec.slug,
          topicSlug: topic.slug,
        });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterSlug: string; sectionSlug: string; topicSlug: string }>;
}) {
  const { chapterSlug, sectionSlug, topicSlug } = await params;
  const chapter = chapters.find((c) => c.slug === chapterSlug);
  const section = chapter?.sections.find((s) => s.slug === sectionSlug);
  const topic = section?.topics.find((t) => t.slug === topicSlug);

  return {
    title: topic
      ? `${topic.title} — Linear Algebra Done Right`
      : "Linear Algebra Done Right",
  };
}

export default async function TopicRoute({
  params,
}: {
  params: Promise<{ chapterSlug: string; sectionSlug: string; topicSlug: string }>;
}) {
  const { chapterSlug, sectionSlug, topicSlug } = await params;

  const chapter = chapters.find((c) => c.slug === chapterSlug);
  if (!chapter) notFound();

  const section = chapter.sections.find((s) => s.slug === sectionSlug);
  if (!section) notFound();

  const topic = section.topics.find((t) => t.slug === topicSlug);
  if (!topic) notFound();

  // Find prev/next for navigation
  const allTopics = chapters.flatMap((ch) =>
    ch.sections.flatMap((sec) =>
      sec.topics.map((t) => ({
        topic: t,
        href: `/chapter/${ch.slug}/${sec.slug}/${t.slug}`,
        chapterTitle: ch.title,
        sectionTitle: sec.title,
      }))
    )
  );
  const currentIdx = allTopics.findIndex((t) => t.topic.id === topic.id);
  const prev = currentIdx > 0 ? allTopics[currentIdx - 1] : null;
  const next =
    currentIdx < allTopics.length - 1 ? allTopics[currentIdx + 1] : null;

  return (
    <TopicPage
      chapter={chapter}
      section={section}
      topic={topic}
      prev={prev ? { title: prev.topic.title, href: prev.href } : null}
      next={next ? { title: next.topic.title, href: next.href } : null}
    />
  );
}
