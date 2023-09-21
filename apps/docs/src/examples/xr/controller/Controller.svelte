<script lang='ts'>
  import * as THREE from 'three'
  import { T, useFrame } from '@threlte/core'
  import { Controller, type XRControllerEvent, useController } from '@threlte/xr'

  type $$Props = { left: true } | { right: true }

  let state = 'disconnected'
  let cursor = 0

  const count = 100
  const colors: string[] = []
  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)
  const vec3 = new THREE.Vector3()
  const matrix = new THREE.Matrix4()
  const color = new THREE.Color()

  const controller = useController($$props.left ? 'left' : 'right')

  const instancedMesh = new THREE.InstancedMesh(
    new THREE.IcosahedronGeometry(0.01),
    new THREE.MeshPhongMaterial(),
    count
  )

  const colorMap = {
    connected: 'green',
    disconnected: 'crimson',
    selectstart: 'darkorchid',
    selectend: 'darkmagenta',
    select: 'darkmagenta',
    squeezestart: 'lightcoral',
    squeezeend: 'indianred',
    squeeze: 'indianred',
    pinchstart: 'lightcyan',
    pinchend: 'lightblue',
  } as const

  const handleEvent = (source: string) => (event: XRControllerEvent) => {
    console.log(source, event.data?.handedness, event.type, event.target)

    state = event.type
  }

  const fireParticle = () => {
    instancedMesh.setColorAt(cursor, color.setStyle(colorMap[state]))
    instancedMesh.instanceColor!.needsUpdate = true

    let i = cursor * 3

    const ray = controller.current?.targetRay

    ray?.getWorldDirection(vec3).negate().multiplyScalar(0.015)
    vec3.x += (Math.random() - 0.5) * 0.012
    vec3.y += (Math.random() - 0.5) * 0.012
    vec3.z += (Math.random() - 0.5) * 0.012

    const { x = 0, y = 0, z = 0 } = ray?.position ?? {}

    positions[i] = x
    positions[i + 1] = y
    positions[i + 2] = z

    velocities[i] = vec3.x
    velocities[i + 1] = vec3.y
    velocities[i + 2] = vec3.z
  
    cursor += 1
    cursor %= count
  }

  const updateParticles = () => {
    for (let i = 0, j = 0; i < count; i += 1, j += 3) {
      positions[j] += velocities[j]!
      positions[j + 1] += velocities[j + 1]!
      positions[j + 2] += velocities[j + 2]!
      matrix.setPosition(positions[j]!, positions[j + 1], positions[j + 2])
      instancedMesh.setMatrixAt(i, matrix)
    }

    instancedMesh.instanceMatrix.needsUpdate = true
  }

  useFrame(() => {
    updateParticles()

    switch (state) {
      case 'squeezestart':
      case 'selectstart':
        return fireParticle()
    }
  })
</script>

<Controller
  left={$$props.left}
  right={$$props.right}
  on:connected={handleEvent('Controller')}
  on:disconnected={handleEvent('Controller')}
  on:selectstart={handleEvent('Controller')}
  on:selectend={handleEvent('Controller')}
  on:select={handleEvent('Controller')}
  on:squeezestart={handleEvent('Controller')}
  on:squeezeend={handleEvent('Controller')}
  on:squeeze={handleEvent('Controller')}
/>

<T is={instancedMesh} frustumCulled={false} />

