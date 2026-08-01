import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center text-text">
      <p className="label-mono text-cyan">404</p>
      <h1 className="mt-4 text-2xl text-text">Record not found</h1>
      <p className="mt-3 max-w-md font-body text-sm text-text-dim">
        This case file or laboratory hub does not exist in the knowledge
        system.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/projects"
          className="label-mono border border-cyan/50 px-5 py-3 text-cyan transition-colors hover:bg-cyan/10"
        >
          Projects →
        </Link>
        <Link
          href="/laboratories"
          className="label-mono border border-grid-dim px-5 py-3 text-text-dim transition-colors hover:border-grid hover:text-text"
        >
          Laboratories →
        </Link>
      </div>
    </div>
  );
}
