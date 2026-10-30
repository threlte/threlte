<script
  lang="ts"
  module
>
  import { Discard, Fn, vec4 } from 'three/tsl'

  // The node graph is constant, so it's built once and shared by every instance.
  const fragmentNode = Fn(() => {
    Discard()
    return vec4(0)
  })()
</script>

<script lang="ts">
  import { T } from '@threlte/core/webgpu'
  import { NodeMaterial } from 'three/webgpu'
  import type { MeshDiscardMaterialWebGPUProps } from '../types.js'

  let { children, ref = $bindable(), ...props }: MeshDiscardMaterialWebGPUProps = $props()

  const material = new NodeMaterial()
</script>

<T
  is={material}
  bind:ref
  {fragmentNode}
  {...props}
>
  {@render children?.({ ref: material })}
</T>
