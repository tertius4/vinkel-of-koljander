<script>
  import Icon from "$lib/ui/comps/Icon.svelte";
  import { compressImage } from "$lib";

  /**
   * @typedef {Object} Props
   * @property {string} foto - The current image URL or data.
   * @property {(foto: string) => void} onchange - Callback function to handle image changes.
   */

  /** @type {Props} */
  const { foto, onchange } = $props();

  let busy = $state(false);
  let error = $state("");

  /**
   * Handles the file selection event.
   * @param {Event} event - The file input change event.
   */
  async function handleFileSelect(event) {
    const input = /** @type {HTMLInputElement} */ (event.target);
    const file = input.files?.[0];
    if (!file) return;

    busy = true;
    error = "";
    try {
      onchange(await compressImage(file));
    } catch (e) {
      console.error("Failed to process image:", e);
      error = "Kon nie die foto verwerk nie. Probeer 'n ander foto.";
    } finally {
      busy = false;
      // Allows choosing the same file again after an error or removal.
      input.value = "";
    }
  }
</script>

{#if foto}
  <div class="relative">
    <img src={foto} alt="Resep foto" class="w-full aspect-[2/1] object-cover rounded-lg border border-primary-200" />
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
    class="group flex flex-col items-center justify-center gap-2 w-full aspect-[2/1] border-2 border-dashed border-primary-200 rounded-lg cursor-pointer bg-white hover:bg-primary-100 hover:border-primary-400 focus-within:border-primary-400 transition-colors"
  >
    {#if busy}
      <Icon name="loading" size={28} class="text-primary-400 animate-spin" />
      <span class="text-sm font-semibold text-primary">Besig om foto te verklein...</span>
    {:else}
      <Icon name="camera" size={28} class="text-primary-400 group-hover:text-primary transition-colors" />
      <span class="px-3 py-1.5 rounded bg-primary text-white text-sm font-semibold">Laai 'n foto op</span>
    {/if}
  </label>
  <input id="foto" type="file" accept="image/*" onchange={handleFileSelect} disabled={busy} class="sr-only" />
  {#if error}
    <p class="mt-2 text-sm text-red-700">{error}</p>
  {/if}
{/if}
