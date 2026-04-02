import { Topic } from "@/lib/types/content";

export const linearIndependence: Topic = {
  id: "2.2.1",
  title: "Linear Independence",
  slug: "linear-independence",
  sectionId: "2.2",
  content: {
    explanation: [
      {
        type: "text",
        body: "We've seen that a list of vectors spans a space if every vector can be built from them. But sometimes a spanning list has redundant vectors -- vectors that are already in the span of the others. Linear independence is the concept that captures when every vector in a list is \"truly needed.\"",
      },
      {
        type: "definition",
        label: "Definition 2.5",
        title: "Linearly Independent",
        statement:
          "A list of vectors $v_1, \\ldots, v_m \\in V$ is linearly independent if the only way to write $0$ as a linear combination is the trivial way:$$a_1 v_1 + a_2 v_2 + \\cdots + a_m v_m = 0 \\implies a_1 = a_2 = \\cdots = a_m = 0$$",
        intuition:
          "Linearly independent means \"no redundancy.\" None of the vectors can be built from the others. The test: can you make the zero vector without using all-zero coefficients? If not, the vectors are independent.",
      },
      {
        type: "definition",
        label: "Definition 2.6",
        title: "Linearly Dependent",
        statement:
          "A list of vectors is linearly dependent if it is not linearly independent -- that is, if there exist scalars $a_1, \\ldots, a_m$, not all zero, such that $a_1 v_1 + \\cdots + a_m v_m = 0$.",
        intuition:
          "Dependent means at least one vector is \"redundant\" -- it can be expressed as a linear combination of the others. If $a_1 v_1 + \\cdots + a_m v_m = 0$ with some $a_j \\neq 0$, then $v_j = -\\frac{1}{a_j}(a_1 v_1 + \\cdots + a_{j-1}v_{j-1} + a_{j+1}v_{j+1} + \\cdots + a_m v_m)$.",
      },
      {
        type: "visualization",
        component: "LinearIndependenceViz",
        caption:
          "Three vectors in R^2 are always dependent. The third is always a combination of the first two (when they're independent). Make v1 and v2 collinear to see pairwise dependence.",
      },
      {
        type: "example",
        title: "Independence in R^3",
        body: "The standard basis vectors $e_1 = (1,0,0)$, $e_2 = (0,1,0)$, $e_3 = (0,0,1)$ are linearly independent. If $ae_1 + be_2 + ce_3 = 0$, then $(a, b, c) = (0, 0, 0)$, so $a = b = c = 0$.",
      },
      {
        type: "example",
        title: "Dependence in R^3",
        body: "The vectors $(1, 0, 0)$, $(0, 1, 0)$, $(1, 1, 0)$ are linearly dependent because $(1, 0, 0) + (0, 1, 0) - (1, 1, 0) = (0, 0, 0)$. The third vector is the sum of the first two -- it's redundant.",
      },
      {
        type: "theorem",
        label: "Theorem 2.7",
        title: "Linear Dependence Lemma",
        statement:
          "If $v_1, \\ldots, v_m$ is linearly dependent and $v_1 \\neq 0$, then there exists $j \\in \\{2, \\ldots, m\\}$ such that:\n\n(a) $v_j \\in \\text{span}(v_1, \\ldots, v_{j-1})$\n\n(b) Removing $v_j$ from the list does not change the span.",
        intuition:
          "This is the key lemma. If a list is dependent, you can find a specific vector that's redundant, remove it, and the span stays the same. This is the engine behind the dimension theorem: you can keep removing redundant vectors until none are left.",
      },
      {
        type: "proof",
        body: "Since the list is dependent, there exist $a_1, \\ldots, a_m$, not all zero, with $a_1v_1 + \\cdots + a_mv_m = 0$. Let $j$ be the largest index with $a_j \\neq 0$. Since $v_1 \\neq 0$, we have $j \\geq 2$. Then:$$v_j = -\\frac{a_1}{a_j}v_1 - \\cdots - \\frac{a_{j-1}}{a_j}v_{j-1}$$This proves (a). For (b): any linear combination involving $v_j$ can replace $v_j$ with the expression above, so the span is unchanged.",
        intuition:
          "Pick the last vector that has a nonzero coefficient in the dependence relation. That vector can be written in terms of the earlier ones, so removing it doesn't shrink the span.",
      },
      {
        type: "theorem",
        label: "Theorem 2.8",
        title: "Length of Independent List ≤ Length of Spanning List",
        statement:
          "In a finite-dimensional vector space, the length of every linearly independent list is less than or equal to the length of every spanning list.",
        intuition:
          "You can't have more independent vectors than the size of a spanning set. This is deeply important: it means all bases have the same length (we'll see this soon), which gives us the concept of dimension.",
      },
      {
        type: "note",
        body: "Here is a useful quick test: a list containing the zero vector is always linearly dependent (because $1 \\cdot 0 = 0$ is a nontrivial linear combination of $0$). Also, a list of one nonzero vector is always linearly independent.",
      },
    ],
    examples: [
      {
        title: "Testing independence",
        problem:
          "Are $(1, 2)$ and $(3, 6)$ linearly independent in $\\R^2$?",
        solution:
          "No. $(3, 6) = 3(1, 2)$, so they're dependent: $3(1,2) - 1(3,6) = (0,0)$. Geometrically, they point in the same direction.",
      },
    ],
    practiceProblems: [
      {
        id: "2.2.1-p1",
        type: "multiple-choice",
        question:
          "Are the vectors $(1, 0, 1)$, $(0, 1, 1)$, $(1, 1, 0)$ linearly independent in $\\R^3$?",
        choices: [
          { label: "A", text: "Yes, they are linearly independent" },
          { label: "B", text: "No, because the third is the sum of the first two" },
          { label: "C", text: "No, because the first is the sum of the other two" },
          { label: "D", text: "No, because they are all multiples of each other" },
        ],
        correctAnswer: "A",
        explanation:
          "Set $a(1,0,1) + b(0,1,1) + c(1,1,0) = (0,0,0)$. This gives the system: $a + c = 0$, $b + c = 0$, $a + b = 0$. From the first two equations: $a = -c$ and $b = -c$. Substituting into the third: $(-c) + (-c) = 0$, so $-2c = 0$, hence $c = 0$. Then $a = 0$ and $b = 0$. The only solution is the trivial one, so the vectors are linearly independent.",
        difficulty: "standard",
        source: "custom",
      },
      {
        id: "2.2.1-p2",
        type: "select-all",
        question:
          "Which of the following lists are linearly independent in $\\R^2$?",
        choices: [
          { label: "A", text: "$(1, 0)$, $(0, 1)$" },
          { label: "B", text: "$(1, 2)$, $(2, 4)$" },
          { label: "C", text: "$(1, 1)$, $(1, -1)$" },
          { label: "D", text: "$(1, 0)$, $(0, 1)$, $(1, 1)$" },
        ],
        correctAnswers: ["A", "C"],
        explanation:
          "(A) Independent: the standard basis. (B) Dependent: $(2, 4) = 2(1, 2)$. (C) Independent: neither is a scalar multiple of the other (they point in different directions). (D) Dependent: any three vectors in $\\R^2$ are dependent (dimension is 2). Specifically, $(1,1) = (1,0) + (0,1)$.",
        hint: "In $\\R^2$, at most 2 vectors can be independent. Two vectors are independent iff neither is a scalar multiple of the other.",
        difficulty: "basic",
        source: "custom",
      },
      {
        id: "2.2.1-p3",
        type: "multiple-choice",
        question:
          "A list of vectors that includes the zero vector is:",
        choices: [
          { label: "A", text: "Always linearly independent" },
          { label: "B", text: "Always linearly dependent" },
          { label: "C", text: "Independent if all other vectors are nonzero" },
          { label: "D", text: "Depends on the other vectors" },
        ],
        correctAnswer: "B",
        explanation:
          "If $v_j = 0$, then $0v_1 + \\cdots + 1 \\cdot v_j + \\cdots + 0v_m = 0$ is a nontrivial linear combination of the zero vector ($a_j = 1 \\neq 0$). So any list containing $0$ is dependent.",
        difficulty: "basic",
        source: "axler",
      },
    ],
  },
};
