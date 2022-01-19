<script lang="ts">
  import { Mesh, Object3D, Vector3 } from 'three'
  import { createEventDispatcher, tick } from 'svelte'
  import { Frustum, Matrix4 } from 'three'
  import { useFrame } from '../hooks/useFrame'
  import { useThrelte } from '../hooks/useThrelte'
  import type { ViewportAwareObjectProps } from '../types/components'

  export let object: ViewportAwareObjectProps['object']
  export let viewportAware: ViewportAwareObjectProps['viewportAware']

  const dispatch = createEventDispatcher<{
    viewportenter: Object3D
    viewportleave: Object3D
  }>()

  const ctx = useThrelte()

  const frustum = new Frustum()
  const projScreenMatrix = new Matrix4()

  const objectIsMesh = (objOrMesh: Object3D | Mesh): objOrMesh is Mesh => {
    return objOrMesh.type === 'Mesh'
  }

  const v3World = new Vector3()

  const checkInViewport = (): boolean => {
    if (!ctx.camera) return true
    projScreenMatrix.multiplyMatrices(ctx.camera.projectionMatrix, ctx.camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(projScreenMatrix)
    if (objectIsMesh(object)) {
      return frustum.intersectsObject(object)
    } else {
      object.getWorldPosition(v3World)
      return frustum.containsPoint(v3World)
    }
  }

  let ticked = false

  export let inViewport: ViewportAwareObjectProps['inViewport'] = checkInViewport()

  const dispatchEvent = async (isInViewport: boolean) => {
    if (isInViewport) {
      if (!ticked) await tick()
      dispatch('viewportenter', object)
    } else {
      if (!ticked) await tick()
      dispatch('viewportleave', object)
    }
  }

  const { start, stop } = useFrame(() => {
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

  $: if (viewportAware) {
    start()
  } else {
    stop()
  }

  ctx.render('ViewportAwareObject')
</script>
