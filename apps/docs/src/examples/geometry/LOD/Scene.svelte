<script>
  import { T, useThrelte } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'

  let controls
  export const reset = () => controls.reset()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 25]}
  lookAt.y={0}
>
  <OrbitControls
    enableZoom={true}
    bind:ref={controls}
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 10]} />
<T.HemisphereLight intensity={0.2} />

<T.LOD>
  {#snippet children({ ref: lod })}
    {#each ['red', 'green', 'blue'] as color, i}
      <T.Group
        oncreate={({ ref }) => {
          lod.addLevel(ref, i * 75)
        }}
      >
        <T.Mesh>
          <T.IcosahedronGeometry args={[10, 3 - i]} />
          <T.MeshStandardMaterial
            {color}
            wireframe
          />
        </T.Mesh>
        <T.Mesh>
          <T.IcosahedronGeometry args={[10, 3 - i]} />
          <T.MeshStandardMaterial
            {color}
            transparent
            opacity={0.3}
          />
        </T.Mesh>
      </T.Group>
    {/each}
  {/snippet}
</T.LOD>
