<script lang="ts">
  import { T } from '@threlte/core'
  import { SheetObject } from '@threlte/theatre'
</script>

<SheetObject
  key="box"
  let:AutoProps
  let:ManualProps
  let:Transform
>
  <T.Mesh>
    <Transform key="positioning" />
    <T.BoxGeometry />
    <T.MeshPhysicalMaterial
      let:ref
      color="red"
    >
      <AutoProps
        {ref}
        transparent
        opacity
        metalness
        roughness
        side
        color
      />
    </T.MeshPhysicalMaterial>
  </T.Mesh>
</SheetObject>
