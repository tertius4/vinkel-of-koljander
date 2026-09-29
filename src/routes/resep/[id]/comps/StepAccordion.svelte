<script lang="ts">
  import Button from "$lib/ui/comps/buttons/Button.svelte";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import Callout from "$lib/ui/comps/layouts/Callout.svelte";
  import Container from "$lib/ui/comps/layouts/Container.svelte";
  import Panel from "$lib/ui/comps/layouts/Panel.svelte";
  import { slide } from "svelte/transition";

  interface Step {
    title?: string;
    description?: string;
    ingredients: { ingredient: string; amount: string; unit: string; comment?: string }[];
    instructions: { label: string; note?: string }[];
  }

  const { steps }: { steps: Step[] } = $props();

  // Only one step is open at a time. -1 means every step is closed.
  let open = $state(0);
</script>

<div class="space-y-3">
  {#each steps as step, i}
    {@const is_open = open === i}
    <Container class="overflow-hidden">
      <button
        type="button"
        id="step-header-{i}"
        aria-expanded={is_open}
        aria-controls="step-panel-{i}"
        onclick={() => (open = is_open ? -1 : i)}
        class={[
          "w-full p-3 grid grid-cols-[auto_1fr_auto] gap-3 items-center text-left outline-none transition-colors duration-300",
          "hover:bg-primary-100 focus:bg-primary-100",
          is_open && "bg-primary-100",
        ]}
      >
        <div
          class="rounded-xl bg-primary font-source-serif-4 size-9 flex items-center justify-center text-white text-lg font-semibold"
        >
          {i + 1}
        </div>
        <span class="font-source-serif-4 headline-md font-semibold">{step.title || "Stap " + (i + 1)}</span>
        <Icon
          name="chevron-down"
          size={20}
          class={{ "text-primary transition-transform duration-300": true, "rotate-180": is_open }}
        />
      </button>

      {#if is_open}
        <div
          transition:slide={{ axis: "y", duration: 150 }}
          id="step-panel-{i}"
          role="region"
          aria-labelledby="step-header-{i}"
        >
          <p hidden={!step.description} class="px-4 py-3 bg-primary-100 text-[#55433c]">{step.description}</p>

          <div class="p-3 border-t border-primary-200" hidden={!step.ingredients.length}>
            <div class="flex gap-2 text-primary-600 uppercase tracking-wider items-center py-3">
              <Icon name="carrot" size={20} />
              <h3>Bestanddele vir hierdie stap</h3>
            </div>
            <div class="space-y-2">
              {#each step.ingredients as ingredient}
                <Panel class="p-4 font-semibold space-y-4">
                  <div>
                    <span hidden={!ingredient.amount}>{ingredient.amount} {ingredient.unit}</span>
                    <span class="capitalize">{ingredient.ingredient}</span>
                  </div>
                  {#if ingredient.comment}
                    <Callout icon="lightbulb" title="Wenk" body={ingredient.comment} />
                  {/if}
                </Panel>
              {/each}
            </div>
          </div>

          <div class={["p-4 border-t border-primary-200 space-y-4", !!step.ingredients.length && "bg-primary-100"]}>
            {#each step.instructions as instruction, j}
              <div class="grid grid-cols-[auto_1fr] gap-2 items-center body-md">
                <div class="mb-auto">
                  <div class="bg-primary-200 text-primary-600 px-2 py-0.5 rounded font-semibold">{i + 1}.{j + 1}</div>
                </div>
                <div class="text-black">{instruction.label}</div>
                <Callout
                  class="col-start-2 bg-secondary/15!"
                  hidden={!instruction.note}
                  title="Nota"
                  body={instruction.note}
                  small
                />
              </div>
            {/each}
          </div>

          <div class="p-3 border-t border-primary-200 flex justify-between gap-4">
            <div class="w-full max-w-48">
              <Button outline hidden={i === 0} onclick={() => (open = i - 1)}>
                <Icon name="arrow-left" />
                <span class="text-nowrap">Vorige Stap</span>
              </Button>
            </div>
            <div class="w-full max-w-48">
              <Button hidden={i === steps.length - 1} onclick={() => (open = i + 1)}>
                <span class="text-nowrap">Volgende Stap</span>
                <Icon name="arrow-right" />
              </Button>
            </div>
          </div>
        </div>
      {/if}
    </Container>
  {/each}
</div>
