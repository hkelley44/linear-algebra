import { Chapter } from "@/lib/types/content";
import { definitionAndExamples } from "./definition-and-examples";
import { nullSpaceAndRange } from "./null-space-and-range";
import { matrixOfLinearMap } from "./matrix-of-linear-map";
import { invertibility } from "./invertibility";

export const chapter3: Chapter = {
  id: 3,
  title: "Linear Maps",
  slug: "linear-maps",
  description:
    "Vector spaces are the objects; linear maps are the transformations between them. This chapter introduces the central concept of a structure-preserving map and develops the fundamental theorem connecting null space, range, and dimension.",
  sections: [
    {
      id: "3.1",
      title: "Definition and Examples of Linear Maps",
      slug: "definition-and-examples",
      chapterId: 3,
      topics: [definitionAndExamples],
    },
    {
      id: "3.2",
      title: "Null Space and Range",
      slug: "null-space-and-range",
      chapterId: 3,
      topics: [nullSpaceAndRange],
    },
    {
      id: "3.3",
      title: "Matrix of a Linear Map",
      slug: "matrix-of-linear-map",
      chapterId: 3,
      topics: [matrixOfLinearMap],
    },
    {
      id: "3.4",
      title: "Invertibility",
      slug: "invertibility",
      chapterId: 3,
      topics: [invertibility],
    },
  ],
};
