<script>
  const { children, ...rest } = $props();
</script>

<div {...rest} class={["bg-primary-50 border border-primary-200 rounded-lg", rest.class || ""]}>
  {@render children()}
</div>
