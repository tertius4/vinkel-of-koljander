<script lang="ts">
  import Icon from "$lib/ui/comps/Icon.svelte";
  import Container from "$lib/ui/comps/layouts/Container.svelte";
  import Panel from "$lib/ui/comps/layouts/Panel.svelte";
  import ImagePicker from "$lib/ui/ImagePicker.svelte";
  import { CREDIT_KINDS } from "$lib/recipe";
  import { ICON_BUTTON_CLASS, INPUT_CLASS, LABEL_CLASS } from "./styles";

  let { recipe = $bindable() }: { recipe: DB.Resep } = $props();
</script>

<ImagePicker foto={recipe.foto} onchange={(foto) => (recipe.foto = foto)} />

<div>
  <label for="naam" class={[LABEL_CLASS, "block mb-1"]}>Naam van die resep</label>
  <input
    id="naam"
    bind:value={recipe.naam}
    placeholder="bv. Ouma se Bobotie"
    class={[INPUT_CLASS, "font-source-serif-4 text-xl! font-semibold text-primary! placeholder:text-primary/70"]}
  />
</div>

<div>
  <label for="beskrywing" class={[LABEL_CLASS, "block mb-1"]}>Beskrywing</label>
  <textarea
    id="beskrywing"
    bind:value={recipe.beskrywing}
    rows="3"
    placeholder="Vertel kortliks iets oor die resep…"
    class={[INPUT_CLASS, "resize-y"]}
  ></textarea>
</div>

<div>
  <span class={[LABEL_CLASS, "block mb-1"]}>Erkenning (opsioneel)</span>
  <div class="space-y-2">
    {#each recipe.erkenning! as credit, i}
      <div class="flex items-center gap-2">
        <select bind:value={credit.soort} aria-label="Soort erkenning" class={[INPUT_CLASS, "w-auto! shrink-0"]}>
          {#each CREDIT_KINDS as { soort, label }}
            <option value={soort}>{label}</option>
          {/each}
        </select>
        <input
          bind:value={credit.naam}
          aria-label="Naam"
          placeholder={i === 0 ? "bv. Ouma se kookboek" : "bv. Oom Isak"}
          class={INPUT_CLASS}
        />
        {#if recipe.erkenning!.length > 1}
          <button
            type="button"
            class={ICON_BUTTON_CLASS}
            aria-label="Verwyder erkenning"
            onclick={() => recipe.erkenning!.splice(i, 1)}
          >
            <Icon name="xmark" size={20} />
          </button>
        {/if}
      </div>
    {/each}
  </div>
  {#if recipe.erkenning!.length < 2}
    <button
      type="button"
      class="mt-2 flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-800"
      onclick={() => recipe.erkenning!.push({ soort: "geskenk van", naam: "" })}
    >
      <Icon name="plus" size={16} />
      Voeg nog een by
    </button>
  {/if}
</div>

<Container class="p-4">
  <div class="flex gap-2 items-center">
    <Icon name="kitchen-set" class="text-primary" />
    <h3 class="headline-md text-base text-primary-900 font-bold tracking-tight">Porsiegrootte &amp; Tye</h3>
  </div>
  <hr class="border-primary-100 my-3" />
  <div class="grid grid-cols-2 gap-3">
    <Panel class="p-3 col-span-2 space-y-2">
      <label for="porsies" class="flex gap-2 items-center">
        <Icon name="user-group" size={20} class="text-secondary-700" />
        <span class={LABEL_CLASS}>Porsies</span>
      </label>
      <input id="porsies" type="number" min="1" step="1" inputmode="numeric" bind:value={recipe.porsies} class={INPUT_CLASS} />
    </Panel>

    <Panel class="p-3 space-y-2">
      <label for="werk" class="flex gap-2 items-center">
        <Icon name="spoon" size={20} class="text-secondary-700" />
        <span class={LABEL_CLASS}>Werkstyd</span>
      </label>
      <div class="relative">
        <input id="werk" type="number" min="0" inputmode="numeric" bind:value={recipe.tyd.werk} class={[INPUT_CLASS, "pr-11"]} />
        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500 pointer-events-none">min</span>
      </div>
    </Panel>

    <Panel class="p-3 space-y-2">
      <label for="wag" class="flex gap-2 items-center">
        <Icon name="clock" size={20} class="text-secondary-700" />
        <span class={LABEL_CLASS}>Wagtyd</span>
      </label>
      <div class="relative">
        <input id="wag" type="number" min="0" inputmode="numeric" bind:value={recipe.tyd.wag} class={[INPUT_CLASS, "pr-11"]} />
        <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-neutral-500 pointer-events-none">min</span>
      </div>
    </Panel>
  </div>
</Container>
