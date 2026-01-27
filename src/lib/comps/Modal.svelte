<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  let { open = $bindable(), close_on_backdrop = true, children } = $props();

  /** @type {HTMLElement | null} */
  let modalEl = $state(null);

  function close() {
    open = false;
  }

  function onBackdropClick() {
    if (close_on_backdrop) close();
  }

  /**
   * Handles keydown events for accessibility.
   * @param {KeyboardEvent} event
   */
  function handleKey(event) {
    if (event.key === "Escape") close();
  }

  $effect(() => {
    if (!open && modalEl) {
      setTimeout(() => modalEl?.focus(), 0);
    }
  });

  onMount(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <button
      transition:fade={{ duration: 150 }}
      type="button"
      class="fixed inset-0 bg-black/40 cursor-default"
      aria-hidden="true"
      onclick={onBackdropClick}
    ></button>

    <div
      transition:fly={{ y: 20, duration: 150 }}
      class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6 z-10 focus:outline-none"
      role="dialog"
      aria-modal="true"
      tabindex="0"
      bind:this={modalEl}
    >
      <button
        class="absolute top-6 right-6 text-cod-gray-600 hover:text-cod-gray-800"
        type="button"
        onclick={close}
        aria-label="Sluit"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      {@render children()}
    </div>
  </div>
{/if}
