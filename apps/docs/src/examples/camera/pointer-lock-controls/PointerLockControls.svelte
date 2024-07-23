<script lang="ts">
  import { onDestroy } from 'svelte'
  import { Euler, Camera, PerspectiveCamera } from 'three'
  import { useThrelte, useParent } from '@threlte/core'

  // Set to constrain the pitch of the camera
  // Range is 0 to Math.PI radians
  export let minPolarAngle = 0 // radians
  export let maxPolarAngle = Math.PI // radians
  export let pointerSpeed = 1.0
  export let onchange: (() => void) | undefined = undefined
  export let onlock: (() => void) | undefined = undefined
  export let onunlock: (() => void) | undefined = undefined

  let isLocked = false

  const { renderer, invalidate } = useThrelte()

  const domElement = renderer.domElement
  const camera = useParent<PerspectiveCamera>()

  const _euler = new Euler(0, 0, 0, 'YXZ')
  const _PI_2 = Math.PI / 2

  const isCamera = (p: any): p is Camera => {
    return p.isCamera
  }

  if (!isCamera($camera)) {
    throw new Error('Parent missing: <PointerLockControls> need to be a child of a <Camera>')
  }

  const onChange = () => {
    invalidate()
    onchange?.()
  }

  export const lock = () => domElement.requestPointerLock()
  export const unlock = () => document.exitPointerLock()

  domElement.addEventListener('mousemove', onMouseMove)
  domElement.ownerDocument.addEventListener('pointerlockchange', onPointerlockChange)
  domElement.ownerDocument.addEventListener('pointerlockerror', onPointerlockError)

  onDestroy(() => {
    domElement.removeEventListener('mousemove', onMouseMove)
    domElement.ownerDocument.removeEventListener('pointerlockchange', onPointerlockChange)
    domElement.ownerDocument.removeEventListener('pointerlockerror', onPointerlockError)
  })

  function onMouseMove(event: MouseEvent) {
    if (!isLocked) return
    if (!$camera) return

    const { movementX, movementY } = event

    _euler.setFromQuaternion($camera.quaternion)

    _euler.y -= movementX * 0.002 * pointerSpeed
    _euler.x -= movementY * 0.002 * pointerSpeed

    _euler.x = Math.max(_PI_2 - maxPolarAngle, Math.min(_PI_2 - minPolarAngle, _euler.x))

    $camera.quaternion.setFromEuler(_euler)

    onChange()
  }

  function onPointerlockChange() {
    if (document.pointerLockElement === domElement) {
      onlock?.()
      isLocked = true
    } else {
      onunlock?.()
      isLocked = false
    }
  }

  function onPointerlockError() {
    console.error('PointerLockControls: Unable to use Pointer Lock API')
  }
</script>
