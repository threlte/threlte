<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { OrbitControls, useDraco, useGltf, useTexture } from '@threlte/extras'
  import { NoToneMapping } from 'three'
  import Mesh from './Mesh.svelte'

  let { settings } = $props()

  const dracoLoader = useDraco()
  const gltf = useGltf('https://infinite-turtles.pages.dev/models/cards-transformed.glb', {
    dracoLoader
  })
  const texture = useTexture('https://infinite-turtles.pages.dev/images/map.png')

  const { renderer } = useThrelte()
  renderer.toneMapping = NoToneMapping
</script>

<T.PerspectiveCamera
  makeDefault
  position={[3, 0, 3]}
  fov={25}
>
  <OrbitControls
    autoRotate
    enableDamping
  />
</T.PerspectiveCamera>

<T.AmbientLight />

{#await gltf then gltf}
  {#await texture then texture}
    <Mesh
      geometry={gltf.nodes.Background.geometry}
      {texture}
      visible={settings.background}
      wireframe={settings.wireframe}
    />
    <Mesh
      geometry={gltf.nodes.Border.geometry}
      {texture}
      visible={settings.border}
      wireframe={settings.wireframe}
    />
    <Mesh
      geometry={gltf.nodes.Turtle.geometry}
      {texture}
      visible={settings.turtle}
      wireframe={settings.wireframe}
    />
    <Mesh
      geometry={gltf.nodes.Player.geometry}
      {texture}
      visible={settings.player}
      wireframe={settings.wireframe}
    />
    <Mesh
      geometry={gltf.nodes.EnemyScorp.geometry}
      {texture}
      visible={settings.enemy}
      wireframe={settings.wireframe}
    />
    <Mesh
      geometry={gltf.nodes.Heart.geometry}
      {texture}
      visible={settings.heart}
      wireframe={settings.wireframe}
    />
    <Mesh
      geometry={gltf.nodes.Potion.geometry}
      {texture}
      visible={settings.potion}
      wireframe={settings.wireframe}
    />
    <Mesh
      geometry={gltf.nodes.RuneEffect.geometry}
      {texture}
      visible={settings.runeEffect}
      wireframe={settings.wireframe}
    />
    <Mesh
      geometry={gltf.nodes.RuneHost.geometry}
      {texture}
      visible={settings.runeHost}
      wireframe={settings.wireframe}
    />
  {/await}
{/await}
