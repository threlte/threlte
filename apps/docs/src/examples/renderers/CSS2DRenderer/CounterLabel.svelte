<script>
  // A normal html svelte component, no relation the Threlte
  export let label = ''
  let count = 0

  function click() { count++ }
</script>

<button on:click={click}>
	{label} - {count}
</button>

<style>
  button {
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
    pointer-events: auto;

    background-image: linear-gradient(
      hsl(240deg 100% 20%) 0%,
      hsl(328deg 50% 50%) 100%
    );
  }
</style>
