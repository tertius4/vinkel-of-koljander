<script lang="ts">
  import Icon from "$lib/ui/comps/Icon.svelte";
  import Container from "$lib/ui/comps/layouts/Container.svelte";
  import Panel from "$lib/ui/comps/layouts/Panel.svelte";
  import ImagePicker from "$lib/ui/ImagePicker.svelte";
  import { INPUT_CLASS, LABEL_CLASS } from "./styles";

  let { recipe = $bindable() }: { recipe: DB.Resep } = $props();
</script>

<ImagePicker foto={recipe.foto} onchange={(foto) => (recipe.foto = foto)} />

<div>
  <label for="naam" class={[LABEL_CLASS, "block mb-1"]}>Naam van die resep</label>
  <input
    id="naam"
    bind:value={recipe.naam}
    placeholder="bv. Ouma se Bobotie"
    class={[INPUT_CLASS, "font-source-serif-4 text-2xl! font-semibold text-primary! placeholder:text-primary/70"]}
  />
</div>

<div>
  <label for="beskrywing" class={[LABEL_CLASS, "block mb-1"]}>Beskrywing</label>
  <textarea
    id="beskrywing"
    bind:value={recipe.beskrywing}
    rows="4"
    placeholder="Vertel kortliks iets oor die resep…"
    class={[INPUT_CLASS, "resize-y"]}
  ></textarea>
</div>

<Container class="p-5">
  <div class="flex gap-2 items-center">
    <Icon name="kitchen-set" class="text-primary" />
    <h3 class="headline-md text-base text-primary-900 font-bold tracking-tight">Porsiegrootte &amp; Tye</h3>
  </div>
  <hr class="border-primary-100 my-4" />
  <div class="grid grid-cols-2 gap-4">
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
