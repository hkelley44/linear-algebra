"use client";

import {
  Mafs,
  Coordinates,
  Vector,
  useMovablePoint,
  Theme,
  Text,
  Line,
} from "mafs";

/**
 * Interactive visualization of linear independence vs. dependence.
 * Shows two vectors. When they're independent, indicates so.
 * When one becomes a scalar multiple of the other (collinear), highlights dependence.
 * Also shows a three-vector case where the third is redundant.
 */
export function LinearIndependenceViz() {
  const v1 = useMovablePoint([2, 0.5], { color: Theme.blue });
  const v2 = useMovablePoint([0.5, 2], { color: Theme.orange });
  const v3 = useMovablePoint([2.5, 2.5], { color: Theme.green });

  // Check pairwise collinearity
  const cross12 = v1.point[0] * v2.point[1] - v1.point[1] * v2.point[0];
  const cross12Near = Math.abs(cross12) < 0.2;

  // Check if v3 is in span(v1, v2) — solve v3 = a*v1 + b*v2
  const det = v1.point[0] * v2.point[1] - v1.point[1] * v2.point[0];
  let isV3Dependent = false;
  let a = 0, b = 0;

  if (Math.abs(det) > 0.01) {
    a = (v3.point[0] * v2.point[1] - v3.point[1] * v2.point[0]) / det;
    b = (v1.point[0] * v3.point[1] - v1.point[1] * v3.point[0]) / det;
    // v3 is "in the span" always for R^2 with independent v1, v2
    // But visually show the decomposition
    isV3Dependent = true;
  } else {
    // v1 and v2 are collinear — check if v3 is also collinear
    const cross13 = v1.point[0] * v3.point[1] - v1.point[1] * v3.point[0];
    isV3Dependent = Math.abs(cross13) < 0.2;
  }

  const allCollinear = cross12Near;

  return (
    <div>
      <Mafs viewBox={{ x: [-5, 5], y: [-5, 5] }} height={380}>
        <Coordinates.Cartesian />

        {/* Show the line if collinear */}
        {cross12Near && (
          <Line.ThroughPoints
            point1={[0, 0]}
            point2={v1.point}
            color={Theme.red}
            opacity={0.3}
            weight={4}
          />
        )}

        {/* Decomposition of v3: show a*v1 and b*v2 components */}
        {!cross12Near && (
          <>
            <Vector
              tail={[0, 0]}
              tip={[a * v1.point[0], a * v1.point[1]]}
              color={Theme.blue}
              opacity={0.3}
              weight={1.5}
            />
            <Vector
              tail={[a * v1.point[0], a * v1.point[1]]}
              tip={[a * v1.point[0] + b * v2.point[0], a * v1.point[1] + b * v2.point[1]]}
              color={Theme.orange}
              opacity={0.3}
              weight={1.5}
            />
          </>
        )}

        {/* Vectors */}
        <Vector tail={[0, 0]} tip={v1.point} color={Theme.blue} />
        <Text x={v1.point[0] + 0.3} y={v1.point[1] + 0.3} size={14} color={Theme.blue}>
          v₁
        </Text>

        <Vector tail={[0, 0]} tip={v2.point} color={Theme.orange} />
        <Text x={v2.point[0] + 0.3} y={v2.point[1] + 0.3} size={14} color={Theme.orange}>
          v₂
        </Text>

        <Vector tail={[0, 0]} tip={v3.point} color={Theme.green} />
        <Text x={v3.point[0] + 0.3} y={v3.point[1] + 0.3} size={14} color={Theme.green}>
          v₃
        </Text>

        {v1.element}
        {v2.element}
        {v3.element}
      </Mafs>
      <div className="font-sans text-sm text-stone-500 mt-2 space-y-1">
        {cross12Near ? (
          <p>
            <span className="text-red-500 font-medium">v₁ and v₂ are linearly dependent</span> &mdash;
            they point in the same (or opposite) direction. One is a scalar multiple of the other,
            so the set &#123;v₁, v₂&#125; is linearly dependent.
          </p>
        ) : (
          <p>
            <span className="text-blue-600 font-medium">v₁</span> and{" "}
            <span className="text-orange-500 font-medium">v₂</span> are linearly independent.
            But <span className="text-green-600 font-medium">v₃</span> is always in span(v₁, v₂) in R&sup2; &mdash;
            shown by the dashed decomposition: v₃ = {a.toFixed(1)}v₁ + {b.toFixed(1)}v₂.
            Any three vectors in R&sup2; must be linearly dependent.
          </p>
        )}
        <p className="text-stone-400">
          Drag the vectors to explore. Try making v₁ and v₂ collinear to see dependence.
        </p>
      </div>
    </div>
  );
}
