<script>
  /**
   * @typedef {Object} Props
   * @property {string} [value] - The value of the input field.
   * @property {string} [placeholder] - The placeholder text for the input field.
   * @property {string} [name] - The name attribute for the input field.
   * @property {string} [id] - The id attribute for the input field.
   * @property {string} [class] - Additional CSS classes for the input field.
   */

  /** @type {Props} */
  let { value = $bindable(), placeholder, name, id, class: className = "" } = $props();
</script>

<textarea
  {id}
  class={[
    "w-full px-4 py-3 bg-alabaster-50 focus:bg-rust-50 border border-alabaster-500 placeholder-alabaster-400 rounded-lg focus:ring-0.5 outline-0 focus:ring-rust-400 focus:border-rust-400 caret-rust-400 transition-colors placeholder:italic",
    className,
  ]}
  bind:value
  {name}
  rows="3"
  {placeholder}
></textarea>
