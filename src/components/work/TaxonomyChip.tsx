import Link from "next/link";

type TaxonomyChipProps = {
  label: string;
  href: string;
  /** Optional facet prefix shown in mono, e.g. "DOMAIN". */
  prefix?: string;
  className?: string;
};

export default function TaxonomyChip({
  label,
  href,
  prefix,
  className = "",
}: TaxonomyChipProps) {
  return (
    <Link
      href={href}
      className={`label-mono inline-flex items-center gap-2 border border-grid-dim px-2 py-1 text-text-dim transition-colors duration-200 hover:border-cyan/50 hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan ${className}`}
    >
      {prefix && <span className="text-cyan/70">{prefix}</span>}
      <span>{label}</span>
    </Link>
  );
}
