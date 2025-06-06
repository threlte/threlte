<script
  lang="ts"
  module
>
  import { writable } from 'svelte/store'
  import { tweened } from 'svelte/motion'

  export const baseFov = 60
  export const scoping = writable(false)
  export const zoomedFov = tweened(18, {
    duration: 200
  })
</script>

<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { Quaternion, Vector3 } from 'three'
  import { clamp } from 'three/src/math/MathUtils.js'

  const { dom, camera } = useThrelte()

  // Pointer lock with unadjusted movement: https://github.com/slightlyoff/unadjusted_pointer_lock_explainer
  const requestPointerLock = (myTargetElement: HTMLElement) => {
    //@ts-ignore
    const promise = myTargetElement.requestPointerLock({
      unadjustedMovement: true
    })
    //@ts-ignore
    if (!promise) {
      console.log('disabling mouse acceleration is not supported, locking pointer without it')
      return
    }

    return (
      promise
        //@ts-ignore
        .then()
        //@ts-ignore
        .catch((error) => {
          if (error.name === 'NotSupportedError') {
            return myTargetElement.requestPointerLock()
          }
        })
    )
  }

  let pointerLocked = false

  /*
		Zoom in and out with mousewheel.
		I used a passive listener on the dom element because in the docs we show
		examples as an iframe. Its interaction with locking pointer was causing the page
		to scroll etc.
	*/
  dom.addEventListener(
    'wheel',
    (e) => {
      if (pointerLocked) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        zoomedFov.set(clamp($zoomedFov + e.deltaY * 0.05, 0.5, baseFov * 0.5))
      }
    },
    {
      passive: false
    }
  )

  $: mouseSensitivity = 0.00008 * clamp($zoomedFov * 0.5, 1, 20)

  let phi = 0
  let theta = -0.16

  const qx = new Quaternion()
  const qz = new Quaternion()

  useTask(() => {
    qx.setFromAxisAngle(new Vector3(0, -1, 0), phi)
    qz.setFromAxisAngle(new Vector3(1, 0, 0), theta)

    const cameraQuaternion = new Quaternion()
    cameraQuaternion.multiply(qx)
    cameraQuaternion.multiply(qz)

    $camera.quaternion.copy(cameraQuaternion)
  })

  onDestroy(() => {
    document.exitPointerLock()
  })
</script>

<svelte:document
  on:keydown={(e) => {
    if (e.key === 's') scoping.set(!$scoping)
    if (e.key === 'a') zoomedFov.set(Math.min($zoomedFov + 2, baseFov * 0.5))
    if (e.key === 'd') zoomedFov.set(Math.max(0.5, $zoomedFov - 2))
  }}
  on:pointerlockchange={() => {
    pointerLocked = document.pointerLockElement ? true : false
  }}
  on:click={async () => {
    if (!pointerLocked) {
      requestPointerLock(dom)
    }
  }}
  on:mousemove={({ movementX, movementY }) => {
    if (!pointerLocked) return
    phi += movementX * mouseSensitivity
    theta -= movementY * mouseSensitivity * 1.5
  }}
/>
