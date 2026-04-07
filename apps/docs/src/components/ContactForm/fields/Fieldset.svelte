<script lang="ts">
  import type { Snippet } from 'svelte'

  interface Props {
    align?: 'left' | 'center' | 'right'
    legend?: string
    nowrap?: boolean
    children?: Snippet
  }

  let { align = 'left', legend = undefined, nowrap = false, children }: Props = $props()
</script>

<fieldset
  class={align}
  class:nowrap
>
  {#if legend}
    <legend>{legend}</legend>
  {/if}
  {@render children?.()}
</fieldset>

<style>
  fieldset {
    display: flex;
    flex-flow: row wrap;
    align-items: stretch;
    gap: 1rem;
    margin: 0;
    padding: 0;
    border: 0;
  }

  .nowrap {
    flex-wrap: nowrap;
  }

  .nowrap :global(*) {
    flex-wrap: nowrap;
  }

  .center {
    justify-content: center;
  }

  .right {
    flex-direction: row-reverse;
  }

  legend {
    font-weight: bold;
    margin: 0.3em 0 0.3em 0;
    padding: 0;
  }

  @media (max-width: 600px) {
    fieldset {
      flex-direction: column;
    }

    fieldset :global(button) {
      width: 100%;
    }
  }
</style>
