<script>
  import { fade } from "svelte/transition";
  import Icon from "../comps/Icon.svelte";
  import { mount, unmount } from "svelte";
  import SignInModal from "./SignInModal.svelte";
  import { clearAuthToken } from "$lib/auth";
  import { invalidate } from "$app/navigation";
  import { page } from "$app/state";

  const { ...rest } = $props();

  async function handleSignIn() {
    const comp = mount(SignInModal, {
      target: document.body,
      props: {
        onclose: () => {
          unmount(comp);
        },
      },
    });
  }

  async function handleSignOut() {
    clearAuthToken();
    invalidate("layout:root");
  }
</script>

{#if page.data.is_logged_in}
  <button
    {...rest}
    in:fade={{ duration: 150 }}
    type="button"
    onclick={handleSignOut}
    class={["bg-primary-50 hover:bg-primary-100 text-primary-500 rounded-lg p-2 md:p-3 outline-none focus:bg-primary-100 active:bg-primary-100", rest.class]}
  >
    <Icon name="sign-out" class="text-primary-500" />
  </button>
{:else}
  <button
    {...rest}
    in:fade={{ duration: 150 }}
    type="button"
    onclick={handleSignIn}
    class={["bg-primary-50 hover:bg-primary-100 text-primary-500 rounded-lg p-2 md:p-3 outline-none focus:bg-primary-100 active:bg-primary-100", rest.class]}
  >
    <Icon name="sign-in" class="text-primary-500" />
  </button>
{/if}
