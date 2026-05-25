<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { OrbitControls, View } from '@threlte/extras'
  import { Color } from 'three'

  let { minimap } = $props()

  const { scene } = useThrelte()
  scene.background = new Color('white')
</script>

<T.HemisphereLight args={[0xaaaaaa, 0x444444, 3]} />

<T.DirectionalLight
  args={[0xffffff, 1.5]}
  position={[2, 4, 2]}
/>

{#each [0xff7eb6, 0x82cfff, 0xa7f0ba] as color, index (color)}
  <T.Mesh position.x={(index - 1) * 1.2}>
    <T.BoxGeometry args={[0.6, 0.6, 0.6]} />
    <T.MeshStandardMaterial
      {color}
      flatShading
    />
  </T.Mesh>
{/each}

<View
  dom={minimap}
  {scene}
>
  <OrbitControls autoRotate />
</View>
