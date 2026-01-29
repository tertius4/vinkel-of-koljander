<script>
  import { Navigation } from "$lib/classes/Navigation.svelte";
  import Form from "$lib/comps/Form.svelte";
</script>

<div class="h-full overflow-y-auto scrollbar-none pb-12">
  <button onclick={() => Navigation.navigateTo("/")}>Tuis</button>
  <Form />
</div>
