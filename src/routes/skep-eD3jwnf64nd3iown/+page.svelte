<script lang="ts">
  import { goto } from "$app/navigation";
  import ImagePicker from "$lib/comps/ImagePicker.svelte";
  import Section from "$lib/comps/Section.svelte";
  import Modal from "$lib/comps/Modal.svelte";
  import { DB } from "$lib/DB/index.js";
  import QuillInput from "$lib/comps/QuillInput.svelte";

  /** @type {DB.Resep} */
  const resep = $state({
    id: "",
    naam: "",
    beskrywing: "",
    foto: "",
    stappe: [] as ResepStap[],
    tyd: { werk: 0, wag: 0 },
    kategorieë: [] as string[],
    porsies: 1,
  });

  /** @type {ResepStap}*/
  let nuwe_stap = $state({
    bestanddele: [] as { naam: string; eenheid: string; hoeveelheid: string; nota: string }[],
    instruksies: "",
    nommer: 1,
  });

  let nuwe_bestanddeel = $state({
    naam: "",
    eenheid: "",
    hoeveelheid: "",
    nota: "",
  });

  let show_ingredient_modal = $state(false);

  async function voegStapBy() {
    resep.stappe = [...(resep.stappe || []), nuwe_stap];

    nuwe_stap = {
      bestanddele: [],
      instruksies: "",
      nommer: resep.stappe.length + 1,
    };
  }

  function verwyderStap(nommer: number) {
    resep.stappe = resep.stappe.filter((stap) => stap.nommer !== nommer);
  }
  async function save() {
    const result = await DB.Resep.create(resep);
    if (result.success) {
      goto("/");
    }
  }

  async function handleFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          resep.foto = result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function init(node: HTMLInputElement) {
    node.focus();
  }
</script>

<div class="w-fit mx-auto rounded-full bg-bandicoot-100 my-5">
  <h1 class="text-3xl px-10 font-bold text-black py-1 text-center">Skep 'n Nuwe Resep</h1>
</div>

<Section>
  <div class="md:hidden w-fit mx-auto">
    <ImagePicker foto={resep.foto} onchange={(foto) => (resep.foto = foto)} />
  </div>

  <div>
    <label for="naam" class="block text-sm font-medium text-cod-bandicoot-800 mb-2">Naam</label>
    <input
      id="naam"
      class="w-full px-4 py-3 focus:bg-rust-50 border placeholder-cod-bandicoot-400 border-cod-bandicoot-400 rounded-lg focus:ring-0.5 outline-0 focus:ring-rust-400 focus:border-rust-400 caret-rust-400 transition-colors"
      bind:value={resep.naam}
      name="naam"
      placeholder="Voer die resep naam in..."
    />
  </div>

  <div class="flex gap-4">
    <div class="hidden md:block">
      <label for="foto" class="block text-sm font-medium text-cod-bandicoot-800 mb-2">Foto</label>
      <ImagePicker foto={resep.foto} onchange={(foto) => (resep.foto = foto)} />
    </div>

    <div class="w-full">
      <label for="beskrywing" class="block text-sm font-medium text-cod-bandicoot-800 mb-2">Beskrywing</label>
      <textarea
        id="beskrywing"
        class="w-full px-4 min-h-32 py-3 focus:bg-rust-50 border placeholder-cod-bandicoot-400 border-cod-bandicoot-400 rounded-lg focus:ring-0.5 outline-0 focus:ring-rust-400 focus:border-rust-400 caret-rust-400 transition-colors resize-vertical"
        bind:value={resep.beskrywing}
        name="beskrywing"
        rows="3"
        placeholder="Beskryf die resep..."
      ></textarea>
    </div>
  </div>
</Section>

