<script>
  const { label, is_selected, onclick, ...rest } = $props();
</script>

<button
  type="button"
  {...rest}
  class={{
    "inline-flex items-center border outline-0 px-4 py-2 rounded font-medium transition-colors": true,
    "text-rust-800 border-rust-400 hover:text-rust-900 focus:text-rust-900 bg-rust-300 hover:bg-rust-400 focus:bg-rust-400":
      is_selected,
    "text-rust-700 border border-rust-700 hover:text-rust-800 focus:text-rust-800 bg-rust-100 hover:bg-rust-200 focus:bg-rust-200 ":
      !is_selected,
  }}
  {onclick}
  aria-label={is_selected ? `Verwyder '${label}' kategorie` : `Voeg '${label}' kategorie by`}
>
  {label}
</button>
