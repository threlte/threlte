<script lang="ts">
  import type { DiscardMaterialProps } from './DiscardMaterial.svelte'
  import { fragmentShader } from './fragment'
  import { vertexShader } from './vertex'
  import { T } from '@threlte/core'

  let { children, ref = $bindable(), ...props }: DiscardMaterialProps = $props()
</script>

<T.ShaderMaterial
  bind:ref
  {fragmentShader}
  {vertexShader}
  {...props}
>
  {@render children(ref)}
</T.ShaderMaterial>
