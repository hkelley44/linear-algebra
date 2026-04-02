import { Topic } from "@/lib/types/content";

export const invertibility: Topic = {
  id: "3.4.1",
  title: "Invertibility",
  slug: "invertibility",
  sectionId: "3.4",
  content: {
    explanation: [
      {
        type: "text",
        body: "A linear map $T$ is invertible if there's another linear map that \"undoes\" it. Invertibility ties together all the major concepts from this chapter: injectivity, surjectivity, null space, range, and dimension.",
      },
      {
        type: "definition",
        label: "Definition 3.12",
        title: "Invertible Linear Map",
        statement:
          "A linear map $T \\in \\mathcal{L}(V, W)$ is invertible if there exists $S \\in \\mathcal{L}(W, V)$ such that $ST = I_V$ and $TS = I_W$. The map $S$ is called the inverse of $T$ and is denoted $T^{-1}$.",
        intuition:
          "Invertible means the map is a perfect bijection that can be reversed. $T$ rearranges $V$ into $W$ without losing any information and without missing any output. Every vector in $W$ was hit exactly once.",
      },
      {
        type: "theorem",
        label: "Theorem 3.13",
        title: "Invertibility = Injectivity + Surjectivity",
        statement:
          "A linear map is invertible if and only if it is both injective and surjective.",
        intuition:
          "Injective means nothing gets collapsed (different inputs give different outputs). Surjective means nothing gets missed (every output is hit). Together, they mean the map is a perfect one-to-one correspondence.",
      },
      {
        type: "proof",
        body: "($\\Rightarrow$) If $T$ is invertible with inverse $S$: Injective: if $Tu = Tv$, then $u = S(Tu) = S(Tv) = v$. Surjective: for any $w \\in W$, $w = T(Sw)$.\n\n($\\Leftarrow$) If $T$ is injective and surjective, define $S: W \\to V$ by $Sw = $ the unique $v$ with $Tv = w$ (exists by surjectivity, unique by injectivity). Then $ST = I_V$ and $TS = I_W$. One needs to verify $S$ is linear, which follows from the linearity of $T$.",
        intuition:
          "The key insight in the backward direction: injectivity gives uniqueness, surjectivity gives existence. Together, you can define $S$ by simply \"reversing\" $T$.",
      },
      {
        type: "text",
        body: "For maps between spaces of equal dimension, the situation simplifies dramatically:",
      },
      {
        type: "theorem",
        label: "Theorem 3.14",
        title: "Invertibility and Dimension",
        statement:
          "Suppose $\\dim V = \\dim W$ and $T \\in \\mathcal{L}(V, W)$. Then the following are equivalent:\n\n(a) $T$ is invertible\n\n(b) $T$ is injective\n\n(c) $T$ is surjective",
        intuition:
          "When the dimensions match, you get the other condition for free. Injectivity alone forces surjectivity (and vice versa). This is a consequence of the rank-nullity theorem: $\\dim V = \\dim \\text{null } T + \\dim \\text{range } T$, and $\\dim V = \\dim W$.",
      },
      {
        type: "proof",
        body: "By rank-nullity: $\\dim V = \\dim \\text{null } T + \\dim \\text{range } T$. Since $\\dim V = \\dim W$:\n\n$T$ injective $\\iff \\dim \\text{null } T = 0 \\iff \\dim \\text{range } T = \\dim V = \\dim W \\iff \\text{range } T = W \\iff T$ surjective.\n\nSo injectivity and surjectivity are equivalent, and both imply invertibility.",
      },
      {
        type: "definition",
        label: "Definition 3.15",
        title: "Isomorphism",
        statement:
          "An isomorphism is an invertible linear map. Two vector spaces are isomorphic if there exists an isomorphism between them.",
        intuition:
          "Isomorphic spaces are \"the same\" from the perspective of linear algebra. They have the same structure, just with different labels on the vectors. The most important result: two finite-dimensional vector spaces over $\\F$ are isomorphic if and only if they have the same dimension.",
      },
      {
        type: "theorem",
        label: "Theorem 3.16",
        title: "Isomorphism and Dimension",
        statement:
          "Two finite-dimensional vector spaces over $\\F$ are isomorphic if and only if they have the same dimension.",
        intuition:
          "Dimension is the complete invariant for finite-dimensional vector spaces. Every $n$-dimensional space over $\\F$ is \"essentially\" $\\F^n$. This is why we can always work with $\\F^n$ and matrices without loss of generality.",
      },
      {
        type: "proof",
        body: "($\\Rightarrow$) If $T: V \\to W$ is an isomorphism, then $T$ maps any basis of $V$ to a basis of $W$ (injective linear maps preserve independence; surjectivity gives spanning). So $\\dim V = \\dim W$.\n\n($\\Leftarrow$) If $\\dim V = \\dim W = n$, choose bases $v_1, \\ldots, v_n$ and $w_1, \\ldots, w_n$. Define $T$ by $Tv_j = w_j$. This is linear (Theorem 3.2), injective (maps a basis to a linearly independent list), and surjective (images span $W$).",
        intuition:
          "The proof is constructive: match up the bases. Any basis of $V$ can be paired with any basis of $W$ to define an isomorphism.",
      },
      {
        type: "text",
        body: "For matrices, invertibility corresponds to the existence of an inverse matrix: $A^{-1}$ such that $AA^{-1} = A^{-1}A = I$. A square matrix is invertible if and only if its columns are linearly independent, which is equivalent to its determinant being nonzero (determinants are covered in later chapters).",
      },
      {
        type: "note",
        body: "Summary of the key equivalences for $T \\in \\mathcal{L}(V, W)$ when $\\dim V = \\dim W$: $T$ is invertible $\\iff$ $T$ is injective $\\iff$ $T$ is surjective $\\iff$ $\\text{null } T = \\{0\\}$ $\\iff$ $\\text{range } T = W$ $\\iff$ the matrix of $T$ is invertible. All of these conditions are the same condition stated differently.",
      },
    ],
    examples: [
      {
        title: "Checking invertibility",
        problem:
          "Is $T: \\R^2 \\to \\R^2$ defined by $T(x,y) = (2x + y, x - y)$ invertible?",
        solution:
          "Check injectivity: $T(x,y) = (0,0)$ means $2x + y = 0$ and $x - y = 0$. From the second, $x = y$. Substituting: $2x + x = 3x = 0$, so $x = 0$ and $y = 0$. Thus $\\text{null } T = \\{0\\}$, so $T$ is injective. Since $\\dim \\R^2 = \\dim \\R^2$, injectivity implies surjectivity, so $T$ is invertible.\n\nTo find $T^{-1}$: solve $2x + y = a$ and $x - y = b$. Adding: $3x = a + b$, so $x = \\frac{a+b}{3}$. Then $y = x - b = \\frac{a+b}{3} - b = \\frac{a - 2b}{3}$. So $T^{-1}(a,b) = (\\frac{a+b}{3}, \\frac{a-2b}{3})$.",
      },
    ],
    practiceProblems: [
      {
        id: "3.4.1-p1",
        type: "multiple-choice",
        question:
          "A linear map $T: \\R^3 \\to \\R^3$ with $\\text{null } T = \\{0\\}$ is:",
        choices: [
          { label: "A", text: "Injective but not necessarily surjective" },
          { label: "B", text: "Surjective but not necessarily injective" },
          { label: "C", text: "Invertible" },
          { label: "D", text: "Not enough information" },
        ],
        correctAnswer: "C",
        explanation:
          "Since $\\dim \\R^3 = \\dim \\R^3$ (domain and codomain have equal dimension), $\\text{null } T = \\{0\\}$ implies injectivity, which implies surjectivity, which implies invertibility. All three conditions are equivalent when the dimensions match.",
        difficulty: "standard",
        source: "custom",
      },
      {
        id: "3.4.1-p2",
        type: "multiple-choice",
        question:
          "Can a linear map $T: \\R^4 \\to \\R^4$ be injective but not surjective?",
        choices: [
          { label: "A", text: "Yes, this is possible" },
          { label: "B", text: "No, injectivity implies surjectivity when dimensions are equal" },
        ],
        correctAnswer: "B",
        explanation:
          "When $\\dim V = \\dim W$ (both are 4 here), the rank-nullity theorem forces injectivity and surjectivity to be equivalent. If $\\text{null } T = \\{0\\}$ (injective), then $\\dim \\text{range } T = 4 = \\dim \\R^4$, so $\\text{range } T = \\R^4$ (surjective).",
        difficulty: "basic",
        source: "axler",
      },
      {
        id: "3.4.1-p3",
        type: "select-all",
        question:
          "Which of the following are true about isomorphic vector spaces? (Select all that apply.)",
        choices: [
          { label: "A", text: "They have the same dimension" },
          { label: "B", text: "They contain the same vectors" },
          { label: "C", text: "Every $n$-dimensional space over $\\F$ is isomorphic to $\\F^n$" },
          { label: "D", text: "The isomorphism between them is unique" },
        ],
        correctAnswers: ["A", "C"],
        explanation:
          "(A) True: isomorphic spaces must have the same dimension (an isomorphism maps bases to bases). (B) False: $\\R^2$ and the space of degree $\\leq 1$ polynomials are isomorphic, but they contain completely different objects (pairs of numbers vs. polynomials). (C) True: this is Theorem 3.16. Choose any basis, and the coordinate map gives an isomorphism to $\\F^n$. (D) False: there are many isomorphisms between two spaces (any bijection between bases defines one).",
        hint: "Isomorphic means structurally identical, not literally the same set.",
        difficulty: "standard",
        source: "custom",
      },
    ],
  },
};
