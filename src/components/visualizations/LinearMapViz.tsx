"use client";

import { useState, useMemo } from "react";
import {
  Mafs,
  Coordinates,
  Vector,
  Theme,
  Text,
  Polygon,
  Line,
} from "mafs";

/**
 * Interactive visualization of a linear map as a transformation of space.
 * Shows how a 2x2 matrix transforms the standard basis vectors and a unit square.
 * Presets for rotation, shear, projection, and reflection.
 */

interface Preset {
  name: string;
  matrix: [number, number, number, number]; // [a, b, c, d] for [[a, b], [c, d]]
  description: string;
}

const presets: Preset[] = [
  {
    name: "Identity",
    matrix: [1, 0, 0, 1],
    description: "No transformation. Every vector maps to itself.",
  },
  {
    name: "Rotation 90°",
    matrix: [0, -1, 1, 0],
    description: "Rotates every vector 90° counterclockwise.",
  },
  {
    name: "Rotation 45°",
    matrix: [0.707, -0.707, 0.707, 0.707],
    description: "Rotates every vector 45° counterclockwise.",
  },
  {
    name: "Shear",
    matrix: [1, 1, 0, 1],
    description: "Shears horizontally. The y-axis tilts; the x-axis stays fixed.",
  },
  {
    name: "Scale (2x, 0.5x)",
    matrix: [2, 0, 0, 0.5],
    description: "Stretches horizontally by 2 and compresses vertically by half.",
  },
  {
    name: "Projection onto x-axis",
    matrix: [1, 0, 0, 0],
    description: "Projects every vector onto the x-axis. The range is a line; the null space is the y-axis.",
  },
  {
    name: "Reflection over x-axis",
    matrix: [1, 0, 0, -1],
    description: "Reflects every vector over the x-axis.",
  },
];

function applyMatrix(m: [number, number, number, number], v: [number, number]): [number, number] {
  return [m[0] * v[0] + m[1] * v[1], m[2] * v[0] + m[3] * v[1]];
}

export function LinearMapViz() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [interpolation, setInterpolation] = useState(1);
  const preset = presets[presetIdx];

  // Interpolate between identity and the target matrix
  const m = useMemo((): [number, number, number, number] => {
    const t = interpolation;
    const id: [number, number, number, number] = [1, 0, 0, 1];
    return [
      id[0] + t * (preset.matrix[0] - id[0]),
      id[1] + t * (preset.matrix[1] - id[1]),
      id[2] + t * (preset.matrix[2] - id[2]),
      id[3] + t * (preset.matrix[3] - id[3]),
    ];
  }, [preset, interpolation]);

  // Transform the standard basis
  const e1: [number, number] = applyMatrix(m, [1, 0]);
  const e2: [number, number] = applyMatrix(m, [0, 1]);

  // Transform a unit square
  const squarePoints: [number, number][] = [
    applyMatrix(m, [0, 0]),
    applyMatrix(m, [1, 0]),
    applyMatrix(m, [1, 1]),
    applyMatrix(m, [0, 1]),
  ];

  // Null space indication for projection
  const det = m[0] * m[3] - m[1] * m[2];
  const isRankDeficient = Math.abs(det) < 0.05;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3 font-sans text-sm">
        {presets.map((p, i) => (
          <button
            key={p.name}
            onClick={() => { setPresetIdx(i); setInterpolation(1); }}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              i === presetIdx
                ? "bg-blue-600 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
      <Mafs viewBox={{ x: [-3, 3], y: [-3, 3] }} height={380}>
        <Coordinates.Cartesian />

        {/* Transformed unit square */}
        <Polygon
          points={squarePoints}
          color={Theme.blue}
          fillOpacity={0.1}
          strokeOpacity={0.4}
        />

        {/* Original unit square (ghost) */}
        <Polygon
          points={[[0, 0], [1, 0], [1, 1], [0, 1]]}
          color={Theme.foreground}
          fillOpacity={0.03}
          strokeOpacity={0.15}
        />

        {/* Null space indication */}
        {isRankDeficient && interpolation > 0.5 && (
          <Line.ThroughPoints
            point1={[0, 0]}
            point2={
              // null space direction: if det ~ 0, find a vector [x,y] with m*v ~ 0
              Math.abs(m[0]) + Math.abs(m[2]) < Math.abs(m[1]) + Math.abs(m[3])
                ? [1, 0]
                : [-m[1], m[0]]
            }
            color={Theme.red}
            opacity={0.4}
            weight={3}
          />
        )}

        {/* Transformed basis vectors */}
        <Vector tail={[0, 0]} tip={e1} color={Theme.blue} />
        <Text x={e1[0] + 0.2} y={e1[1] + 0.25} size={13} color={Theme.blue}>
          T(e₁)
        </Text>

        <Vector tail={[0, 0]} tip={e2} color={Theme.orange} />
        <Text x={e2[0] + 0.2} y={e2[1] + 0.25} size={13} color={Theme.orange}>
          T(e₂)
        </Text>

        {/* Original basis (ghost) */}
        <Vector tail={[0, 0]} tip={[1, 0]} color={Theme.foreground} opacity={0.2} />
        <Vector tail={[0, 0]} tip={[0, 1]} color={Theme.foreground} opacity={0.2} />
      </Mafs>

      <div className="font-sans text-sm mt-3">
        <label className="flex items-center gap-3 text-stone-600">
          <span className="w-28">Animation: {(interpolation * 100).toFixed(0)}%</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={interpolation}
            onChange={(e) => setInterpolation(parseFloat(e.target.value))}
            className="flex-1"
          />
        </label>
      </div>

      <div className="font-sans text-sm text-stone-500 mt-2 space-y-1">
        <p className="font-medium text-stone-700">{preset.name}</p>
        <p>{preset.description}</p>
        <p className="text-stone-400">
          Matrix: [[{preset.matrix[0]}, {preset.matrix[1]}], [{preset.matrix[2]}, {preset.matrix[3]}]]
          {isRankDeficient && interpolation > 0.5 && (
            <span className="text-red-500 ml-2">&mdash; rank deficient (det &asymp; 0). Red line shows null space direction.</span>
          )}
        </p>
        <p className="text-stone-400">
          Use the slider to smoothly animate from the identity to the transformation.
        </p>
      </div>
    </div>
  );
}
