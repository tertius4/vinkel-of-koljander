<script lang="ts">
  import RecipeEditor from "$lib/recipe/RecipeEditor.svelte";
  import AuthGate from "$lib/ui/feature/AuthGate.svelte";

  const { data } = $props();
</script>

<AuthGate authenticated={data.authenticated}>
  {#key data.recipe.id}
    <RecipeEditor recipe={data.recipe} />
  {/key}
</AuthGate>
