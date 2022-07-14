<script lang="ts">
  import PerspectiveCamera from '$lib/cameras/PerspectiveCamera.svelte'
  import Canvas from '$lib/Canvas.svelte'
  import OrbitControls from '$lib/controls/OrbitControls.svelte'
  import { useRaf } from '$lib/hooks/useRaf'
  import MeshInstance from '$lib/instances/MeshInstance.svelte'
  import Group from '$lib/objects/Group.svelte'
  import Instance from '$lib/objects/Instance.svelte'
  import InstancedMesh from '$lib/objects/InstancedMesh.svelte'
  import { BoxBufferGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'

  const geometry = new BoxBufferGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({
    wireframe: true,
    color: 'black'
  })

  const meshBlue = new Mesh(
    new BoxBufferGeometry(1, 1, 1),
    new MeshBasicMaterial({
      color: 'blue'
    })
  )
  const meshRed = new Mesh(
    new BoxBufferGeometry(1, 1, 1),
    new MeshBasicMaterial({
      color: 'red'
    })
  )

  let posX = 0
  useRaf(() => {
    posX = Math.sin(Date.now() / 1000)
  })

  const v3s: Vector3[] = []
  const length = 5

  for (let x = (length / 2) * -1; x < length / 2; x += 1) {
    for (let y = (length / 2) * -1; y < length / 2; y += 1) {
      for (let z = (length / 2) * -1; z < length / 2; z += 1) {
        v3s.push(new Vector3(x, y, z))
      }
    }
  }
</script>

<div>
  <Canvas>
    <PerspectiveCamera position={{ z: 10, y: 10, x: 10 }} lookAt={meshBlue}>
      <OrbitControls />
    </PerspectiveCamera>

    <InstancedMesh {geometry} {material}>
      <Group scale={1.6} position={{ x: 1 }}>
        <Group rotation={{ x: DEG2RAD * 70 }}>
          <Group position={{ z: 2 }}>
            <Group rotation={{ x: DEG2RAD * -180 }}>
              <Group position={{ y: 1 }}>
                <MeshInstance mesh={meshBlue} />
                <Instance scale={1.0001} />
              </Group>
            </Group>
          </Group>
        </Group>
      </Group>
    </InstancedMesh>
  </Canvas>
</div>

<div class="test-description">
  <p>Test successful: blue cube has overlapping wireframe</p>
  <p>Test failed: wireframe cube is on different location than blue cube</p>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  div {
    width: 100vw;
    height: 100vh;
  }

  div.test-description {
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
