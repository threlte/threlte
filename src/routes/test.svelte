<script lang="ts">
  import TestScene from '$examples/TestScene.svelte'
  import ThrelteWrapper from '$examples/ThrelteWrapper.svelte'
</script>

<div>
  <ThrelteWrapper>
    <TestScene />
  </ThrelteWrapper>
</div>

<style>
  div {
    height: 500px;
    width: 60vw;
  }
</style>
