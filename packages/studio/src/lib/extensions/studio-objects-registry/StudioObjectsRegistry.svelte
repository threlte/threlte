<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity'
  import { useStudio } from '../../internal/extensions'
  import {
    studioObjectsRegistryScope,
    type StudioObjectsRegistryActions,
    type StudioObjectsRegistryState
  } from './types'
  import type { Snippet } from 'svelte'

  let {
    children
  }: {
    children?: Snippet
  } = $props()

  const { createExtension } = useStudio()

  createExtension<StudioObjectsRegistryState, StudioObjectsRegistryActions>({
    scope: studioObjectsRegistryScope,
    state() {
      return {
        objects: new SvelteSet()
      }
    },
    actions: {
      addObject({ state }, object) {
        state.objects.add(object)
      },
      removeObject({ state }, object) {
        state.objects.delete(object)
      }
    }
  })
</script>

{@render children?.()}
