<script lang="ts">
  import { T, useTask, useThrelte, watch } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import * as THREE from 'three'

  import { MeshToonNodeMaterial } from 'three/nodes'

  const { renderer, scene, size } = useThrelte()

  scene.background = new THREE.Color(0xc1c1c1)

  let geometries: THREE.BufferGeometry[] = []
  let group: THREE.Group

  let renderTimeAverages: number[] = []

  const position = new THREE.Vector3()
  const rotation = new THREE.Euler()
  const quaternion = new THREE.Quaternion()
  const scale = new THREE.Vector3()
  const MAX_GEOMETRY_COUNT = 4000

  const api = {
    webgpu: true,
    renderBundle: true,
    count: MAX_GEOMETRY_COUNT,
    opacity: 1
  }

  function randomizeMatrix(matrix: THREE.Matrix4) {
    position.x = Math.random() * 80 - 40
    position.y = Math.random() * 80 - 40
    position.z = Math.random() * 80 - 40

    rotation.x = Math.random() * 2 * Math.PI
    rotation.y = Math.random() * 2 * Math.PI
    rotation.z = Math.random() * 2 * Math.PI

    quaternion.setFromEuler(rotation)

    const factorScale = api.webgpu ? 1 : 2.0
    scale.x = scale.y = scale.z = 0.35 * factorScale + Math.random() * 0.5 * factorScale

    return matrix.compose(position, quaternion, scale)
  }

  function randomizeRotationSpeed(rotation: THREE.Euler) {
    rotation.x = Math.random() * 0.05
    rotation.y = Math.random() * 0.05
    rotation.z = Math.random() * 0.05
    return rotation
  }

  function initGeometries() {
    geometries = [
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
  }

  function initRegularMesh(count: number) {
    group = new THREE.Group()
    group.static = api.renderBundle

    for (let i = 0; i < count; i++) {
      const material = new MeshToonNodeMaterial({
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

    scene.add(group)
  }

  const count = api.count / (api.webgpu ? 1 : 10)

  renderTimeAverages = []

  async function init() {
    initGeometries()
    initRegularMesh(count)

    // gui

    // gui = new GUI()
    // gui.add(api, 'renderBundle').onChange(() => {
    //   init(!api.webgpu)
    // })

    // gui.add(api, 'webgpu').onChange(() => {
    //   init(!api.webgpu)
    // })

    watch(size, () => {
      group.needsUpdate = true
    })

    useTask((delta) => {
      animateMeshes()

      const renderTimeAverage = performance.now()

      // push only the last 60 render times
      renderTimeAverages.push(performance.now() - renderTimeAverage)
      if (renderTimeAverages.length > 60) renderTimeAverages.shift()

      const average = renderTimeAverages.reduce((a, b) => a + b, 0) / renderTimeAverages.length

      // document.getElementById('backend').innerText =
      //   `Average Render Time ${api.renderBundle ? '(Bundle)' : ''}: ` + average.toFixed(2) + 'ms'
    })

    function animateMeshes() {
      const count = api.count / (api.webgpu ? 1 : 10)
      const countDynamic = api.dynamic / (api.webgpu ? 1 : 10)

      const loopNum = Math.min(count, countDynamic)

      for (let i = 0; i < loopNum; i++) {
        const child = group.children[i]

        if (!child) return

        const rotationSpeed = child.userData.rotationSpeed

        child.rotation.set(
          child.rotation.x + rotationSpeed.x,
          child.rotation.y + rotationSpeed.y,
          child.rotation.z + rotationSpeed.z
        )
      }
    }
  }

  init()
</script>

<T is={group} />

<T.PerspectiveCamera
  position.z={50}
  makeDefault
>
  <OrbitControls
    autoRotate
    autoRotateSpeed={1}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  color="0xffffff"
  intensity={3.4}
/>
