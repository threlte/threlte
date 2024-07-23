<script lang="ts">
  import { useParent, watch } from '@threlte/core'
  import { usePortalContext } from '../usePortalContext'
  import { Object3D } from 'three'

  interface Props {
    id?: string
  }

  let { id = 'default' }: Props = $props()

  const parent = useParent<Object3D>()

  if (!$parent) {
    throw new Error('<PortalTarget> must be used within a <Canvas> component.')
  }

  const { addPortal, removePortal } = usePortalContext()

  watch(parent, (parent) => {
    if (!parent) return
    addPortal(parent, id)
    return () => {
      removePortal(id)
    }
  })
</script>
