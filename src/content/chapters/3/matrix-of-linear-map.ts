import { Topic } from "@/lib/types/content";

export const matrixOfLinearMap: Topic = {
  id: "3.3.1",
  title: "Matrix of a Linear Map",
  slug: "matrix-of-linear-map",
  sectionId: "3.3",
  content: {
    explanation: [
      {
        type: "text",
        body: "We've seen that a linear map is determined by its values on a basis (Theorem 3.2). A matrix is simply a way to record those values. Once you fix bases for the domain and codomain, every linear map corresponds to a unique matrix, and vice versa.",
      },
      {
        type: "definition",
        label: "Definition 3.9",
        title: "Matrix",
        statement:
          "An $m \\times n$ matrix is a rectangular array of elements of $\\F$ with $m$ rows and $n$ columns:$$A = \\begin{pmatrix} a_{1,1} & \\cdots & a_{1,n} \\\\ \\vdots & \\ddots & \\vdots \\\\ a_{m,1} & \\cdots & a_{m,n} \\end{pmatrix}$$We write $A_{j,k}$ for the entry in row $j$, column $k$.",
        intuition:
          "A matrix is just a grid of numbers. By itself it's just data. But when connected to a linear map via chosen bases, each column tells you where a basis vector goes.",
      },
      {
        type: "definition",
        label: "Definition 3.10",
        title: "Matrix of a Linear Map",
        statement:
          "Suppose $T \\in \\mathcal{L}(V, W)$ and $v_1, \\ldots, v_n$ is a basis of $V$ and $w_1, \\ldots, w_m$ is a basis of $W$. The matrix of $T$ with respect to these bases, written $\\mathcal{M}(T)$, is the $m \\times n$ matrix whose $k$-th column consists of the coefficients needed to write $Tv_k$ as a linear combination of the $w_j$'s:$$Tv_k = A_{1,k} w_1 + A_{2,k} w_2 + \\cdots + A_{m,k} w_m$$",
        intuition:
          "Column $k$ of the matrix = the coordinates of $T(v_k)$ in the $W$-basis. The matrix is a complete description of $T$, given the choice of bases. Different bases give different matrices for the same map.",
      },
      {
        type: "example",
        title: "Matrix with standard bases",
        body: "Let $T: \\R^2 \\to \\R^3$ be defined by $T(x,y) = (x + y, 2x, y)$. Using the standard bases of $\\R^2$ and $\\R^3$:\n\n$Te_1 = T(1,0) = (1, 2, 0) = 1 \\cdot e_1 + 2 \\cdot e_2 + 0 \\cdot e_3$\n\n$Te_2 = T(0,1) = (1, 0, 1) = 1 \\cdot e_1 + 0 \\cdot e_2 + 1 \\cdot e_3$\n\nSo $\\mathcal{M}(T) = \\begin{pmatrix} 1 & 1 \\\\ 2 & 0 \\\\ 0 & 1 \\end{pmatrix}$. The columns are $T(e_1)$ and $T(e_2)$.",
      },
      {
        type: "text",
        body: "Matrix multiplication is defined so that the matrix of $ST$ equals the matrix of $S$ times the matrix of $T$. This is not a coincidence -- it's the reason matrix multiplication is defined the way it is.",
      },
      {
        type: "definition",
        label: "Definition 3.11",
        title: "Matrix Multiplication",
        statement:
          "If $A$ is an $m \\times n$ matrix and $C$ is an $n \\times p$ matrix, then $AC$ is the $m \\times p$ matrix defined by:$$(AC)_{j,k} = \\sum_{r=1}^{n} A_{j,r} C_{r,k}$$In words: the $(j,k)$ entry of $AC$ is the dot product of row $j$ of $A$ with column $k$ of $C$.",
        intuition:
          "Matrix multiplication encodes composition. If $A$ represents map $S$ and $C$ represents map $T$, then $AC$ represents $ST$ (apply $T$ first, then $S$). The definition looks arbitrary, but it's forced by wanting $\\mathcal{M}(ST) = \\mathcal{M}(S) \\mathcal{M}(T)$.",
      },
      {
        type: "text",
        body: "Important: matrix multiplication is NOT commutative in general. $AB \\neq BA$ for most matrices. (In fact, $AB$ and $BA$ might not even have the same dimensions.) This reflects the fact that composition of maps is not commutative: applying $S$ then $T$ is different from $T$ then $S$.",
      },
      {
        type: "example",
        title: "Matrix-vector multiplication",
        body: "The action of a linear map on a vector, in coordinates, is matrix-vector multiplication:$$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} x + 2y \\\\ 3x + 4y \\end{pmatrix}$$This computes $T(x, y)$ where $T$ is the linear map with matrix $\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$. The output is: (row 1) $\\cdot$ (input), (row 2) $\\cdot$ (input).",
      },
      {
        type: "note",
        body: "The correspondence between linear maps and matrices depends on the choice of bases. The same linear map gets different matrices in different bases. In Chapter 5+ of Axler, you'll learn about changing bases and finding the \"best\" basis for a given map.",
      },
    ],
    examples: [
      {
        title: "Matrix of the zero map and identity",
        problem:
          "What are the matrices of the zero map $0 \\in \\mathcal{L}(V, W)$ and the identity map $I \\in \\mathcal{L}(V)$?",
        solution:
          "The zero map sends every basis vector to $0$, so $\\mathcal{M}(0)$ is the all-zeros matrix. The identity map sends $e_j$ to $e_j$, so $\\mathcal{M}(I) = \\begin{pmatrix} 1 & 0 & \\cdots \\\\ 0 & 1 & \\cdots \\\\ \\vdots & & \\ddots \\end{pmatrix}$, the identity matrix with 1's on the diagonal and 0's elsewhere.",
      },
    ],
    practiceProblems: [
      {
        id: "3.3.1-p1",
        type: "multiple-choice",
        question:
          "Let $T: \\R^2 \\to \\R^2$ be defined by $T(x,y) = (2x - y, x + 3y)$. Using the standard basis, the matrix of $T$ is:",
        choices: [
          { label: "A", text: "$\\begin{pmatrix} 2 & -1 \\\\ 1 & 3 \\end{pmatrix}$" },
          { label: "B", text: "$\\begin{pmatrix} 2 & 1 \\\\ -1 & 3 \\end{pmatrix}$" },
          { label: "C", text: "$\\begin{pmatrix} 2 & -1 \\\\ 3 & 1 \\end{pmatrix}$" },
          { label: "D", text: "$\\begin{pmatrix} -1 & 2 \\\\ 3 & 1 \\end{pmatrix}$" },
        ],
        correctAnswer: "A",
        explanation:
          "Column 1 = $T(e_1) = T(1,0) = (2, 1)$. Column 2 = $T(e_2) = T(0,1) = (-1, 3)$. So $\\mathcal{M}(T) = \\begin{pmatrix} 2 & -1 \\\\ 1 & 3 \\end{pmatrix}$. Remember: column $k$ is where basis vector $k$ goes.",
        difficulty: "basic",
        source: "custom",
      },
      {
        id: "3.3.1-p2",
        type: "free-response",
        question:
          "If $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$ and $v = \\begin{pmatrix} 3 \\\\ -1 \\end{pmatrix}$, what is the first component of $Av$? (Enter a single number.)",
        acceptedAnswers: ["1"],
        explanation:
          "$(Av)_1 = 1 \\cdot 3 + 2 \\cdot (-1) = 3 - 2 = 1$. The first component is the dot product of the first row of $A$ with $v$.",
        difficulty: "basic",
        source: "custom",
      },
      {
        id: "3.3.1-p3",
        type: "multiple-choice",
        question:
          "Matrix multiplication is:",
        choices: [
          { label: "A", text: "Commutative and associative" },
          { label: "B", text: "Commutative but not associative" },
          { label: "C", text: "Associative but not commutative" },
          { label: "D", text: "Neither commutative nor associative" },
        ],
        correctAnswer: "C",
        explanation:
          "Matrix multiplication is associative: $(AB)C = A(BC)$, because it corresponds to composition of linear maps, which is associative. But it is NOT commutative: $AB \\neq BA$ in general. For example, $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix} \\begin{pmatrix} 0 & 0 \\\\ 1 & 0 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}$, but reversing the order gives $\\begin{pmatrix} 0 & 0 \\\\ 0 & 1 \\end{pmatrix}$.",
        difficulty: "standard",
        source: "custom",
      },
    ],
  },
};
