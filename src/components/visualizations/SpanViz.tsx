"use client";

import { useState } from "react";
import {
  Mafs,
  Coordinates,
  Vector,
  useMovablePoint,
  Theme,
  Text,
  Plot,
  Line,
} from "mafs";

/**
 * Interactive visualization of span.
 * Shows how the span of one vector is a line, and the span of two
 * linearly independent vectors fills the plane.
 * User can toggle between span({v}), span({v, w}), and see what happens
 * when v and w are collinear (span collapses to a line).
 */
export function SpanViz() {
  const v = useMovablePoint([2, 1], { color: Theme.blue });
  const w = useMovablePoint([-1, 2], { color: Theme.orange });
  const [showSecondVector, setShowSecondVector] = useState(false);

  // Check if vectors are approximately collinear
  const cross = v.point[0] * w.point[1] - v.point[1] * w.point[0];
  const areCollinear = Math.abs(cross) < 0.15;
  const vLen = Math.sqrt(v.point[0] ** 2 + v.point[1] ** 2);

  return (
    <div>
      <div className="flex gap-2 mb-3 font-sans text-sm">
        <button
          onClick={() => setShowSecondVector(false)}
          className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
            !showSecondVector
              ? "bg-blue-600 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          span(v) &mdash; one vector
        </button>
        <button
          onClick={() => setShowSecondVector(true)}
          className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
            showSecondVector
              ? "bg-blue-600 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          span(v, w) &mdash; two vectors
        </button>
      </div>
      <Mafs viewBox={{ x: [-5, 5], y: [-5, 5] }} height={380}>
        <Coordinates.Cartesian />

        {/* Span visualization */}
        {vLen > 0.01 && (
          <Line.ThroughPoints
            point1={[0, 0]}
            point2={v.point}
            color={Theme.blue}
            opacity={0.3}
            weight={3}
          />
        )}

        {showSecondVector && !areCollinear && (
          <Plot.Inequality
            x={{ ">=": -100, "<=": 100 }}
            y={{ ">=": (_x: number) => -100, "<=": (_x: number) => 100 }}
            color={Theme.green}
          />
        )}

        {showSecondVector && areCollinear && vLen > 0.01 && (
          <Line.ThroughPoints
            point1={[0, 0]}
            point2={v.point}
            color={Theme.orange}
            opacity={0.3}
            weight={5}
          />
        )}

        {/* Vectors */}
        <Vector tail={[0, 0]} tip={v.point} color={Theme.blue} />
        <Text x={v.point[0] + 0.3} y={v.point[1] + 0.3} size={14} color={Theme.blue}>
          v
        </Text>

        {showSecondVector && (
          <>
            <Vector tail={[0, 0]} tip={w.point} color={Theme.orange} />
            <Text x={w.point[0] + 0.3} y={w.point[1] + 0.3} size={14} color={Theme.orange}>
              w
            </Text>
          </>
        )}

        {v.element}
        {showSecondVector && w.element}
      </Mafs>
      <div className="font-sans text-sm text-stone-500 mt-2 space-y-1">
        {!showSecondVector ? (
          <>
            <p>
              <span className="text-blue-600 font-medium">span(v)</span> = the line through
              the origin in the direction of <span className="text-blue-600">v</span>.
              Every point on the line is some scalar multiple of <span className="text-blue-600">v</span>.
            </p>
            <p className="text-stone-400">Drag v to see how the span line changes.</p>
          </>
        ) : areCollinear ? (
          <>
            <p>
              <span className="text-orange-500 font-medium">v and w are collinear!</span> When
              one vector is a scalar multiple of the other, span(v, w) is still just a line, not the whole plane.
            </p>
            <p className="text-stone-400">Drag w away from the line to see the span expand to the full plane.</p>
          </>
        ) : (
          <>
            <p>
              <span className="text-green-600 font-medium">span(v, w) = all of R&sup2;</span>.
              Two linearly independent vectors in R&sup2; span the entire plane.
              Every point can be written as a linear combination of v and w.
            </p>
            <p className="text-stone-400">Try making v and w point in the same direction to see the span collapse to a line.</p>
          </>
        )}
      </div>
    </div>
  );
}
