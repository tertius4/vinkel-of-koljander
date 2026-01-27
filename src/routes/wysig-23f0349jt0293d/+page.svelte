<script lang="ts">
  import { goto } from "$app/navigation";
  import { DB } from "$lib/DB/index.js";
  import Modal from "$lib/comps/Modal.svelte";

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

  let showIngredientModal = $state(false);

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
</script>

<div class="min-h-screen bg-linear-to-br from-rust-50 to-amber-50 py-8 px-4">
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center">Skep 'n Nuwe Resep</h1>

      <div class="space-y-8">
        <!-- Basic Info Section -->
        <div class="bg-gray-50 rounded-xl p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Basiese Inligting</h2>

          <div class="space-y-4">
            <div>
              <label for="naam" class="block text-sm font-medium text-gray-700 mb-2">Naam</label>
              <input
                id="naam"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors"
                bind:value={resep.naam}
                name="naam"
                placeholder="Voer die resep naam in..."
              />
            </div>

            <div>
              <label for="beskrywing" class="block text-sm font-medium text-gray-700 mb-2">Beskrywing</label>
              <textarea
                id="beskrywing"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors resize-vertical"
                bind:value={resep.beskrywing}
                name="beskrywing"
                rows="3"
                placeholder="Beskryf die resep..."
              ></textarea>
            </div>

            <!-- Photo Upload -->
            <div>
              <label for="foto" class="block text-sm font-medium text-gray-700 mb-2">Foto</label>
              <div class="flex items-center space-x-4">
                <label
                  for="foto"
                  class="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-rust-400 hover:bg-rust-50 transition-colors"
                >
                  <div class="text-center">
                    <svg class="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <span class="text-sm text-gray-500">Voeg foto by</span>
                  </div>
                </label>
                <input id="foto" type="file" accept="image/*" onchange={handleFileSelect} class="hidden" />
                {#if resep.foto}
                  <div class="relative">
                    <img src={resep.foto} alt="Resep foto" class="w-32 h-32 object-cover rounded-lg shadow-md" />
                    <button
                      class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                      onclick={() => (resep.foto = "")}
                      aria-label="Verwyder foto"
                    >
                      ×
                    </button>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>

        <!-- Categories Section -->
        <div class="bg-gray-50 rounded-xl p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Kategorieë</h2>
          <div class="flex flex-wrap gap-2 mb-4">
            {#each resep.kategorieë as kategorie (kategorie)}
              <div
                class="inline-flex items-center bg-rust-100 text-rust-800 px-3 py-1 rounded-full text-sm font-medium group hover:bg-rust-200 transition-colors"
              >
                {kategorie}
                <button
                  class="ml-2 text-rust-600 hover:text-rust-800 opacity-70 group-hover:opacity-100 transition-opacity"
                  onclick={() => {
                    resep.kategorieë = resep.kategorieë.filter((k) => k !== kategorie);
                  }}
                  aria-label={`Verwyder kategorie ${kategorie}`}
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            {/each}
          </div>
          <input
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors"
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
        </div>

        <!-- Timing Section -->
        <div class="bg-gray-50 rounded-xl p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Tyd en Porsies</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label for="werkstyd" class="block text-sm font-medium text-gray-700 mb-2">Werkstyd (minute)</label>
              <input
                id="werkstyd"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors"
                type="number"
                bind:value={resep.tyd.werk}
                name="werkstyd"
                min="0"
                placeholder="0"
              />
            </div>
            <div>
              <label for="wagstyd" class="block text-sm font-medium text-gray-700 mb-2">Wagstyd (minute)</label>
              <input
                id="wagstyd"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors"
                type="number"
                bind:value={resep.tyd.wag}
                name="wagstyd"
                min="0"
                placeholder="0"
              />
            </div>
            <div>
              <label for="porsies" class="block text-sm font-medium text-gray-700 mb-2">Porsies</label>
              <input
                id="porsies"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors"
                type="number"
                bind:value={resep.porsies}
                name="porsies"
                min="1"
                placeholder="4"
              />
            </div>
          </div>
        </div>

        <!-- Steps Section -->
        <div class="bg-gray-50 rounded-xl p-6">
          <h2 class="text-xl font-semibold text-gray-700 mb-6">Stappe</h2>

          <!-- Existing Steps -->
          {#each resep.stappe as stap (stap.nommer)}
            <div class="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-lg font-medium text-gray-800">Stap {stap.nommer}</h3>
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
                  <h4 class="text-sm font-medium text-gray-700 mb-2">Bestandele:</h4>
                  <div class="space-y-2">
                    {#each stap.bestanddele as bestanddeel}
                      <div class="grid grid-cols-4 gap-2 text-sm">
                        <div class="bg-gray-100 px-3 py-2 rounded">{bestanddeel.naam}</div>
                        <div class="bg-gray-100 px-3 py-2 rounded">{bestanddeel.eenheid}</div>
                        <div class="bg-gray-100 px-3 py-2 rounded">{bestanddeel.hoeveelheid}</div>
                        <div class="bg-gray-100 px-3 py-2 rounded">{bestanddeel.nota}</div>
                      </div>
                    {/each}
                  </div>
                </div>
              {/if}

              <div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Instruksies:</h4>
                <div class="bg-gray-100 px-4 py-3 rounded-lg text-gray-800 whitespace-pre-wrap">
                  {stap.instruksies}
                </div>
              </div>
            </div>
          {/each}

          <!-- New Step Form -->
          <div class="bg-white border-2 border-dashed border-rust-200 rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">Stap {resep.stappe.length + 1}</h3>

            <!-- Ingredients for new step -->
            {#if nuwe_stap.bestanddele.length > 0}
              <div class="mb-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Bestandele:</h4>
                <div class="space-y-2">
                  {#each nuwe_stap.bestanddele as bestanddeel, index}
                    <div class="flex items-center gap-2">
                      <div class="grid grid-cols-4 gap-2 flex-1 text-sm">
                        <div class="bg-rust-50 px-3 py-2 rounded border">{bestanddeel.naam}</div>
                        <div class="bg-rust-50 px-3 py-2 rounded border">{bestanddeel.eenheid}</div>
                        <div class="bg-rust-50 px-3 py-2 rounded border">{bestanddeel.hoeveelheid}</div>
                        <div class="bg-rust-50 px-3 py-2 rounded border">{bestanddeel.nota}</div>
                      </div>
                      <button
                        class="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                        onclick={() => {
                          nuwe_stap.bestanddele = nuwe_stap.bestanddele.filter((b, i) => i !== index);
                        }}
                        aria-label={`Verwyder bestanddeel ${bestanddeel.naam}`}
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

            <!-- Add Ingredient: open in modal -->
            <div class="mb-4">
              <button
                class="bg-rust-500 hover:bg-rust-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                onclick={() => (showIngredientModal = true)}
                aria-haspopup="dialog"
              >
                Voeg Bestanddeel By
              </button>

              <Modal bind:open={showIngredientModal}>
                <h4 slot="header" class="text-sm font-medium text-cod-gray-800">Voeg bestanddeel by</h4>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div class="col-span-2 md:col-span-1">
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors"
                      type="text"
                      placeholder="Naam"
                      bind:value={nuwe_bestanddeel.naam}
                    />
                  </div>
                  <input
                    class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors"
                    type="text"
                    placeholder="Eenheid"
                    bind:value={nuwe_bestanddeel.eenheid}
                  />
                  <input
                    class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors"
                    type="number"
                    placeholder="Hoeveelheid"
                    bind:value={nuwe_bestanddeel.hoeveelheid}
                  />
                  <input
                    class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors"
                    type="text"
                    placeholder="Nota"
                    bind:value={nuwe_bestanddeel.nota}
                  />
                </div>

                <div class="flex gap-2 justify-end mt-4">
                  <button class="px-4 py-2 rounded bg-gray-100" onclick={() => (showIngredientModal = false)}>
                    Kanselleer
                  </button>
                  <button
                    class="bg-rust-500 hover:bg-rust-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                    onclick={() => {
                      nuwe_stap.bestanddele.push(nuwe_bestanddeel);
                      nuwe_bestanddeel = { naam: "", eenheid: "", hoeveelheid: "", nota: "" };
                      showIngredientModal = false;
                    }}
                  >
                    Voeg Bestanddeel By
                  </button>
                </div>
              </Modal>
            </div>

            <!-- Instructions -->
            <div class="mb-4">
              <label for="instruksies" class="block text-sm font-medium text-gray-700 mb-2">Instruksies:</label>
              <textarea
                id="instruksies"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rust-500 focus:border-rust-500 transition-colors resize-vertical"
                rows="4"
                bind:value={nuwe_stap.instruksies}
                placeholder="Beskryf hoe om hierdie stap te doen..."
              ></textarea>
            </div>

            <button
              class="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              onclick={voegStapBy}
            >
              Voeg Stap By
            </button>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-center pt-4">
          <button
            type="button"
            onclick={save}
            class="bg-linear-to-r from-amber-500 to-rust-500 hover:from-amber-600 hover:to-rust-600 text-white px-8 py-4 rounded-xl transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Stoor Resep
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
