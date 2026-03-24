<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    label: string
    id?: string
    required?: boolean
    children?: Snippet
  }

  let {
    label,
    id = label.toLowerCase().replace(' ', '-'),
    required = false,
    children
  }: Props = $props()
</script>

<div>
  <label for={id}>
    {label}
    {#if required}
      <span>*</span>
    {/if}
  </label>
  {@render children?.()}
</div>

<style>
  div {
    background-color: white;
    opacity: 0.85;
    flex-grow: 1;
    display: flex;
    flex-flow: column nowrap;
    gap: 0.5em;
    padding: 0.5em;
    border-radius: 0.5rem;
  }
  div:focus-within {
    outline: 2px solid #fe3d00;
  }

  div :global(*) {
    color: #222;
  }
  div :global(input) {
    background-color: transparent;
    border: none;
    width: 100%;
    line-height: 30px;
  }
  div :global(textarea) {
    background-color: transparent;
    border: none;
  }
  div :global(*:focus-within) {
    border: none;
    outline-style: none;
  }

  span {
    color: var(--highlight-color, var(--hex-primary));
  }

  label {
    font-size: smaller;
  }
</style>
