"use client";

import { useState, useMemo } from "react";
import {
  Mafs,
  Coordinates,
  Vector,
  Theme,
  Text,
  Line,
  Plot,
  useMovablePoint,
} from "mafs";

/**
 * Interactive visualization of null space and range of a linear map.
 * Shows a 2x2 matrix acting on R^2. For rank-deficient matrices,
 * the null space and range are visible as subspaces.
 */

interface MapPreset {
  name: string;
  matrix: [number, number, number, number];
  nullspaceDesc: string;
  rangeDesc: string;
}

const mapPresets: MapPreset[] = [
  {
    name: "Projection onto x-axis",
    matrix: [1, 0, 0, 0],
    nullspaceDesc: "null(T) = y-axis. Every vector on the y-axis maps to 0.",
    rangeDesc: "range(T) = x-axis. The output is always on the x-axis.",
  },
  {
    name: "Projection onto y-axis",
    matrix: [0, 0, 0, 1],
    nullspaceDesc: "null(T) = x-axis. Every vector on the x-axis maps to 0.",
    rangeDesc: "range(T) = y-axis. The output is always on the y-axis.",
  },
  {
    name: "Projection onto y = x",
    matrix: [0.5, 0.5, 0.5, 0.5],
    nullspaceDesc: "null(T) = line y = -x. Vectors perpendicular to y = x map to 0.",
    rangeDesc: "range(T) = line y = x. Every output lies on this line.",
  },
  {
    name: "Zero map",
    matrix: [0, 0, 0, 0],
    nullspaceDesc: "null(T) = all of R². Every vector maps to 0.",
    rangeDesc: "range(T) = {0}. The only output is the zero vector.",
  },
];

function applyMatrix(m: [number, number, number, number], v: [number, number]): [number, number] {
  return [m[0] * v[0] + m[1] * v[1], m[2] * v[0] + m[3] * v[1]];
}

export function NullSpaceRangeViz() {
  const [presetIdx, setPresetIdx] = useState(0);
  const preset = mapPresets[presetIdx];
  const m = preset.matrix;

  const inputPt = useMovablePoint([1.5, 1.5], { color: Theme.blue });
  const output = useMemo(() => applyMatrix(m, inputPt.point), [m, inputPt.point]);

  // Null space direction
  const nullDir = useMemo((): [number, number] | null => {
    // For 2x2, null space is non-trivial when det ~ 0
    const det = m[0] * m[3] - m[1] * m[2];
    if (Math.abs(det) > 0.05) return null;
    // Find null vector
    if (Math.abs(m[0]) > 0.01 || Math.abs(m[2]) > 0.01) {
      return [-m[1], m[0]];
    }
    if (Math.abs(m[1]) > 0.01 || Math.abs(m[3]) > 0.01) {
      return [-m[3], m[2]];
    }
    return null; // zero map — whole space is null
  }, [m]);

  // Range direction
  const rangeDir = useMemo((): [number, number] | null => {
    const det = m[0] * m[3] - m[1] * m[2];
    if (Math.abs(det) > 0.05) return null; // full rank — range is all R^2
    // Column 1 or column 2, whichever is nonzero
    if (Math.abs(m[0]) > 0.01 || Math.abs(m[2]) > 0.01) return [m[0], m[2]];
    if (Math.abs(m[1]) > 0.01 || Math.abs(m[3]) > 0.01) return [m[1], m[3]];
    return null; // zero map
  }, [m]);

  const isZeroMap = m[0] === 0 && m[1] === 0 && m[2] === 0 && m[3] === 0;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3 font-sans text-sm">
        {mapPresets.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setPresetIdx(i)}
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
      <Mafs viewBox={{ x: [-4, 4], y: [-4, 4] }} height={380}>
        <Coordinates.Cartesian />

        {/* Null space */}
        {nullDir && (
          <Line.ThroughPoints
            point1={[0, 0]}
            point2={nullDir}
            color={Theme.red}
            opacity={0.35}
            weight={4}
          />
        )}
        {isZeroMap && (
          <Plot.Inequality
            x={{ ">=": -100, "<=": 100 }}
            y={{ ">=": () => -100, "<=": () => 100 }}
            color={Theme.red}
          />
        )}

        {/* Range */}
        {rangeDir && (
          <Line.ThroughPoints
            point1={[0, 0]}
            point2={rangeDir}
            color={Theme.green}
            opacity={0.35}
            weight={4}
          />
        )}

        {/* Input vector */}
        <Vector tail={[0, 0]} tip={inputPt.point} color={Theme.blue} />
        <Text x={inputPt.point[0] + 0.3} y={inputPt.point[1] + 0.3} size={13} color={Theme.blue}>
          v
        </Text>

        {/* Output vector */}
        <Vector tail={[0, 0]} tip={output} color={Theme.green} />
        <Text x={output[0] + 0.3} y={output[1] + 0.3} size={13} color={Theme.green}>
          T(v)
        </Text>

        {inputPt.element}
      </Mafs>
      <div className="font-sans text-sm text-stone-500 mt-2 space-y-1">
        <p className="font-medium text-stone-700">{preset.name}</p>
        <p>
          <span className="text-blue-600">v</span> = ({inputPt.point[0].toFixed(1)}, {inputPt.point[1].toFixed(1)})
          &ensp;&rarr;&ensp;
          <span className="text-green-600">T(v)</span> = ({output[0].toFixed(1)}, {output[1].toFixed(1)})
        </p>
        {nullDir && (
          <p><span className="text-red-500 font-medium">Red line:</span> {preset.nullspaceDesc}</p>
        )}
        {isZeroMap && (
          <p><span className="text-red-500 font-medium">Red shading:</span> {preset.nullspaceDesc}</p>
        )}
        {rangeDir && (
          <p><span className="text-green-600 font-medium">Green line:</span> {preset.rangeDesc}</p>
        )}
        {!rangeDir && !isZeroMap && (
          <p><span className="text-green-600 font-medium">{preset.rangeDesc}</span></p>
        )}
        <p className="text-stone-400">Drag v to see where different inputs map. Try placing v on the null space (red) to see it map to 0.</p>
      </div>
    </div>
  );
}
