export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getMatchIndices(text: string, query: string, caseSensitive: boolean) {
  if (!query) return [];

  const indices: number[] = [];
  const haystack = caseSensitive ? text : text.toLowerCase();
  const needle = caseSensitive ? query : query.toLowerCase();

  let start = 0;
  while (start <= haystack.length - needle.length) {
    const index = haystack.indexOf(needle, start);
    if (index === -1) break;
    indices.push(index);
    start = index + Math.max(needle.length, 1);
  }

  return indices;
}

export type HighlightSegment = {
  text: string;
  kind: "text" | "match" | "current";
};

export function buildHighlightSegments(
  content: string,
  query: string,
  caseSensitive: boolean,
  currentMatchIndex: number
): HighlightSegment[] {
  if (!query) return [{ text: content, kind: "text" }];

  const indices = getMatchIndices(content, query, caseSensitive);
  if (indices.length === 0) return [{ text: content, kind: "text" }];

  const segments: HighlightSegment[] = [];
  let lastEnd = 0;

  indices.forEach((start, index) => {
    const end = start + query.length;
    if (start > lastEnd) {
      segments.push({ text: content.slice(lastEnd, start), kind: "text" });
    }
    segments.push({
      text: content.slice(start, end),
      kind: index === currentMatchIndex ? "current" : "match",
    });
    lastEnd = end;
  });

  if (lastEnd < content.length) {
    segments.push({ text: content.slice(lastEnd), kind: "text" });
  }

  return segments;
}
