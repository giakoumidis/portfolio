"use client";

import {
  useDeferredValue,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import {
  categoryLabel,
  searchEntries,
  searchSuggestions,
  type SearchEntry,
} from "@/lib/search";

const CATEGORY_TINT: Record<SearchEntry["category"], string> = {
  section: "text-text-dim border-grid-dim",
  project: "text-cyan border-cyan/40",
  lab: "text-magenta border-magenta/40",
  domain: "text-orange border-orange/40",
  role: "text-blue border-blue/40",
  education: "text-violet border-violet/40",
  publication: "text-green border-green/40",
  award: "text-amber border-amber/40",
  certification: "text-yellow border-yellow/40",
  exhibition: "text-pink border-pink/40",
  post: "text-violet border-violet/40",
  tool: "text-cyan border-cyan/40",
};

function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function activateSearchEntry(entry: SearchEntry) {
  if (isExternal(entry.href)) {
    window.open(entry.href, "_blank", "noopener,noreferrer");
    return;
  }

  const id = entry.href.replace(/^#/, "");
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", entry.href);
    return;
  }

  window.location.hash = entry.href;
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
  const inputId = useId();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const deferredQuery = useDeferredValue(query);
  const results = searchEntries(deferredQuery);
  const trimmed = deferredQuery.trim();
  const searching = trimmed.length > 0;
  const safeIndex =
    results.length === 0 ? 0 : Math.min(activeIndex, results.length - 1);

  useEffect(() => {
    if (!autoFocus) return;
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
    return () => cancelAnimationFrame(frame);
  }, [autoFocus]);

  function activate(entry: SearchEntry) {
    activateSearchEntry(entry);
    onNavigate?.();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!searching || results.length === 0) return;

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
            placeholder="drone · CAIR · PyTorch · wheelchair…"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              searching && results[safeIndex]
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
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveIndex(0);
                inputRef.current?.focus();
              }}
              className="label-mono text-text-dim transition-colors hover:text-cyan"
            >
              Clear
            </button>
          )}
        </div>

        {!searching && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
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
        )}

        {searching && (
          <div className="mt-5">
            <p aria-live="polite" className="label-mono mb-4 text-text-dim">
              {results.length === 0 ? (
                <>
                  <span className="text-magenta">0</span> hits for “{trimmed}”
                </>
              ) : (
                <>
                  <span className="text-cyan">{results.length}</span> hit
                  {results.length === 1 ? "" : "s"} for “{trimmed}”
                </>
              )}
            </p>

            {results.length === 0 ? (
              <p className="font-mono text-sm text-text-dim">
                No matching nodes. Try a shorter token or another domain.
              </p>
            ) : (
              <ul
                id={listId}
                role="listbox"
                className="flex max-h-[min(24rem,50vh)] flex-col overflow-y-auto"
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
