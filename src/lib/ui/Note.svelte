<script>
  import Modal from "./Modal.svelte";

  let { value = $bindable(""), ...rest } = $props();

  let open = $state(false);
</script>

<button type="button" onclick={() => (open = true)}>
  <svg viewBox="0 0 512 512" fill="currentColor" class="w-5">
    {#if !!value}
      <path
        d="M512 240c0 132.5-114.6 240-256 240-37.1 0-72.3-7.4-104.1-20.7L33.5 510.1c-9.4 4-20.2 1.7-27.1-5.8S-2 485.8 2.8 476.8l48.8-92.2C19.2 344.3 0 294.3 0 240 0 107.5 114.6 0 256 0S512 107.5 512 240z"
      />
    {:else}
      <path
        d="M51.9 384.9C19.3 344.6 0 294.4 0 240 0 107.5 114.6 0 256 0S512 107.5 512 240 397.4 480 256 480c-36.5 0-71.2-7.2-102.6-20L37 509.9c-3.7 1.6-7.5 2.1-11.5 2.1-14.1 0-25.5-11.4-25.5-25.5 0-4.3 1.1-8.5 3.1-12.2l48.8-89.4zm37.3-30.2c12.2 15.1 14.1 36.1 4.8 53.2l-18 33.1 58.5-25.1c11.8-5.1 25.2-5.2 37.1-.3 25.7 10.5 54.2 16.4 84.3 16.4 117.8 0 208-88.8 208-192S373.8 48 256 48 48 136.8 48 240c0 42.8 15.1 82.4 41.2 114.7z"
      />
    {/if}
  </svg>
</button>

<Modal bind:open>
  <h2 class="text-xl font-bold">Bewerk Nota</h2>
  <div class="p-4">
    <textarea
      class="w-full p-2 border border-alabaster-300 rounded-md focus:outline-none focus:ring-2 focus:ring-viking-500"
      bind:value
      rows="6"
      {...rest}
    ></textarea>
  </div>

  <div class="flex justify-end">
    <button
      class="bg-viking-500 text-white px-4 py-2 rounded hover:bg-viking-600 transition-colors"
      type="button"
      onclick={() => (open = false)}
    >
      Klaar
    </button>
  </div>
</Modal>
