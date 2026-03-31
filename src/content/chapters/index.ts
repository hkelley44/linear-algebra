import { Chapter } from "@/lib/types/content";
import { chapter1 } from "./1";
import { chapter2 } from "./2";
import { chapter3 } from "./3";

/**
 * All chapters in order. To add a new chapter, create a directory and import it here.
 * This is the only file that needs modification when adding chapters.
 */
export const chapters: Chapter[] = [chapter1, chapter2, chapter3];

/** Lookup helpers */
export function getChapter(id: number): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function getSection(chapterId: number, sectionSlug: string) {
  const chapter = getChapter(chapterId);
  return chapter?.sections.find((s) => s.slug === sectionSlug);
}

export function getTopic(chapterId: number, sectionSlug: string, topicSlug: string) {
  const section = getSection(chapterId, sectionSlug);
  return section?.topics.find((t) => t.slug === topicSlug);
}

/** Build the full navigation tree */
export function buildNavTree() {
  return chapters.map((ch) => ({
    type: "chapter" as const,
    id: String(ch.id),
    title: `${ch.id}. ${ch.title}`,
    slug: ch.slug,
    href: `/chapter/${ch.slug}`,
    children: ch.sections.map((sec) => ({
      type: "section" as const,
      id: sec.id,
      title: sec.title,
      slug: sec.slug,
      href: `/chapter/${ch.slug}/${sec.slug}`,
      children: sec.topics.map((topic) => ({
        type: "topic" as const,
        id: topic.id,
        title: topic.title,
        slug: topic.slug,
        href: `/chapter/${ch.slug}/${sec.slug}/${topic.slug}`,
      })),
    })),
  }));
}
