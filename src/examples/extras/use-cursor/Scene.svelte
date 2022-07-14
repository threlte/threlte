<script lang="ts">
  import { writable } from 'svelte/store'
  import { BoxBufferGeometry, Color, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import {
    AmbientLight,
    DirectionalLight,
    Mesh,
    OrthographicCamera,
    Text,
    useThrelte
  } from 'threlte'
  import { useCursor } from 'threlte/extras'

  const material = new MeshStandardMaterial({
    color: 0xc62004
  })

  const { hovering, onPointerEnter, onPointerLeave } = useCursor()

  $: if ($hovering) {
    material.color = new Color(0xdddddd)
  } else {
    material.color = new Color(0xc62004)
  }

  writable

  const { size } = useThrelte()

  let zoom = $size.width / 7
  $: zoom = $size.width / 7
</script>

<OrthographicCamera {zoom} position={{ x: 5, y: 5, z: 5 }} lookAt={{}} />

<DirectionalLight position={{ y: 10, x: 5 }} />
<AmbientLight intensity={0.2} />

<Text
  text="HOVER"
  interactive
  on:pointerenter={onPointerEnter}
  on:pointerleave={onPointerLeave}
  fontSize={0.5}
  anchorY="100%"
  anchorX="50%"
  rotation={{ y: 90 * DEG2RAD }}
  position={{ y: 1, x: -1 }}
  {material}
/>

<Mesh
  interactive
  on:pointerenter={onPointerEnter}
  on:pointerleave={onPointerLeave}
  geometry={new BoxBufferGeometry(2, 2, 2)}
  {material}
/>
