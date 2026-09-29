<script lang="ts">
  import Button from "$lib/ui/comps/buttons/Button.svelte";
  import Icon from "$lib/ui/comps/Icon.svelte";
  import Container from "$lib/ui/comps/layouts/Container.svelte";
  import { mount, tick, unmount } from "svelte";
  import { slide } from "svelte/transition";
  import EditorIngredientRow from "./EditorIngredientRow.svelte";
  import { ICON_BUTTON_CLASS, INPUT_CLASS, LABEL_CLASS } from "./styles";
  import ModalRemoveStep from "./ModalRemoveStep.svelte";

  interface Props {
    step: ResepStap;
    index: number;
    is_open: boolean;
    is_first: boolean;
    is_last: boolean;
    ontoggle: () => void;
    onmove: (direction: -1 | 1) => void;
    onremove: () => void;
  }

  let { step = $bindable(), index, is_open, is_first, is_last, ontoggle, onmove, onremove }: Props = $props();

  // Instructions whose note field is expanded. Notes that already have text start expanded.
  // svelte-ignore state_referenced_locally
  let open_notes = $state(
    new Set(step.instruksies.flatMap((instruction, i) => (instruction.note ? [instruction] : []))),
  );

  function addIngredient() {
    step.ingredients.push({ ingredient: "", amount: 0, unit: "", comment: "" });
  }

  function moveIngredient(i: number, direction: -1 | 1) {
    const [item] = step.ingredients.splice(i, 1);
    step.ingredients.splice(i + direction, 0, item);
  }

  async function addInstruction(after = step.instruksies.length - 1) {
    step.instruksies.splice(after + 1, 0, { label: "", note: "" });
    await tick();
    document.getElementById(`stap-${index}-instruksie-${after + 1}`)?.focus();
  }

  function toggleNote(instruction: { label: string; note?: string }) {
    if (open_notes.has(instruction)) open_notes.delete(instruction);
    else open_notes.add(instruction);
    open_notes = new Set(open_notes);
  }

  function handleRemove() {
    const component = mount(ModalRemoveStep, {
      target: document.body,
      props: {
        step_title: step.title ? `Stap ${index + 1}: ${step.title}` : `Stap ${index + 1}`,
        onremove: onremove,
        onclose: () => unmount(component),
      },
    });
  }
</script>

