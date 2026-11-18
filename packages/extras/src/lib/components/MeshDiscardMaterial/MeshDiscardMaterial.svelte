<script lang="ts">
  import type { MeshDiscardMaterialProps } from './types.js'
  import { fragmentShader } from './fragment.js'
  import { vertexShader } from './vertex.js'
  import { T } from '@threlte/core'
  import { ShaderMaterial } from 'three'

  let { children, ref = $bindable(), ...props }: MeshDiscardMaterialProps = $props()

  const material = new ShaderMaterial({ fragmentShader, vertexShader })
</script>

<T
  is={material}
  bind:ref
  {...props}
>
  {@render children?.({ ref: material })}
</T>
