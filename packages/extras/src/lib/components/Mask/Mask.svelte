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

  type Props = Required<MaskProps>

  export let id: Props['id'] = 1
  export let colorWrite: Props['colorWrite'] = false
  export let depthWrite: Props['depthWrite'] = false

  export let ref: Mesh = new Mesh()

  const meshLoaded = (mesh: Mesh) => {
    if (!mesh) return
    const material = mesh.material
    if (Array.isArray(material)) return
    material.colorWrite = colorWrite
    material.depthWrite = depthWrite
    material.stencilWrite = true
    material.stencilRef = id
    material.stencilFunc = AlwaysStencilFunc
    material.stencilFail = ReplaceStencilOp
    material.stencilZFail = ReplaceStencilOp
    material.stencilZPass = ReplaceStencilOp
  }

  $: meshLoaded(ref)

  $: {
    meshLoaded(ref)
    id
  }
</script>

<T.Mesh
  {...$$restProps}
  renderOrder={-id}
  bind:ref
>
  <slot {ref} />
</T.Mesh>
