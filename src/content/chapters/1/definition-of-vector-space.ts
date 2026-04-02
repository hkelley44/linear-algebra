import { Topic } from "@/lib/types/content";

export const definitionOfVectorSpace: Topic = {
  id: "1.2.1",
  title: "Definition of Vector Space",
  slug: "definition-of-vector-space",
  sectionId: "1.2",
  content: {
    explanation: [
      {
        type: "text",
        body: "In the previous section, we saw that $\\F^n$ comes equipped with addition and scalar multiplication that behave nicely. The idea of a vector space is to abstract this: any set with operations that satisfy the same nice properties is a vector space. This abstraction is powerful because the same theorems apply to wildly different objects -- lists of numbers, functions, polynomials, matrices -- as long as the rules are satisfied.",
      },
      {
        type: "definition",
        label: "Definition 1.6",
        title: "Addition and Scalar Multiplication",
        statement:
          "An addition on a set $V$ is a function that assigns to each pair $u, v \\in V$ an element $u + v \\in V$. A scalar multiplication on $V$ is a function that assigns to each $\\lambda \\in \\F$ and $v \\in V$ an element $\\lambda v \\in V$.",
        intuition:
          "These are the two operations every vector space needs. The key constraint is closure: when you add two elements or scale an element, the result must stay in $V$. You can't \"escape\" the set.",
      },
      {
        type: "definition",
        label: "Definition 1.7",
        title: "Vector Space",
        statement:
          "A vector space over $\\F$ is a set $V$ together with addition and scalar multiplication on $V$ such that the following properties hold:\n\nCommutativity: $u + v = v + u$ for all $u, v \\in V$\n\nAssociativity: $(u + v) + w = u + (v + w)$ and $(ab)v = a(bv)$ for all $u, v, w \\in V$ and $a, b \\in \\F$\n\nAdditive identity: there exists $0 \\in V$ such that $v + 0 = v$ for all $v \\in V$\n\nAdditive inverse: for every $v \\in V$ there exists $w \\in V$ such that $v + w = 0$\n\nMultiplicative identity: $1v = v$ for all $v \\in V$\n\nDistributive properties: $a(u + v) = au + av$ and $(a + b)v = av + bv$ for all $a, b \\in \\F$ and $u, v \\in V$",
        intuition:
          "This is a lot of axioms, but the intuition is simple: a vector space is a set where you can add things together, scale them, and these operations work \"the way you'd expect\" -- the same way they work for lists of numbers. The axioms just formalize \"works the way you'd expect.\"",
      },
      {
        type: "text",
        body: "Elements of a vector space are called vectors. Even though we often think of vectors as arrows or lists of numbers, a \"vector\" in the abstract sense is just an element of a vector space. It could be a function, a polynomial, or something else entirely.",
      },
      {
        type: "text",
        body: "Let's look at the most important examples.",
      },
      {
        type: "example",
        title: "Example: $\\F^n$",
        body: "The set $\\F^n$ with componentwise addition and scalar multiplication is a vector space. This is the example that motivated the definition. We verified the properties (commutativity, etc.) in the previous section -- they all follow from the corresponding properties of $\\F$ itself.",
      },
      {
        type: "example",
        title: "Example: $\\F^\\infty$",
        body: "The set of all infinite sequences $(x_1, x_2, x_3, \\ldots)$ with entries in $\\F$ is a vector space, with componentwise operations:$$(x_1, x_2, \\ldots) + (y_1, y_2, \\ldots) = (x_1 + y_1, x_2 + y_2, \\ldots)$$$$\\lambda(x_1, x_2, \\ldots) = (\\lambda x_1, \\lambda x_2, \\ldots)$$This is like $\\F^n$ but with infinitely many components. All the axioms still hold because they hold componentwise.",
      },
      {
        type: "example",
        title: "Example: Polynomials",
        body: "Let $\\mathcal{P}(\\F)$ be the set of all polynomials with coefficients in $\\F$. With the usual addition and scalar multiplication of polynomials, this is a vector space. For instance:$$(3x^2 + 2x + 1) + (x^2 - x + 4) = 4x^2 + x + 5$$$$2(3x^2 + 2x + 1) = 6x^2 + 4x + 2$$The zero vector is the zero polynomial (all coefficients zero). This example is important: polynomials are very different from lists of numbers, yet they form a vector space.",
      },
      {
        type: "text",
        body: "Axler proves several basic properties that follow from the axioms. These are things that feel obvious but are worth proving because they show the axioms are sufficient.",
      },
      {
        type: "theorem",
        label: "Theorem 1.8",
        title: "Unique Additive Identity",
        statement: "A vector space has exactly one additive identity.",
        intuition:
          "You might worry: could there be two different \"zero vectors\"? No. If both $0$ and $0'$ are additive identities, then $0 = 0 + 0' = 0'$. The axiom forces uniqueness.",
      },
      {
        type: "proof",
        body: "Suppose $0$ and $0'$ are both additive identities in $V$. Then $0' = 0' + 0 = 0 + 0' = 0$. The first equality uses $0$ as an additive identity, and the second uses commutativity.",
        intuition:
          "The trick: use each supposed identity on the other. They must both \"do nothing,\" so they're the same.",
      },
      {
        type: "theorem",
        label: "Theorem 1.9",
        title: "Unique Additive Inverse",
        statement: "Every element of a vector space has exactly one additive inverse.",
        intuition:
          "For any vector $v$, there's exactly one vector that \"cancels\" it. We call it $-v$.",
      },
      {
        type: "proof",
        body: "Suppose $w$ and $w'$ are both additive inverses of $v$. Then:$$w = w + 0 = w + (v + w') = (w + v) + w' = 0 + w' = w'$$",
        intuition:
          "Add $w'$ to both sides of $v + w = 0$, using the fact that $v + w' = 0$ too. The associativity axiom lets us regroup.",
      },
      {
        type: "theorem",
        label: "Theorem 1.10",
        title: "Zero Times a Vector",
        statement: "$0v = 0$ for every $v \\in V$.",
        intuition:
          "The scalar $0$ (a number) times any vector gives the vector $\\mathbf{0}$ (the zero vector). This isn't assumed -- it's proved from the axioms.",
      },
      {
        type: "proof",
        body: "For any $v \\in V$:$$0v = (0 + 0)v = 0v + 0v$$Adding the additive inverse of $0v$ to both sides: $0 = 0v$.",
        intuition:
          "We used the distributive property to split $0 = 0 + 0$, then cancelled.",
      },
      {
        type: "note",
        body: "Watch the notation: $0v = 0$ uses $0$ in two different senses. On the left, $0$ is the scalar zero (a number). On the right, $0$ is the zero vector. Context usually makes this clear.",
      },
    ],
    examples: [
      {
        title: "The set {0} is a vector space",
        problem: "Show that the set $\\{0\\}$ with the only possible operations ($0 + 0 = 0$ and $\\lambda \\cdot 0 = 0$) is a vector space.",
        solution:
          "All axioms are satisfied trivially. There's only one element, so commutativity and associativity hold automatically. The zero vector is $0$, and $0$ is its own additive inverse. This is the smallest possible vector space.",
      },
      {
        title: "Functions as vectors",
        problem:
          "Let $V$ be the set of all functions $f: \\R \\to \\R$. Define addition by $(f+g)(x) = f(x) + g(x)$ and scalar multiplication by $(\\lambda f)(x) = \\lambda f(x)$. Is $V$ a vector space?",
        solution:
          "Yes. The zero vector is the zero function $f(x) = 0$ for all $x$. Additive inverses exist: if $f \\in V$, then $-f$ defined by $(-f)(x) = -f(x)$ satisfies $f + (-f) = 0$. All other axioms follow from the corresponding properties of $\\R$. This is a huge vector space -- it contains every function from $\\R$ to $\\R$.",
      },
    ],
    practiceProblems: [
      {
        id: "1.2.1-p1",
        type: "multiple-choice",
        question:
          "Which of the following is NOT a vector space axiom?",
        choices: [
          { label: "A", text: "Commutativity: $u + v = v + u$" },
          { label: "B", text: "Multiplicative commutativity: $uv = vu$" },
          { label: "C", text: "Distributive property: $a(u + v) = au + av$" },
          { label: "D", text: "Additive identity: there exists $0$ such that $v + 0 = v$" },
        ],
        correctAnswer: "B",
        explanation:
          "There is no multiplication between two vectors in a vector space -- only scalar multiplication (a scalar times a vector). So \"$uv = vu$\" doesn't even make sense in the vector space axioms. All the other choices are genuine axioms.",
        difficulty: "basic",
        source: "custom",
      },
      {
        id: "1.2.1-p2",
        type: "select-all",
        question:
          "Which of the following are vector spaces over $\\R$? (Select all that apply.)",
        choices: [
          { label: "A", text: "The set of all polynomials of degree exactly 2" },
          { label: "B", text: "The set of all polynomials of degree at most 2" },
          { label: "C", text: "$\\R^4$" },
          { label: "D", text: "The set $\\{(x, y) \\in \\R^2 : x + y = 0\\}$" },
        ],
        correctAnswers: ["B", "C", "D"],
        explanation:
          "(A) is NOT a vector space because it doesn't contain the zero polynomial (degree of zero polynomial is undefined or $-\\infty$, not 2), and it's not closed under addition ($x^2 + (-x^2) = 0$, which is not degree 2). (B) is a vector space -- adding two polynomials of degree $\\leq 2$ gives a polynomial of degree $\\leq 2$, and the zero polynomial has degree $\\leq 2$. (C) is the standard example. (D) is a subspace of $\\R^2$ (we'll prove this formally in the next section): it contains $(0,0)$, and if $x+y=0$ and $x'+y'=0$, then $(x+x')+(y+y')=0$.",
        hint: "Check two things: does the set contain the zero vector, and is it closed under addition and scalar multiplication?",
        difficulty: "standard",
        source: "custom",
      },
      {
        id: "1.2.1-p3",
        type: "free-response",
        question:
          "If $v$ is a vector in a vector space $V$, what is $(-1)v + v$? (Use the axioms to simplify. Enter the simplest name for the result.)",
        acceptedAnswers: ["0", "zero", "zero vector", "the zero vector"],
        explanation:
          "By the distributive property: $(-1)v + v = (-1)v + 1v = (-1+1)v = 0v = 0$. So $(-1)v$ is the additive inverse of $v$. This is why we write $-v$ to mean $(-1)v$.",
        hint: "Use the fact that $v = 1 \\cdot v$, then factor.",
        difficulty: "standard",
        source: "axler",
      },
      {
        id: "1.2.1-p4",
        type: "multiple-choice",
        question:
          "Suppose $V = \\R^2$ with standard scalar multiplication but with addition defined by $(x_1, y_1) + (x_2, y_2) = (x_1 + x_2, 0)$. Is this a vector space?",
        choices: [
          { label: "A", text: "Yes" },
          { label: "B", text: "No, because there is no additive identity" },
          { label: "C", text: "No, because additive inverses don't exist" },
          { label: "D", text: "No, because the distributive property fails" },
        ],
        correctAnswer: "B",
        explanation:
          "Check whether $(0,0)$ works as an additive identity. We need $v + (0,0) = v$ for all $v$. But with this addition: $(0,1) + (0,0) = (0+0, 0) = (0, 0) \\neq (0,1)$. The second component is always crushed to zero by this addition, so $(0,0)$ fails as an identity for any vector with nonzero second component. In fact, no element can serve as an additive identity, because adding anything always produces $0$ in the second component.",
        difficulty: "challenge",
        source: "custom",
      },
    ],
  },
};
