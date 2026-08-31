<script>
  import { fade } from "svelte/transition";

  const { children } = $props();
</script>

<div
  class="fixed w-screen h-screen inset-0 bg-black/50 z-50 flex items-center justify-center"
  transition:fade={{ duration: 150 }}
>
  <div class="bg-tertiary-50 rounded-lg overflow-hidden w-[90%] max-w-lg p-4">
    {@render children()}
  </div>
</div>
