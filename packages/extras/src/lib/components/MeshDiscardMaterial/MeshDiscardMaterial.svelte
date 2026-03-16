<script lang="ts">
  import type { MeshDiscardMaterialProps } from './types.js'
  import { fragmentShader } from './fragment.js'
  import { vertexShader } from './vertex.js'
  import { T } from '@threlte/core'

  let { children, ref = $bindable(), ...props }: MeshDiscardMaterialProps = $props()
</script>

<T.ShaderMaterial
  bind:ref
  {fragmentShader}
  {vertexShader}
  {...props}
>
  {@render children?.(ref)}
</T.ShaderMaterial>
