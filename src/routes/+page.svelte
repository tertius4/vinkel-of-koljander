<script>
  import { Navigation } from "$lib/classes/Navigation.svelte";
  import Create from "$lib/view/Create.svelte";
  import List from "$lib/view/List.svelte";
  import Recipe from "$lib/view/Recipe.svelte";

  Navigation.initialize();

  $inspect(Navigation.current_view);
</script>

{#if !Navigation.is_initialized}
  <p class="text-center text-gray-500">Laai tans…</p>
{:else if Navigation.current_view === "list"}
  <List />
{:else if Navigation.current_view === "recipe"}
  <Recipe />
{:else if Navigation.current_view === "create_recipe"}
  <Create />
{/if}
