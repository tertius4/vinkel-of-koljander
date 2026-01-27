<script>
  /**
   * ImagePicker.svelte
   * A Svelte component for selecting and displaying an image.
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
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      onchange(e.target.result);
    };
    reader.readAsDataURL(file);
  }
</script>

<div class="flex items-center">
  {#if foto}
    <div class="relative">
      <img src={foto} alt="Resep foto" class="w-full md:w-32 md:h-32 object-cover rounded-lg" />
      <button
        class="absolute -top-2 -right-2 bg-red-500 text-white text-xl rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
        onclick={() => onchange("")}
        aria-label="Verwyder foto"
      >
        ×
      </button>
    </div>
  {:else}
    <label
      for="foto"
      class="group flex items-center justify-center w-60 h-60 md:w-32 md:h-32 border-2 border-dashed border-cod-gray-400 rounded-lg cursor-pointer hover:bg-rust-50 hover:border-rust-400 transition-colors"
    >
      <div class="text-center w-full">
        <svg
          class="mx-auto h-8 w-8 text-cod-gray-400 group-hover:text-rust-500 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span class="text-sm text-cod-gray-400 group-hover:text-rust-500 transition-colors">Voeg foto by</span>
      </div>
    </label>
    <input id="foto" type="file" accept="image/*" onchange={handleFileSelect} class="hidden" />
  {/if}
</div>
