<script lang="ts">
  import { injectPlugin, isInstanceOf, T, useTask } from '@threlte/core'
  import {
    Environment,
    Grid,
    interactivity,
    OrbitControls,
    TransformControls,
    VirtualEnvironment
  } from '@threlte/extras'
  import { DoubleSide } from 'three'

  let { debug, mixEnvironment }: { debug: boolean; mixEnvironment: boolean } = $props()

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

<T.Mesh position.y={2}>
  <T.TorusGeometry />
  <T.MeshStandardMaterial
    color="white"
    roughness={0.4}
    metalness={1}
  />
</T.Mesh>

{#snippet lightformer(
  color: string,
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
        <T.CircleGeometry args={[size / 2]} />
        <T.MeshBasicMaterial
          {color}
          side={DoubleSide}
        />
      </T.Mesh>
    {/snippet}
  </T.Group>
{/snippet}

<VirtualEnvironment visible={debug}>
  {#if mixEnvironment}
    <Environment
      url="/textures/equirectangular/hdr/mpumalanga_veld_puresky_1k.hdr"
      isBackground
    />
  {/if}

  {@render lightformer('#FF4F4F', 20, [0, 0, -20], debug)}
  {@render lightformer('#2223FF', 8, [-3, 0, 4], debug)}
</VirtualEnvironment>
