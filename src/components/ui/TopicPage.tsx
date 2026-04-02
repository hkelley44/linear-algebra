"use client";

import Link from "next/link";
import { Chapter, Section, Topic } from "@/lib/types/content";
import { ContentRenderer } from "./ContentRenderer";
import { ProblemSet } from "@/components/practice/ProblemSet";
import { MathText } from "./Math";

interface TopicPageProps {
  chapter: Chapter;
  section: Section;
  topic: Topic;
  prev: { title: string; href: string } | null;
  next: { title: string; href: string } | null;
}

export function TopicPage({ chapter, section, topic, prev, next }: TopicPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10">
      {/* Breadcrumb */}
      <nav className="font-sans text-sm text-stone-400 mb-6">
        <Link href="/" className="hover:text-stone-600 transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/chapter/${chapter.slug}`}
          className="hover:text-stone-600 transition-colors"
        >
          Ch. {chapter.id}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-stone-500">{section.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <p className="font-sans text-sm text-blue-600 font-medium mb-1">
          Chapter {chapter.id} &middot; Section {section.id}
        </p>
        <h1 className="font-sans text-2xl font-bold text-stone-900 mb-2">
          {topic.title}
        </h1>
      </header>

      {/* Main content */}
      <article>
        <ContentRenderer blocks={topic.content.explanation} />

        {/* Worked examples */}
        {topic.content.examples.length > 0 && (
          <div className="mt-10 pt-6 border-t border-stone-200">
            <h3 className="font-sans text-lg font-bold text-stone-800 mb-4">
              Worked Examples
            </h3>
            <div className="space-y-6">
              {topic.content.examples.map((ex, i) => (
                <div
                  key={`example-${i}`}
                  className="math-block math-block-example"
                >
                  <div className="font-sans text-sm font-semibold text-green-700 mb-1">
                    {ex.title}
                  </div>
                  <div className="mb-3">
                    <MathText text={ex.problem} />
                  </div>
                  <div className="pt-3 border-t border-green-200">
                    <span className="font-sans text-xs font-semibold uppercase tracking-wide text-green-600 block mb-1">
                      Solution
                    </span>
                    <MathText text={ex.solution} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practice problems */}
        <ProblemSet problems={topic.content.practiceProblems} />
      </article>

      {/* Prev/Next navigation */}
      <nav className="mt-16 pt-8 border-t border-stone-200 flex justify-between font-sans text-sm">
        {prev ? (
          <Link
            href={prev.href}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            &larr; {prev.title}
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={next.href}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {next.title} &rarr;
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
