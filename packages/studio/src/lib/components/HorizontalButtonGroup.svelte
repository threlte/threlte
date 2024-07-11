<script lang="ts">
</script>

<div>
  <slot />
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    gap: 1px;
  }

  div :global(button) {
    border-radius: 0 !important;
  }

  div :global(> *:first-child button) {
    border-top-left-radius: var(--bs-br) !important;
    border-bottom-left-radius: var(--bs-br) !important;
  }

  div :global(> *:last-child button) {
    border-top-right-radius: var(--bs-br) !important;
    border-bottom-right-radius: var(--bs-br) !important;
  }
</style>
