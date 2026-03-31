"use client";

import { ContentBlock } from "@/lib/types/content";
import { MathText, DisplayMath } from "./Math";
import { visualizationRegistry } from "@/components/visualizations/registry";

/**
 * Renders an array of content blocks into the page.
 * This is the core rendering engine — content data flows in, styled content flows out.
 */
export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "text":
      return (
        <p className="leading-relaxed">
          <MathText text={block.body} />
        </p>
      );

    case "math":
      return <DisplayMath latex={block.latex} />;

    case "definition":
      return (
        <div className="math-block math-block-definition">
          <div className="font-sans text-sm font-semibold text-blue-700 mb-1">
            {block.label ? `${block.label}: ` : "Definition: "}
            {block.title}
          </div>
          <div className="mb-2">
            <MathText text={block.statement} />
          </div>
          {block.intuition && (
            <div className="mt-3 pt-3 border-t border-blue-200 text-stone-600 italic text-[0.95rem]">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-blue-500 not-italic block mb-1">
                Intuition
              </span>
              <MathText text={block.intuition} />
            </div>
          )}
        </div>
      );

    case "theorem":
      return (
        <div className="math-block math-block-theorem">
          <div className="font-sans text-sm font-semibold text-purple-700 mb-1">
            {block.label ?? "Theorem"}{block.title ? `: ${block.title}` : ""}
          </div>
          <div className="mb-2">
            <MathText text={block.statement} />
          </div>
          {block.intuition && (
            <div className="mt-3 pt-3 border-t border-purple-200 text-stone-600 italic text-[0.95rem]">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-purple-500 not-italic block mb-1">
                Intuition
              </span>
              <MathText text={block.intuition} />
            </div>
          )}
        </div>
      );

    case "proof":
      return (
        <div className="math-block math-block-proof">
          <div className="font-sans text-sm font-semibold text-yellow-700 mb-1">
            {block.label ?? "Proof"}
          </div>
          <div className="mb-2">
            <MathText text={block.body} />
          </div>
          {block.intuition && (
            <div className="mt-3 pt-3 border-t border-yellow-300 text-stone-600 italic text-[0.95rem]">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-yellow-600 not-italic block mb-1">
                What this proof is really doing
              </span>
              <MathText text={block.intuition} />
            </div>
          )}
          <div className="text-right text-stone-400 mt-2">&#9724;</div>
        </div>
      );

    case "example":
      return (
        <div className="math-block math-block-example">
          <div className="font-sans text-sm font-semibold text-green-700 mb-1">
            {block.title ?? "Example"}
          </div>
          <div className="mb-2">
            <MathText text={block.body} />
          </div>
          {block.solution && (
            <div className="mt-3 pt-3 border-t border-green-200">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-green-600 block mb-1">
                Solution
              </span>
              <MathText text={block.solution} />
            </div>
          )}
        </div>
      );

    case "visualization": {
      const Viz = visualizationRegistry[block.component];
      if (!Viz) {
        return (
          <div className="viz-container p-4 text-red-500 font-sans text-sm">
            Visualization not found: {block.component}
          </div>
        );
      }
      return (
        <div className="viz-container">
          <div className="p-4">
            <Viz {...(block.props ?? {})} />
          </div>
          {block.caption && (
            <div className="px-4 pb-3 text-sm text-stone-500 font-sans">
              {block.caption}
            </div>
          )}
        </div>
      );
    }

    case "note":
      return (
        <div className="bg-stone-100 border border-stone-200 rounded-md px-4 py-3 text-[0.95rem] text-stone-600">
          <MathText text={block.body} />
        </div>
      );

    default:
      return null;
  }
}
