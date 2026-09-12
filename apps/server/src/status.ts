/**
 * Domain status vocabularies shared across more than one file in this
 * app (route + composition, or two routes) — one named constant per
 * domain, never a single catch-all `STATUS` object. A status used by
 * exactly one file stays declared locally in that file instead of here.
 */

/** An analysis run's lifecycle, from request through completion — shared
 * by `GET /games/:id/analysis`, `POST /games/:id/analyze`, the SSE watch
 * loop, and the composition-root terminal mapping in
 * `composition/analysis.ts`. */
export const ANALYSIS_STATUS = {
  NOT_FOUND: "not-found",
  CREATED: "created",
  QUEUED: "queued",
  RUNNING: "running",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;
