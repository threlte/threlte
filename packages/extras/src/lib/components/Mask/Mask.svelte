<script lang="ts">
  /*
    A port of drei's Mask component:
		https://github.com/pmndrs/drei/blob/c147c2b1064bc4b457150f995bf714c2e43cf56f/src/core/Mask.tsx#L38
		*/
  import { T } from '@threlte/core'
  import { ReplaceStencilOp, AlwaysStencilFunc, Mesh } from 'three'
  import type { MaskEvents, MaskProps, MaskSlots } from './Mask'

  type $$Props = MaskProps
  type $$Events = MaskEvents
  type $$Slots = MaskSlots

  let {
    id = 1,
    colorWrite = false,
    depthWrite = false,
    ref = $bindable(),
    ...props
  }: MaskProps & { ref: Mesh } = $props()

  ref = new Mesh()

  $effect(() => {
    const material = ref.material

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
  is={ref}
  renderOrder={-id}
  {...props}
>
  <slot {ref} />
</T>
