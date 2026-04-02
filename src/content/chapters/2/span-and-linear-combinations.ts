import { Topic } from "@/lib/types/content";

export const spanAndLinearCombinations: Topic = {
  id: "2.1.1",
  title: "Span and Linear Combinations",
  slug: "span-and-linear-combinations",
  sectionId: "2.1",
  content: {
    explanation: [
      {
        type: "text",
        body: "The fundamental question of this chapter is: given some vectors, what can you build from them? The answer involves two operations -- addition and scalar multiplication -- and the concept of a linear combination.",
      },
      {
        type: "definition",
        label: "Definition 2.1",
        title: "Linear Combination",
        statement:
          "A linear combination of a list of vectors $v_1, \\ldots, v_m \\in V$ is a vector of the form$$a_1 v_1 + a_2 v_2 + \\cdots + a_m v_m$$where $a_1, \\ldots, a_m \\in \\F$. The scalars $a_1, \\ldots, a_m$ are called the coefficients of the linear combination.",
        intuition:
          "A linear combination is anything you can build by scaling each vector and adding the results. It's the most general thing you can do with the two vector space operations. For example, $3v_1 - 2v_2 + v_3$ is a linear combination with coefficients $3, -2, 1$.",
      },
      {
        type: "definition",
        label: "Definition 2.2",
        title: "Span",
        statement:
          "The span of a list of vectors $v_1, \\ldots, v_m$ is the set of all linear combinations:$$\\text{span}(v_1, \\ldots, v_m) = \\{a_1 v_1 + \\cdots + a_m v_m : a_1, \\ldots, a_m \\in \\F\\}$$The span of the empty list is defined to be $\\{0\\}$.",
        intuition:
          "The span is everything you can \"reach\" by combining the given vectors. In $\\R^2$: span of one nonzero vector is a line, span of two non-collinear vectors is the whole plane. The span tells you the \"reach\" of your vectors.",
      },
      {
        type: "visualization",
        component: "SpanViz",
        caption:
          "Explore how span changes with one vector vs. two. When vectors are collinear, the span stays a line.",
      },
      {
        type: "theorem",
        label: "Theorem 2.3",
        title: "Span is a Subspace",
        statement:
          "The span of any list of vectors in $V$ is a subspace of $V$.",
        intuition:
          "This makes sense: if you can reach two vectors via linear combinations, then their sum is also a linear combination (just add the coefficients). And scaling a linear combination is a linear combination (just scale the coefficients).",
      },
      {
        type: "proof",
        body: "Let $v_1, \\ldots, v_m \\in V$. We verify the three subspace conditions for $\\text{span}(v_1, \\ldots, v_m)$:\n\n1. $0 = 0v_1 + \\cdots + 0v_m \\in \\text{span}(v_1, \\ldots, v_m)$.\n\n2. If $u = a_1v_1 + \\cdots + a_mv_m$ and $w = b_1v_1 + \\cdots + b_mv_m$, then $u + w = (a_1+b_1)v_1 + \\cdots + (a_m+b_m)v_m \\in \\text{span}(v_1, \\ldots, v_m)$.\n\n3. If $u = a_1v_1 + \\cdots + a_mv_m$ and $\\lambda \\in \\F$, then $\\lambda u = (\\lambda a_1)v_1 + \\cdots + (\\lambda a_m)v_m \\in \\text{span}(v_1, \\ldots, v_m)$.",
        intuition:
          "Each condition boils down to: combining linear combinations gives another linear combination.",
      },
      {
        type: "definition",
        label: "Definition 2.4",
        title: "Spans / Finite-Dimensional",
        statement:
          "If $\\text{span}(v_1, \\ldots, v_m) = V$, we say the list $v_1, \\ldots, v_m$ spans $V$. A vector space is finite-dimensional if some list of vectors in it spans it.",
        intuition:
          "\"Spans $V$\" means every vector in $V$ can be written as a linear combination of $v_1, \\ldots, v_m$. Finite-dimensional means you can describe the whole space with finitely many vectors. $\\R^n$ is finite-dimensional (the standard basis vectors span it). The space of all polynomials is not (no finite list spans it).",
      },
      {
        type: "example",
        title: "Spanning R^3",
        body: "The vectors $e_1 = (1,0,0)$, $e_2 = (0,1,0)$, $e_3 = (0,0,1)$ span $\\R^3$. Any vector $(a,b,c)$ can be written as $ae_1 + be_2 + ce_3$. These are the standard basis vectors.",
      },
      {
        type: "example",
        title: "A set that doesn't span",
        body: "The vectors $(1,0,0)$ and $(0,1,0)$ do NOT span $\\R^3$. Their span is $\\{(a,b,0) : a,b \\in \\R\\}$, which is the $xy$-plane. The vector $(0,0,1)$ is not in this span -- you can't produce a nonzero third component from linear combinations of these two vectors.",
      },
      {
        type: "note",
        body: "The span of a list of vectors is always the smallest subspace containing those vectors. This is because any subspace containing $v_1, \\ldots, v_m$ must contain all their linear combinations (by closure), and the span is exactly the set of all linear combinations.",
      },
    ],
    examples: [
      {
        title: "Span of a single vector",
        problem:
          "Describe $\\text{span}((2, 3))$ geometrically in $\\R^2$.",
        solution:
          "$\\text{span}((2,3)) = \\{t(2,3) : t \\in \\R\\} = \\{(2t, 3t) : t \\in \\R\\}$. This is the line through the origin with slope $3/2$.",
      },
      {
        title: "Checking if a vector is in a span",
        problem:
          "Is $(1, 1, 1) \\in \\text{span}((1, 0, 1), (0, 1, 0))$?",
        solution:
          "We need to find $a, b$ such that $a(1,0,1) + b(0,1,0) = (1,1,1)$. This gives $a = 1$, $b = 1$, $a = 1$. Check: $(1,0,1) + (0,1,0) = (1,1,1)$. Yes, it's in the span.",
      },
    ],
    practiceProblems: [
      {
        id: "2.1.1-p1",
        type: "multiple-choice",
        question:
          "Which of the following is a linear combination of $(1, 0)$ and $(0, 1)$?",
        choices: [
          { label: "A", text: "$(3, -7)$" },
          { label: "B", text: "$(\\pi, e)$" },
          { label: "C", text: "Both A and B" },
          { label: "D", text: "Neither A nor B" },
        ],
        correctAnswer: "C",
        explanation:
          "Every vector in $\\R^2$ is a linear combination of $(1,0)$ and $(0,1)$: $(a,b) = a(1,0) + b(0,1)$. So $(3, -7) = 3(1,0) + (-7)(0,1)$ and $(\\pi, e) = \\pi(1,0) + e(0,1)$. Both are linear combinations.",
        difficulty: "basic",
        source: "custom",
      },
      {
        id: "2.1.1-p2",
        type: "free-response",
        question:
          "Is the vector $(3, 5, 1)$ in $\\text{span}((1, 1, 0), (1, 2, 1))$? (Answer yes or no.)",
        acceptedAnswers: ["no", "No", "NO"],
        explanation:
          "We need $a(1,1,0) + b(1,2,1) = (3,5,1)$. This gives three equations: $a+b = 3$, $a+2b = 5$, $b = 1$. The third equation gives $b = 1$, but subtracting the first from the second gives $b = 2$. These are contradictory, so no solution exists. The vector $(3, 5, 1)$ is not in the span.",
        difficulty: "standard",
        source: "custom",
      },
      {
        id: "2.1.1-p3",
        type: "multiple-choice",
        question:
          "The span of the empty list of vectors is:",
        choices: [
          { label: "A", text: "The empty set" },
          { label: "B", text: "$\\{0\\}$" },
          { label: "C", text: "The whole vector space" },
          { label: "D", text: "Undefined" },
        ],
        correctAnswer: "B",
        explanation:
          "By convention, $\\text{span}() = \\{0\\}$. This makes sense: with no vectors available, the only linear combination you can form is the empty sum, which is $0$.",
        difficulty: "basic",
        source: "axler",
      },
    ],
  },
};
