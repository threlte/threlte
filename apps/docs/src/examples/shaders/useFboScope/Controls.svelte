<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { Quaternion, Vector3 } from 'three'
  import { clamp } from 'three/src/math/MathUtils.js'

  export const requestPointerLockWithUnadjustedMovement = (myTargetElement: HTMLElement) => {
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

  const { renderer, camera } = useThrelte()

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

  const mouseSensitivity = 0.0006

  let phi = 0
  let theta = 0

  const handleMouseMove = ({ movementX, movementY }: MouseEvent) => {
    phi += movementX * mouseSensitivity
    theta = clamp(theta - movementY * mouseSensitivity, -Math.PI / 3, Math.PI / 3)
  }

  document.addEventListener('mousemove', handleMouseMove)

  useTask(() => {
    const qx = new Quaternion()
    qx.setFromAxisAngle(new Vector3(0, -1, 0), phi)

    const qz = new Quaternion()
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
