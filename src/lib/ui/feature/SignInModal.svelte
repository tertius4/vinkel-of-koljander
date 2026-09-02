<script lang="ts">
  import { invalidate } from "$app/navigation";
  import { saveAuthToken } from "$lib/auth";
  import Button from "../comps/buttons/Button.svelte";
  import TextInput from "../comps/inputs/TextInput.svelte";
  import Modal from "$lib/ui/comps/Modal.svelte";
  import Icon from "../comps/Icon.svelte";

  const { onclose } = $props();

  let password = $state("");
  let loading = $state(false);
  let error = $state("");

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Escape") {
      onclose();
    }
  }

  async function handleLogin(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    event.preventDefault();

    if (!password) return;

    loading = true;
    error = "";

    try {
      const success = await saveAuthToken(password);

      if (success) {
        invalidate("layout:root");
        onclose();
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

<svelte:body onkeydown={handleKeyPress} />

<Modal>
  <form class="space-y-2 relative">
    <button
      class="absolute top-1 right-1 text-neutral-400 hover:text-neutral-600 transition-colors"
      type="button"
      onclick={onclose}
    >
      <Icon name="xmark" size="20" />
    </button>
    <h2 class="text-xl font-bold">Teken in</h2>
    <p class="text-neutral-400">Teken asseblief in om voort te gaan.</p>

    <input hidden autocomplete="username" />
    <TextInput autocomplete="current-password" autofocus placeholder="Password" type="password" bind:value={password} />
    <p class="text-red-500" hidden={!error}>{error}</p>

    <footer class="w-full flex items-center gap-2">
      <Button type="submit" class="ml-auto" onclick={handleLogin}>
        <span class="text-white">Teken in</span>
      </Button>
    </footer>
  </form>
</Modal>
