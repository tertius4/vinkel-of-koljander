<script>
  /**
   * @typedef {Object} Props
   * @property {string | number} [value] - The value of the input field.
   * @property {string} [placeholder] - The placeholder text for the input field.
   * @property {string} [name] - The name attribute for the input field.
   * @property {string} [id] - The id attribute for the input field.
   * @property {string} [class] - Additional CSS classes for the input field.
   * @property {string} [type] - The type attribute for the input field.
   * @property {(value: string | number) => void} [onsubmit] - The onsubmit event handler.
   */

  /** @type {Props} */
  let { value = $bindable(""), placeholder, name, id, type, class: className = "", onsubmit } = $props();
</script>

<input
  onkeydown={(event) => {
    if (event.key === "Enter" && onsubmit) {
      event.preventDefault();
      onsubmit(value);
      value = "";
    }
  }}
  {type}
  {id}
  onsubmit={() => {
    onsubmit && onsubmit(value);
    value = "";
  }}
  class={[
    "w-full px-4 py-3 focus:bg-rust-50 border focus:placeholder:text-rust-600 border-alabaster-300 bg-white placeholder-alabaster-400 rounded-lg focus:ring-0.5 outline-0 focus:ring-rust-400 focus:border-rust-400 caret-rust-400 transition-colors placeholder:italic",
    className,
  ]}
  bind:value
  {name}
  {placeholder}
/>
