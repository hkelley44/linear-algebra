/**
 * Content type system for the linear algebra course.
 *
 * Structure mirrors Axler: Chapter -> Section -> Topic.
 * Each topic page has explanations, visualizations, examples, and practice problems.
 */

export interface Chapter {
  id: number;
  title: string;
  slug: string;
  description: string;
  sections: Section[];
}

export interface Section {
  id: string; // e.g., "1.1", "2.3"
  title: string;
  slug: string;
  chapterId: number;
  topics: Topic[];
}

export interface Topic {
  id: string; // e.g., "1.1.1"
  title: string;
  slug: string;
  sectionId: string;
  content: TopicContent;
}

export interface TopicContent {
  explanation: ContentBlock[];
  examples: Example[];
  practiceProblems: PracticeProblem[];
}

/** A block of content — can be text, math, a theorem, definition, proof, or visualization */
export type ContentBlock =
  | TextBlock
  | MathBlock
  | TheoremBlock
  | DefinitionBlock
  | ProofBlock
  | ExampleBlock
  | VisualizationBlock
  | NoteBlock;

export interface TextBlock {
  type: "text";
  body: string; // supports inline KaTeX via $...$
}

export interface MathBlock {
  type: "math";
  latex: string; // display math
}

export interface TheoremBlock {
  type: "theorem";
  label?: string; // e.g., "Theorem 1.34"
  title?: string;
  statement: string;
  intuition?: string; // plain-language companion explanation
}

export interface DefinitionBlock {
  type: "definition";
  label?: string;
  title: string;
  statement: string;
  intuition?: string;
}

export interface ProofBlock {
  type: "proof";
  label?: string;
  body: string;
  intuition?: string; // "what this proof is really doing"
}

export interface ExampleBlock {
  type: "example";
  title?: string;
  body: string;
  solution?: string;
}

export interface VisualizationBlock {
  type: "visualization";
  component: string; // component key for dynamic rendering
  props?: Record<string, unknown>;
  caption?: string;
}

export interface NoteBlock {
  type: "note";
  body: string;
}

export interface Example {
  title: string;
  problem: string;
  solution: string;
}

/** Practice problem types */
export type PracticeProblem =
  | MultipleChoiceProblem
  | FreeResponseProblem
  | SelectAllProblem;

interface BaseProblem {
  id: string;
  question: string; // supports KaTeX
  hint?: string;
  source?: "axler" | "custom";
  difficulty: "basic" | "standard" | "challenge";
}

export interface MultipleChoiceProblem extends BaseProblem {
  type: "multiple-choice";
  choices: { label: string; text: string }[];
  correctAnswer: string; // label of correct choice
  explanation: string;
}

export interface FreeResponseProblem extends BaseProblem {
  type: "free-response";
  acceptedAnswers: string[]; // normalized accepted values
  explanation: string;
}

export interface SelectAllProblem extends BaseProblem {
  type: "select-all";
  choices: { label: string; text: string }[];
  correctAnswers: string[]; // labels of all correct choices
  explanation: string;
}

/** Navigation structure derived from content */
export interface NavItem {
  type: "chapter" | "section" | "topic";
  id: string;
  title: string;
  slug: string;
  href: string;
  children?: NavItem[];
}
