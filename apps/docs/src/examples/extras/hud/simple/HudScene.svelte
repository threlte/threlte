<script lang="ts">
  import { Mesh, Quaternion } from 'three'
  import { T, useTask } from '@threlte/core'
  import { Hovering, interactivity, useViewport } from '@threlte/extras'

  interface Props {
    quaternion: Quaternion
    onselect: (arg: string) => void
  }

  let { quaternion, onselect }: Props = $props()

  const viewport = useViewport()

  const meshes: Set<Mesh> = new Set()

  // return a function that will delete the mesh from the set
  const addMesh = (mesh: Mesh) => {
    meshes.add(mesh)
    return () => {
      meshes.delete(mesh)
    }
  }

  const boxHovering = new Hovering()
  const torusHovering = new Hovering()
  const torusKnotHovering = new Hovering()

  interactivity()

  useTask(
    () => {
      for (const mesh of meshes) {
        mesh.quaternion.copy(quaternion)
      }
    },
    { autoInvalidate: false }
  )

  const boxScale = $derived(boxHovering.current ? 1.1 : 1)
  const boxColor = $derived(boxHovering.current ? 'hotpink' : 'grey')

  const torusScale = $derived(torusHovering.current ? 1.1 : 1)
  const torusColor = $derived(torusHovering.current ? 'hotpink' : 'grey')

  const torusKnotScale = $derived(torusKnotHovering.current ? 1.1 : 1)
  const torusKnotColor = $derived(torusKnotHovering.current ? 'hotpink' : 'grey')
</script>

<T.OrthographicCamera
  makeDefault
  zoom={80}
  position={[0, 0, 10]}
/>
<T.AmbientLight intensity={Math.PI / 2} />

<T.PointLight
  position={[10, 10, 10]}
  decay={0}
  intensity={Math.PI * 2}
/>

<T.Mesh
  position={[$viewport.width / 2 - 1, $viewport.height / 2 - 1, 0]}
  onpointerenter={() => {
    boxHovering.current = true
  }}
  onpointerleave={() => {
    boxHovering.current = false
  }}
  onclick={() => onselect('box')}
  oncreate={addMesh}
  scale={boxScale}
>
  <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
  <T.MeshToonMaterial color={boxColor} />
</T.Mesh>

<T.Mesh
  position={[$viewport.width / 2 - 2, $viewport.height / 2 - 1, 0]}
  onpointerenter={() => {
    torusHovering.current = true
  }}
  onpointerleave={() => {
    torusHovering.current = false
  }}
  onclick={() => onselect('torus')}
  scale={torusScale}
  oncreate={addMesh}
>
  <T.TorusGeometry args={[0.25, 0.1]} />
  <T.MeshToonMaterial color={torusColor} />
</T.Mesh>

<T.Mesh
  position={[$viewport.width / 2 - 3, $viewport.height / 2 - 1, 0]}
  onpointerover={() => {
    torusKnotHovering.current = true
  }}
  onpointerleave={() => {
    torusKnotHovering.current = false
  }}
  onclick={() => onselect('torusknot')}
  scale={torusKnotScale}
  oncreate={addMesh}
>
  <T.TorusKnotGeometry args={[0.215, 0.08, 256]} />
  <T.MeshToonMaterial color={torusKnotColor} />
</T.Mesh>
