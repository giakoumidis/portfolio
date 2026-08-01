/** First sentence of prose — used when challenge/outcome fields are absent. */
export function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text.trim();
}

export function resolveSpokeChallenge(
  challenge: string | undefined,
  summary: string,
): string {
  return challenge?.trim() || firstSentence(summary);
}

export function resolveSpokeOutcome(
  outcomeSummary: string | undefined,
  highlights: string[] | undefined,
  summary: string,
): string {
  if (outcomeSummary?.trim()) return outcomeSummary.trim();
  if (highlights?.[0]?.trim()) return highlights[0].trim();
  return firstSentence(summary);
}
