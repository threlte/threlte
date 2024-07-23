<script lang="ts">
  import { T } from '@threlte/core'
  import { RoundedBoxGeometry, interactivity, useCursor } from '@threlte/extras'
  import { SheetObject } from '@threlte/theatre'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  interactivity()

  const { onPointerEnter, onPointerLeave } = useCursor()
</script>

<SheetObject key="Directional Light">
  {#snippet children({ Sync, Transform })}
    <Transform>
      <T.DirectionalLight castShadow>
        <Sync
          intensity
          color
        />
      </T.DirectionalLight>
    </Transform>
  {/snippet}
</SheetObject>

<SheetObject key="Ambient Light">
  {#snippet children({ Sync })}
    <T.AmbientLight>
      <Sync
        intensity
        color
      />
    </T.AmbientLight>
  {/snippet}
</SheetObject>

<T.PerspectiveCamera
  makeDefault
  position={[5, 5, 5]}
  oncreate={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<SheetObject key="Box">
  {#snippet children({ Sync, Transform, select, deselect })}
    <Transform>
      <T.Mesh
        castShadow
        onclick={select}
        onpointerenter={onPointerEnter}
        onpointerleave={onPointerLeave}
        onpointermissed={deselect}
      >
        <RoundedBoxGeometry radius={0.1} />
        <T.MeshStandardMaterial transparent>
          {#snippet children({ ref })}
            <Sync
              type={ref}
              color
              roughness
              metalness
              side
              opacity
            />
          {/snippet}
        </T.MeshStandardMaterial>
      </T.Mesh>
    </Transform>
  {/snippet}
</SheetObject>

<T.Mesh
  receiveShadow
  position.y={-1}
  rotation.x={-90 * DEG2RAD}
>
  <T.CircleGeometry args={[1.4, 48]} />
  <T.MeshStandardMaterial />
</T.Mesh>
