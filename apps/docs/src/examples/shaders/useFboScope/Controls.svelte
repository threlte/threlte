<script
  lanng="ts"
  context="module"
>
  import { writable } from 'svelte/store'
  import { tweened } from 'svelte/motion'
  export const scoping = writable(false)

  export const zoomedFov = tweened(5, {
    duration: 200
  })

  const requestPointerLockWithUnadjustedMovement = (myTargetElement: HTMLElement) => {
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
</script>

<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'

  import { Quaternion, Vector3 } from 'three'

  const { renderer, camera } = useThrelte()

  let pointerLocked = false

  renderer?.domElement.addEventListener('click', async () => {
    if (!pointerLocked) {
      requestPointerLockWithUnadjustedMovement(renderer?.domElement)
    }
  })

  document.addEventListener(
    'pointerlockchange',
    () => {
      pointerLocked = document.pointerLockElement ? true : false
    },
    false
  )

  // Toggle scope, reset position to 0 when not scoping
  window.addEventListener('keydown', (e) => {
    if (e.key === 's') scoping.set(!$scoping)
    if (e.key === 'a') zoomedFov.set($zoomedFov + 1)
    if (e.key === 'd') zoomedFov.set($zoomedFov - 1)
  })

  // Zoom in and out with mousewheel
  window.addEventListener('wheel', ({ deltaY }) => {
    zoomedFov.set($zoomedFov + deltaY * 0.05)
  })

  const mouseSensitivity = 0.0012

  let phi = 0
  let theta = -0.33

  const handleMouseMove = ({ movementX, movementY }: MouseEvent) => {
    phi += movementX * mouseSensitivity
    theta -= movementY * mouseSensitivity * 1.5
  }

  window.addEventListener('mousemove', handleMouseMove)

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
