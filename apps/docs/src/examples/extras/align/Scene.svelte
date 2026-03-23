<script lang="ts">
  import { T } from '@threlte/core'
  import { Align, OrbitControls, RoundedBoxGeometry, TransformControls } from '@threlte/extras'
  import { Box3, type Vector3 } from 'three'

  interface Props {
    x?: number
    y?: number
    z?: number
    precise?: boolean
    showSphere?: boolean
    autoAlign?: boolean
  }

  let {
    x = 0,
    y = 0,
    z = 0,
    precise = false,
    showSphere = false,
    autoAlign = false
  }: Props = $props()

  let box = new Box3()
  let center = $state<Vector3>()
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={10}
>
  <OrbitControls />
</T.PerspectiveCamera>

<!-- The property autoAlign is not reactive, therefore we need to key it here. -->
{#key autoAlign}
  <Align
    {x}
    {y}
    {z}
    {precise}
    auto={autoAlign}
    onalign={({ boundingBox, center: newCenter }) => {
      box.copy(boundingBox)
      center = newCenter
    }}
  >
    {#snippet children({ align })}
      <TransformControls onobjectChange={align}>
        <T.Mesh>
          <RoundedBoxGeometry args={[1, 2, 1]} />
          <T.MeshStandardMaterial color="white" />
        </T.Mesh>
      </TransformControls>

      <T.Mesh
        position.x={-4}
        position.y={1}
      >
        <RoundedBoxGeometry args={[1, 2, 3]} />
        <T.MeshStandardMaterial color="white" />
      </T.Mesh>

      {#if showSphere}
        <T.Mesh
          position.x={-2}
          position.y={3}
        >
          <T.SphereGeometry />
          <T.MeshStandardMaterial color="white" />
        </T.Mesh>
      {/if}
    {/snippet}
  </Align>
{/key}

{#if box && center}
  <T.Group
    position.x={center.x}
    position.y={center.y}
    position.z={center.z}
  >
    <T.Box3Helper
      args={[box, 'white']}
      oncreate={() => {
        console.log('CREATE!')
      }}
    />
  </T.Group>
{/if}

<T.DirectionalLight position={[3, 10, 5]} />
<T.AmbientLight intensity={0.1} />

<T.AxesHelper />
