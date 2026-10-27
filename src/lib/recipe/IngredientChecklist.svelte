<script lang="ts">
  import { ingredientKey, shoppingListText } from "$lib/recipe";
  import Ingredient from "$lib/recipe/Ingredient.svelte";
  import Button from "$lib/ui/comps/buttons/Button.svelte";
  import ButtonAnchor from "$lib/ui/comps/buttons/ButtonAnchor.svelte";
  import Icon from "$lib/ui/comps/Icon.svelte";

  interface Props {
    title: string;
    servings: number;
    ingredients: { title: string; amount: string; unit: string; comments: string[] }[];
    /** Classes for each ingredient row. */
    row_class?: string;
  }

  const {
    title,
    servings,
    ingredients,
    row_class = "border-b-2 border-dashed border-neutral-200 last:border-b-0 py-3",
  }: Props = $props();

  // Ticked ingredients are the ones already in the kitchen. They are keyed by name and unit, so they stay
  // ticked when a change in servings reloads the list.
  const ticked: Record<string, boolean> = $state({});

  const to_buy = $derived(ingredients.filter((ingredient) => !ticked[keyOf(ingredient)]));
  const total = $derived(ingredients.length);
  const done = $derived(total - to_buy.length);
  const percentage = $derived(total ? Math.round((done / total) * 100) : 0);

  const list_text = $derived(shoppingListText(title, servings, to_buy));
  const can_share = typeof navigator !== "undefined" && "share" in navigator;
  let copied = $state(false);

  function keyOf(ingredient: { title: string; unit: string }) {
    return ingredientKey(ingredient.title, ingredient.unit);
  }

  function reset() {
    for (const key of Object.keys(ticked)) delete ticked[key];
  }

  async function share() {
    try {
      await navigator.share({ title: `Inkopies vir ${title}`, text: list_text });
    } catch (error) {
      // Closing the share sheet rejects with an AbortError, which is not a failure.
      if ((error as Error).name !== "AbortError") console.error("Failed to share:", error);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(list_text);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }
</script>

<p class="text-sm text-[#55433c]">Merk wat jy reeds het — die res kom op jou inkopielys.</p>

<div class="flex justify-between items-center text-sm font-semibold mt-3">
  <span>{to_buy.length} om te koop · {done} reeds in die kas</span>
  {#if done}
    <button
      type="button"
      onclick={reset}
      class="flex items-center gap-1 text-primary font-bold hover:underline focus:underline outline-none"
    >
      <Icon name="restore" size={14} />
      Herstel
    </button>
  {:else}
    <span class="text-primary font-bold">{percentage}%</span>
  {/if}
</div>
<div
  class="mt-2 h-2 rounded-full bg-primary-100 overflow-hidden"
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={percentage}
>
  <div class="h-full rounded-full bg-primary transition-all duration-300" style:width="{percentage}%"></div>
</div>

<div class={["grid gap-2 mt-4", can_share ? "grid-cols-3" : "grid-cols-2"]} hidden={!to_buy.length}>
  {#if can_share}
    <Button onclick={share} class="px-2!">
      <Icon name="share" size={18} />
      Deel
    </Button>
  {/if}
  <ButtonAnchor
    href="https://wa.me/?text={encodeURIComponent(list_text)}"
    target="_blank"
    rel="noopener noreferrer"
    outline={can_share}
    class="py-2.5! px-2!"
  >
    <Icon name="whatsapp" size={18} />
    WhatsApp
  </ButtonAnchor>
  <Button onclick={copy} outline class="px-2!">
    <Icon name={copied ? "check" : "copy"} size={18} />
    {copied ? "Gekopieer!" : "Kopieer"}
  </Button>
</div>

<div class="mt-2">
  {#each ingredients as ingredient (keyOf(ingredient))}
    <Ingredient
      data={ingredient}
      checked={ticked[keyOf(ingredient)]}
      onchange={(value) => (ticked[keyOf(ingredient)] = value)}
      class={row_class}
    />
  {/each}
</div>
