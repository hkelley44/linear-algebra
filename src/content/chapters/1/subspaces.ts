import { Topic } from "@/lib/types/content";

export const subspaces: Topic = {
  id: "1.3.1",
  title: "Subspaces",
  slug: "subspaces",
  sectionId: "1.3",
  content: {
    explanation: [
      {
        type: "text",
        body: "Often we're interested in a subset of a vector space that is itself a vector space (using the same operations). For instance, a line through the origin in $\\R^2$ is a \"smaller\" vector space living inside $\\R^2$. These subsets are called subspaces.",
      },
      {
        type: "definition",
        label: "Definition 1.11",
        title: "Subspace",
        statement:
          "A subset $U$ of a vector space $V$ is called a subspace of $V$ if $U$ is also a vector space (using the same addition and scalar multiplication as $V$).",
        intuition:
          "A subspace is a subset that \"works on its own\" as a vector space. You can add elements of $U$ together and scale them, and you never leave $U$.",
      },
      {
        type: "text",
        body: "Checking all the vector space axioms for every subset would be tedious. Fortunately, most axioms are inherited from the parent space -- associativity, commutativity, and the distributive laws all hold in $U$ because they hold in $V$. The only things you actually need to check are the conditions for $U$ to be closed and contain the identity.",
      },
      {
        type: "theorem",
        label: "Theorem 1.12",
        title: "Conditions for a Subspace",
        statement:
          "A subset $U$ of $V$ is a subspace of $V$ if and only if $U$ satisfies the following three conditions:\n\n1. Additive identity: $0 \\in U$\n\n2. Closed under addition: $u, v \\in U$ implies $u + v \\in U$\n\n3. Closed under scalar multiplication: $\\lambda \\in \\F$ and $u \\in U$ implies $\\lambda u \\in U$",
        intuition:
          "This is the practical test. To show something is a subspace, check these three things. Condition 1 prevents the empty set from being a subspace. Conditions 2 and 3 say you can't \"escape\" $U$ using the vector space operations.",
      },
      {
        type: "proof",
        body: "If $U$ is a subspace, these three conditions obviously hold (they're part of being a vector space). Conversely, suppose $U$ satisfies all three conditions. Commutativity, associativity, and the distributive properties hold in $U$ because they hold for all vectors in $V$, and elements of $U$ are elements of $V$. Condition 1 gives the additive identity. Condition 3 with $\\lambda = -1$ gives additive inverses. Condition 3 with $\\lambda = 1$ gives the multiplicative identity. So $U$ is a vector space.",
        intuition:
          "The key insight: most axioms are \"free\" because $U$ inherits them from $V$. The only things that can go wrong are: (a) $U$ is empty, (b) adding two elements of $U$ gives something outside $U$, or (c) scaling an element of $U$ gives something outside $U$.",
      },
      {
        type: "visualization",
        component: "SubspaceViz",
        caption:
          "In R^2, every subspace is either {0}, a line through the origin, or all of R^2. Drag the vector to change the line.",
      },
      {
        type: "text",
        body: "Let's look at some important examples and non-examples.",
      },
      {
        type: "example",
        title: "Subspace: line through the origin",
        body: "Let $U = \\{(x, 2x) : x \\in \\R\\} \\subset \\R^2$. This is the line $y = 2x$.\n\n1. Contains $0$: $(0, 0)$ is in $U$ (take $x = 0$).\n2. Closed under addition: $(x, 2x) + (y, 2y) = (x+y, 2(x+y)) \\in U$.\n3. Closed under scalar multiplication: $\\lambda(x, 2x) = (\\lambda x, 2\\lambda x) \\in U$.\n\nSo $U$ is a subspace of $\\R^2$.",
      },
      {
        type: "example",
        title: "NOT a subspace: line not through the origin",
        body: "Let $W = \\{(x, 2x + 1) : x \\in \\R\\} \\subset \\R^2$. This is the line $y = 2x + 1$.\n\n$W$ is NOT a subspace because it doesn't contain the origin: when $x = 0$, we get $(0, 1)$, not $(0, 0)$. You can verify that $(0, 0)$ is not in $W$ (that would require $0 = 2 \\cdot 0 + 1 = 1$, which is false).\n\nThis illustrates a key point: subspaces must pass through the origin. Any line, plane, or hyperplane that doesn't pass through $0$ cannot be a subspace.",
      },
      {
        type: "text",
        body: "Axler also introduces sums and direct sums of subspaces. The sum of two subspaces is the set of all possible sums of their elements.",
      },
      {
        type: "definition",
        label: "Definition 1.13",
        title: "Sum of Subspaces",
        statement:
          "If $U_1, \\ldots, U_m$ are subspaces of $V$, then the sum $U_1 + \\cdots + U_m$ is defined as:$$U_1 + \\cdots + U_m = \\{u_1 + \\cdots + u_m : u_j \\in U_j\\}$$",
        intuition:
          "The sum collects everything you can build by picking one vector from each subspace and adding them. For example, if $U$ is the $x$-axis and $W$ is the $y$-axis in $\\R^2$, then $U + W = \\R^2$ because any $(a, b)$ can be written as $(a, 0) + (0, b)$.",
      },
      {
        type: "theorem",
        label: "Theorem 1.14",
        title: "Sum of Subspaces is the Smallest Containing Subspace",
        statement:
          "The sum $U_1 + \\cdots + U_m$ is the smallest subspace of $V$ containing $U_1, \\ldots, U_m$.",
        intuition:
          "Any subspace containing all the $U_j$'s must contain all sums of their elements. So the sum is the \"tightest\" subspace that wraps around all of them.",
      },
      {
        type: "definition",
        label: "Definition 1.15",
        title: "Direct Sum",
        statement:
          "The sum $U_1 + \\cdots + U_m$ is called a direct sum, written $U_1 \\oplus \\cdots \\oplus U_m$, if each vector in the sum can be written in only one way as $u_1 + \\cdots + u_m$ with $u_j \\in U_j$.",
        intuition:
          "A direct sum means the decomposition is unique. Think of coordinates: every vector in $\\R^3$ has a unique decomposition into $x$-, $y$-, and $z$-components. That's because $\\R^3 = \\R e_1 \\oplus \\R e_2 \\oplus \\R e_3$ is a direct sum.",
      },
      {
        type: "theorem",
        label: "Theorem 1.16",
        title: "Condition for Direct Sum",
        statement:
          "The sum $U_1 + \\cdots + U_m$ is a direct sum if and only if the only way to write $0$ as $u_1 + \\cdots + u_m$ (with each $u_j \\in U_j$) is $u_1 = \\cdots = u_m = 0$.",
        intuition:
          "You only need to check uniqueness for the zero vector. If zero has a unique decomposition (the trivial one), then every vector does too. This is the practical test for direct sums.",
      },
      {
        type: "theorem",
        label: "Theorem 1.17",
        title: "Direct Sum of Two Subspaces",
        statement:
          "If $U$ and $W$ are subspaces of $V$, then $U + W$ is a direct sum if and only if $U \\cap W = \\{0\\}$.",
        intuition:
          "For two subspaces, direct sum means they only overlap at the origin. If $U$ and $W$ share a nonzero vector $v$, then $0 = v + (-v)$ gives two decompositions of $0$ (the trivial one and this non-trivial one).",
      },
    ],
    examples: [
      {
        title: "Direct sum in R^3",
        problem:
          "Let $U = \\{(x, y, 0) : x, y \\in \\R\\}$ (the $xy$-plane) and $W = \\{(0, 0, z) : z \\in \\R\\}$ (the $z$-axis). Is $U + W$ a direct sum?",
        solution:
          "Yes. $U \\cap W = \\{(0, 0, 0)\\}$ because the only vector in both the $xy$-plane and the $z$-axis is the origin. So $\\R^3 = U \\oplus W$. Every vector $(x, y, z)$ has a unique decomposition: $(x, y, 0) + (0, 0, z)$.",
      },
    ],
    practiceProblems: [
      {
        id: "1.3.1-p1",
        type: "select-all",
        question:
          "Which of the following subsets of $\\R^2$ are subspaces?",
        choices: [
          { label: "A", text: "$\\{(x, y) : x \\geq 0\\}$ (the right half-plane)" },
          { label: "B", text: "$\\{(x, y) : 3x - 2y = 0\\}$" },
          { label: "C", text: "$\\{(0, 0)\\}$" },
          { label: "D", text: "$\\{(x, y) : xy = 0\\}$" },
        ],
        correctAnswers: ["B", "C"],
        explanation:
          "(A) fails closure under scalar multiplication: $(1, 0)$ is in the set, but $(-1)(1, 0) = (-1, 0)$ is not ($x = -1 < 0$). (B) is a subspace: it's a line through the origin. Check: $3(0) - 2(0) = 0$, and if $3x - 2y = 0$ and $3x' - 2y' = 0$, then $3(x+x') - 2(y+y') = 0$. (C) is the trivial subspace -- always a subspace. (D) fails closure under addition: $(1,0)$ and $(0,1)$ are both in the set ($xy = 0$ for both), but $(1,0)+(0,1) = (1,1)$ and $1 \\cdot 1 \\neq 0$.",
        hint: "For each set, check: (1) contains zero? (2) closed under addition? (3) closed under scalar multiplication?",
        difficulty: "standard",
        source: "custom",
      },
      {
        id: "1.3.1-p2",
        type: "multiple-choice",
        question:
          "The subspaces of $\\R^2$ are: $\\{0\\}$, all lines through the origin, and $\\R^2$ itself. What are the subspaces of $\\R^3$?",
        choices: [
          { label: "A", text: "$\\{0\\}$, lines through the origin, and $\\R^3$" },
          { label: "B", text: "$\\{0\\}$, lines through the origin, planes through the origin, and $\\R^3$" },
          { label: "C", text: "Lines through the origin and planes through the origin" },
          { label: "D", text: "Any line or plane, whether or not it passes through the origin" },
        ],
        correctAnswer: "B",
        explanation:
          "The subspaces of $\\R^3$ are: the trivial subspace $\\{0\\}$, all lines through the origin (1-dimensional subspaces), all planes through the origin (2-dimensional subspaces), and $\\R^3$ itself. A line or plane not through the origin cannot be a subspace because it doesn't contain $0$.",
        difficulty: "basic",
        source: "custom",
      },
      {
        id: "1.3.1-p3",
        type: "multiple-choice",
        question:
          "Let $U = \\{(x, x, 0) : x \\in \\R\\}$ and $W = \\{(0, y, y) : y \\in \\R\\}$ in $\\R^3$. Is $U + W$ a direct sum?",
        choices: [
          { label: "A", text: "Yes, because $U \\cap W = \\{0\\}$" },
          { label: "B", text: "No, because $U \\cap W$ contains nonzero vectors" },
          { label: "C", text: "Cannot be determined without more information" },
        ],
        correctAnswer: "A",
        explanation:
          "A vector in $U \\cap W$ must have the form $(x, x, 0)$ AND $(0, y, y)$. So $x = 0$ (from the first component of the $W$ form), and then $x = 0$ forces the $U$ form to be $(0, 0, 0)$. Similarly $y = 0$. So $U \\cap W = \\{(0, 0, 0)\\}$, and the sum is direct.",
        hint: "Find $U \\cap W$ by setting $(x, x, 0) = (0, y, y)$ and solving.",
        difficulty: "standard",
        source: "axler",
      },
      {
        id: "1.3.1-p4",
        type: "free-response",
        question:
          "Is the set of all solutions to $x + 2y - z = 0$ a subspace of $\\R^3$? Answer yes or no.",
        acceptedAnswers: ["yes", "Yes", "YES"],
        explanation:
          "Yes. Check the three conditions: (1) $(0,0,0)$ satisfies $0 + 0 - 0 = 0$. (2) If $x_1 + 2y_1 - z_1 = 0$ and $x_2 + 2y_2 - z_2 = 0$, then $(x_1+x_2) + 2(y_1+y_2) - (z_1+z_2) = 0$. (3) If $x + 2y - z = 0$ then $\\lambda x + 2\\lambda y - \\lambda z = \\lambda(x + 2y - z) = 0$. In general, the solution set of any homogeneous linear equation (right-hand side = 0) is a subspace.",
        hint: "A homogeneous linear equation always passes the three subspace tests.",
        difficulty: "basic",
        source: "custom",
      },
    ],
  },
};
