<script>
  const { data } = $props();
</script>

Desktop.

<div class="bg-slate-300 p-1 rounded">
  <pre>{JSON.stringify(data.recipe, null, 2)}</pre>
</div>
