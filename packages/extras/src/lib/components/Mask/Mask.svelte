<script lang="ts">
  /*
    A port of drei's Mask component:
		https://github.com/pmndrs/drei/blob/c147c2b1064bc4b457150f995bf714c2e43cf56f/src/core/Mask.tsx#L38
		*/
  import { T } from '@threlte/core'
  import { ReplaceStencilOp, AlwaysStencilFunc, Mesh } from 'three'
  import type { MaskProps } from './types.js'

  let {
    id = 1,
    colorWrite = false,
    depthWrite = false,
    ref = $bindable(),
    children,
    ...props
  }: MaskProps = $props()

  const mesh = new Mesh()

  $effect(() => {
    const { material } = mesh

    if (Array.isArray(material)) return

    material.colorWrite = colorWrite
    material.depthWrite = depthWrite
    material.stencilWrite = true
    material.stencilRef = id
    material.stencilFunc = AlwaysStencilFunc
    material.stencilFail = ReplaceStencilOp
    material.stencilZFail = ReplaceStencilOp
    material.stencilZPass = ReplaceStencilOp
  })
</script>

<T
  is={mesh}
  bind:ref
  renderOrder={-id}
  {...props}
>
  {@render children?.({ ref: mesh })}
</T>
