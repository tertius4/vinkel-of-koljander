<script>
  import { page } from "$app/state";
  import { WYSIG_WAGWOORD } from "$lib";
  import { Navigation } from "$lib/classes/Navigation.svelte";
  import Form from "$lib/comps/CreateForm.svelte";
  import PageHeader from "$lib/comps/PageHeader.svelte";
  import { DB } from "$lib/DB";
  import { onMount, tick } from "svelte";

  let has_scrolled = $state(false);
  /** @type {DB.Resep?} */
  let recipe = $state(null);

  onMount(async () => {
    recipe = await getRecipeFromUrl();
  });

  /**
   *
   * @param {HTMLDivElement} node
   */
  function init(node) {
    function onScroll() {
      has_scrolled = node.scrollTop > 0;
    }
    node.addEventListener("scroll", onScroll);
    return {
      destroy() {
        node.removeEventListener("scroll", onScroll);
      },
    };
  }

  async function getRecipeFromUrl() {
    const url = new URL(page.url.origin + Navigation.current_page);
    const recipe_id = url.searchParams.get("edit_recipe_id");
    if (!recipe_id) {
      Navigation.back();
      return null;
    }

    const edit_password = url.searchParams.get("wysig");
    if (edit_password !== WYSIG_WAGWOORD) {
      Navigation.back();
      return null;
    }

    const recipe = await DB.Resep.read(recipe_id);
    return recipe;
  }
</script>

<div class="rounded-b-lg pb-4 transition-shadow" class:shadow-[0_10px_10px_rgba(1,1,1,0.08)]={has_scrolled}>
  <PageHeader>Wysig Resep</PageHeader>
</div>

{#if !recipe}
  <p class="text-center text-gray-500">Laai resep...</p>
{:else}
  <div use:init class="h-full overflow-y-auto scrollbar-none pb-25 px-4">
    <Form {recipe} />
  </div>
{/if}
