import ActionLink from "@/components/ui/ActionLink";

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
    <ActionLink href={href} variant="chip" className={className}>
      {prefix && <span className="text-cyan/70">{prefix}</span>}
      <span>{label}</span>
    </ActionLink>
  );
}
