"use client";

import { useState } from "react";
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
 * Interactive visualization of vector addition and scalar multiplication in R^2.
 * User drags two vectors; the sum is shown as the diagonal of the parallelogram.
 */
export function VectorAdditionViz() {
  const [mode, setMode] = useState<"add" | "scale">("add");

  return (
    <div>
      <div className="flex gap-2 mb-3 font-sans text-sm">
        <button
          onClick={() => setMode("add")}
          className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
            mode === "add"
              ? "bg-blue-600 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          Vector Addition
        </button>
        <button
          onClick={() => setMode("scale")}
          className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
            mode === "scale"
              ? "bg-blue-600 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          Scalar Multiplication
        </button>
      </div>
      {mode === "add" ? <AdditionMode /> : <ScaleMode />}
    </div>
  );
}

function AdditionMode() {
  const v1 = useMovablePoint([2, 1], { color: Theme.blue });
  const v2 = useMovablePoint([1, 2], { color: Theme.orange });

  const sum: [number, number] = [v1.point[0] + v2.point[0], v1.point[1] + v2.point[1]];

  return (
    <div>
      <Mafs viewBox={{ x: [-4, 4], y: [-4, 4] }} height={350}>
        <Coordinates.Cartesian />
        {/* v1 */}
        <Vector tail={[0, 0]} tip={v1.point} color={Theme.blue} />
        <Text x={v1.point[0] + 0.2} y={v1.point[1] + 0.3} size={14} color={Theme.blue}>
          v
        </Text>
        {/* v2 */}
        <Vector tail={[0, 0]} tip={v2.point} color={Theme.orange} />
        <Text x={v2.point[0] + 0.2} y={v2.point[1] + 0.3} size={14} color={Theme.orange}>
          w
        </Text>
        {/* sum */}
        <Vector tail={[0, 0]} tip={sum} color={Theme.green} />
        <Text x={sum[0] + 0.2} y={sum[1] + 0.3} size={14} color={Theme.green}>
          v + w
        </Text>
        {/* parallelogram guides */}
        <Line.Segment
          point1={v1.point}
          point2={sum}
          style="dashed"
          opacity={0.3}
          color={Theme.orange}
        />
        <Line.Segment
          point1={v2.point}
          point2={sum}
          style="dashed"
          opacity={0.3}
          color={Theme.blue}
        />
        {v1.element}
        {v2.element}
      </Mafs>
      <div className="font-sans text-sm text-stone-500 mt-2 space-y-1">
        <p>
          <span className="text-blue-600 font-medium">v</span> = ({v1.point[0].toFixed(1)}, {v1.point[1].toFixed(1)})
          &ensp;
          <span className="text-orange-500 font-medium">w</span> = ({v2.point[0].toFixed(1)}, {v2.point[1].toFixed(1)})
          &ensp;
          <span className="text-green-600 font-medium">v + w</span> = ({sum[0].toFixed(1)}, {sum[1].toFixed(1)})
        </p>
        <p className="text-stone-400">Drag the tips of the vectors to explore addition. The dashed lines show the parallelogram rule.</p>
      </div>
    </div>
  );
}

function ScaleMode() {
  const v = useMovablePoint([2, 1], { color: Theme.blue });
  const [scalar, setScalar] = useState(2);

  const scaled: [number, number] = [v.point[0] * scalar, v.point[1] * scalar];

  return (
    <div>
      <Mafs viewBox={{ x: [-6, 6], y: [-6, 6] }} height={350}>
        <Coordinates.Cartesian />
        <Vector tail={[0, 0]} tip={v.point} color={Theme.blue} />
        <Text x={v.point[0] + 0.2} y={v.point[1] + 0.3} size={14} color={Theme.blue}>
          v
        </Text>
        <Vector tail={[0, 0]} tip={scaled} color={Theme.green} />
        <Text x={scaled[0] + 0.2} y={scaled[1] + 0.3} size={14} color={Theme.green}>
          {scalar}v
        </Text>
        {v.element}
      </Mafs>
      <div className="font-sans text-sm mt-3">
        <label className="flex items-center gap-3 text-stone-600">
          <span className="w-24">Scalar: {scalar.toFixed(1)}</span>
          <input
            type="range"
            min={-3}
            max={3}
            step={0.1}
            value={scalar}
            onChange={(e) => setScalar(parseFloat(e.target.value))}
            className="flex-1"
          />
        </label>
        <p className="text-stone-400 mt-2">
          <span className="text-blue-600 font-medium">v</span> = ({v.point[0].toFixed(1)}, {v.point[1].toFixed(1)})
          &ensp;
          <span className="text-green-600 font-medium">{scalar.toFixed(1)}v</span> = ({scaled[0].toFixed(1)}, {scaled[1].toFixed(1)})
        </p>
        <p className="text-stone-400 mt-1">Drag the vector and adjust the slider. Negative scalars reverse direction.</p>
      </div>
    </div>
  );
}
