<script>
  const { src, alt } = $props();

  let is_fullscreen = $state(false);
</script>

<button type="button" onclick={() => is_fullscreen = !is_fullscreen}>
  <img {src} {alt} class="w-full h-64 object-cover rounded-lg shadow-md" />
</button>

{#if is_fullscreen}
  <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <button type="button" class="absolute top-4 right-4 text-white text-2xl" onclick={() => is_fullscreen = false}>
      &times;
    </button>
    <img {src} {alt} class="max-w-full max-h-full object-contain" />
  </div>
{/if}