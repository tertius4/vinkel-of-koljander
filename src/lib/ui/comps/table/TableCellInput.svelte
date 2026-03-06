<script>
  let { value = $bindable(), ...props } = $props();
  const { children, ...rest } = props;

  const placeholder = $derived(rest.placeholder ?? "Enter value…");
  const type = $derived(rest.type ?? "text");

  /**
   * Handle input change and update the bound value.
   * @param {Event} e - The input change event.
   */
  function handleInput(e) {
    value = /** @type {HTMLInputElement} */ (e.target).value;
  }
</script>

<div {...rest} class={["p-2 transition-all hover:bg-gray-50", rest.class ?? ""]}>
  <input class="w-full outline-0 text-ellipsis" {type} {placeholder} {value} onchange={handleInput} />
</div>
