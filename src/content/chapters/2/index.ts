import { Chapter } from "@/lib/types/content";
import { spanAndLinearCombinations } from "./span-and-linear-combinations";
import { linearIndependence } from "./linear-independence";
import { bases } from "./bases";
import { dimension } from "./dimension";

export const chapter2: Chapter = {
  id: 2,
  title: "Finite-Dimensional Vector Spaces",
  slug: "finite-dimensional-vector-spaces",
  description:
    "Now we ask: how big is a vector space? This chapter introduces the concepts of span, linear independence, basis, and dimension — the tools for measuring the \"size\" of a vector space.",
  sections: [
    {
      id: "2.1",
      title: "Span and Linear Combinations",
      slug: "span-and-linear-combinations",
      chapterId: 2,
      topics: [spanAndLinearCombinations],
    },
    {
      id: "2.2",
      title: "Linear Independence",
      slug: "linear-independence",
      chapterId: 2,
      topics: [linearIndependence],
    },
    {
      id: "2.3",
      title: "Bases",
      slug: "bases",
      chapterId: 2,
      topics: [bases],
    },
    {
      id: "2.4",
      title: "Dimension",
      slug: "dimension",
      chapterId: 2,
      topics: [dimension],
    },
  ],
};
