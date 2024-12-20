<script lang="ts">
  import {
    currentWritable,
    useThrelte,
    createCameraContext,
    createSceneContext,
    createParentContext,
    createParentObject3DContext,
    createDOMContext,
    type ThrelteContext
  } from '@threlte/core'
  import { setContext } from 'svelte'
  import type { ViewProps } from './types'
  import InnerView from './InnerView.svelte'

  let { dom, children }: ViewProps = $props()
  let isOffscreen = $state(false)

  const parentContext = useThrelte()
  const { camera } = createCameraContext()
  const { scene } = createSceneContext()
  // @ts-ignore
  createDOMContext({ dom, canvas: parentContext.canvas })
  createParentContext(scene)
  createParentObject3DContext(scene)
  // we also want to make a new context for the user context
  const userCtx = currentWritable({})
  setContext('threlte-user-context', userCtx)

  const viewContextOverrides = {
    scene: scene,
    camera: camera
  }

  const viewContext: ThrelteContext = {
    ...parentContext,
    size: currentWritable(new DOMRect()),
    scene: viewContextOverrides.scene,
    camera: viewContextOverrides.camera
  }

  // Only render the view scene if it has children, otherwise render the default scene.
  if (!viewContextOverrides.scene.children.length) {
    viewContext.scene = parentContext.scene
    viewContext.camera = parentContext.camera
  }

  setContext<ThrelteContext>('threlte', viewContext)

  $effect(() => {
    if (dom) {
      // If we don't recreate the context then we the resizeObserver has no target
      createDOMContext({ dom, canvas: parentContext.canvas })
      // We'll add a intersection observer so the innerView doesn't waste effort rendering things offscreen
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          isOffscreen = !entry.isIntersecting
        }
      })

      observer.observe(dom)

      return () => {
        observer.disconnect()
      }
    }
  })
</script>

{#if dom}
  <InnerView {isOffscreen}>
    {@render children?.()}
  </InnerView>
{/if}
