<script>
  import { goto } from "$app/navigation";
  import ImagePicker from "$lib/comps/ImagePicker.svelte";
  import { DB } from "$lib/DB/index.js";
  import Input from "$lib/comps/Input.svelte";
  import InputArea from "./InputArea.svelte";
  import { FOOD_CATEGORIES, normalize } from "$lib";
  import CategoryPill from "./CategoryPill.svelte";
  import Table from "./table/Table.svelte";
  import TableRow from "./table/TableRow.svelte";
  import TableCell from "./table/TableCell.svelte";
  import { Navigation } from "$lib/classes/Navigation.svelte";

  /**
   * @typedef {Object} Props
   * @property {DB.Resep} recipe
   */

  /** @type {Props} */
  const { recipe: original_recipe } = $props();

  let recipe = $state(original_recipe);

  const selected_categories = $derived(new Set((recipe.kategorieë || []).map((c) => normalize(c))));
  const custom_categories = $derived(
    recipe.kategorieë
      .filter((c) => !FOOD_CATEGORIES.some((cat) => normalize(cat.label) === normalize(c)))
      .map((label) => ({ label })),
  );

  /**
   *
   * @param {number} nommer
   */
  function verwyderStap(nommer) {
    recipe.stappe = recipe.stappe.filter((stap) => stap.nommer !== nommer);
  }

  async function save() {
    if (recipe.id) {
      const result = await DB.Resep.update(recipe.id, recipe);
      if (result.success) {
        Navigation.navigateTo(`/`);
      }
      return;
    }

    const result = await DB.Resep.create(recipe);
    if (result.success) {
      Navigation.navigateTo(`/`);
    }
  }

  /**
   *
   * @param {Event} event
   */
  async function handleFileSelect(event) {
    const target = event.target;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          recipe.foto = result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  /**
   *
   * @param {HTMLInputElement} node
   */
  function init(node) {
    node.focus();
  }

  function selectCategory(label) {
    const is_selected = selected_categories.has(normalize(label));
    console.log("is_selected", label, is_selected);
    if (is_selected) {
      recipe.kategorieë = recipe.kategorieë.filter((c) => normalize(c) !== normalize(label));
    } else {
      recipe.kategorieë = [...recipe.kategorieë, label].sort();
    }
  }

  function addCustomCategory(label) {
    if (!label) return;

    const category = label?.trim();
    if (category && !recipe.kategorieë.includes(category)) {
      recipe.kategorieë = [...recipe.kategorieë, category].sort();
    }
  }
</script>

<Input
  class="mb-5"
  id="naam"
  bind:value={recipe.naam}
  name="naam"
  placeholder="Voer die naam van jou resep in (bv. Ouma se Bobotie)"
/>

<InputArea
  class="mb-5"
  id="voorwoord"
  bind:value={recipe.beskrywing}
  name="voorwoord"
  placeholder="Vertel kortliks iets oor die resep…"
/>

<div class="flex gap-3 items-center mb-5">
  <hr class="w-full text-alabaster-200" />
  <span class="text-nowrap font-medium">Voeg Resepfoto by</span>
  <hr class="w-full text-alabaster-200" />
</div>

<ImagePicker foto={recipe.foto} onchange={(foto) => (recipe.foto = foto)} />

<hr class="w-full text-alabaster-200 my-5" />

<div class="grid grid-cols-3 gap-5 mb-5">
  <div class="font-medium">
    <div class="flex items-center gap-2 pl-1 pb-1">
      <svg viewBox="0 0 576 512" class="w-4 h-4" fill="currentColor">
        <path
          d="M472 24a56 56 0 1 0 -112 0 56 56 0 1 0 112 0zM275.7 181c1.2-3 4.2-5 7.4-5l35.9 0-22.6 90.6c-8.3 33.2 11 67 43.7 76.8L436 372.2 386.8 483c-7.2 16.1 .1 35.1 16.2 42.2s35.1-.1 42.2-16.2l56.6-127.4c11.7-26.4-2.4-57.2-30.1-65.5l-75.4-22.6 20.7-70.4 10 17.1c11.5 19.7 32.5 31.8 55.3 31.8l61.6 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-61.6 0-32.8-56.3c-14.3-24.6-40.6-39.7-69.1-39.7l-97.3 0c-29.4 0-55.9 17.9-66.9 45.3l-21.9 54.9c-6.6 16.4 1.4 35 17.8 41.6s35-1.4 41.6-17.8L275.7 181zM263.8 388.6c-1.9 5.4-5.3 10.3-9.8 13.9l-82.4 67.9c-13.6 11.2-15.6 31.4-4.3 45s31.4 15.6 45 4.3l82.4-67.9c13.4-11 23.5-25.5 29.3-41.8l6.9-19.3-4.7-1.4c-20.4-6.1-37.9-17.6-51.2-32.4l-11.3 31.7zM24 95.8c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0zm32 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l64 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-64 0zM0 311.8c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0c-13.3 0-24 10.7-24 24z"
        />
      </svg>
      <span>Werktyd</span>
    </div>
    <div class="relative">
      <Input type="number" bind:value={recipe.tyd.werk} />
      <span class="text-alabaster-400 absolute right-2 top-1/2 -translate-y-1/2">min</span>
    </div>
  </div>

  <div class="font-medium">
    <div class="flex items-center gap-2 pl-1 pb-1">
      <svg viewBox="0 0 576 512" class="w-4 h-4" fill="currentColor">
        <path
          d="M336 40c0-13.3 10.7-24 24-24l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-32 0 0 32 72 0c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 160c0-35.3 28.7-64 64-64 0-17.7 14.3-32 32-32l96 0c17.7 0 32 14.3 32 32l168 0 0-32-32 0c-13.3 0-24-10.7-24-24zM528 272a112 112 0 1 0 -224 0 112 112 0 1 0 224 0zm-136-8l0-48c0-13.3 10.7-24 24-24s24 10.7 24 24l0 48c0 13.3-10.7 24-24 24s-24-10.7-24-24zM80.8 351.2A112 112 0 1 0 239.2 192.8 112 112 0 1 0 80.8 351.2zM182.6 215.4c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-33.9 33.9c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l33.9-33.9z"
        />
      </svg>
      <span>Wagtyd</span>
    </div>
    <div class="relative">
      <Input type="number" bind:value={recipe.tyd.wag} />
      <span class="text-alabaster-400 absolute right-2 top-1/2 -translate-y-1/2">min</span>
    </div>
  </div>

  <div class="font-medium">
    <div class="flex items-center gap-2 pl-1 pb-1">
      <svg viewBox="0 0 512 512" class="w-4 h-4" fill="currentColor">
        <path
          d="M256 0a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm96 312c0 25-12.7 47-32 59.9l0 92.1c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-92.1C172.7 359 160 337 160 312l0-40c0-53 43-96 96-96s96 43 96 96l0 40zM96 32a56 56 0 1 1 0 112 56 56 0 1 1 0-112zm16 240l0 32c0 32.5 12.1 62.1 32 84.7l0 75.3c0 1.2 0 2.5 .1 3.7-8.5 7.6-19.7 12.3-32.1 12.3l-32 0c-26.5 0-48-21.5-48-48l0-56.6C12.9 364.4 0 343.7 0 320l0-32c0-53 43-96 96-96 12.7 0 24.8 2.5 35.9 6.9-12.6 21.4-19.9 46.4-19.9 73.1zM368 464l0-75.3c19.9-22.5 32-52.2 32-84.7l0-32c0-26.7-7.3-51.6-19.9-73.1 11.1-4.5 23.2-6.9 35.9-6.9 53 0 96 43 96 96l0 32c0 23.7-12.9 44.4-32 55.4l0 56.6c0 26.5-21.5 48-48 48l-32 0c-12.3 0-23.6-4.6-32.1-12.3 0-1.2 .1-2.5 .1-3.7zM416 32a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
        />
      </svg>
      <span>Mense</span>
    </div>
    <Input type="number" bind:value={recipe.porsies} />
  </div>
</div>

<hr class="w-full text-alabaster-200 my-5" />

<div class="flex gap-3 items-center mb-5">
  <hr class="w-full text-alabaster-200" />
  <span class="text-nowrap font-medium">Kategorieë</span>
  <hr class="w-full text-alabaster-200" />
</div>

<div class="flex flex-wrap gap-2 justify-center mb-5">
  {#each [...FOOD_CATEGORIES, ...custom_categories] as category (category.label)}
    <CategoryPill
      label={category.label}
      is_selected={selected_categories.has(normalize(category.label))}
      onclick={() => selectCategory(category.label)}
    />
  {/each}
</div>

<Input placeholder="Voeg u eie kategorie by…" onsubmit={addCustomCategory} />

<div class="flex gap-3 items-center my-5">
  <hr class="w-full text-alabaster-200" />
  <span class="text-nowrap font-medium">Stappe</span>
  <hr class="w-full text-alabaster-200" />
</div>

{#each recipe.stappe as stap, index (stap.nommer)}
  <div class="bg-white border border-alabaster-300 rounded-lg mb-5">
    <div class="flex p-2 justify-between items-center">
      <div class="font-medium text-xl uppercase">Stap {index + 1}</div>
      <button type="button" aria-label="Verwyder stap" onclick={() => verwyderStap(stap.nommer)}>
        <svg
          viewBox="0 0 512 512"
          class="w-6 h-6 text-red-500 hover:text-red-600 transition-colors"
          fill="currentColor"
        >
          <path
            d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm121.6 313.6c12.8 12.8 12.8 33.6 0 46.4s-33.6 12.8-46.4 0L256 302.4l-75.2 75.2c-12.8 12.8-33.6 12.8-46.4 0s-12.8-33.6 0-46.4l75.2-75.2-75.2-75.2c-12.8-12.8-12.8-33.6 0-46.4s33.6-12.8 46.4 0l75.2 75.2 75.2-75.2c12.8-12.8 33.6-12.8 46.4 0s12.8 33.6 0 46.4l-75.2 75.2 75.2 75.2z"
          />
        </svg>
      </button>
    </div>

    <div class="bg-white rounded-lg">
      <div class="flex items-center justify-between border-b border-alabaster-200 p-2">
        <div class="font-medium text-lg">Bestandele</div>
        <button
          class="bg-rust-500 text-white px-4 py-2 rounded hover:bg-rust-600 transition-colors items-center justify-center"
          type="button"
          onclick={() => {
            stap.bestanddele.push({ naam: "", hoeveelheid: "", maatstaf: "" });
          }}
        >
          <svg class="w-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span class="leading-none">Voeg By</span>
        </button>
      </div>
      <div>
        <Table
          bodyClass="*:even:bg-white *:odd:bg-alabaster-100! scrollbar-none"
          headings={[
            // { key: "nota", title: "", width: "40px" },
            { key: "naam", title: "Naam" },
            { key: "hoeveelheid", title: "Hoeveelheid", short_title: "Hoeveelh." },
            { key: "maatstaf", title: "Maatstaf", short_title: "Maatsf." },
            { key: "verwyder", title: "", width: "40px" },
          ]}
        >
          {#each stap.bestanddele as bestandeel}
            <TableRow>
              <!-- <TableCell class="flex justify-center items-center">
                <svg viewBox="0 0 512 512" fill="currentColor" class="w-5">
                  {#if false}
                    <path
                      d="M512 240c0 132.5-114.6 240-256 240-37.1 0-72.3-7.4-104.1-20.7L33.5 510.1c-9.4 4-20.2 1.7-27.1-5.8S-2 485.8 2.8 476.8l48.8-92.2C19.2 344.3 0 294.3 0 240 0 107.5 114.6 0 256 0S512 107.5 512 240z"
                    />
                  {:else}
                    <path
                      d="M51.9 384.9C19.3 344.6 0 294.4 0 240 0 107.5 114.6 0 256 0S512 107.5 512 240 397.4 480 256 480c-36.5 0-71.2-7.2-102.6-20L37 509.9c-3.7 1.6-7.5 2.1-11.5 2.1-14.1 0-25.5-11.4-25.5-25.5 0-4.3 1.1-8.5 3.1-12.2l48.8-89.4zm37.3-30.2c12.2 15.1 14.1 36.1 4.8 53.2l-18 33.1 58.5-25.1c11.8-5.1 25.2-5.2 37.1-.3 25.7 10.5 54.2 16.4 84.3 16.4 117.8 0 208-88.8 208-192S373.8 48 256 48 48 136.8 48 240c0 42.8 15.1 82.4 41.2 114.7z"
                    />
                  {/if}
                </svg>
              </TableCell> -->
              <TableCell>
                <input
                  class="w-full bg-transparent outline-0 text-ellipsis"
                  type="text"
                  value={bestandeel.naam}
                  onchange={(e) => (bestandeel.naam = e.target.value)}
                />
              </TableCell>
              <TableCell>
                <input
                  class="w-full bg-transparent outline-0 text-ellipsis"
                  type="text"
                  value={bestandeel.hoeveelheid}
                  onchange={(e) => (bestandeel.hoeveelheid = e.target.value)}
                />
              </TableCell>
              <TableCell>
                <input
                  class="w-full bg-transparent outline-0 text-ellipsis"
                  type="text"
                  value={bestandeel.maatstaf}
                  onchange={(e) => (bestandeel.maatstaf = e.target.value)}
                />
              </TableCell>
              <TableCell
                onclick={() => console.log("verwyder", bestandeel.naam)}
                class="flex justify-center items-center shrink-0"
              >
                <svg
                  viewBox="0 0 512 512"
                  class="w-5! h-5! cursor-pointer hover:text-rust-600 transition-colors"
                  fill="currentColor"
                >
                  <path
                    d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM168 232l176 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-176 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
                  />
                </svg>
              </TableCell>
            </TableRow>
          {:else}
            <div class="p-4 text-alabaster-400 italic col-span-6">Nog geen bestanddele nie.</div>
          {/each}
        </Table>
      </div>
    </div>

    <div>
      <div class="flex items-center justify-between border-b border-alabaster-200 p-2">
        <div class="font-medium text-">Instruksies</div>
        <button
          class="bg-rust-500 text-white px-4 py-2 rounded hover:bg-rust-600 transition-colors items-center justify-center"
          type="button"
          onclick={() => {
            stap.instruksies.push("");
          }}
        >
          <svg class="w-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span class="leading-none">Voeg By</span>
        </button>
      </div>
      {#each stap.instruksies as instruksie, i}
        <div class="p-2 flex gap-1">
          {i + 1}.
          <input
            class="resize-none w-full outline-none focus:bg-alabaster-100 rounded-lg"
            bind:value={stap.instruksies[i]}
            placeholder={`Stap ${stap.nommer}.${i + 1} instruksies…`}
            onkeydown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (!stap.instruksies[i]?.length) {
                  stap.instruksies.splice(i, 1);
                } else {
                  stap.instruksies.splice(i + 1, 0, "");
                }
              }
            }}
            onblur={() => {
              if (!stap.instruksies[i]?.length) {
                stap.instruksies.splice(i, 1);
              }
            }}
          />
        </div>
      {:else}
        <div class="p-4 text-alabaster-400 italic">Nog geen instruksies nie.</div>
      {/each}
    </div>
  </div>
{/each}

<div class="flex justify-center">
  <button
    class="bg-rust-500 mx-auto text-white px-6 py-3 rounded hover:bg-rust-600 transition-colors items-center justify-center"
    type="button"
    onclick={() => recipe.stappe.push({ bestanddele: [], instruksies: [], nommer: recipe.stappe.length + 1 })}
  >
    <svg class="w-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
    </svg>
    <span class="leading-none">Voeg Stap By</span>
  </button>
</div>

<hr class="w-full text-alabaster-200 my-6.5" />

<!-- Save Button -->
<div class="flex justify-between mb-6">
  {#if recipe.id}
    <button
      type="button"
      onclick={async () => {
        await DB.Resep.delete(recipe.id);

        Navigation.navigateTo(`/`);
      }}
      class="bg-rust-500 px-8 py-4 rounded-xl transition-all duration-200 font-semibold text-lg"
    >
      Skrap
    </button>
  {:else}
    <a href="/" class="bg-alabaster-200 px-8 py-4 rounded-xl transition-all duration-200 text-lg"> Terug </a>
  {/if}

  <button
    type="button"
    onclick={save}
    class="bg-viking px-8 py-4 rounded-xl transition-all duration-200 font-semibold text-lg"
  >
    Stoor Resep
  </button>
</div>
