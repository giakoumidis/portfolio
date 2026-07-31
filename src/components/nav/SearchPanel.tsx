"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import {
  categoryLabel,
  matchingCategories,
  searchEntries,
  searchIndexStats,
  searchSuggestions,
  type SearchCategory,
  type SearchEntry,
} from "@/lib/search";

const CATEGORY_TINT: Record<SearchEntry["category"], string> = {
  section: "text-text-dim border-grid-dim",
  project: "text-cyan border-cyan/40",
  laboratory: "text-magenta border-magenta/40",
  domain: "text-orange border-orange/40",
  role: "text-blue border-blue/40",
  education: "text-violet border-violet/40",
  publication: "text-green border-green/40",
  award: "text-amber border-amber/40",
  certification: "text-yellow border-yellow/40",
  exhibition: "text-pink border-pink/40",
  post: "text-violet border-violet/40",
  tool: "text-cyan border-cyan/40",
  contact: "text-orange border-orange/40",
};

function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function isInternalPath(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("/#");
}

export function activateSearchEntry(
  entry: SearchEntry,
  navigate?: (href: string) => void,
) {
  if (isExternal(entry.href)) {
    window.open(entry.href, "_blank", "noopener,noreferrer");
    return;
  }

  if (isInternalPath(entry.href)) {
    if (navigate) navigate(entry.href);
    else window.location.assign(entry.href);
    return;
  }

  const hash = entry.href.includes("#")
    ? entry.href.slice(entry.href.indexOf("#") + 1)
    : entry.href.replace(/^#/, "");
  const target = document.getElementById(hash);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", `#${hash}`);
    return;
  }

  // Homepage section deep-link from another route.
  if (entry.href.startsWith("/#") || entry.href.startsWith("#")) {
    window.location.assign(`/#${hash}`);
    return;
  }

  window.location.hash = hash;
}

type SearchPanelProps = {
  /** Focus the input when the panel mounts or when this flag flips on. */
  autoFocus?: boolean;
  /** Called after an in-page or external navigation from a result. */
  onNavigate?: () => void;
  /** Optional class on the outer wrapper (palette vs section chrome). */
  className?: string;
};

