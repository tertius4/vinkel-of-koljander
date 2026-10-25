<script>
  import sprite from "$lib/ui/icons/sprite.svg?url";

  /**
   * @typedef {Object} Props
   * @property {import("$lib/ui/icons/names").IconName} name - The name of the icon to display.
   * @property {string | Record<string, boolean>} [class] - Additional CSS classes to apply to the icon.
   * @property {string} [style] - Additional inline styles to apply to the icon.
   * @property {number} [size=28] - The size of the icon in pixels.
   */

  /** @type {Props}*/
  const { name, style, class: className = "", size = 28 } = $props();
</script>

<svg aria-hidden="true" width={size} height={size} class={className} {style}>
  <use href="{sprite}#{name}" />
</svg>
