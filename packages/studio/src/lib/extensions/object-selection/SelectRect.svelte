<script lang="ts">
  import { useCanvas, useThrelte, watch } from '@threlte/core'
  import { onMount } from 'svelte'
  import { Object3D } from 'three'
  import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js'
  import { SelectionHelper } from 'three/examples/jsm/interactive/SelectionHelper.js'
  import { useStudio } from '../../internal/extensions'
  import { useStudioObjectsRegistry } from '../studio-objects-registry/useStudioObjectsRegistry.svelte'
  import { useTransformControls } from '../transform-controls/useTransformControls'
  import {
    objectSelectionScope,
    type ObjectSelectionActions,
    type ObjectSelectionState
  } from './types'
  import { useObjectSelection } from './useObjectSelection.svelte'

  const { camera, scene, renderer } = useThrelte()
  const { wrapper } = useCanvas()

  const { useExtension } = useStudio()
  const { addToSelection, removeFromSelection, selectObjects } = useObjectSelection()
  const transformControls = useTransformControls()

  const { setInUse } = useExtension<ObjectSelectionState, ObjectSelectionActions>(
    objectSelectionScope
  )

  let selectionBox = new SelectionBox(camera.current, scene)
  let selectionHelper = new SelectionHelper(renderer, 'selectBox')

  const studioObjectsRegistry = useStudioObjectsRegistry()

  watch(camera, (camera) => {
    selectionBox.camera = camera
  })

  const filter = (objects: Object3D[]): Object3D[] => {
    let objs = objects.filter((object) => {
      return !studioObjectsRegistry.objects.has(object)
    })
    return objs
  }

  let selectionMode: 'select' | 'remove' | 'add' = 'select'
  let lastEvent: MouseEvent

  const onPointerDown = (event: MouseEvent) => {
    if (transformControls.inUse) {
      // if transform controls are in use, we don't want to select objects and
      // cancel the selection.
      selectionHelper.isDown = false
      setInUse(false)
      return
    }
    if (event.shiftKey) {
      event.preventDefault()
      selectionMode = 'add'
    } else if (event.ctrlKey || event.metaKey) {
      event.preventDefault()
      selectionMode = 'remove'
    } else {
      selectionMode = 'select'
    }
    selectionBox.startPoint.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
      0.5
    )
    setInUse(true)
    lastEvent = event
  }

  const onPointerMove = (event: MouseEvent) => {
    if (transformControls.inUse) {
      // if transform controls are in use, we don't want to select objects and
      // cancel the selection.
      selectionHelper.isDown = false
      setInUse(false)
      return
    }
    if (!selectionHelper.isDown) return
    selectionBox.endPoint.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
      0.5
    )
    const allSelected = filter(selectionBox.select())
    if (selectionMode === 'add') {
      addToSelection(allSelected)
    } else if (selectionMode === 'remove') {
      removeFromSelection(allSelected)
    } else {
      selectObjects(allSelected)
    }
    lastEvent = event
  }

  const onPointerUp = (event: MouseEvent) => {
    if (transformControls.inUse) {
      // if transform controls are in use, we don't want to select objects and
      // cancel the selection.
      selectionHelper.isDown = false
      setInUse(false)
      return
    }
    if (!selectionHelper.isDown) return
    selectionBox.endPoint.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
      0.5
    )
    const allSelected = filter(selectionBox.select())
    if (selectionMode === 'add') {
      addToSelection(allSelected)
    } else if (selectionMode === 'remove') {
      removeFromSelection(allSelected)
    } else {
      selectObjects(allSelected)
    }
    setInUse(false)
  }

  onMount(() => {
    wrapper.addEventListener('pointerdown', onPointerDown)
    wrapper.addEventListener('pointermove', onPointerMove)
    wrapper.addEventListener('pointerup', onPointerUp)
    wrapper.style.cursor = 'crosshair'
    return () => {
      if (lastEvent) onPointerUp(lastEvent)
      wrapper.removeEventListener('pointerdown', onPointerDown)
      wrapper.removeEventListener('pointermove', onPointerMove)
      wrapper.removeEventListener('pointerup', onPointerUp)
      try {
        // this sometimes throws an error, but we fail silently
        const h = selectionHelper as any
        if (h.element && h.element.parentElement) h.onSelectOver()
      } catch (error) {
        console.warn(error)
      }
      selectionHelper.dispose()
      wrapper.style.cursor = 'auto'
    }
  })
</script>

<style>
  :global(.selectBox) {
    border: 1px solid #3662e3;
    background-color: #3661e339;
    position: fixed;
  }
</style>
