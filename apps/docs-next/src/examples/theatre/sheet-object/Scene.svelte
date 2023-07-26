<script lang="ts">
  import { T } from '@threlte/core'
  import { RoundedBoxGeometry, interactivity, useCursor } from '@threlte/extras'
  import { SheetObject } from '@threlte/theatre'
  import { DEG2RAD } from 'three/src/math/MathUtils'

  interactivity()

  const { onPointerEnter, onPointerLeave } = useCursor()
</script>

<SheetObject
  key="Directional Light"
  let:Sync
  let:Transform
>
  <Transform>
    <T.DirectionalLight castShadow>
      <Sync
        intensity
        color
      />
    </T.DirectionalLight>
  </Transform>
</SheetObject>

<SheetObject
  key="Ambient Light"
  let:Sync
>
  <T.AmbientLight>
    <Sync
      intensity
      color
    />
  </T.AmbientLight>
</SheetObject>

<T.PerspectiveCamera
  makeDefault
  position={[5, 5, 5]}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<SheetObject
  key="Box"
  let:Sync
  let:Transform
  let:select
  let:deselect
>
  <Transform>
    <T.Mesh
      castShadow
      on:click={select}
      on:pointerenter={onPointerEnter}
      on:pointerleave={onPointerLeave}
      on:pointermissed={deselect}
    >
      <RoundedBoxGeometry radius={0.1} />
      <T.MeshStandardMaterial
        let:ref
        transparent
      >
        <Sync
          type={ref}
          color
          roughness
          metalness
          side
          opacity
        />
      </T.MeshStandardMaterial>
    </T.Mesh>
  </Transform>
</SheetObject>

<T.Mesh
  receiveShadow
  position.y={-1}
  rotation.x={-90 * DEG2RAD}
>
  <T.CircleGeometry args={[1.4, 48]} />
  <T.MeshStandardMaterial />
</T.Mesh>
