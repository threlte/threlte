<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'

  import { interactivity, Sky, useFBO } from '@threlte/extras'

  import { tweened } from 'svelte/motion'
  import { writable } from 'svelte/store'
  import { Group, Vector3, type Vector3Tuple } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import DeathValley from './deathValley.svelte'
  import Scope from './scope.svelte'

  interactivity()

  const { camera, renderer, scene } = useThrelte()

  const renderTarget = useFBO()

  let scope: Group | undefined

  $: {
    if ($camera) $camera.lookAt(new Vector3(0, 0, 0))
  }

  let zoomedFov = 5

  useTask(() => {
    if (!scope || !$scoping) return
    scope.visible = false
    $camera.fov = zoomedFov
    $camera.updateMatrix()
    $camera.updateProjectionMatrix()
    $camera.matrixWorldNeedsUpdate = true
    renderer.setRenderTarget(renderTarget)
    renderer.render(scene, $camera)
    $camera.fov = 60
    $camera.updateProjectionMatrix()

    scope.visible = true
    renderer.setRenderTarget(null)
  })

  const scoping = writable(false)

  const rotationX = tweened(90)
  const positionY = tweened(-0.3)
  const positionZ = tweened(-1)

  $: {
    if ($scoping) {
      rotationX.set(0)
      positionY.set(0)
      positionZ.set(-0.5)
    } else {
      rotationX.set(90)
      positionY.set(-0.3)
      positionZ.set(-1)
    }
  }

  window.addEventListener('keydown', () => {
    scoping.set(!$scoping)

    console.log({ scoping: $scoping })
  })

  const scopePosition: Vector3Tuple = [0, 0, 0]

  window.addEventListener('mousemove', ({ movementX, movementY }) => {
    if ($scoping) {
      scopePosition[0] = scopePosition[0] + movementX * 0.01
      scopePosition[2] = scopePosition[2] + movementY * 0.01
    }
  })

  window.addEventListener('wheel', ({ deltaY }) => {
    zoomedFov += deltaY * 0.01
    zoomedFov = Math.max(zoomedFov, 0.5)
    zoomedFov = Math.min(zoomedFov, 30)
  })
</script>

<T.Group position={scopePosition}>
  <T.PerspectiveCamera
    makeDefault
    position={[4, 1.5, 4]}
  >
    <Scope
      bind:ref={scope}
      position.x={0}
      position.y={$positionY}
      position.z={$positionZ}
      rotation.x={DEG2RAD * 0}
      rotation.y={DEG2RAD * $rotationX}
      rotation.z={DEG2RAD * 0}
      scopeViewMap={renderTarget.texture}
    />
  </T.PerspectiveCamera>
</T.Group>

<Sky />
<DeathValley scale={5} />
