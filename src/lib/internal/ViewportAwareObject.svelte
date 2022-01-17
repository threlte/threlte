<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte'
  import type { Object3D } from 'three'
  import { Frustum, Matrix4 } from 'three'
  import { useFrame } from '../hooks/useFrame'
  import { useThrelte } from '../hooks/useThrelte'

  export let object: Object3D

  const dispatch = createEventDispatcher<{
    viewportenter: Object3D
    viewportleave: Object3D
  }>()

  const frustum = new Frustum()
  const projScreenMatrix = new Matrix4()

  const ctx = useThrelte()

  const checkInViewport = (): boolean => {
    if (!ctx.camera) return true
    projScreenMatrix.multiplyMatrices(ctx.camera.projectionMatrix, ctx.camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(projScreenMatrix)
    return frustum.intersectsObject(object)
  }

  let ticked = false

  export let inViewport: boolean = checkInViewport()

  const dispatchEvent = async (isInViewport: boolean) => {
    if (isInViewport) {
      if (!ticked) await tick()
      dispatch('viewportenter', object)
    } else {
      if (!ticked) await tick()
      dispatch('viewportleave', object)
    }
  }

  ctx.render('ViewportAwareObject')

  useFrame(() => {
    const v = checkInViewport()
    if (inViewport === undefined) {
      inViewport = checkInViewport()
      dispatchEvent(inViewport)
    } else if (v !== inViewport) {
      dispatchEvent(v)
      inViewport = v
    }
  })

  const init = async () => {
    await tick()
    ticked = true
  }

  init()
</script>
