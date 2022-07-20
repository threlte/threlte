<script context="module" lang="ts">
  import { getContext, setContext } from 'svelte'
  import { useFrameHandler } from '../../hooks/useFrameHandler'
  import { createRapierContext } from '../../lib/createRapierContext'
  import type { RapierContext } from '../../types/types'
</script>

<script lang="ts">
  import type { Position } from '@threlte/core'

  export let gravity: Position

  const rapierContext = createRapierContext(gravity)

  setContext<RapierContext>('threlte-rapier-context', rapierContext)

  useFrameHandler(rapierContext)
</script>

<slot />
