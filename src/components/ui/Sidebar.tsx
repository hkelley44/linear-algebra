"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildNavTree } from "@/content/chapters";

/**
 * Sidebar navigation. Expandable chapter -> section -> topic tree.
 * Active item highlighted based on current pathname.
 */
export function Sidebar() {
  const navTree = buildNavTree();
  const pathname = usePathname();
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    () => {
      // Auto-expand the chapter containing the current page
      const initial = new Set<string>();
      for (const ch of navTree) {
        if (pathname.startsWith(ch.href)) {
          initial.add(ch.id);
        }
      }
      // If no chapter is active, expand the first one
      if (initial.size === 0 && navTree.length > 0) {
        initial.add(navTree[0].id);
      }
      return initial;
    }
  );
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => {
      const initial = new Set<string>();
      for (const ch of navTree) {
        for (const sec of ch.children ?? []) {
          if (pathname.startsWith(sec.href)) {
            initial.add(sec.id);
          }
        }
      }
      return initial;
    }
  );

  const toggleChapter = (id: string) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-stone-200 overflow-y-auto py-6 px-4 font-sans">
      <Link href="/" className="block mb-6 px-2">
        <h1 className="text-sm font-bold text-stone-800 leading-tight">
          Linear Algebra
        </h1>
        <p className="text-xs text-stone-400 mt-0.5">Done Right — Interactive</p>
      </Link>

      <nav className="space-y-1">
        {navTree.map((ch) => (
          <div key={ch.id}>
            {/* Chapter header */}
            <button
              onClick={() => toggleChapter(ch.id)}
              className={`w-full text-left px-2 py-1.5 rounded-md text-sm font-semibold transition-colors cursor-pointer ${
                pathname.startsWith(ch.href)
                  ? "text-blue-700 bg-blue-50"
                  : "text-stone-700 hover:bg-stone-50"
              }`}
            >
              <span className="text-stone-400 mr-1.5">{ch.id}.</span>
              {ch.title.replace(/^\d+\.\s*/, "")}
              <span className="float-right text-stone-300">
                {expandedChapters.has(ch.id) ? "−" : "+"}
              </span>
            </button>

            {/* Sections */}
            {expandedChapters.has(ch.id) && (
              <div className="ml-3 mt-0.5 space-y-0.5">
                {(ch.children ?? []).map((sec) => (
                  <div key={sec.id}>
                    <button
                      onClick={() => toggleSection(sec.id)}
                      className={`w-full text-left px-2 py-1 rounded text-[13px] transition-colors cursor-pointer ${
                        pathname.startsWith(sec.href)
                          ? "text-blue-600 font-medium"
                          : "text-stone-500 hover:text-stone-700"
                      }`}
                    >
                      <span className="text-stone-300 mr-1">{sec.id}</span>
                      {sec.title}
                    </button>

                    {/* Topics */}
                    {expandedSections.has(sec.id) && (
                      <div className="ml-4 mt-0.5 space-y-0.5">
                        {(sec.children ?? []).map((topic) => (
                          <Link
                            key={topic.id}
                            href={topic.href}
                            className={`sidebar-link block px-2 py-0.5 rounded text-xs ${
                              pathname === topic.href
                                ? "active text-blue-600 bg-blue-50 font-medium"
                                : "text-stone-400 hover:text-stone-600"
                            }`}
                          >
                            {topic.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
