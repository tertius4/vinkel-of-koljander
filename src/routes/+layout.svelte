<script>
  import "./layout.css";

  let { children } = $props();
</script>

<main class="bg-bandicoot-100 w-screen h-screen overflow-hidden md:p-2">
  <div class="max-w-3xl mx-auto px-4 md:py-4 bg-bandicoot-50 rounded-lg max-h-full overflow-y-auto">
    {@render children()}
  </div>
</main>
