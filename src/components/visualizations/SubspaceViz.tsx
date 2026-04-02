"use client";

import {
  Mafs,
  Coordinates,
  Vector,
  useMovablePoint,
  Theme,
  Text,
  Line,
  Circle,
} from "mafs";

/**
 * Interactive visualization of subspaces in R^2.
 * Shows that a subspace of R^2 must be: {0}, a line through the origin, or all of R^2.
 * User drags a vector; the subspace it generates (the line through origin) is shown.
 */
export function SubspaceViz() {
  const v = useMovablePoint([2, 1], { color: Theme.blue });

  const vLen = Math.sqrt(v.point[0] ** 2 + v.point[1] ** 2);

  return (
    <div>
      <Mafs viewBox={{ x: [-5, 5], y: [-5, 5] }} height={350}>
        <Coordinates.Cartesian />

        {/* The subspace: line through origin */}
        {vLen > 0.05 && (
          <Line.ThroughPoints
            point1={[0, 0]}
            point2={v.point}
            color={Theme.blue}
            opacity={0.3}
            weight={4}
          />
        )}

        {/* Show closure under addition: v and 2v */}
        <Vector tail={[0, 0]} tip={v.point} color={Theme.blue} />
        <Text x={v.point[0] + 0.3} y={v.point[1] + 0.3} size={14} color={Theme.blue}>
          v
        </Text>

        {vLen > 0.05 && (
          <>
            <Vector
              tail={[0, 0]}
              tip={[v.point[0] * 2, v.point[1] * 2]}
              color={Theme.blue}
              opacity={0.4}
            />
            <Text
              x={v.point[0] * 2 + 0.3}
              y={v.point[1] * 2 + 0.3}
              size={12}
              color={Theme.blue}
            >
              2v
            </Text>

            <Vector
              tail={[0, 0]}
              tip={[v.point[0] * -1, v.point[1] * -1]}
              color={Theme.blue}
              opacity={0.4}
            />
            <Text
              x={v.point[0] * -1 - 0.4}
              y={v.point[1] * -1 - 0.3}
              size={12}
              color={Theme.blue}
            >
              -v
            </Text>
          </>
        )}

        {/* Origin marker */}
        <Circle center={[0, 0]} radius={0.08} color={Theme.foreground} />

        {v.element}
      </Mafs>
      <div className="font-sans text-sm text-stone-500 mt-2 space-y-1">
        <p>
          The <span className="text-blue-600 font-medium">line through the origin</span> in the
          direction of <span className="text-blue-600">v</span> is a subspace of R&sup2;.
          It contains the zero vector, and is closed under addition and scalar multiplication.
        </p>
        <p className="text-stone-400">
          Drag v to change the subspace. Note: every subspace of R&sup2; must pass through the origin.
          The only subspaces are: &#123;0&#125;, lines through the origin, and all of R&sup2;.
        </p>
      </div>
    </div>
  );
}
