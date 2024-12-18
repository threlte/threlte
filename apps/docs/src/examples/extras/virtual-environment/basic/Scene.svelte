<script lang="ts">
  import { injectPlugin, isInstanceOf, T, useTask } from '@threlte/core'
  import {
    Grid,
    interactivity,
    OrbitControls,
    TransformControls,
    VirtualEnvironment
  } from '@threlte/extras'
  import { DoubleSide } from 'three'

  let { debug }: { debug: boolean } = $props()

  interactivity()

  // lookAt plugin from the plugin examples
  injectPlugin<{
    lookAt?: [number, number, number]
  }>('lookAt', (args) => {
    if (!isInstanceOf(args.ref, 'Object3D') || !args.props.lookAt) return
    useTask(
      () => {
        if (!args.props.lookAt) return
        args.ref.lookAt(args.props.lookAt[0], args.props.lookAt[1], args.props.lookAt[2])
      },
      {
        autoInvalidate: false
      }
    )
    return { pluginProps: ['lookAt'] }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
>
  <OrbitControls
    autoRotate={!debug}
    autoRotateSpeed={0.15}
    enableDamping
  />
</T.PerspectiveCamera>

<Grid
  cellColor="white"
  sectionColor="white"
/>

<T.Mesh position.y={1}>
  <T.SphereGeometry />
  <T.MeshStandardMaterial
    color="white"
    roughness={0.15}
  />
</T.Mesh>

{#snippet lightformer(
  color: string,
  shape: 'circle' | 'plane',
  size: number,
  position: [number, number, number],
  visible: boolean
)}
  <T.Group {position}>
    {#snippet children({ ref })}
      {#if visible}
        <TransformControls object={ref} />
      {/if}

      <T.Mesh lookAt={[0, 0, 0]}>
        {#if shape === 'circle'}
          <T.CircleGeometry args={[size / 2]} />
        {:else}
          <T.PlaneGeometry args={[size, size]} />
        {/if}
        <T.MeshBasicMaterial
          {color}
          side={DoubleSide}
        />
      </T.Mesh>
    {/snippet}
  </T.Group>
{/snippet}

<VirtualEnvironment visible={debug}>
  {@render lightformer('#FF4F4F', 'plane', 20, [0, 0, -20], debug)}
  {@render lightformer('#FFD0CB', 'circle', 5, [0, 5, 0], debug)}
  {@render lightformer('#2223FF', 'plane', 8, [-3, 0, 4], debug)}
</VirtualEnvironment>
