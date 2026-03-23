<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import Stats from 'three/addons/libs/stats.module.js'
  import * as THREE from 'three/webgpu'

  const { scene, dom, invalidate } = useThrelte()

  scene.background = new THREE.Color(0xc1c1c1)

  let geometries: THREE.BufferGeometry[] = [
    new THREE.ConeGeometry(1.0, 2.0, 3, 1),
    new THREE.BoxGeometry(2.0, 2.0, 2.0),
    new THREE.PlaneGeometry(2.0, 2, 1, 1),
    new THREE.CapsuleGeometry(),
    new THREE.CircleGeometry(1.0, 3),
    new THREE.CylinderGeometry(1.0, 1.0, 2.0, 3, 1),
    new THREE.DodecahedronGeometry(1.0, 0),
    new THREE.IcosahedronGeometry(1.0, 0),
    new THREE.OctahedronGeometry(1.0, 0),
    new THREE.PolyhedronGeometry([0, 0, 0], [0, 0, 0], 1, 0),
    new THREE.RingGeometry(1.0, 1.5, 3),
    new THREE.SphereGeometry(1.0, 3, 2),
    new THREE.TetrahedronGeometry(1.0, 0),
    new THREE.TorusGeometry(1.0, 0.5, 3, 3),
    new THREE.TorusKnotGeometry(1.0, 0.5, 20, 3, 1, 1)
  ]

  const group = new THREE.Group()
  group.static = true

  const position = new THREE.Vector3()
  const rotation = new THREE.Euler()
  const quaternion = new THREE.Quaternion()
  const scale = new THREE.Vector3()
  const count = 3000

  function randomizeMatrix(matrix: THREE.Matrix4) {
    position.x = Math.random() * 80 - 40
    position.y = Math.random() * 80 - 40
    position.z = Math.random() * 80 - 40

    rotation.x = Math.random() * 2 * Math.PI
    rotation.y = Math.random() * 2 * Math.PI
    rotation.z = Math.random() * 2 * Math.PI

    quaternion.setFromEuler(rotation)

    const factorScale = 1
    scale.x = scale.y = scale.z = 0.35 * factorScale + Math.random() * 0.5 * factorScale

    return matrix.compose(position, quaternion, scale)
  }

  const randomizeRotationSpeed = (rotation: THREE.Euler) => {
    rotation.x = Math.random() * 0.05
    rotation.y = Math.random() * 0.05
    rotation.z = Math.random() * 0.05
    return rotation
  }

  for (let i = 0; i < count; i++) {
    const material = new THREE.MeshToonNodeMaterial({
      color: new THREE.Color(Math.random() * 0xffffff),
      side: THREE.DoubleSide
    })

    const child = new THREE.Mesh(geometries[i % geometries.length], material)
    randomizeMatrix(child.matrix)
    child.matrix.decompose(child.position, child.quaternion, child.scale)
    child.userData.rotationSpeed = randomizeRotationSpeed(new THREE.Euler())
    child.frustumCulled = false
    group.add(child)
  }

  const stats = new Stats()
  dom.appendChild(stats.dom)

  stats.begin()

  useTask(() => {
    stats.end()

    for (const child of group.children) {
      if (!child) return

      const { rotationSpeed } = child.userData

      child.rotation.set(
        child.rotation.x + rotationSpeed.x,
        child.rotation.y + rotationSpeed.y,
        child.rotation.z + rotationSpeed.z
      )
    }

    stats.begin()
  })
</script>

<T is={group} />

<T.PerspectiveCamera
  position.z={50}
  makeDefault
>
  <OrbitControls
    autoRotate
    enableZoom={false}
    autoRotateSpeed={1}
    onchange={invalidate}
  />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={3.4} />
