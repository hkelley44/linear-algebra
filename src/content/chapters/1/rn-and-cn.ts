import { Topic } from "@/lib/types/content";

export const rnAndCn: Topic = {
  id: "1.1.1",
  title: "R^n and C^n",
  slug: "rn-and-cn",
  sectionId: "1.1",
  content: {
    explanation: [
      {
        type: "text",
        body: "Before we can talk about abstract vector spaces, we need to understand the concrete objects that inspired them. The most natural examples come from lists of numbers -- the kind of thing you might already think of as a \"vector.\"",
      },
      {
        type: "definition",
        label: "Definition 1.1",
        title: "Complex Numbers",
        statement:
          "A complex number is a number of the form $a + bi$, where $a, b \\in \\R$ and $i^2 = -1$. The set of all complex numbers is denoted $\\C$. We call $a$ the real part and $b$ the imaginary part.",
        intuition:
          "Think of $\\C$ as extending the number line into a number plane. Real numbers live on the horizontal axis, and $i$ opens up the vertical axis. Every point in this plane is a complex number.",
      },
      {
        type: "text",
        body: "Throughout this course, $\\F$ stands for either $\\R$ or $\\C$. When we write $\\F$, it means the result works for both real and complex numbers. Elements of $\\F$ are called scalars.",
      },
      {
        type: "definition",
        label: "Definition 1.2",
        title: "List",
        statement:
          "A list of length $n$ is an ordered collection of $n$ elements: $(x_1, x_2, \\ldots, x_n)$. Two lists are equal if and only if they have the same length and the same elements in the same order.",
        intuition:
          "A list is just a tuple. The key word is ordered -- $(1, 2, 3)$ and $(3, 2, 1)$ are different lists. And length matters: $(1, 2)$ and $(1, 2, 0)$ are different because they have different lengths.",
      },
      {
        type: "definition",
        label: "Definition 1.3",
        title: "$\\F^n$",
        statement:
          "$\\F^n$ is the set of all lists of length $n$ with entries in $\\F$:$$\\F^n = \\{(x_1, x_2, \\ldots, x_n) : x_j \\in \\F \\text{ for } j = 1, \\ldots, n\\}$$",
        intuition:
          "So $\\R^2$ is all pairs of real numbers (the plane), $\\R^3$ is all triples (3D space), and $\\R^n$ is the natural generalization to $n$ dimensions. $\\C^n$ is the same thing but with complex entries.",
      },
      {
        type: "text",
        body: "Now we need to define two operations on $\\F^n$: addition and scalar multiplication. These are the operations that make $\\F^n$ into a vector space (as we'll see in the next section).",
      },
      {
        type: "definition",
        label: "Definition 1.4",
        title: "Addition in $\\F^n$",
        statement:
          "Addition in $\\F^n$ is defined by adding corresponding entries:$$(x_1, \\ldots, x_n) + (y_1, \\ldots, y_n) = (x_1 + y_1, \\ldots, x_n + y_n)$$",
        intuition:
          "This is componentwise addition. In $\\R^2$, adding $(1, 3)$ and $(2, -1)$ gives $(3, 2)$. Geometrically, this is the parallelogram rule: place the tail of one vector at the tip of the other.",
      },
      {
        type: "visualization",
        component: "VectorAdditionViz",
        caption:
          "Drag the vector tips to explore addition and scalar multiplication in R^2.",
      },
      {
        type: "text",
        body: "Notice that addition has a nice property: the order doesn't matter. $(1, 2) + (3, 4) = (3, 4) + (1, 2) = (4, 6)$. This is commutativity, and it comes directly from the commutativity of real number addition.",
      },
      {
        type: "definition",
        label: "Definition 1.5",
        title: "Scalar Multiplication in $\\F^n$",
        statement:
          "The product of a scalar $\\lambda \\in \\F$ and a vector $(x_1, \\ldots, x_n) \\in \\F^n$ is defined by:$$\\lambda(x_1, \\ldots, x_n) = (\\lambda x_1, \\ldots, \\lambda x_n)$$",
        intuition:
          "Multiplying by a scalar stretches or shrinks the vector. A scalar of 2 doubles the length. A scalar of -1 reverses the direction. A scalar of 0 collapses everything to the zero vector.",
      },
      {
        type: "text",
        body: "We also need a special element: the zero vector, often written $0$ or $\\mathbf{0}$. In $\\F^n$, this is $(0, 0, \\ldots, 0)$ -- the list of all zeros. It acts as the additive identity: $v + 0 = v$ for any vector $v$.",
      },
      {
        type: "example",
        title: "Arithmetic in R^3",
        body: "Let $v = (1, -2, 4)$ and $w = (3, 0, -1)$. Then:$$v + w = (1+3, -2+0, 4+(-1)) = (4, -2, 3)$$$$3v = (3 \\cdot 1, 3 \\cdot (-2), 3 \\cdot 4) = (3, -6, 12)$$$$2v - w = (2-3, -4-0, 8-(-1)) = (-1, -4, 9)$$",
      },
      {
        type: "note",
        body: "A key pattern: both addition and scalar multiplication work componentwise. Each entry is independent of the others. This simplicity is what makes $\\F^n$ easy to work with, and it's the template for the abstract definition coming next.",
      },
    ],
    examples: [
      {
        title: "Points in the plane",
        problem:
          "Compute $(2, -3) + (-1, 5)$ and $4 \\cdot (2, -3)$.",
        solution:
          "$(2, -3) + (-1, 5) = (2 + (-1), -3 + 5) = (1, 2)$. And $4 \\cdot (2, -3) = (8, -12)$.",
      },
      {
        title: "Complex vectors",
        problem:
          "Let $v = (1+i, 2-i) \\in \\C^2$. Compute $iv$.",
        solution:
          "$iv = (i(1+i), i(2-i)) = (i + i^2, 2i - i^2) = (i - 1, 2i + 1) = (-1+i, 1+2i)$.",
      },
    ],
    practiceProblems: [
      {
        id: "1.1.1-p1",
        type: "multiple-choice",
        question:
          "What is $(3, 1, -2) + (0, -4, 5)$ in $\\R^3$?",
        choices: [
          { label: "A", text: "$(3, -3, 3)$" },
          { label: "B", text: "$(3, 5, 3)$" },
          { label: "C", text: "$(3, -3, 7)$" },
          { label: "D", text: "$(3, -3, -7)$" },
        ],
        correctAnswer: "A",
        explanation:
          "Add componentwise: $(3+0, 1+(-4), -2+5) = (3, -3, 3)$.",
        difficulty: "basic",
        source: "custom",
      },
      {
        id: "1.1.1-p2",
        type: "free-response",
        question:
          "If $v = (2, -1)$ and $w = (-3, 4)$, what is the first component of $3v + 2w$? (Enter a single number.)",
        acceptedAnswers: ["0"],
        explanation:
          "$3v = (6, -3)$ and $2w = (-6, 8)$, so $3v + 2w = (0, 5)$. The first component is $0$.",
        hint: "Compute $3v$ and $2w$ separately, then add.",
        difficulty: "basic",
        source: "custom",
      },
      {
        id: "1.1.1-p3",
        type: "multiple-choice",
        question:
          "Which of the following is the additive inverse of $(1, -2, 3)$ in $\\R^3$? (That is, which vector $w$ satisfies $(1, -2, 3) + w = (0, 0, 0)$?)",
        choices: [
          { label: "A", text: "$(-1, 2, -3)$" },
          { label: "B", text: "$(1, 2, 3)$" },
          { label: "C", text: "$(-1, -2, -3)$" },
          { label: "D", text: "$(0, 0, 0)$" },
        ],
        correctAnswer: "A",
        explanation:
          "The additive inverse of $(x_1, x_2, x_3)$ is $(-x_1, -x_2, -x_3)$. We need each component to sum to zero: $1 + (-1) = 0$, $-2 + 2 = 0$, $3 + (-3) = 0$.",
        difficulty: "basic",
        source: "custom",
      },
      {
        id: "1.1.1-p4",
        type: "multiple-choice",
        question:
          "Let $v = (1+i, 2) \\in \\C^2$. What is $iv$?",
        choices: [
          { label: "A", text: "$(i+i^2, 2i) = (-1+i, 2i)$" },
          { label: "B", text: "$(i, 2i)$" },
          { label: "C", text: "$(1+i, 2+i)$" },
          { label: "D", text: "$(i-1, -2)$" },
        ],
        correctAnswer: "A",
        explanation:
          "$iv = (i(1+i), i \\cdot 2) = (i + i^2, 2i) = (i - 1, 2i) = (-1+i, 2i)$. Remember that $i^2 = -1$.",
        difficulty: "standard",
        source: "custom",
      },
    ],
  },
};
