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
    <div class="relative mx-auto">
      <img src={foto} alt="Resep foto" class="w-full h-32 object-cover rounded-lg" />
      <button
        class="absolute -top-2 -right-2 bg-rust-700 text-white text-xl rounded-full w-6 h-6 flex items-center justify-center hover:bg-rust-800 transition-colors"
        onclick={() => onchange("")}
        aria-label="Verwyder foto"
      >
        ×
      </button>
    </div>
  {:else}
    <label
      for="foto"
      class="p-4 group flex items-center justify-center w-full h-32 border-2 border-dashed border-alabaster-400 rounded-lg cursor-pointer bg-alabaster-50 hover:bg-rust-50 hover:border-rust-400 transition-colors"
    >
      <div class="text-center w-full">
        <svg
          viewBox="0 0 512 512"
          class="w-10 h-10 mx-auto mb-2 text-alabaster-700 group-hover:text-rust-500 transition-colors"
          fill="currentColor"
        >
          <path opacity=".4" d="M160 288a96 96 0 1 0 192 0 96 96 0 1 0 -192 0z" />
          <path
            d="M149.1 64.8L138.7 96 64 96C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-74.7 0-10.4-31.2C356.4 45.2 338.1 32 317.4 32L194.6 32c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
          />
        </svg>

        <div
          class="px-4 py-2 bg-alabaster-100 bg-opacity-50 rounded-md w-fit mx-auto border border-alabaster-300 group-hover:border-rust-500 group-hover:bg-rust-500 transition-colors"
        >
          <span class="text-sm text-alabaster-700 group-hover:text-white transition-colors">Laai 'n foto op</span>
        </div>
      </div>
    </label>
    <input id="foto" type="file" accept="image/*" onchange={handleFileSelect} class="hidden" />
  {/if}
</div>
