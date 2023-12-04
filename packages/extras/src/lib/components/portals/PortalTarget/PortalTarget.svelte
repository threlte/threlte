<script lang="ts">
  import { useParent, watch } from '@threlte/core'
  import { usePortalContext } from '../usePortalContext'

  const parent = useParent()

  if (!$parent) {
    throw new Error('<PortalTarget> must be used within a <Canvas> component.')
  }

  export let id = 'default'

  const { addPortal, removePortal } = usePortalContext()

  watch(parent, (parent) => {
    if (!parent) return
    addPortal(parent, id)
    return () => {
      removePortal(id)
    }
  })
</script>
