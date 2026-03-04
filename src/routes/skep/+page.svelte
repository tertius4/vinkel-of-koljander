<script>
  import Create from "$lib/view/Create.svelte";
  import Modal from "$lib/comps/Modal.svelte";
  import Input from "$lib/comps/Input.svelte";
  import { saveAuthToken } from "$lib/auth";

  const { data } = $props();

  let is_modal_open = $state(!data.authenticated);
  let is_logged_in = $state(data.authenticated);

  let password = $state("");
  let error = $state("");
  let loading = $state(false);

  async function login() {
    if (!password) return;
    loading = true;
    error = "";

    try {
      const success = await saveAuthToken(password);

      if (success) {
        is_logged_in = true;
        is_modal_open = false;
      } else {
        error = "Verkeerde wagwoord.";
      }
    } catch {
      error = "Kon nie aanmeld nie. Probeer weer.";
    } finally {
      loading = false;
      password = "";
    }
  }
</script>

<Modal bind:open={is_modal_open} close_on_backdrop={false}>
  <h2 class="text-lg font-semibold mb-4">Wagwoord benodig</h2>
  <p class="text-sm text-gray-500 mb-4">Voer die wagwoord in om voort te gaan.</p>

  <Input bind:value={password} type="password" placeholder="Wagwoord" onsubmit={login} />

  {#if error}
    <p class="text-red-500 text-sm mt-2">{error}</p>
  {/if}

  <button
    class="mt-4 w-full bg-rust-500 hover:bg-rust-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
    onclick={login}
    disabled={loading}
  >
    {loading ? "Besig..." : "Meld Aan"}
  </button>
</Modal>

{#if is_logged_in}
  <Create />
{/if}
