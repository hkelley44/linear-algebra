import { Topic } from "@/lib/types/content";

export const nullSpaceAndRange: Topic = {
  id: "3.2.1",
  title: "Null Space and Range",
  slug: "null-space-and-range",
  sectionId: "3.2",
  content: {
    explanation: [
      {
        type: "text",
        body: "For any linear map $T: V \\to W$, two subspaces arise naturally. The null space captures what $T$ \"kills\" (sends to zero). The range captures what $T$ can \"reach\" in $W$. Together, they reveal the structure of $T$.",
      },
      {
        type: "definition",
        label: "Definition 3.3",
        title: "Null Space",
        statement:
          "For $T \\in \\mathcal{L}(V, W)$, the null space of $T$ is:$$\\text{null } T = \\{v \\in V : Tv = 0\\}$$",
        intuition:
          "The null space is everything that $T$ sends to zero. It measures the \"information loss\" of $T$. A map with a big null space loses a lot of information. A map with null space $= \\{0\\}$ loses nothing (it's injective, as we'll see).",
      },
      {
        type: "theorem",
        label: "Theorem 3.4",
        title: "Null Space is a Subspace",
        statement:
          "If $T \\in \\mathcal{L}(V, W)$, then $\\text{null } T$ is a subspace of $V$.",
        intuition:
          "The null space inherits the subspace structure from linearity: if $T$ kills $u$ and $v$, it also kills $u + v$ and $\\lambda u$.",
      },
      {
        type: "proof",
        body: "We check the three subspace conditions:\n\n1. $T(0) = 0$, so $0 \\in \\text{null } T$.\n\n2. If $u, v \\in \\text{null } T$, then $T(u+v) = Tu + Tv = 0 + 0 = 0$, so $u+v \\in \\text{null } T$.\n\n3. If $u \\in \\text{null } T$ and $\\lambda \\in \\F$, then $T(\\lambda u) = \\lambda Tu = \\lambda \\cdot 0 = 0$, so $\\lambda u \\in \\text{null } T$.",
      },
      {
        type: "theorem",
        label: "Theorem 3.5",
        title: "Injectivity and Null Space",
        statement:
          "$T$ is injective (one-to-one) if and only if $\\text{null } T = \\{0\\}$.",
        intuition:
          "If $T$ only kills the zero vector, then distinct inputs always produce distinct outputs. If $T$ kills some nonzero $v$, then $T(u) = T(u + v)$ for any $u$, so $T$ fails to be injective. The null space is the precise obstruction to injectivity.",
      },
      {
        type: "proof",
        body: "($\\Rightarrow$) If $T$ is injective and $v \\in \\text{null } T$, then $Tv = 0 = T0$, so $v = 0$. Thus $\\text{null } T = \\{0\\}$.\n\n($\\Leftarrow$) If $\\text{null } T = \\{0\\}$ and $Tu = Tv$, then $T(u-v) = Tu - Tv = 0$, so $u - v \\in \\text{null } T = \\{0\\}$, hence $u = v$.",
        intuition:
          "The backward direction is the useful one: to prove injectivity, just show the null space is trivial.",
      },
      {
        type: "definition",
        label: "Definition 3.6",
        title: "Range",
        statement:
          "For $T \\in \\mathcal{L}(V, W)$, the range of $T$ is:$$\\text{range } T = \\{Tv : v \\in V\\} = \\{w \\in W : w = Tv \\text{ for some } v \\in V\\}$$",
        intuition:
          "The range is the set of all possible outputs. It's everything $T$ can \"hit\" in $W$. A surjective map has range $= W$.",
      },
      {
        type: "theorem",
        label: "Theorem 3.7",
        title: "Range is a Subspace",
        statement: "If $T \\in \\mathcal{L}(V, W)$, then $\\text{range } T$ is a subspace of $W$.",
      },
      {
        type: "visualization",
        component: "NullSpaceRangeViz",
        caption:
          "Explore null space and range for different linear maps. The red line/shading shows the null space; the green line shows the range. Drag the input vector.",
      },
      {
        type: "text",
        body: "Now for the most important theorem of this chapter -- arguably one of the most important in all of linear algebra:",
      },
      {
        type: "theorem",
        label: "Theorem 3.8",
        title: "Fundamental Theorem of Linear Maps (Rank-Nullity Theorem)",
        statement:
          "If $V$ is finite-dimensional and $T \\in \\mathcal{L}(V, W)$, then$$\\dim V = \\dim \\text{null } T + \\dim \\text{range } T$$",
        intuition:
          "The dimension of the domain splits into two parts: what $T$ kills (null space dimension, called nullity) and what $T$ hits (range dimension, called rank). Nothing is lost or gained -- the dimensions always add up. This is the accounting equation of linear algebra.",
      },
      {
        type: "proof",
        body: "Let $u_1, \\ldots, u_k$ be a basis of $\\text{null } T$. Extend to a basis $u_1, \\ldots, u_k, v_1, \\ldots, v_p$ of $V$ (possible by Theorem 2.12). We claim $Tv_1, \\ldots, Tv_p$ is a basis of $\\text{range } T$.\n\nSpanning: any $w \\in \\text{range } T$ equals $T(a_1u_1 + \\cdots + a_ku_k + b_1v_1 + \\cdots + b_pv_p) = b_1Tv_1 + \\cdots + b_pTv_p$ (since $Tu_j = 0$).\n\nIndependence: if $b_1Tv_1 + \\cdots + b_pTv_p = 0$, then $T(b_1v_1 + \\cdots + b_pv_p) = 0$, so $b_1v_1 + \\cdots + b_pv_p \\in \\text{null } T$. Write it as $a_1u_1 + \\cdots + a_ku_k$. Since $u_1, \\ldots, u_k, v_1, \\ldots, v_p$ is a basis, all coefficients are $0$.\n\nSo $\\dim \\text{range } T = p$ and $\\dim V = k + p = \\dim \\text{null } T + \\dim \\text{range } T$.",
        intuition:
          "Start with a basis of the null space, extend to a basis of $V$. Apply $T$ to the extension -- those images form a basis of the range. The null space basis vectors contribute nothing (they map to $0$), and the extension vectors contribute a basis of the range. The count works out perfectly.",
      },
      {
        type: "example",
        title: "Rank-Nullity in action",
        body: "Let $T: \\R^3 \\to \\R^2$ be defined by $T(x,y,z) = (x+y, y+z)$. The null space: $x+y = 0$ and $y+z = 0$, so $y = -x$ and $z = -y = x$. Thus $\\text{null } T = \\{(x, -x, x) : x \\in \\R\\}$, which has dimension 1. By the rank-nullity theorem, $\\dim \\text{range } T = 3 - 1 = 2$. Since $\\text{range } T \\subseteq \\R^2$ and $\\dim \\text{range } T = 2 = \\dim \\R^2$, the range is all of $\\R^2$. So $T$ is surjective.",
      },
      {
        type: "note",
        body: "The rank-nullity theorem has immediate consequences: a linear map from $\\R^n$ to $\\R^m$ with $n > m$ cannot be injective (the null space must have dimension $\\geq n - m > 0$). And a linear map from $\\R^n$ to $\\R^m$ with $n < m$ cannot be surjective (the range has dimension $\\leq n < m$).",
      },
    ],
    examples: [
      {
        title: "Null space of differentiation",
        problem:
          "What is the null space of $T: \\mathcal{P}_3(\\R) \\to \\mathcal{P}_3(\\R)$ defined by $Tp = p'$?",
        solution:
          "$\\text{null } T = \\{p : p' = 0\\}$ = the constant polynomials. This is a 1-dimensional subspace. By rank-nullity, $\\dim \\text{range } T = 4 - 1 = 3$. Indeed, the range is $\\mathcal{P}_2(\\R)$ (derivatives of degree $\\leq 3$ polynomials have degree $\\leq 2$).",
      },
    ],
    practiceProblems: [
      {
        id: "3.2.1-p1",
        type: "free-response",
        question:
          "Let $T: \\R^4 \\to \\R^3$ be a linear map with $\\dim \\text{null } T = 2$. What is $\\dim \\text{range } T$?",
        acceptedAnswers: ["2"],
        explanation:
          "By the rank-nullity theorem: $\\dim \\R^4 = \\dim \\text{null } T + \\dim \\text{range } T$. So $4 = 2 + \\dim \\text{range } T$, giving $\\dim \\text{range } T = 2$.",
        difficulty: "basic",
        source: "axler",
      },
      {
        id: "3.2.1-p2",
        type: "multiple-choice",
        question:
          "A linear map $T: \\R^5 \\to \\R^3$ can be:",
        choices: [
          { label: "A", text: "Injective but not surjective" },
          { label: "B", text: "Surjective but not injective" },
          { label: "C", text: "Both injective and surjective" },
          { label: "D", text: "Neither injective nor surjective" },
        ],
        correctAnswer: "B",
        explanation:
          "By rank-nullity: $5 = \\dim \\text{null } T + \\dim \\text{range } T$. For injectivity, we need $\\dim \\text{null } T = 0$, which gives $\\dim \\text{range } T = 5$. But $\\text{range } T \\subseteq \\R^3$, so $\\dim \\text{range } T \\leq 3$. Contradiction. So $T$ cannot be injective. But $T$ can be surjective: if $\\dim \\text{range } T = 3$ (and $\\dim \\text{null } T = 2$), the range is all of $\\R^3$. So the map can be surjective but never injective.",
        hint: "Use rank-nullity. What does injectivity require about the null space dimension?",
        difficulty: "standard",
        source: "custom",
      },
      {
        id: "3.2.1-p3",
        type: "multiple-choice",
        question:
          "If $T: V \\to W$ is a linear map and $\\dim V = \\dim W$, then $T$ is injective if and only if $T$ is surjective.",
        choices: [
          { label: "A", text: "True" },
          { label: "B", text: "False" },
        ],
        correctAnswer: "A",
        explanation:
          "By rank-nullity: $\\dim V = \\dim \\text{null } T + \\dim \\text{range } T$. If $\\dim V = \\dim W$, then: $T$ is injective $\\iff \\dim \\text{null } T = 0 \\iff \\dim \\text{range } T = \\dim V = \\dim W \\iff \\text{range } T = W \\iff T$ is surjective. This only works for finite-dimensional spaces of equal dimension!",
        difficulty: "standard",
        source: "axler",
      },
    ],
  },
};
