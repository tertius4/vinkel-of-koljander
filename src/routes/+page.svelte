<script>
  import { checkAuthToken } from "$lib/auth";
  import { Navigation } from "$lib/classes/Navigation.svelte";
  import List from "$lib/view/List.svelte";

  const is_logged_in = $derived(await checkAuthToken());
</script>

<a
  hidden={!is_logged_in}
  href="/skep"
  class="block text-center bg-rust-500 hover:bg-rust-600 text-white font-medium py-2 px-4 rounded-b-lg transition-colors mb-6"
>
  Skep Resep
</a>

<List />
