<script lang="ts">
  let { label = '' }: { label?: string } = $props()

  let count = $state(0)
  const text = $derived(`${label} - ${count}`)
</script>

<button
  onclick={() => {
    count += 1
  }}
>
  {text}
</button>

<style>
  button {
    margin-left: 0.75rem;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    pointer-events: auto;

    background-image: linear-gradient(#5e6cf4 0%, #1338db 100%);
  }
</style>
