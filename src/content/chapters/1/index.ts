import { Chapter } from "@/lib/types/content";
import { rnAndCn } from "./rn-and-cn";
import { definitionOfVectorSpace } from "./definition-of-vector-space";
import { subspaces } from "./subspaces";

export const chapter1: Chapter = {
  id: 1,
  title: "Vector Spaces",
  slug: "vector-spaces",
  description:
    "We start with the most fundamental object in linear algebra: the vector space. This chapter builds up from the concrete (lists of numbers) to the abstract (any set with the right structure).",
  sections: [
    {
      id: "1.1",
      title: "R^n and C^n",
      slug: "rn-and-cn",
      chapterId: 1,
      topics: [rnAndCn],
    },
    {
      id: "1.2",
      title: "Definition of Vector Space",
      slug: "definition-of-vector-space",
      chapterId: 1,
      topics: [definitionOfVectorSpace],
    },
    {
      id: "1.3",
      title: "Subspaces",
      slug: "subspaces",
      chapterId: 1,
      topics: [subspaces],
    },
  ],
};
