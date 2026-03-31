import { ComponentType } from "react";
import { VectorAdditionViz } from "./VectorAdditionViz";
import { SpanViz } from "./SpanViz";
import { LinearIndependenceViz } from "./LinearIndependenceViz";
import { LinearMapViz } from "./LinearMapViz";
import { SubspaceViz } from "./SubspaceViz";
import { NullSpaceRangeViz } from "./NullSpaceRangeViz";

/**
 * Registry mapping component keys (used in content data) to React components.
 * Adding a new visualization = add the component file + register it here.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const visualizationRegistry: Record<string, ComponentType<any>> = {
  VectorAdditionViz,
  SpanViz,
  LinearIndependenceViz,
  LinearMapViz,
  SubspaceViz,
  NullSpaceRangeViz,
};
