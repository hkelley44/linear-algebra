import Link from "next/link";
import { chapters } from "@/content/chapters";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <header className="mb-12">
        <h1 className="font-sans text-3xl font-bold text-stone-900 mb-3">
          Linear Algebra Done Right
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed">
          An interactive course based on Sheldon Axler&apos;s textbook. Every concept
          is explained from scratch with formal definitions, intuitive
          companion explanations, interactive visualizations, and practice
          problems with immediate feedback.
        </p>
      </header>

      <div className="space-y-8">
        {chapters.map((chapter) => (
          <section key={chapter.id} className="group">
            <h2 className="font-sans text-xl font-bold text-stone-800 mb-2">
              <span className="text-stone-400 mr-2">Chapter {chapter.id}</span>
              {chapter.title}
            </h2>
            <p className="text-stone-600 mb-4 text-[0.95rem]">
              {chapter.description}
            </p>
            <div className="grid gap-2">
              {chapter.sections.map((section) => (
                <Link
                  key={section.id}
                  href={`/chapter/${chapter.slug}/${section.slug}/${section.topics[0]?.slug ?? ""}`}
                  className="flex items-baseline gap-3 px-4 py-3 rounded-lg border border-stone-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors font-sans"
                >
                  <span className="text-sm text-stone-400 font-medium">
                    {section.id}
                  </span>
                  <span className="text-sm text-stone-700 font-medium">
                    {section.title}
                  </span>
                  <span className="ml-auto text-xs text-stone-400">
                    {section.topics.length} topic{section.topics.length !== 1 ? "s" : ""}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-16 pt-8 border-t border-stone-200 text-sm text-stone-400 font-sans">
        <p>
          Based on <em>Linear Algebra Done Right</em> by Sheldon Axler.
          Chapters 1&ndash;3.
        </p>
      </footer>
    </div>
  );
}
