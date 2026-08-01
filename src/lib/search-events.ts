/** Custom event to open the global command-palette search from the header. */
export const OPEN_SEARCH_EVENT = "ng:open-search";

export function openSearch() {
  window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
}
