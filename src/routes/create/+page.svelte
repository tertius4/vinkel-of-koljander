<script lang="ts">
  import RecipeEditor from "$lib/recipe/RecipeEditor.svelte";
  import AuthGate from "$lib/ui/feature/AuthGate.svelte";

  const { data } = $props();

  const blank: DB.Resep = {
    id: "",
    naam: "",
    beskrywing: "",
    foto: "",
    tyd: { werk: 30, wag: 15 },
    kategorieë: [],
    porsies: 4,
    stappe: [],
  };
</script>

<AuthGate authenticated={data.authenticated}>
  <RecipeEditor recipe={blank} />
</AuthGate>
