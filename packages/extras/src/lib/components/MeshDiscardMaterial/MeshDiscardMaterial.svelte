<script lang="ts">
  import type { MeshDiscardMaterialProps } from './types'
  import { fragmentShader } from './fragment'
  import { vertexShader } from './vertex'
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
