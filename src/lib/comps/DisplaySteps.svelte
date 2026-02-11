<script>
  /**
   * @typedef {Object} Props
   * @property {ResepStap[]} steps
   */
  /** @type {Props} */
  const { steps = [] } = $props();

  const formatted_steps = $derived(
    steps.map((step) => {
      const ingredients = step.bestanddele.filter((b) => b.hoeveelheid || b.maatstaf || b.naam);
      const instructions = step.instruksies.filter((i) => !!i.label.trim());

      const formatted_ingredients = ingredients.map((ingredient, i) => ({
        label: `${ingredient.hoeveelheid || ""} ${ingredient.maatstaf || ""} ${ingredient.naam || ""}`.trim(),
        number: step.nommer + "." + (i + 1),
        note: ingredient.note?.trim(),
      }));

      const formatted_instructions = instructions.map((instruksie, i) => ({
        label: instruksie.label.trim(),
        number: step.nommer + "." + (i + 1),
        is_single: instructions.length === 1,
        note: instruksie.note?.trim(),
      }));

      return {
        ingredients: formatted_ingredients,
        has_ingredients: formatted_ingredients.length,
        instructions: formatted_instructions,
        number: step.nommer,
      };
    }),
  );
</script>

<div class="flex flex-col gap-6">
  {#each formatted_steps as step (step.number)}
    <div class="border-b border-alabaster-200 pb-4">
      {#if step.has_ingredients}
        <div class="tracking-wider mb-3.5 font-bold uppercase text-lg">Stap {step.number} – Bestanddele</div>
        <ul class="list-disc list-inside mb-4">
          {#each step.ingredients as ingredient}
            <div class="mb-3">
              <div class="text-alabaster-950">
                <span class="font-semibold">{ingredient.number}.</span>
                <span class="font-normal">{ingredient.label}</span>
              </div>

              {#if ingredient.note}
                <div class="mt-1 text-sm text-alabaster-700 bg-white rounded px-3 py-2 font-light">
                  {ingredient.note}
                </div>
              {/if}
            </div>
          {/each}
        </ul>
      {/if}

      <div class="tracking-wider mb-3.5 font-bold uppercase text-lg">
        Stap {step.number}
        {#if step.has_ingredients}
          – Instruksies{/if}
      </div>
      {#each step.instructions as instruction}
        <div class="mb-3">
          <div class="text-alabaster-950">
            {#if !instruction.is_single}
              <span class="font-semibold">{instruction.number}.</span>
            {/if}
            <span class="font-normal">{instruction.label}</span>
          </div>

          {#if instruction.note}
            <div class="mt-1 text-sm text-alabaster-700 bg-white rounded px-3 py-2 font-light">
              {instruction.note}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/each}
</div>
