<script lang="ts">
  import { goto } from "$app/navigation";
  import { DB } from "$lib/DB";
  import Button from "$lib/ui/comps/buttons/Button.svelte";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import EditorCategories from "./editor/EditorCategories.svelte";
  import EditorMeta from "./editor/EditorMeta.svelte";
  import EditorStep from "./editor/EditorStep.svelte";
  import ModalRemoveRecipe from "./ModalRemoveRecipe.svelte";
  import { mount, unmount } from "svelte";

  const { recipe: original }: { recipe: DB.Resep } = $props();

  // The form edits a private copy so nothing changes until Stoor is pressed.
  // svelte-ignore state_referenced_locally
  let recipe = $state<DB.Resep>({
    ...structuredClone($state.snapshot(original)),
    kategorieë: original.kategorieë ?? [],
    tyd: { werk: original.tyd?.werk ?? 0, wag: original.tyd?.wag ?? 0 },
    stappe: (original.stappe ?? []).map((stap) => ({
      ...structuredClone($state.snapshot(stap)),
      instruksies: stap.instruksies ?? [],
      ingredients: stap.ingredients ?? [],
    })),
  });

  // svelte-ignore state_referenced_locally
  const is_new = !original.id;

  // Only one step is open at a time. -1 means every step is closed.
  let open = $state(is_new ? -1 : 0);
  let is_saving = $state(false);
  let error = $state("");

  function addStep() {
    recipe.stappe.push({ nommer: recipe.stappe.length + 1, ingredients: [], instruksies: [] });
    open = recipe.stappe.length - 1;
  }

  function moveStep(i: number, direction: -1 | 1) {
    const [step] = recipe.stappe.splice(i, 1);
    recipe.stappe.splice(i + direction, 0, step);
    open = i + direction;
  }

  function removeStep(i: number) {
    recipe.stappe.splice(i, 1);
    open = Math.min(open, recipe.stappe.length - 1);
  }

  // Empty rows are dropped and steps are renumbered so the saved document is always clean.
  function cleaned(): Omit<DB.Resep, "id"> {
    const { id, ...data } = $state.snapshot(recipe);
    return {
      ...data,
      naam: data.naam.trim(),
      stappe: data.stappe.map((stap, i) => ({
        ...stap,
        nommer: i + 1,
        instruksies: stap.instruksies.filter((instruction) => instruction.label.trim()),
        ingredients: stap.ingredients.filter((ingredient) => ingredient.ingredient.trim()),
      })),
    };
  }

  async function save() {
    error = "";
    const data = cleaned();
    if (!data.naam) {
      error = "Gee asseblief 'n naam aan die resep.";
      return;
    }

    is_saving = true;
    try {
      const result: { ok: boolean; error?: string } = recipe.id
        ? await DB.Resep.updateById(recipe.id, data)
        : await DB.Resep.create(data);

      if (result.ok) await goto("/");
      else error = result.error || "Kon nie die resep stoor nie.";
    } finally {
      is_saving = false;
    }
  }

  function remove() {
    const component = mount(ModalRemoveRecipe, {
      target: document.body,
      props: {
        recipe_name: recipe.naam || "Hierdie resep",
        onremove: deleteRecipe,
        onclose: () => unmount(component),
      },
    });
  }

  async function deleteRecipe() {
    is_saving = true;
    try {
      await DB.Resep.delete(recipe.id);
      await goto("/");
    } catch {
      error = "Kon nie die resep skrap nie.";
    } finally {
      is_saving = false;
    }
  }
</script>

{#snippet actions()}
  {#if error}
    <p class="text-red-600 text-sm" role="alert">{error}</p>
  {/if}
  <div class="flex gap-3">
    {#if !is_new}
      <Button outline disabled={is_saving} onclick={remove} class="w-auto! px-5">
        <Icon name="trash" size={20} />
        <span>Skrap</span>
      </Button>
    {/if}
    <Button disabled={is_saving} onclick={save}>
      <Icon name={is_saving ? "loading" : "check"} size={20} class={{ "animate-spin": is_saving }} />
      <span>{is_saving ? "Besig..." : "Stoor"}</span>
    </Button>
  </div>
{/snippet}

<main class="p-4 max-lg:pb-0 lg:p-6 w-full bg-white grow overflow-y-auto">
  <div class="grid lg:grid-cols-[minmax(0,1000px)_400px] gap-6 items-start w-fit max-w-full mx-auto">
    <aside
      class="lg:col-start-2 lg:row-start-1 lg:sticky lg:top-0 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto space-y-4 min-w-0"
    >
      <h1 class="headline-lg text-primary text-3xl mt-2">{is_new ? "Skep 'n Nuwe Resep" : "Wysig Resep"}</h1>
      <EditorMeta bind:recipe />
      <EditorCategories bind:recipe />
      <div class="hidden lg:block space-y-3">{@render actions()}</div>
    </aside>

    <section class="lg:col-start-1 lg:row-start-1 min-w-0">
      <h2 class="headline-lg text-primary text-3xl mt-2">Stappe</h2>
      <p class="text-neutral-950 text-sm mb-4">Deel die resep op in fases met hul eie bestanddele en instruksies.</p>

      <div class="space-y-3">
        {#each recipe.stappe as stap, i (stap)}
          <EditorStep
            bind:step={recipe.stappe[i]}
            index={i}
            is_open={open === i}
            is_first={i === 0}
            is_last={i === recipe.stappe.length - 1}
            ontoggle={() => (open = open === i ? -1 : i)}
            onmove={(direction) => moveStep(i, direction)}
            onremove={() => removeStep(i)}
          />
        {:else}
          <p class="text-neutral-500 italic text-sm py-4 text-center">Nog geen stappe nie.</p>
        {/each}
      </div>

      <Button outline onclick={addStep} class="mt-4">
        <Icon name="plus" size={20} />
        <span>Voeg Stap By</span>
      </Button>
    </section>
  </div>

  <div
    class="lg:hidden sticky bottom-0 -mx-4 -mb-4 mt-6 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white border-t border-primary-100 space-y-2"
  >
    {@render actions()}
  </div>
</main>
