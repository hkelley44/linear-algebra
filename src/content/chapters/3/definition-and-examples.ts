import { Topic } from "@/lib/types/content";

export const definitionAndExamples: Topic = {
  id: "3.1.1",
  title: "Definition and Examples of Linear Maps",
  slug: "definition-and-examples",
  sectionId: "3.1",
  content: {
    explanation: [
      {
        type: "text",
        body: "Chapters 1 and 2 focused on vector spaces -- the \"nouns\" of linear algebra. Now we turn to linear maps -- the \"verbs.\" A linear map is a function between vector spaces that respects the vector space structure. It's the right notion of a \"structure-preserving transformation.\"",
      },
      {
        type: "definition",
        label: "Definition 3.1",
        title: "Linear Map",
        statement:
          "A linear map from $V$ to $W$ is a function $T: V \\to W$ with the following properties:\n\nAdditivity: $T(u + v) = Tu + Tv$ for all $u, v \\in V$\n\nHomogeneity: $T(\\lambda v) = \\lambda (Tv)$ for all $\\lambda \\in \\F$ and $v \\in V$",
        intuition:
          "A linear map preserves the two operations: it \"distributes\" over addition and \"commutes\" with scalar multiplication. This means the map respects the entire structure of the vector space. Linearity is the single most important property in all of linear algebra.",
      },
      {
        type: "text",
        body: "The set of all linear maps from $V$ to $W$ is denoted $\\mathcal{L}(V, W)$. When $V = W$, a linear map from $V$ to itself is called an operator, and we write $\\mathcal{L}(V)$ instead of $\\mathcal{L}(V, V)$.",
      },
      {
        type: "text",
        body: "Note that we often drop the parentheses and write $Tv$ instead of $T(v)$ for a linear map. This is standard notation in linear algebra.",
      },
      {
        type: "visualization",
        component: "LinearMapViz",
        caption:
          "See how different 2x2 matrices transform the plane. The unit square (ghost) transforms into the colored parallelogram. Use the slider to animate the transformation.",
      },
      {
        type: "text",
        body: "Linear maps are determined by their action on a basis. This is one of the most powerful consequences of linearity:",
      },
      {
        type: "theorem",
        label: "Theorem 3.2",
        title: "Linear Maps and Basis of Domain",
        statement:
          "Suppose $v_1, \\ldots, v_n$ is a basis of $V$ and $w_1, \\ldots, w_n \\in W$. Then there exists a unique linear map $T: V \\to W$ such that $Tv_j = w_j$ for each $j = 1, \\ldots, n$.",
        intuition:
          "Once you decide where each basis vector goes, the entire map is determined. If $v = a_1 v_1 + \\cdots + a_n v_n$, then linearity forces $Tv = a_1 w_1 + \\cdots + a_n w_n$. There's no freedom left. This is why bases are so powerful: specifying $n$ values pins down the map on the entire (possibly infinite) space.",
      },
      {
        type: "proof",
        body: "Define $T: V \\to W$ by $T(a_1 v_1 + \\cdots + a_n v_n) = a_1 w_1 + \\cdots + a_n w_n$. This is well-defined because the basis representation is unique (Theorem 2.10). Linearity: $T(u + v) = T((a_1 + b_1)v_1 + \\cdots) = (a_1 + b_1)w_1 + \\cdots = Tu + Tv$. Similarly for scalar multiplication. So $T$ is linear. Uniqueness: any linear map sending $v_j \\to w_j$ must satisfy $T(a_1v_1 + \\cdots + a_nv_n) = a_1w_1 + \\cdots + a_nw_n$ by linearity, so there's only one such map.",
        intuition:
          "The proof constructs the map explicitly: decompose any vector in the basis, then apply the map to each component. The key is that the basis gives a unique decomposition.",
      },
      {
        type: "text",
        body: "The set $\\mathcal{L}(V, W)$ is itself a vector space: you can add linear maps and scale them. Addition: $(S + T)(v) = Sv + Tv$. Scalar multiplication: $(\\lambda T)(v) = \\lambda(Tv)$. The zero element is the zero map $0(v) = 0$ for all $v$.",
      },
      {
        type: "example",
        title: "Zero map and identity",
        body: "The zero map $0 \\in \\mathcal{L}(V, W)$ sends everything to $0$: $0(v) = 0$ for all $v \\in V$. The identity map $I \\in \\mathcal{L}(V)$ sends everything to itself: $Iv = v$. Both are linear (check the axioms).",
      },
      {
        type: "example",
        title: "Differentiation",
        body: "Define $T: \\mathcal{P}(\\R) \\to \\mathcal{P}(\\R)$ by $Tp = p'$ (the derivative). This is linear because $(p + q)' = p' + q'$ (additivity) and $(\\lambda p)' = \\lambda p'$ (homogeneity). Differentiation is a linear map on the space of polynomials. The derivative of $3x^2 + 2x + 1$ is $6x + 2$.",
      },
      {
        type: "example",
        title: "Integration",
        body: "Define $T: \\mathcal{P}(\\R) \\to \\R$ by $Tp = \\int_0^1 p(x) \\, dx$. This is linear: $\\int_0^1 (p+q) = \\int_0^1 p + \\int_0^1 q$ and $\\int_0^1 \\lambda p = \\lambda \\int_0^1 p$. Note: the domain is polynomials but the codomain is $\\R$ (a number comes out). Linear maps don't need to be between the same space.",
      },
      {
        type: "text",
        body: "Composition of linear maps is also linear. If $T \\in \\mathcal{L}(U, V)$ and $S \\in \\mathcal{L}(V, W)$, then $ST \\in \\mathcal{L}(U, W)$ defined by $(ST)(u) = S(Tu)$. Note the order: $ST$ means \"apply $T$ first, then $S$.\"",
      },
      {
        type: "note",
        body: "A quick test for linearity: $T$ is linear if and only if $T(au + bv) = aTu + bTv$ for all scalars $a, b$ and vectors $u, v$. This combines additivity and homogeneity into one condition. An even quicker necessary condition: $T(0) = 0$. If $T(0) \\neq 0$, then $T$ is definitely not linear.",
      },
    ],
    examples: [
      {
        title: "Projection is linear",
        problem:
          "Define $T: \\R^3 \\to \\R^2$ by $T(x, y, z) = (x, y)$ (projection onto the first two coordinates). Is $T$ linear?",
        solution:
          "Yes. $T((x_1, y_1, z_1) + (x_2, y_2, z_2)) = T(x_1+x_2, y_1+y_2, z_1+z_2) = (x_1+x_2, y_1+y_2) = (x_1, y_1) + (x_2, y_2) = T(x_1,y_1,z_1) + T(x_2,y_2,z_2)$. Similarly for scalar multiplication. $T$ just \"forgets\" the third coordinate, and this operation is linear.",
      },
    ],
    practiceProblems: [
      {
        id: "3.1.1-p1",
        type: "select-all",
        question:
          "Which of the following maps are linear? (Select all that apply.)",
        choices: [
          { label: "A", text: "$T: \\R^2 \\to \\R$ defined by $T(x, y) = 3x - 2y$" },
          { label: "B", text: "$T: \\R \\to \\R$ defined by $T(x) = x + 1$" },
          { label: "C", text: "$T: \\R^2 \\to \\R^2$ defined by $T(x, y) = (y, x)$" },
          { label: "D", text: "$T: \\R \\to \\R$ defined by $T(x) = x^2$" },
        ],
        correctAnswers: ["A", "C"],
        explanation:
          "(A) Linear: $T(u+v) = 3(x_1+x_2) - 2(y_1+y_2) = (3x_1-2y_1) + (3x_2-2y_2) = Tu + Tv$. (B) NOT linear: $T(0) = 1 \\neq 0$. Any linear map must send $0$ to $0$. (C) Linear: swapping coordinates preserves addition and scalar multiplication. (D) NOT linear: $T(2) = 4$ but $2T(1) = 2$, so $T(2 \\cdot 1) \\neq 2 \\cdot T(1)$.",
        hint: "Quick check: does $T(0) = 0$? If not, $T$ is not linear.",
        difficulty: "basic",
        source: "custom",
      },
      {
        id: "3.1.1-p2",
        type: "multiple-choice",
        question:
          "A linear map $T: \\R^3 \\to \\R^2$ is completely determined by the values $Te_1$, $Te_2$, $Te_3$ (where $e_1, e_2, e_3$ is the standard basis). If $Te_1 = (1, 0)$, $Te_2 = (0, 1)$, $Te_3 = (1, 1)$, what is $T(2, 3, -1)$?",
        choices: [
          { label: "A", text: "$(1, 2)$" },
          { label: "B", text: "$(2, 3)$" },
          { label: "C", text: "$(1, -1)$" },
          { label: "D", text: "$(3, 2)$" },
        ],
        correctAnswer: "A",
        explanation:
          "$T(2,3,-1) = 2Te_1 + 3Te_2 + (-1)Te_3 = 2(1,0) + 3(0,1) + (-1)(1,1) = (2,0) + (0,3) + (-1,-1) = (1, 2)$. This is Theorem 3.2 in action: decompose the input in the basis, apply $T$ to each basis vector, combine.",
        difficulty: "standard",
        source: "custom",
      },
      {
        id: "3.1.1-p3",
        type: "multiple-choice",
        question:
          "Why is the map $T: \\R \\to \\R$ defined by $T(x) = |x|$ not linear?",
        choices: [
          { label: "A", text: "Because $T(0) \\neq 0$" },
          { label: "B", text: "Because $T(-1 + 1) \\neq T(-1) + T(1)$" },
          { label: "C", text: "Because $T((-1) \\cdot 1) \\neq (-1) \\cdot T(1)$" },
          { label: "D", text: "Both B and C" },
        ],
        correctAnswer: "C",
        explanation:
          "$T((-1) \\cdot 1) = T(-1) = |-1| = 1$, but $(-1) \\cdot T(1) = (-1) \\cdot |1| = -1$. Since $1 \\neq -1$, homogeneity fails. Note that $T(0) = 0$ (so that test passes), and additivity is also violated, but homogeneity is the clearest failure: absolute value doesn't commute with negative scalar multiplication.",
        difficulty: "standard",
        source: "custom",
      },
    ],
  },
};
