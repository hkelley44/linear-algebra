import { redirect } from "next/navigation";
import { chapters } from "@/content/chapters";

/**
 * Section page redirects to its first topic.
 */
export function generateStaticParams() {
  const params: { chapterSlug: string; sectionSlug: string }[] = [];
  for (const ch of chapters) {
    for (const sec of ch.sections) {
      params.push({ chapterSlug: ch.slug, sectionSlug: sec.slug });
    }
  }
  return params;
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ chapterSlug: string; sectionSlug: string }>;
}) {
  const { chapterSlug, sectionSlug } = await params;
  const chapter = chapters.find((c) => c.slug === chapterSlug);
  const section = chapter?.sections.find((s) => s.slug === sectionSlug);
  if (!section || section.topics.length === 0) {
    redirect(`/chapter/${chapterSlug}`);
  }
  redirect(
    `/chapter/${chapterSlug}/${sectionSlug}/${section.topics[0].slug}`
  );
}
