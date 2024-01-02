<script lang="ts">
  import { T } from '@threlte/core'
  import { SheetObject } from '@threlte/theatre'
  import KeyboardControls from './KeyboardControls.svelte'
  import { cubeGeometry } from './state'

  export let key: string
</script>

<SheetObject
  {key}
  let:Transform
  let:Sync
>
  <KeyboardControls let:transform>
    <Transform {...transform}>
      <T.Mesh frustumCulled={false}>
        <T
          is={$cubeGeometry}
          dispose={false}
        />
        <T.MeshStandardMaterial
          transparent
          roughness={0.418}
          metalness={0.6139}
          envMapIntensity={10}
        >
          <Sync
            color
            opacity
            emissive
            roughness
            metalness
            envMapIntensity
          />
        </T.MeshStandardMaterial>
      </T.Mesh>
    </Transform>
  </KeyboardControls>
</SheetObject>
