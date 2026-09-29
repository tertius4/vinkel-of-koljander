<script>
  const { label, is_selected, onclick, ...rest } = $props();
</script>

<button
  type="button"
  {...rest}
  class={{
    "inline-flex items-center border outline-none px-3 py-2 rounded text-sm font-medium transition-colors": true,
    "bg-primary text-white border-primary hover:bg-primary-600 focus:bg-primary-600": is_selected,
    "bg-white text-primary-700 border-primary-200 hover:bg-primary-100 focus:bg-primary-100": !is_selected,
  }}
  {onclick}
  aria-pressed={is_selected}
  aria-label={is_selected ? `Verwyder '${label}' kategorie` : `Voeg '${label}' kategorie by`}
>
  {label}
</button>
