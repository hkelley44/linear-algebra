import { Topic } from "@/lib/types/content";

export const dimension: Topic = {
  id: "2.4.1",
  title: "Dimension",
  slug: "dimension",
  sectionId: "2.4",
  content: {
    explanation: [
      {
        type: "text",
        body: "We've established that every finite-dimensional vector space has a basis. But a vector space can have many different bases. The remarkable fact -- arguably the most important theorem in this chapter -- is that they all have the same length.",
      },
      {
        type: "theorem",
        label: "Theorem 2.13",
        title: "Basis Length Does Not Depend on Basis",
        statement:
          "Any two bases of a finite-dimensional vector space have the same length.",
        intuition:
          "This is why dimension is well-defined. No matter which basis you choose for $\\R^3$, you always get 3 vectors. The \"size\" of a vector space is an intrinsic property, not an artifact of a particular basis.",
      },
      {
        type: "proof",
        body: "Let $B_1$ and $B_2$ be two bases of $V$. Since $B_1$ is independent and $B_2$ spans $V$, Theorem 2.8 gives $|B_1| \\leq |B_2|$. Since $B_2$ is independent and $B_1$ spans $V$, the same theorem gives $|B_2| \\leq |B_1|$. Therefore $|B_1| = |B_2|$.",
        intuition:
          "The proof is elegant: use the theorem that says \"independent lists can't be longer than spanning lists\" twice, with the roles swapped. Both inequalities together force equality.",
      },
      {
        type: "definition",
        label: "Definition 2.14",
        title: "Dimension",
        statement:
          "The dimension of a finite-dimensional vector space $V$, written $\\dim V$, is the length of any basis of $V$.",
        intuition:
          "Dimension is the number of \"degrees of freedom\" in the space. $\\R^n$ has dimension $n$. A plane through the origin in $\\R^3$ has dimension 2. A line through the origin has dimension 1. The trivial space $\\{0\\}$ has dimension 0.",
      },
      {
        type: "text",
        body: "Dimension gives us powerful shortcuts for checking whether a list is a basis:",
      },
      {
        type: "theorem",
        label: "Theorem 2.15",
        title: "Dimension and Bases",
        statement:
          "Suppose $V$ is finite-dimensional with $\\dim V = n$. Then:\n\n(a) Any linearly independent list of length $n$ in $V$ is a basis.\n\n(b) Any spanning list of length $n$ in $V$ is a basis.",
        intuition:
          "Once you know the dimension, you only need to check one condition instead of two. $n$ independent vectors? They must also span. $n$ vectors that span? They must also be independent. The dimension acts as a constraint.",
      },
      {
        type: "example",
        title: "Using dimension to verify a basis",
        body: "To show that $(1, 2, 3)$, $(0, 1, 2)$, $(0, 0, 1)$ is a basis for $\\R^3$, we only need to check independence (since $\\dim \\R^3 = 3$ and the list has length 3). Setting $a(1,2,3) + b(0,1,2) + c(0,0,1) = 0$: from the first component $a = 0$, then from the second $b = 0$, then from the third $c = 0$. Independent, so it's a basis.",
      },
      {
        type: "theorem",
        label: "Theorem 2.16",
        title: "Dimension of a Subspace",
        statement:
          "If $U$ is a subspace of a finite-dimensional vector space $V$, then $\\dim U \\leq \\dim V$.",
        intuition:
          "A subspace can't be \"bigger\" than the space it lives in. The dimension of a subspace is at most the dimension of the parent space.",
      },
      {
        type: "theorem",
        label: "Theorem 2.17",
        title: "Dimension of a Sum",
        statement:
          "If $U_1$ and $U_2$ are subspaces of a finite-dimensional vector space, then$$\\dim(U_1 + U_2) = \\dim U_1 + \\dim U_2 - \\dim(U_1 \\cap U_2)$$",
        intuition:
          "This is the inclusion-exclusion formula, but for vector spaces. If two subspaces overlap, you're double-counting the overlap when you add their dimensions. Subtract it once to get the dimension of the sum. Compare with sets: $|A \\cup B| = |A| + |B| - |A \\cap B|$.",
      },
      {
        type: "example",
        title: "Dimension formula",
        body: "Let $U_1 = \\{(x, y, 0) : x, y \\in \\R\\}$ and $U_2 = \\{(0, y, z) : y, z \\in \\R\\}$ in $\\R^3$. Then $U_1 \\cap U_2 = \\{(0, y, 0) : y \\in \\R\\}$, which has dimension 1. So $\\dim(U_1 + U_2) = 2 + 2 - 1 = 3$. Indeed $U_1 + U_2 = \\R^3$.",
      },
      {
        type: "note",
        body: "Dimension is one of the most useful concepts in linear algebra. Many proofs reduce to counting dimensions. For example, two subspaces $U_1$ and $U_2$ of a vector space $V$ satisfy $V = U_1 \\oplus U_2$ if and only if $V = U_1 + U_2$ and $\\dim V = \\dim U_1 + \\dim U_2$.",
      },
    ],
    examples: [
      {
        title: "Dimension of polynomial spaces",
        problem:
          "What is the dimension of $\\mathcal{P}_m(\\F)$, the space of polynomials of degree at most $m$?",
        solution:
          "A basis is $1, x, x^2, \\ldots, x^m$. This list has $m + 1$ elements, so $\\dim \\mathcal{P}_m(\\F) = m + 1$. For example, the space of polynomials of degree at most 2 has dimension 3 (basis: $1, x, x^2$).",
      },
    ],
    practiceProblems: [
      {
        id: "2.4.1-p1",
        type: "free-response",
        question:
          "What is the dimension of the subspace $U = \\{(x, y, z, w) \\in \\R^4 : x + y = 0 \\text{ and } z - w = 0\\}$?",
        acceptedAnswers: ["2"],
        explanation:
          "From $x + y = 0$ we get $y = -x$. From $z - w = 0$ we get $w = z$. So $U = \\{(x, -x, z, z) : x, z \\in \\R\\} = \\{x(1,-1,0,0) + z(0,0,1,1)\\}$. The vectors $(1,-1,0,0)$ and $(0,0,1,1)$ are independent and span $U$, so they form a basis. $\\dim U = 2$.",
        hint: "Use the constraints to express all four components in terms of free variables, then read off a basis.",
        difficulty: "standard",
        source: "custom",
      },
      {
        id: "2.4.1-p2",
        type: "multiple-choice",
        question:
          "If $\\dim V = 5$ and you have a linearly independent list of 5 vectors in $V$, is it automatically a basis?",
        choices: [
          { label: "A", text: "Yes -- 5 independent vectors in a 5-dimensional space must span" },
          { label: "B", text: "No -- you also need to check that it spans" },
          { label: "C", text: "Only if the vectors are orthogonal" },
          { label: "D", text: "Only if the vectors are the standard basis" },
        ],
        correctAnswer: "A",
        explanation:
          "By Theorem 2.15(a): any linearly independent list of length $n = \\dim V$ in a finite-dimensional space is automatically a basis. Independence + right count = basis.",
        difficulty: "basic",
        source: "axler",
      },
      {
        id: "2.4.1-p3",
        type: "multiple-choice",
        question:
          "Let $U$ and $W$ be subspaces of $\\R^5$ with $\\dim U = 3$ and $\\dim W = 4$. What is the smallest possible dimension of $U \\cap W$?",
        choices: [
          { label: "A", text: "0" },
          { label: "B", text: "1" },
          { label: "C", text: "2" },
          { label: "D", text: "3" },
        ],
        correctAnswer: "C",
        explanation:
          "By the dimension formula: $\\dim(U + W) = \\dim U + \\dim W - \\dim(U \\cap W) = 7 - \\dim(U \\cap W)$. Since $U + W$ is a subspace of $\\R^5$, we need $\\dim(U+W) \\leq 5$. So $7 - \\dim(U \\cap W) \\leq 5$, giving $\\dim(U \\cap W) \\geq 2$. And $\\dim(U \\cap W) = 2$ is achievable, so the minimum is 2.",
        hint: "Use the dimension formula $\\dim(U+W) = \\dim U + \\dim W - \\dim(U \\cap W)$ and the fact that $\\dim(U+W) \\leq 5$.",
        difficulty: "challenge",
        source: "axler",
      },
    ],
  },
};
