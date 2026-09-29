<script lang="ts">
  import { saveAuthToken } from "$lib/auth";
  import Button from "$lib/ui/comps/buttons/Button.svelte";
  import TextInput from "$lib/ui/comps/inputs/TextInput.svelte";
  import Modal from "$lib/ui/Modal.svelte";

  const { authenticated, children }: { authenticated: boolean; children: () => any } = $props();

  // svelte-ignore state_referenced_locally
  let is_logged_in = $state(authenticated);
  let password = $state("");
  let error = $state("");
  let loading = $state(false);

  async function login() {
    if (!password) return;
    loading = true;
    error = "";

    try {
      if (await saveAuthToken(password)) is_logged_in = true;
      else error = "Verkeerde wagwoord.";
    } catch {
      error = "Kon nie aanmeld nie. Probeer weer.";
    } finally {
      loading = false;
      password = "";
    }
  }
</script>

<Modal open={!is_logged_in} close_on_backdrop={false}>
  <form
    class="space-y-4"
    onsubmit={(e) => {
      e.preventDefault();
      login();
    }}
  >
    <div>
      <h2 class="headline-md text-primary-900">Wagwoord benodig</h2>
      <p class="text-sm text-neutral-700">Voer die wagwoord in om voort te gaan.</p>
    </div>

    <TextInput bind:value={password} type="password" placeholder="Wagwoord" show_password autofocus />

    {#if error}
      <p class="text-red-600 text-sm">{error}</p>
    {/if}

    <Button type="submit" disabled={loading}>{loading ? "Besig..." : "Meld Aan"}</Button>
  </form>
</Modal>

{#if is_logged_in}
  {@render children()}
{/if}
