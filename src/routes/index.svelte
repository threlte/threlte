<script lang="ts">
  import GLTF from '$lib/objects/GLTF.svelte'
  import {
    CircleBufferGeometry,
    MeshStandardMaterial,
    SphereBufferGeometry,
    Mesh as ThreeMesh
  } from 'three'
  import { Canvas, DirectionalLight, HemisphereLight, Mesh } from 'threlte'
  import OrthographicCamera from '../lib/cameras/OrthographicCamera.svelte'
  import { useRaf } from '../lib/hooks/useRaf'
  import Group from '../lib/objects/Group.svelte'

  let url = 'models/flower.glb'

  let spherePosX = 0
  let showSphere = true
  let shadow = true

  let sphere: ThreeMesh | undefined

  useRaf(() => {
    spherePosX = Math.sin(Date.now() / 1000) * 5
  })

  setTimeout(() => {
    showSphere = false
    shadow = false
  }, 0.5e3)
</script>

<div>
  <Canvas size={{ width: 600, height: 600 }}>
    <OrthographicCamera
      position={{ z: 50, x: 50, y: 50 }}
      lookAt={{ x: 0, y: 0, z: 0 }}
      zoom={100}
    />

    <DirectionalLight
      {shadow}
      color={'#EDBD9C'}
      position={{ y: 4.5 }}
      target={showSphere ? sphere : { z: spherePosX }}
    />

    <HemisphereLight skyColor={0x4c8eac} groundColor={0xac844c} intensity={0.9} />

    <Group>
      {#if showSphere}
        <Mesh
          receiveShadow
          castShadow
          bind:mesh={sphere}
          position={{ x: spherePosX }}
          geometry={new SphereBufferGeometry(1, 40, 40)}
          material={new MeshStandardMaterial({ color: '#dddddd' })}
        />
      {/if}

      <Mesh
        receiveShadow
        castShadow
        geometry={new SphereBufferGeometry(1, 40, 40)}
        material={new MeshStandardMaterial({ color: '#dddddd' })}
      />

      <Mesh
        receiveShadow
        position={{ y: -1.5 }}
        rotation={{ x: -90 * (Math.PI / 180) }}
        geometry={new CircleBufferGeometry(3, 72)}
        material={new MeshStandardMaterial({ color: 'white' })}
      />

      <GLTF castShadow receiveShadow {url} position={{ y: 1 }} scale={3} />
    </Group>
  </Canvas>
</div>

<style>
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
