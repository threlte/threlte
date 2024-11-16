<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { View } from '@threlte/extras'
  import Scene from './Scene.svelte'
  const things: { dom: HTMLElement }[] = [{ dom: undefined }]
</script>

<div>
  {#each things as thing}
    <div
      bind:this={thing.dom}
      id="view"
    ></div>
  {/each}
  <Canvas>
    <Scene />
    {#each things as thing}
      <View dom={thing.dom}>
        <Scene />
      </View>
    {/each}
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
  div#view {
    position: absolute;
    width: 300px;
    height: 300px;
  }
</style>
