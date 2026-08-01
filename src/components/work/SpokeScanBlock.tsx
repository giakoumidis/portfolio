type SpokeScanBlockProps = {
  challenge: string;
  contribution: string;
  outcome: string;
};

function ScanRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="grid gap-2 border-b border-grid-dim py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <p className="label-mono text-cyan">{label}</p>
      <p className="font-body text-base leading-relaxed text-text">{text}</p>
    </div>
  );
}

export default function SpokeScanBlock({
  challenge,
  contribution,
  outcome,
}: SpokeScanBlockProps) {
  return (
    <section aria-labelledby="scan-heading" className="mt-8">
      <h2 id="scan-heading" className="sr-only">
        Challenge, contribution, and outcome
      </h2>
      <div className="border border-grid-dim bg-bg-raised/40 px-4 sm:px-6">
        <ScanRow label="CHALLENGE" text={challenge} />
        <ScanRow label="MY CONTRIBUTION" text={contribution} />
        <ScanRow label="OUTCOME" text={outcome} />
      </div>
    </section>
  );
}