<Container class="overflow-hidden">
  <button
    type="button"
    id="step-header-{index}"
    aria-expanded={is_open}
    aria-controls="step-panel-{index}"
    onclick={ontoggle}
    class={[
      "w-full p-3 grid grid-cols-[auto_1fr_auto] gap-3 items-center text-left outline-none transition-colors duration-300",
      "hover:bg-primary-100 focus:bg-primary-100",
      is_open && "bg-primary-100",
    ]}
  >
    <div
      class="rounded-xl bg-primary font-source-serif-4 size-9 flex items-center justify-center text-white text-lg font-semibold"
    >
      {index + 1}
    </div>
    <span class="font-source-serif-4 headline-md font-semibold truncate">{step.title || "Stap " + (index + 1)}</span>
    <Icon
      name="chevron-down"
      size={20}
      class={{ "text-primary transition-transform duration-300": true, "rotate-180": is_open }}
    />
  </button>

  {#if is_open}
    <div
      transition:slide={{ axis: "y", duration: 150 }}
      id="step-panel-{index}"
      role="region"
      aria-labelledby="step-header-{index}"
    >
      <div class="p-3 space-y-3 border-t border-primary-200 bg-primary-100">
        <div>
          <label for="stap-{index}-titel" class={[LABEL_CLASS, "block mb-1"]}>Titel (opsioneel)</label>
          <input
            id="stap-{index}-titel"
            bind:value={step.title}
            placeholder="bv. Maak die vulsel"
            class={INPUT_CLASS}
          />
        </div>
        <div>
          <label for="stap-{index}-beskrywing" class={[LABEL_CLASS, "block mb-1"]}>Beskrywing (opsioneel)</label>
          <textarea
            id="stap-{index}-beskrywing"
            bind:value={step.description}
            rows="2"
            placeholder="Kort opsomming van hierdie fase…"
            class={[INPUT_CLASS, "resize-none"]}
          ></textarea>
        </div>
      </div>

      <div class="p-3 border-t border-primary-200">
        <div class="flex items-center justify-between gap-2 py-1 mb-2">
          <div class="flex gap-2 text-primary-600 uppercase tracking-wider items-center">
            <Icon name="carrot" size={20} />
            <h3>Bestanddele</h3>
          </div>
          <button
            type="button"
            class="text-primary font-semibold flex items-center gap-1 px-2 py-2 rounded hover:bg-primary-100 outline-none focus:bg-primary-100"
            onclick={addIngredient}
          >
            <Icon name="plus" size={16} />
            Voeg by
          </button>
        </div>
        <div class="space-y-2">
          {#each step.ingredients as ingredient, i (ingredient)}
            <EditorIngredientRow
              bind:ingredient={step.ingredients[i]}
              is_first={i === 0}
              is_last={i === step.ingredients.length - 1}
              onmove={(direction) => moveIngredient(i, direction)}
              onremove={() => step.ingredients.splice(i, 1)}
            />
          {:else}
            <p class="text-neutral-500 italic text-sm py-2">Geen bestanddele bygevoeg nie.</p>
          {/each}
        </div>
      </div>

      <div class="p-3 border-t border-primary-200 bg-primary-100">
        <div class="flex items-center justify-between gap-2 py-1 mb-2">
          <div class="flex gap-2 text-primary-600 uppercase tracking-wider items-center">
            <Icon name="flag" size={20} />
            <h3>Instruksies</h3>
          </div>
          <button
            type="button"
            class="text-primary font-semibold flex items-center gap-1 px-2 py-2 rounded hover:bg-primary-200 outline-none focus:bg-primary-200"
            onclick={() => addInstruction()}
          >
            <Icon name="plus" size={16} />
            Voeg by
          </button>
        </div>
        <div class="space-y-3">
          {#each step.instruksies as instruction, j (instruction)}
            <div class="grid grid-cols-[auto_1fr_auto] gap-2 items-start">
              <div class="bg-primary-200 text-primary-600 px-2 py-0.5 rounded font-semibold mt-2.5">
                {index + 1}.{j + 1}
              </div>
              <textarea
                id="stap-{index}-instruksie-{j}"
                bind:value={instruction.label}
                rows="2"
                placeholder="Stap {index + 1}.{j + 1} instruksies…"
                aria-label="Instruksie {index + 1}.{j + 1}"
                class={[INPUT_CLASS, "resize-y"]}
                onkeydown={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) {
                    e.preventDefault();
                    addInstruction(j);
                  }
                }}
              ></textarea>
              <div class="flex">
                <button
                  type="button"
                  class={[ICON_BUTTON_CLASS, open_notes.has(instruction) && "bg-primary-200"]}
                  aria-label="Nota"
                  aria-pressed={open_notes.has(instruction)}
                  onclick={() => toggleNote(instruction)}
                >
                  <Icon name="lightbulb" size={20} />
                </button>
                <button
                  type="button"
                  class={[ICON_BUTTON_CLASS, "text-red-600"]}
                  aria-label="Verwyder instruksie"
                  onclick={() => step.instruksies.splice(j, 1)}
                >
                  <Icon name="trash" size={20} />
                </button>
              </div>
              {#if open_notes.has(instruction)}
                <textarea
                  bind:value={instruction.note}
                  rows="2"
                  placeholder="Nota (opsioneel)…"
                  aria-label="Nota"
                  class={[
                    INPUT_CLASS,
                    "col-start-2 col-span-2 resize-none text-sm! bg-secondary/15! border-l-4 border-l-secondary-700 placeholder:text-secondary/80",
                  ]}
                ></textarea>
              {/if}
            </div>
          {:else}
            <p class="text-neutral-500 italic text-sm py-2">Nog geen instruksies nie.</p>
          {/each}
        </div>
      </div>

      <div class="p-3 border-t border-primary-200 flex items-center justify-between gap-2">
        <div class="flex">
          <button
            type="button"
            class={ICON_BUTTON_CLASS}
            aria-label="Skuif stap op"
            disabled={is_first}
            onclick={() => onmove(-1)}
          >
            <Icon name="chevron-down" size={20} class="rotate-180" />
          </button>
          <button
            type="button"
            class={ICON_BUTTON_CLASS}
            aria-label="Skuif stap af"
            disabled={is_last}
            onclick={() => onmove(1)}
          >
            <Icon name="chevron-down" size={20} />
          </button>
        </div>
        <button
          type="button"
          class="flex items-center gap-2 px-3 h-10 rounded-lg text-red hover:bg-red-50 focus:bg-red-50 outline-none font-medium"
          onclick={handleRemove}
        >
          <Icon name="trash" size={20} />
          Verwyder stap
        </button>
      </div>
    </div>
  {/if}
</Container>
