<script lang="ts">
  import { T } from '@threlte/core'
  import { SheetObject } from '@threlte/theatre'
</script>

<T.DirectionalLight position={[1, 1, 0]} />

<SheetObject
  key="box"
  let:AutoProps
  let:Transform
>
  <Transform
    key="helo"
    label="Hello"
  >
    <T.Mesh>
      <T.BoxGeometry />
      <T.MeshPhysicalMaterial
        let:ref
        color="red"
      >
        <AutoProps
          {ref}
          roughness
          metalness
          clearcoat
          opacity
          transparent
        />
      </T.MeshPhysicalMaterial>
    </T.Mesh>
  </Transform>
</SheetObject>
