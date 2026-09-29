<script>
  import Icon from "$lib/ui/comps/Icon.svelte";

  /**
   * @typedef {Object} Props
   * @property {string} foto - The current image URL or data.
   * @property {(foto: string) => void} onchange - Callback function to handle image changes.
   */

  /** @type {Props} */
  const { foto, onchange } = $props();

  /**
   * Handles the file selection event.
   * @param {Event} event - The file input change event.
   */
  function handleFileSelect(event) {
    const file = /** @type {HTMLInputElement} */ (event.target).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      onchange(/** @type {string} */ (e.target?.result));
    };
    reader.readAsDataURL(file);
  }
</script>

{#if foto}
  <div class="relative">
    <img src={foto} alt="Resep foto" class="w-full aspect-video object-cover rounded-lg border border-primary-200" />
    <button
      type="button"
      class="absolute top-2 right-2 size-10 flex items-center justify-center rounded-lg bg-black/70 text-white hover:bg-black/90 focus:bg-black/90 outline-none transition-colors"
      onclick={() => onchange("")}
      aria-label="Verwyder foto"
    >
      <Icon name="trash" size={20} />
    </button>
  </div>
{:else}
  <label
    for="foto"
    class="group flex flex-col items-center justify-center gap-2 w-full aspect-video border-2 border-dashed border-primary-200 rounded-lg cursor-pointer bg-white hover:bg-primary-100 hover:border-primary-400 focus-within:border-primary-400 transition-colors"
  >
    <Icon name="camera" size={36} class="text-primary-400 group-hover:text-primary transition-colors" />
    <span class="px-4 py-2 rounded bg-primary text-white text-sm font-semibold">Laai 'n foto op</span>
  </label>
  <input id="foto" type="file" accept="image/*" onchange={handleFileSelect} class="sr-only" />
{/if}
