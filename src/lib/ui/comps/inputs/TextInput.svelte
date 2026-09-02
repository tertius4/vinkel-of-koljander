<script lang="ts">
  interface Props {
    value?: string;
    type?: string;
    show_password?: boolean;
    placeholder?: string;
    autofocus?: boolean;
    oninput?: (event: Event) => void;
  }

  let {
    value = $bindable(),
    type = "text",
    show_password: show_password_setting = false,
    placeholder,
    oninput,
    autofocus = false,
    ...rest
  }: Props & Record<string, any> = $props();

  let show_password = $state(false);
  const is_password_type = $derived(type === "password");
  const input_type = $derived(is_password_type && show_password && show_password ? "text" : type);

  function init(element: HTMLInputElement) {
    if (!autofocus) return;

    element.focus();
  }
</script>

<div class="relative w-full">
  <input
    {...rest}
    {@attach init}
    type={input_type}
    class={[
      "w-full rounded-lg border border-primary-200 bg-tertiary-50 px-4 py-2 text-primary-950 placeholder:text-primary-400 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:outline-none",
      is_password_type && show_password_setting ? "pr-16" : "",
      rest.class || "",
    ]}
    bind:value
    {placeholder}
    {oninput}
  />

  {#if is_password_type && show_password_setting}
    <button
      type="button"
      class="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-primary-700 hover:text-primary-900 outline-none focus:text-primary-900 active:text-primary-900"
      onclick={() => (show_password = !show_password)}
      aria-label={show_password ? "Hide password" : "Show password"}
    >
      {show_password ? "Hide" : "Show"}
    </button>
  {/if}
</div>
