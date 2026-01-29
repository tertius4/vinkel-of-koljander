<script>
  import "./layout.css";

  let { children } = $props();
</script>

<main class="bg-bandicoot-100 w-dvw h-dvh md:p-2">
  <div class="max-w-3xl mx-auto md:py-4 bg-bandicoot-50 rounded-lg h-full overflow-hidden">
    <div class="w-full flex justify-center">
      <h1 class="text-4xl font-bold leading-20 pb-2">Vinkel of Koljander</h1>
    </div>

    {@render children()}
  </div>
</main>
