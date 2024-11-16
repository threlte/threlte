<script lang="ts">
  import { isInstanceOf, useParent, useThrelte, useDOM } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { Euler } from 'three'

  // Set to constrain the pitch of the camera
  // Range is 0 to Math.PI radians
  export let minPolarAngle = 0 // radians
  export let maxPolarAngle = Math.PI // radians
  export let pointerSpeed = 1.0
  export let onchange: (() => void) | undefined = undefined
  export let onlock: (() => void) | undefined = undefined
  export let onunlock: (() => void) | undefined = undefined

  let isLocked = false

  const { invalidate } = useThrelte()
  const { dom } = useDOM()

  const camera = useParent()

  if (!isInstanceOf($camera, 'Camera')) {
    throw new Error('Parent missing: <PointerLockControls> need to be a child of a <Camera>')
  }

  const _euler = new Euler(0, 0, 0, 'YXZ')
  const _PI_2 = Math.PI / 2

  const onChange = () => {
    invalidate()
    onchange?.()
  }

  export const lock = () => dom.requestPointerLock()
  export const unlock = () => document.exitPointerLock()

  dom.addEventListener('mousemove', onMouseMove)
  dom.ownerDocument.addEventListener('pointerlockchange', onPointerlockChange)
  dom.ownerDocument.addEventListener('pointerlockerror', onPointerlockError)

  onDestroy(() => {
    dom.removeEventListener('mousemove', onMouseMove)
    dom.ownerDocument.removeEventListener('pointerlockchange', onPointerlockChange)
    dom.ownerDocument.removeEventListener('pointerlockerror', onPointerlockError)
  })

  function onMouseMove(event: MouseEvent) {
    if (!isLocked) return
    if (!$camera) return
    if (!isInstanceOf($camera, 'Camera')) {
      throw new Error('Parent missing: <PointerLockControls> need to be a child of a <Camera>')
    }

    const { movementX, movementY } = event

    _euler.setFromQuaternion($camera.quaternion)

    _euler.y -= movementX * 0.002 * pointerSpeed
    _euler.x -= movementY * 0.002 * pointerSpeed

    _euler.x = Math.max(_PI_2 - maxPolarAngle, Math.min(_PI_2 - minPolarAngle, _euler.x))

    $camera.quaternion.setFromEuler(_euler)

    onChange()
  }

  function onPointerlockChange() {
    if (document.pointerLockElement === dom) {
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
