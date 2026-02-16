/**
 * Canonical JSON utilities
 *
 * We need deterministic serialization for signatures. JSON.stringify does not
 * guarantee key ordering, so we recursively sort keys.
 */

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Recursively sorts object keys (stable) to make JSON deterministic.
 */
export function canonicalizeJson(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return value.map((v) => canonicalizeJson(v as JsonValue));
  }

  if (isPlainObject(value)) {
    const keys = Object.keys(value).sort();
    const out: Record<string, JsonValue> = {};
    for (const key of keys) {
      out[key] = canonicalizeJson((value as Record<string, JsonValue>)[key]);
    }
    return out;
  }

  return value;
}

/**
 * Deterministic JSON string representation.
 */
export function stringifyCanonicalJson(value: JsonValue): string {
  return JSON.stringify(canonicalizeJson(value));
}
