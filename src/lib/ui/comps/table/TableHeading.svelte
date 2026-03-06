<script>
  import { normalize } from "$lib";

  /**
   * @typedef {Object} Props
   * @property {string} title - The title of the table heading.
   * @property {string} [key] - The unique key for the table heading.
   * @property {boolean} [sortable] - Whether the column is sortable.
   * @property {'asc' | 'desc' | null} [sort_method] - The current sort method for the column.
   * @property {(key: string) => void} [onclick] - Function to call when the heading is clicked.
   */

  /** @type {Props} */
  const { title, key = normalize(title), sortable = false, sort_method, onclick, ...rest } = $props();

  function handleSort() {
    if (sortable && onclick) onclick(key);
  }
</script>

<div class="flex items-center justify-between p-2">
  <button
    type="button"
    disabled={!sortable}
    class="{!sortable &&
      'cursor-default'} group text-p-md font-medium leading-none flex gap-0.5 items-center outline-none"
    onclick={handleSort}
  >
    <span
      class="transition-colors"
      class:group-hover:text-black={sortable}
      class:group-focus:text-black={sortable}
      class:text-slate-700={sortable}
      class:text-black={!sortable}
    >
      {title}
    </span>
    {#if sortable}
      <div>
        <svg
          class="-mb-0.75 w-1.75 h-1.75 transition-colors"
          class:text-black={sort_method === "asc"}
          class:text-slate-600={sort_method !== "asc"}
          fill="currentColor"
          viewBox="0 0 384 512"
        >
          <path d="M14 320l176-200 176 200-352 0z" />
        </svg>
        <svg
          class="-mt-0.75 w-1.75 h-1.75 transition-colors"
          class:text-black={sort_method === "desc"}
          class:text-slate-600={sort_method !== "desc"}
          fill="currentColor"
          viewBox="0 0 384 512"
        >
          <path d="M16 192l176 200 176-200-352 0z" />
        </svg>
      </div>
    {/if}
  </button>
</div>
