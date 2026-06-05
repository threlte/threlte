<script>
  import App from './example/App.svelte'
</script>

<div>
  <App />
</div>

<style>
  :global(body, html) {
    margin: 0;
  }

  div {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #0e1625;
  }
</style>
