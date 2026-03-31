"use client";

import katex from "katex";
import { useMemo } from "react";

/**
 * Renders LaTeX math using KaTeX.
 * - InlineMath: renders inline (no line break)
 * - DisplayMath: renders as display block (centered, own line)
 * - MathText: parses a string and renders $...$ as inline math, $$...$$ as display math
 */

interface MathProps {
  latex: string;
  className?: string;
}

function renderKatex(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: true,
      macros: {
        "\\R": "\\mathbb{R}",
        "\\C": "\\mathbb{C}",
        "\\F": "\\mathbb{F}",
        "\\N": "\\mathbb{N}",
        "\\Z": "\\mathbb{Z}",
        "\\nullspace": "\\text{null}",
        "\\range": "\\text{range}",
        "\\dim": "\\text{dim}",
        "\\span": "\\text{span}",
        "\\rank": "\\text{rank}",
        "\\im": "\\text{im}",
        "\\ker": "\\text{ker}",
      },
    });
  } catch {
    return `<span class="text-red-500">[LaTeX error: ${latex}]</span>`;
  }
}

export function InlineMath({ latex, className }: MathProps) {
  const html = useMemo(() => renderKatex(latex, false), [latex]);
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function DisplayMath({ latex, className }: MathProps) {
  const html = useMemo(() => renderKatex(latex, true), [latex]);
  return (
    <div
      className={`katex-display ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Parses text containing $...$ (inline) and $$...$$ (display) math,
 * rendering each segment appropriately.
 */
export function MathText({ text, className }: { text: string; className?: string }) {
  const segments = useMemo(() => parseTextWithMath(text), [text]);

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.type === "text") {
          return <span key={i}>{seg.content}</span>;
        }
        if (seg.type === "display") {
          return (
            <span
              key={i}
              dangerouslySetInnerHTML={{
                __html: renderKatex(seg.content, true),
              }}
            />
          );
        }
        // inline math
        return (
          <span
            key={i}
            dangerouslySetInnerHTML={{
              __html: renderKatex(seg.content, false),
            }}
          />
        );
      })}
    </span>
  );
}

interface Segment {
  type: "text" | "inline" | "display";
  content: string;
}

function parseTextWithMath(text: string): Segment[] {
  const segments: Segment[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    // look for $$ first (display math)
    const displayIdx = remaining.indexOf("$$");
    const inlineIdx = remaining.indexOf("$");

    if (displayIdx === -1 && inlineIdx === -1) {
      // no more math
      segments.push({ type: "text", content: remaining });
      break;
    }

    if (displayIdx !== -1 && (displayIdx <= inlineIdx || inlineIdx === -1)) {
      // display math comes first
      if (displayIdx > 0) {
        segments.push({ type: "text", content: remaining.slice(0, displayIdx) });
      }
      const closeIdx = remaining.indexOf("$$", displayIdx + 2);
      if (closeIdx === -1) {
        // unmatched $$, treat as text
        segments.push({ type: "text", content: remaining.slice(displayIdx) });
        break;
      }
      segments.push({
        type: "display",
        content: remaining.slice(displayIdx + 2, closeIdx),
      });
      remaining = remaining.slice(closeIdx + 2);
    } else {
      // inline math
      if (inlineIdx > 0) {
        segments.push({ type: "text", content: remaining.slice(0, inlineIdx) });
      }
      const closeIdx = remaining.indexOf("$", inlineIdx + 1);
      if (closeIdx === -1) {
        segments.push({ type: "text", content: remaining.slice(inlineIdx) });
        break;
      }
      segments.push({
        type: "inline",
        content: remaining.slice(inlineIdx + 1, closeIdx),
      });
      remaining = remaining.slice(closeIdx + 1);
    }
  }

  return segments;
}
