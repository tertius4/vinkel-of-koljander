<script>
  const { children, ...rest } = $props();
</script>

<div {...rest} class={["bg-white border border-primary-100 rounded-lg", rest.class || ""]}>
  {@render children()}
</div>
