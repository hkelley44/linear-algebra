import { Topic } from "@/lib/types/content";

export const bases: Topic = {
  id: "2.3.1",
  title: "Bases",
  slug: "bases",
  sectionId: "2.3",
  content: {
    explanation: [
      {
        type: "text",
        body: "We've now seen two important properties a list of vectors can have: it can span the space, and it can be linearly independent. A basis is a list that does both -- it's the \"just right\" list with no redundancy and no gaps.",
      },
      {
        type: "definition",
        label: "Definition 2.9",
        title: "Basis",
        statement:
          "A basis of $V$ is a list of vectors in $V$ that is linearly independent and spans $V$.",
        intuition:
          "A basis is the most efficient spanning set: it spans the whole space, but removing any single vector would cause it to no longer span. It's also the largest independent set: adding any vector would make it dependent. A basis is \"perfectly sized.\"",
      },
      {
        type: "example",
        title: "Standard basis of F^n",
        body: "The standard basis of $\\F^n$ is $e_1, \\ldots, e_n$, where $e_j$ has a $1$ in the $j$-th position and $0$ elsewhere:$$e_1 = (1, 0, \\ldots, 0), \\quad e_2 = (0, 1, \\ldots, 0), \\quad \\ldots, \\quad e_n = (0, 0, \\ldots, 1)$$Every vector $(x_1, \\ldots, x_n) = x_1 e_1 + \\cdots + x_n e_n$, so the list spans $\\F^n$. And the list is independent because $a_1 e_1 + \\cdots + a_n e_n = 0$ forces $(a_1, \\ldots, a_n) = (0, \\ldots, 0)$.",
      },
      {
        type: "theorem",
        label: "Theorem 2.10",
        title: "Criterion for Basis",
        statement:
          "A list $v_1, \\ldots, v_n$ of vectors in $V$ is a basis of $V$ if and only if every $v \\in V$ can be written uniquely as a linear combination:$$v = a_1 v_1 + \\cdots + a_n v_n$$",
        intuition:
          "This is the key property of a basis: it gives coordinates. Every vector has a unique representation. \"Spans\" ensures the representation exists; \"independent\" ensures it's unique.",
      },
      {
        type: "proof",
        body: "($\\Rightarrow$) Suppose $v_1, \\ldots, v_n$ is a basis. Since it spans $V$, every $v$ has at least one representation. Suppose $v = a_1 v_1 + \\cdots + a_n v_n = b_1 v_1 + \\cdots + b_n v_n$. Subtracting: $(a_1 - b_1)v_1 + \\cdots + (a_n - b_n)v_n = 0$. By linear independence, $a_j - b_j = 0$ for all $j$. So $a_j = b_j$ and the representation is unique.\n\n($\\Leftarrow$) If every vector has a unique representation, then in particular $V = \\text{span}(v_1, \\ldots, v_n)$. If $a_1 v_1 + \\cdots + a_n v_n = 0$, then this and the trivial representation $0 \\cdot v_1 + \\cdots + 0 \\cdot v_n = 0$ are both representations of $0$. By uniqueness, $a_j = 0$ for all $j$. So the list is independent.",
        intuition:
          "The proof is clean: spanning gives existence, independence gives uniqueness. The two properties perfectly complement each other.",
      },
      {
        type: "theorem",
        label: "Theorem 2.11",
        title: "Spanning List Contains a Basis",
        statement:
          "Every spanning list of vectors in a finite-dimensional vector space can be reduced to a basis.",
        intuition:
          "If you have a spanning list with redundancies, you can remove the redundant vectors one at a time (using the Linear Dependence Lemma) until what's left is independent. The result is a basis.",
      },
      {
        type: "theorem",
        label: "Theorem 2.12",
        title: "Independent List Extends to a Basis",
        statement:
          "Every linearly independent list of vectors in a finite-dimensional vector space can be extended to a basis.",
        intuition:
          "If you have independent vectors that don't yet span the space, you can keep adding vectors (maintaining independence) until you span the whole space.",
      },
      {
        type: "text",
        body: "These two results are dual: any spanning list can be trimmed to a basis, and any independent list can be grown to a basis. A basis sits at the intersection -- not too big, not too small.",
      },
      {
        type: "example",
        title: "Non-standard basis",
        body: "The list $(1, 1)$, $(1, -1)$ is a basis for $\\R^2$. Independence: $a(1,1) + b(1,-1) = (0,0)$ gives $a+b = 0$ and $a-b = 0$, so $a = b = 0$. Spanning: any $(x, y)$ can be written as $\\frac{x+y}{2}(1,1) + \\frac{x-y}{2}(1,-1)$.",
      },
      {
        type: "note",
        body: "A vector space has many different bases, but (as we'll see in the next section) they all have the same length. This is one of the most remarkable facts in linear algebra.",
      },
    ],
    examples: [
      {
        title: "Basis for a subspace",
        problem:
          "Find a basis for the subspace $U = \\{(x, y, z) \\in \\R^3 : x + y + z = 0\\}$.",
        solution:
          "From $x + y + z = 0$, we get $z = -x - y$. So $U = \\{(x, y, -x-y) : x, y \\in \\R\\} = \\{x(1, 0, -1) + y(0, 1, -1)\\}$. The vectors $(1, 0, -1)$ and $(0, 1, -1)$ span $U$ and are independent (neither is a multiple of the other), so they form a basis. $U$ has dimension 2.",
      },
    ],
    practiceProblems: [
      {
        id: "2.3.1-p1",
        type: "multiple-choice",
        question:
          "Which of the following is a basis for $\\R^2$?",
        choices: [
          { label: "A", text: "$(1, 0)$" },
          { label: "B", text: "$(1, 0), (0, 1), (1, 1)$" },
          { label: "C", text: "$(1, 2), (3, 4)$" },
          { label: "D", text: "$(1, 2), (2, 4)$" },
        ],
        correctAnswer: "C",
        explanation:
          "(A) is independent but doesn't span $\\R^2$ (it only spans a line). (B) spans $\\R^2$ but is not independent (three vectors in $\\R^2$ are always dependent). (C) is independent ($\\frac{3}{1} \\neq \\frac{4}{2}$, i.e. $3 \\neq 2$, so neither is a multiple of the other) and spans $\\R^2$ (two independent vectors in $\\R^2$ always span). (D) is dependent: $(2,4) = 2(1,2)$.",
        difficulty: "basic",
        source: "custom",
      },
      {
        id: "2.3.1-p2",
        type: "free-response",
        question:
          "Write $(7, 3)$ as a linear combination of the basis vectors $(1, 1)$ and $(1, -1)$. What is the coefficient of $(1, 1)$? (Enter a single number. Fractions should be like 5/2.)",
        acceptedAnswers: ["5", "5.0"],
        explanation:
          "We need $a(1,1) + b(1,-1) = (7, 3)$. This gives $a + b = 7$ and $a - b = 3$. Adding: $2a = 10$, so $a = 5$. Then $b = 2$. Check: $5(1,1) + 2(1,-1) = (5,5) + (2,-2) = (7, 3)$.",
        hint: "Set up the system $a + b = 7$, $a - b = 3$ and solve.",
        difficulty: "standard",
        source: "custom",
      },
      {
        id: "2.3.1-p3",
        type: "multiple-choice",
        question:
          "A list of vectors in $V$ that is linearly independent but does NOT span $V$ is:",
        choices: [
          { label: "A", text: "A basis" },
          { label: "B", text: "Not a basis, but can be extended to one" },
          { label: "C", text: "Not a basis, and cannot be extended to one" },
          { label: "D", text: "Impossible -- independent lists always span" },
        ],
        correctAnswer: "B",
        explanation:
          "By Theorem 2.12, every linearly independent list in a finite-dimensional space can be extended to a basis. You keep adding vectors (maintaining independence) until the list spans. A basis requires BOTH independence and spanning.",
        difficulty: "standard",
        source: "axler",
      },
    ],
  },
};
