<script lang="ts">
  export let align: 'left' | 'center' | 'right' = 'left'
  export let legend: string | undefined = undefined
  export let nowrap: boolean = false
</script>

<fieldset
  class={align}
  class:nowrap
>
  {#if legend}
    <legend>{legend}</legend>
  {/if}
  <slot />
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

  .left {
    /* default works - nothing needed */
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
