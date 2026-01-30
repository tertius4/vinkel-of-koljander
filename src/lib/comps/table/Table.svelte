<script>
  /**
   * @typedef {Object} Props
   * @property {TableColumn[]} headings - Array of heading titles for the table.
   * @property {string} [bodyClass] - Optional CSS class for the table body.
   * @property {(arg0: { key: string | null, dir: 'asc' | 'desc' | null }) => void} [onsort] - Optional sort event handler.
   */

  /** @type {Props & { children: any }} */
  const { children, headings, bodyClass = "", onsort = () => {} } = $props();

  const heading_info = $derived({ width: headings.map(({ width }) => width || "1fr").join(" ") });

  /** @type {{ key: string | null, dir: 'asc' | 'desc' | null }} */
  let sort_info = $state({ key: null, dir: null });

  /** @type {{ key: string, sort_dir: 'asc' | 'desc' | null, title: string, short_title: string, sortable: boolean, width?: string }[]} */
  const formatted_headings = $derived(
    headings.map((heading) => {
      if (!heading.key) throw Error('Each heading must have a unique "key" property.');
      const is_unique = !headings.find((h) => h !== heading && h.key === heading.key);
      if (!is_unique) throw Error(`Duplicate heading key found: ${heading.key}`);

      return {
        title: heading.title || "",
        short_title: heading.short_title || heading.title || "",
        key: heading.key,
        width: heading.width,
        sortable: heading.sortable ?? false,
        /** @type {'asc' | 'desc' | null} */
        sort_dir: sort_info.key === heading.key ? sort_info.dir : null,
      };
    }),
  );

  /**
   * @param {string} key
   */
  function handleSort(key) {
    let current_heading = formatted_headings.find((h) => h.key === key);
    if (!current_heading) return;

    sort_info.key = key;
    if (!current_heading.sort_dir) {
      sort_info.dir = "asc";
      current_heading.sort_dir = "asc";
    } else if (current_heading.sort_dir === "asc") {
      sort_info.dir = "desc";
    } else {
      sort_info.key = null;
      sort_info.dir = null;
    }

    onsort(sort_info);
  }
</script>

<div
  class="grid border border-slate-200 overflow-hidden"
  style="grid-template-columns: {heading_info.width}; grid-template-rows: auto 1fr;"
>
  {#each formatted_headings as heading (heading.key)}
    <div
      class="bg-slate-25 border-b border-slate-200 text-body-sm rounded-t-lg p-2 font-medium text-slate-700"
      style="grid-row: 1;"
    >
      <span class="md:hidden">{heading.short_title}</span>
      <span class="hidden md:inline">{heading.title}</span>
      {#if heading.sortable}
        <button
          type="button"
          class="ml-1 text-slate-400 hover:text-slate-600 w-3 h-3"
          onclick={() => handleSort(heading.key)}
          aria-label="Sort by {heading.title}"
        >
          <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </button>
      {/if}
    </div>
  {/each}
  <div
    class={["contents max-h-60 overflow-x-hidden overflow-y-auto", bodyClass]}
    style="grid-row: 2; grid-column: 1 / -1;"
  >
    <div
      class={["grid max-h-60 last:rounded-b-lg *:ring *:ring-slate-200  overflow-x-hidden overflow-y-auto", bodyClass]}
      style="grid-template-columns: subgrid; grid-column: 1 / -1;"
    >
      {@render children()}
    </div>
  </div>
</div>
