<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { View } from '@threlte/extras'
  import Scene from './Scene.svelte'
  import * as THREE from 'three'
  import type { itemType } from './types'

  const items: itemType[] = []
  const geometries = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(0.5, 12, 8),
    new THREE.DodecahedronGeometry(0.5),
    new THREE.CylinderGeometry(0.5, 0.5, 1, 12)
  ]
  for (let i = 0; i < 40; i++) {
    // add one random mesh to each scene
    const geometry = geometries[(geometries.length * Math.random()) | 0]!

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(Math.random(), 1, 0.75, THREE.SRGBColorSpace),
      roughness: 0.5,
      metalness: 0,
      flatShading: true
    })
    items.push({ dom: undefined, geometry, material })
  }
</script>

<div
  id="container"
  class="bg-white"
>
  <div
    id="content"
    class="z-1 relative h-full overflow-y-scroll"
  >
    {#each items as item, i}
      <div
        id="item"
        class="m-4 inline-block p-4 shadow-md"
      >
        <div
          bind:this={item.dom}
          class="h-[200px] w-[200px]"
        ></div>
        <div class="mt-2 text-[#888]">Scene {i + 1}</div>
      </div>
    {/each}
  </div>
  <div
    id="canvas"
    class="absolute top-0 h-full"
  >
    <Canvas>
      {#each items as item}
        <View dom={item.dom}>
          <Scene {...item} />
        </View>
      {/each}
    </Canvas>
  </div>
</div>

<style>
  div#container {
    height: 100%;
    background: white;
  }
  div#content {
    position: relative;
    z-index: 1;
    height: 100%;
    overflow-y: scroll;
  }
  div#item {
    margin: 1rem;
    display: inline-block;
    padding: 1rem;
    box-shadow:
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.1) 0px 2px 4px -2px;
  }
  div#item > div:first-child {
    height: 200px;
    width: 200px;
  }
  div#item > div:last-child {
    margin-top: 0.5rem;
    color: #888;
  }
</style>
