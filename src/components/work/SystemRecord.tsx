import Link from "next/link";

import TaxonomyChip from "@/components/work/TaxonomyChip";
import type { ProjectCaseFile } from "@/lib/query";

const RELATION_LABEL: Record<string, string> = {
  "tested-in": "Tested in",
  "developed-in": "Developed in",
  "enabled-by": "Enabled by",
  "fabricated-through": "Fabricated through",
  "deployed-at": "Deployed at",
  "demonstrated-at": "Demonstrated at",
};

type SystemRecordProps = {
  caseFile: ProjectCaseFile;
};

function hasRenderableChildren(children: React.ReactNode): boolean {
  if (children == null || children === false) return false;
  if (typeof children === "string") return children.trim().length > 0;
  if (Array.isArray(children)) {
    return children.some((child) => hasRenderableChildren(child));
  }
  return true;
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  if (!hasRenderableChildren(children)) return null;
  return (
    <div className="grid gap-2 border-b border-grid-dim py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <dt className="label-mono text-cyan">{label}</dt>
      <dd className="flex flex-wrap gap-2">{children}</dd>
    </div>
  );
}

export default function SystemRecord({ caseFile }: SystemRecordProps) {
  const { record, domainTerms, applicationTerms, platformTerms, methodTerms, contributionTerms, outcomeTerms, environments } =
    caseFile;

  const hasContent =
    contributionTerms.length > 0 ||
    domainTerms.length > 0 ||
    applicationTerms.length > 0 ||
    environments.length > 0 ||
    platformTerms.length > 0 ||
    methodTerms.length > 0 ||
    outcomeTerms.length > 0;

  if (!hasContent) return null;

  return (
    <section aria-labelledby="system-record-heading" className="mt-10">
      <h2 id="system-record-heading" className="label-mono text-text-dim">
        System Record
      </h2>
      <dl className="mt-4 border border-grid-dim bg-bg-raised/40 px-4 sm:px-6">
        <Row label="My role">
          {contributionTerms.map((term) => (
            <TaxonomyChip
              key={term.slug}
              label={term.label}
              href={term.href}
              prefix="CONTRIB"
            />
          ))}
        </Row>
        <Row label="Domain">
          {domainTerms.map((term) => (
            <TaxonomyChip
              key={term.slug}
              label={term.label}
              href={term.href}
              prefix="DOMAIN"
            />
          ))}
        </Row>
        <Row label="Application">
          {applicationTerms.map((term) => (
            <TaxonomyChip
              key={term.slug}
              label={term.label}
              href={term.href}
              prefix="APP"
            />
          ))}
        </Row>
        <Row label="Laboratory">
          {environments.map(({ record: infra, relationType }) => (
            <Link
              key={infra.slug}
              href={`/laboratories/${infra.slug}`}
              className="label-mono border border-grid-dim px-2 py-1 text-text-dim transition-colors hover:border-cyan/50 hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              <span className="text-cyan/70">
                {RELATION_LABEL[relationType] ?? relationType}
              </span>{" "}
              {infra.title}
            </Link>
          ))}
        </Row>
        <Row label="Platforms">
          {platformTerms.map((term) => (
            <TaxonomyChip
              key={term.slug}
              label={term.label}
              href={term.href}
              prefix="PLATFORM"
            />
          ))}
        </Row>
        <Row label="Methods">
          {methodTerms.map((term) => (
            <TaxonomyChip
              key={term.slug}
              label={term.label}
              href={term.href}
              prefix="METHOD"
            />
          ))}
        </Row>
        <Row label="Outcomes">
          {outcomeTerms.map((term) => (
            <TaxonomyChip
              key={term.slug}
              label={term.label}
              href={term.href}
              prefix="OUTCOME"
            />
          ))}
        </Row>
        {record.period.label && (
          <div className="grid gap-2 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
            <dt className="label-mono text-cyan">Period</dt>
            <dd className="label-mono text-text-dim">{record.period.label}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