export default function SearchPanel({
  autoFocus = false,
  onNavigate,
  className,
}: SearchPanelProps) {
  const router = useRouter();
  const inputId = useId();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SearchCategory | "all">("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const trimmed = query.trim();
  const searching = trimmed.length > 0;
  const browsing = !searching && category !== "all";
  const results = searchEntries(query, { category, limit: browsing ? 16 : 24 });
  const availableCategories = searching
    ? matchingCategories(trimmed)
    : searchIndexStats.map((stat) => stat.category);
  const safeIndex =
    results.length === 0 ? 0 : Math.min(activeIndex, results.length - 1);
  const showingResults = searching || browsing;

  useEffect(() => {
    if (!autoFocus) return;
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
    return () => cancelAnimationFrame(frame);
  }, [autoFocus]);

  useEffect(() => {
    const node = optionRefs.current[safeIndex];
    node?.scrollIntoView({ block: "nearest" });
  }, [safeIndex, results.length]);

  // Drop a facet that no longer matches the typed query.
  useEffect(() => {
    if (category === "all" || !searching) return;
    if (!availableCategories.includes(category)) {
      setCategory("all");
      setActiveIndex(0);
    }
  }, [availableCategories, category, searching]);

  function activate(entry: SearchEntry) {
    activateSearchEntry(entry, (href) => router.push(href));
    onNavigate?.();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      if (query || category !== "all") {
        event.preventDefault();
        event.stopPropagation();
        setQuery("");
        setCategory("all");
        setActiveIndex(0);
      }
      return;
    }

    if (!showingResults || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const entry = results[safeIndex];
      if (entry) activate(entry);
    }
  }

  function selectCategory(next: SearchCategory | "all") {
    setCategory(next);
    setActiveIndex(0);
    inputRef.current?.focus();
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between border-b border-grid-dim bg-bg-raised/70 px-4 py-2.5">
        <p className="label-mono text-text-dim">
          <span className="text-cyan">query</span>
          <span className="text-text-dim">
            {" "}
            <span>{"//"}</span> portfolio index
          </span>
        </p>
        <p className="label-mono hidden text-text-dim sm:block">
          <kbd className="text-cyan">⌘K</kbd>
          <span className="mx-2 text-grid">·</span>
          <kbd className="text-cyan">/</kbd>
          <span className="mx-2 text-grid">·</span>
          <kbd className="text-cyan">esc</kbd>
        </p>
      </div>

      <div className="p-4 sm:p-6">
        <label htmlFor={inputId} className="sr-only">
          Search projects, research, awards, and more
        </label>

        <div className="flex items-center gap-3 border border-grid-dim bg-bg/60 px-4 py-3 focus-within:border-cyan/60 focus-within:panel-glow-cyan">
          <span aria-hidden className="label-mono text-cyan">
            &gt;
          </span>
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            value={query}
            autoComplete="off"
            spellCheck={false}
            placeholder="drone · CAIR · PyTorch · kinesis…"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              showingResults && results[safeIndex]
                ? `${listId}-option-${safeIndex}`
                : undefined
            }
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            className="min-w-0 flex-1 bg-transparent font-mono text-sm text-text outline-none placeholder:text-text-dim/50"
          />
          {(query || category !== "all") && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
                setActiveIndex(0);
                inputRef.current?.focus();
              }}
              className="label-mono text-text-dim transition-colors hover:text-cyan"
            >
              Clear
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="label-mono text-text-dim">Filter</span>
          <button
            type="button"
            onClick={() => selectCategory("all")}
            aria-pressed={category === "all"}
            className={`label-mono border px-3 py-1.5 transition-all duration-200 ${
              category === "all"
                ? "border-cyan/60 bg-cyan/10 text-cyan"
                : "border-grid-dim text-text-dim hover:border-cyan/50 hover:text-cyan"
            }`}
          >
            All
          </button>
          {availableCategories.map((facet) => {
            const selected = category === facet;
            return (
              <button
                key={facet}
                type="button"
                onClick={() => selectCategory(facet)}
                aria-pressed={selected}
                className={`label-mono border px-3 py-1.5 transition-all duration-200 ${
                  selected
                    ? "border-cyan/60 bg-cyan/10 text-cyan"
                    : "border-grid-dim text-text-dim hover:border-cyan/50 hover:text-cyan"
                }`}
              >
                {categoryLabel(facet)}
              </button>
            );
          })}
        </div>

        {!showingResults && (
          <div className="mt-5 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="label-mono text-text-dim">Try</span>
              {searchSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setQuery(suggestion);
                    setActiveIndex(0);
                    inputRef.current?.focus();
                  }}
                  className="label-mono border border-grid-dim px-3 py-1.5 text-text-dim transition-all duration-200 hover:border-cyan/50 hover:text-cyan"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <ul className="grid grid-cols-2 gap-3 border-t border-grid-dim pt-5 sm:grid-cols-3 lg:grid-cols-5">
              {searchIndexStats.map((stat) => (
                <li key={stat.category}>
                  <button
                    type="button"
                    onClick={() => selectCategory(stat.category)}
                    className="w-full border border-grid-dim px-3 py-3 text-left transition-colors duration-200 hover:border-cyan/40 hover:bg-cyan/5"
                  >
                    <span className="label-mono block text-text-dim">
                      {stat.label}
                    </span>
                    <span className="mt-1 block font-mono text-lg text-cyan">
                      {stat.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {showingResults && (
          <div className="mt-5">
            <p aria-live="polite" className="label-mono mb-4 text-text-dim">
              {results.length === 0 ? (
                <>
                  <span className="text-magenta">0</span> hits
                  {searching ? (
                    <>
                      {" "}
                      for “{trimmed}”
                    </>
                  ) : null}
                  {category !== "all" ? (
                    <>
                      {" "}
                      in {categoryLabel(category)}
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <span className="text-cyan">{results.length}</span> hit
                  {results.length === 1 ? "" : "s"}
                  {searching ? (
                    <>
                      {" "}
                      for “{trimmed}”
                    </>
                  ) : (
                    <>
                      {" "}
                      in {categoryLabel(category as SearchCategory)}
                    </>
                  )}
                </>
              )}
            </p>

            {results.length === 0 ? (
              <p className="font-mono text-sm text-text-dim">
                No matching nodes. Try a shorter token, clear the filter, or pick
                another domain.
              </p>
            ) : (
              <ul
                id={listId}
                role="listbox"
                className="flex max-h-[min(28rem,55vh)] flex-col overflow-y-auto"
              >
                {results.map((entry, index) => {
                  const selected = index === safeIndex;
                  const external = isExternal(entry.href);

                  return (
                    <li
                      key={entry.id}
                      id={`${listId}-option-${index}`}
                      role="option"
                      aria-selected={selected}
                    >
                      <a
                        ref={(node) => {
                          optionRefs.current[index] = node;
                        }}
                        href={entry.href}
                        {...(external
                          ? {
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={(event) => {
                          if (!external) {
                            event.preventDefault();
                            activate(entry);
                          } else {
                            onNavigate?.();
                          }
                        }}
                        className={`flex gap-4 border-b border-grid-dim px-3 py-4 transition-colors duration-150 last:border-b-0 ${
                          selected
                            ? "bg-cyan/10 text-text"
                            : "text-text-dim hover:bg-cyan/5 hover:text-text"
                        }`}
                      >
                        <span
                          className={`label-mono h-fit w-24 shrink-0 border px-2 py-1 text-center ${CATEGORY_TINT[entry.category]}`}
                        >
                          {categoryLabel(entry.category)}
                        </span>

                        <span className="min-w-0">
                          <span className="block font-body font-medium text-text">
                            {entry.title}
                            {external && (
                              <span className="ml-2 label-mono text-text-dim">
                                ↗
                              </span>
                            )}
                          </span>
                          <span className="mt-1 block text-sm text-text-dim">
                            {entry.blurb}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
