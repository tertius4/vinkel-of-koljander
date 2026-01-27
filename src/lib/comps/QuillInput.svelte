<script lang="ts">
  import { onMount } from "svelte";
  import "quill/dist/quill.snow.css";
  import type Quill from "quill";

  let { value = $bindable(""), placeholder = "", class: className = "" } = $props();

  let container: HTMLDivElement;
  let quill: Quill;

  onMount(async () => {
    const { default: Quill } = await import("quill");
    quill = new Quill(container, {
      theme: "snow",
      placeholder,
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"],
        ],
      },
    });

    quill.root.innerHTML = value;

    quill.on("text-change", () => {
      value = quill.root.innerHTML;
    });
  });

  function reset() {
    if (quill) {
      quill.setContents([{ insert: "" }]);
      value = "";
    }
  }
</script>

<div class={`quill-wrapper ${className}`} bind:this={container}></div>

<style>
  :global(.quill-wrapper .ql-container) {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border: 1px solid rgb(166, 131, 97);
    font-family: inherit;
  }

  :global(.quill-wrapper .ql-toolbar) {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border: 1px solid rgb(166, 131, 97);
    border-bottom: none;
    background-color: rgb(242, 239, 235);
  }

  :global(.quill-wrapper .ql-toolbar.ql-snow .ql-stroke) {
    stroke: rgb(128, 96, 64);
  }

  :global(.quill-wrapper .ql-toolbar.ql-snow .ql-fill) {
    fill: rgb(128, 96, 64);
  }

  :global(.quill-wrapper .ql-container.ql-snow) {
    background-color: white;
  }

  :global(.quill-wrapper .ql-editor) {
    min-height: 200px;
    color: rgb(128, 96, 64);
  }

  :global(.quill-wrapper .ql-editor.ql-blank::before) {
    color: rgb(166, 131, 97);
  }
</style>
