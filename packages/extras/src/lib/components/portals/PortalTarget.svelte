<script lang="ts">
  import { isInstanceOf, useParent, watch } from '@threlte/core'
  import { usePortalContext } from './usePortalContext.svelte'

  interface Props {
    id?: string
  }

  let { id = 'default' }: Props = $props()

  const parent = useParent()

  if (!$parent) {
    throw new Error('<PortalTarget> must be used within a <Canvas> component.')
  }

  const { addPortal, removePortal } = usePortalContext()

  watch(parent, (parent) => {
    if (!parent || !isInstanceOf(parent, 'Object3D')) return
    addPortal(parent, id)
    return () => {
      removePortal(id)
    }
  })
</script>