<!-- Categories Section -->
<Section>
  <label for="kategorie" class="block text-sm font-medium text-cod-bandicoot-800">Kategorie</label>
  <div class="flex flex-wrap gap-2">
    {#each resep.kategorieë as kategorie (kategorie)}
      <button
        type="button"
        class="inline-flex active:bg-rust-200 focus:bg-rust-300 focus:text-rust-900 items-center outline-0 bg-rust-200 text-rust-800 px-3 py-1 rounded-full text-sm font-medium group hover:bg-rust-200 transition-colors"
        onclick={() => {
          resep.kategorieë = resep.kategorieë.filter((k) => k !== kategorie);
        }}
        aria-label={`Verwyder kategorie ${kategorie}`}
      >
        {kategorie}
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    {/each}
  </div>

  <input
    class="w-full px-4 py-2 focus:bg-rust-50 border placeholder-cod-bandicoot-400 border-cod-bandicoot-400 rounded-lg focus:ring-0.5 outline-0 focus:ring-rust-400 focus:border-rust-400 caret-rust-400 transition-colors"
    type="text"
    placeholder="Voeg kategorie by (druk Enter)"
    onkeydown={(e: KeyboardEvent) => {
      const target = e.target as HTMLInputElement;
      if (e.key === "Enter" && target.value.trim() !== "") {
        const is_duplicate = (resep.kategorieë || []).includes(target.value.trim());
        if (is_duplicate) {
          target.value = "";
          return;
        }
        resep.kategorieë = [...(resep.kategorieë || []), target.value.trim()];
        target.value = "";
      }
    }}
  />
</Section>

<!-- Timing Section -->
<div class="flex flex-col md:flex-row md:gap-2">
  <Section>
    <label for="werkstyd" class="block text-sm font-medium text-cod-bandicoot-800 mb-2">Werkstyd (minute)</label>
    <input
      id="werkstyd"
      class="w-full px-4 py-3 border border-bandicoot-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors"
      type="number"
      bind:value={resep.tyd.werk}
      name="werkstyd"
      min="0"
      placeholder="0"
    />
  </Section>
  <Section>
    <label for="wagstyd" class="block text-sm font-medium text-cod-bandicoot-800 mb-2">Wagstyd (minute)</label>
    <input
      id="wagstyd"
      class="w-full px-4 py-3 border border-bandicoot-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors"
      type="number"
      bind:value={resep.tyd.wag}
      name="wagstyd"
      min="0"
      placeholder="0"
    />
  </Section>
  <Section>
    <label for="porsies" class="block text-sm font-medium text-cod-bandicoot-800 mb-2">Porsies</label>
    <input
      id="porsies"
      class="w-full px-4 py-3 border border-bandicoot-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors"
      type="number"
      bind:value={resep.porsies}
      name="porsies"
      min="1"
      placeholder="4"
    />
  </Section>
</div>

<Section>
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-xl font-semibold text-cod-bandicoot-800">Stappe</h2>
  </div>

  <!-- Existing Steps -->
  {#each resep.stappe as stap (stap.nommer)}
    <div class="bg-white border border-bandicoot-200 rounded-lg p-4 mb-4 shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-lg font-medium text-bandicoot-800">Stap {stap.nommer}</h3>
        <button
          class="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
          onclick={() => verwyderStap(stap.nommer)}
          aria-label={`Verwyder stap ${stap.nommer}`}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </button>
      </div>

      {#if stap.bestanddele.length > 0}
        <div class="mb-4">
          <h4 class="text-sm font-medium text-cod-bandicoot-800 mb-2">Bestandele:</h4>
          <div class="space-y-2">
            {#each stap.bestanddele as bestanddeel}
              <div class="grid grid-cols-4 gap-2 text-sm">
                <div class="bg-bandicoot-100 px-3 py-2 rounded">{bestanddeel.naam}</div>
                <div class="bg-bandicoot-100 px-3 py-2 rounded">{bestanddeel.eenheid}</div>
                <div class="bg-bandicoot-100 px-3 py-2 rounded">{bestanddeel.hoeveelheid}</div>
                <div class="bg-bandicoot-100 px-3 py-2 rounded">{bestanddeel.nota}</div>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <div>
        <h4 class="text-sm font-medium text-cod-bandicoot-800 mb-2">Instruksies:</h4>
        <div class="bg-bandicoot-100 px-4 py-3 rounded-lg text-bandicoot-800 whitespace-pre-wrap">
          {stap.instruksies}
        </div>
      </div>
    </div>
  {/each}

  <!-- New Step Form -->

  <h3 class="text-lg font-medium text-bandicoot-800 mb-4">Stap {resep.stappe.length + 1}</h3>
  <div class="block text-sm font-medium text-cod-bandicoot-800 mb-2">Bestandele:</div>
  <!-- Ingredients for new step -->
  {#if nuwe_stap.bestanddele.length > 0}
    <div class="grid grid-cols-[auto_fit-content(50px)_fit-content(50px)_1fr_auto] gap-2 items-center">
      {#each nuwe_stap.bestanddele as bestanddeel, index}
        <span>•</span>
        <span>{bestanddeel.hoeveelheid}</span>
        <span class="pr-2">{bestanddeel.eenheid}</span>
        <span class="font-medium w-full">{bestanddeel.naam}</span>
        <button
          class="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
          onclick={() => {
            nuwe_stap.bestanddele = nuwe_stap.bestanddele.filter((b, i) => i !== index);
          }}
          aria-label={`Verwyder bestanddeel ${bestanddeel.naam}`}
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      {/each}
    </div>
  {/if}
  <div class="w-full flex justify-center">
    <button
      class="bg-rust-500 hover:bg-rust-600 text-white px-4 py-2 rounded-lg transition-colors font-medium mx-auto"
      type="button"
      onclick={() => (show_ingredient_modal = true)}
      aria-haspopup="dialog"
    >
      Voeg By
    </button>
  </div>

  <!-- Instructions -->
  <div class="mb-4">
    <label for="instruksies" class="block text-sm font-medium text-cod-bandicoot-800 mb-2">Instruksies:</label>
    <QuillInput
      bind:value={nuwe_stap.instruksies}
      class="mt-4"
      placeholder="Of gebruik die ryker teksredigeerder om jou instruksies te skryf..."
    />
  </div>
</Section>

<!-- Save Button -->
<div class="flex justify-between pt-4 mb-10">
  <a href="/" class="bg-bandicoot-100 px-8 py-4 rounded-xl transition-all duration-200 text-lg"> Terug </a>

  <button
    type="button"
    onclick={save}
    class="bg-viking px-8 py-4 rounded-xl transition-all duration-200 font-semibold text-lg"
  >
    Stoor Resep
  </button>
</div>

<Modal bind:open={show_ingredient_modal}>
  <h2 class="text-lg mb-4 font-medium text-cod-bandicoot-800">Bestandeel</h2>

  <input
    use:init
    class="w-full px-3 py-2 border border-bandicoot-300 rounded-lg focus:ring focus:ring-rust-500 focus:border-rust-500 transition-colors mb-2 outline-none"
    type="text"
    placeholder="Naam"
    bind:value={nuwe_bestanddeel.naam}
  />
  <div class="flex gap-2 mb-4">
    <input
      class="w-full px-3 py-2 border border-bandicoot-300 rounded-lg focus:ring focus:ring-rust-500 focus:border-rust-500 transition-colors outline-none"
      type="number"
      placeholder="Hoeveelheid"
      bind:value={nuwe_bestanddeel.hoeveelheid}
    />
    <input
      class="w-full px-3 py-2 border border-bandicoot-300 rounded-lg focus:ring focus:ring-rust-500 focus:border-rust-500 transition-colors outline-none"
      type="text"
      placeholder="Eenheid"
      bind:value={nuwe_bestanddeel.eenheid}
    />
  </div>

  <textarea
    class="w-full mb-4 px-3 py-2 border border-bandicoot-300 rounded-lg focus:ring focus:ring-rust-500 focus:border-rust-500 transition-colors outline-none"
    rows="3"
    placeholder="Nota (optioneel)"
    bind:value={nuwe_bestanddeel.nota}
  ></textarea>

  <div class="flex gap-2 justify-between">
    <button class="px-4 py-2 rounded bg-bandicoot-100" onclick={() => (show_ingredient_modal = false)}>
      Kanselleer
    </button>
    <button
      class="bg-rust-500 hover:bg-rust-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
      onclick={() => {
        nuwe_stap.bestanddele.push(nuwe_bestanddeel);
        nuwe_bestanddeel = { naam: "", eenheid: "", hoeveelheid: "", nota: "" };
        show_ingredient_modal = false;
      }}
    >
      Voeg By
    </button>
  </div>
</Modal>
