<script lang="ts">
  /*
    A port of drei's Mask component:
		https://github.com/pmndrs/drei/blob/c147c2b1064bc4b457150f995bf714c2e43cf56f/src/core/Mask.tsx#L38
		*/
  import { T } from '@threlte/core'
  import { ReplaceStencilOp, AlwaysStencilFunc, Mesh } from 'three'
  import type { MaskProps, Spread } from './types.js'

  let {
    id = 1,
    colorWrite = false,
    depthWrite = false,
    ref = $bindable(),
    children,
    ...props
  }: MaskProps = $props()

  const mesh = new Mesh()

  const spread: Spread = $derived({
    colorWrite,
    depthWrite,
    stencilFail: ReplaceStencilOp,
    stencilFunc: AlwaysStencilFunc,
    stencilRef: id,
    stencilWrite: true,
    stencilZFail: ReplaceStencilOp,
    stencilZPass: ReplaceStencilOp
  })

  $effect(() => {
    if (Array.isArray(mesh.material)) return
    Object.assign(mesh.material, spread)
  })
</script>

<T
  is={mesh}
  bind:ref
  renderOrder={-id}
  {...props}
>
  {@render children?.({ ref: mesh, getSpread: () => spread })}
</T>
