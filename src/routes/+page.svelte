<script>
  import { checkAuthToken } from "$lib/auth";
  import { Navigation } from "$lib/classes/Navigation.svelte";
  import Create from "$lib/view/Create.svelte";
  import Edit from "$lib/view/Edit.svelte";
  import List from "$lib/view/List.svelte";
  import Recipe from "$lib/view/Recipe.svelte";
  import { onMount } from "svelte";

  Navigation.initialize();

  let is_logged_in = $state(false);

  onMount(async () => {
    const is_auth = await checkAuthToken();

    is_logged_in = is_auth;
  });
</script>

<a
  hidden={!is_logged_in}
  href="/skep"
  class="block text-center bg-rust-500 hover:bg-rust-600 text-white font-medium py-2 px-4 rounded-b-lg transition-colors mb-6"
>
  Skep Resep
</a>
{#if !Navigation.is_initialized}
  <p class="text-center text-gray-500">Laai tans…</p>
{:else if Navigation.current_view === "list"}
  <List />
{:else if Navigation.current_view === "recipe"}
  <Recipe />
{:else if Navigation.current_view === "create_recipe"}
  <Create />
{:else if Navigation.current_view === "edit_recipe"}
  <Edit />
{/if}
