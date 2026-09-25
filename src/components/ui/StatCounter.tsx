type StatCounterProps = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
};

/** Renders the verified value immediately. */
export default function StatCounter({
  value,
  label,
  prefix,
  suffix,
}: StatCounterProps) {
  return (
    <div className="px-5 py-6">
      <p className="font-mono text-3xl font-bold tracking-tight">
        {prefix && <span className="text-text-dim">{prefix}</span>}
        <span className="glow-cyan">{value}</span>
        {suffix && <span className="text-text-dim">{suffix}</span>}
      </p>
      <p className="label-mono mt-2 text-text-dim">{label}</p>
    </div>
  );
}
