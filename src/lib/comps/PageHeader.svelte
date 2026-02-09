<script>
  const { children = () => {} } = $props();
</script>

<div class="relative flex gap-2 items-center justify-center mx-4 border-b border-alabaster-200">
  <h1 class="text-2xl font-semibold">
    {@render children()}
  </h1>
</div>
