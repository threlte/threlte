<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { interactivity, useCursor, useViewport } from '@threlte/extras'
  import { Mesh, Quaternion } from 'three'

  interface Props {
    quaternion: Quaternion
    onselect: (arg: string) => void
  }

  let { quaternion, onselect }: Props = $props()

  const viewport = useViewport()

  let meshes: [Mesh, Mesh, Mesh] = [null!, null!, null!]

  const boxCursor = useCursor()
  const torusCursor = useCursor()
  const torusKnotCursor = useCursor()

  interactivity()

  useTask(
    () => {
      for (const mesh of meshes) {
        mesh.quaternion.copy(quaternion)
      }
    },
    { autoInvalidate: false }
  )
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
  bind:ref={meshes[0]}
  position={[viewport.current.width / 2 - 1, viewport.current.height / 2 - 1, 0]}
  onpointerenter={boxCursor.onPointerEnter}
  onpointerleave={boxCursor.onPointerLeave}
  onclick={() => onselect('box')}
  scale={boxCursor.hovering.current ? 1.1 : 1}
>
  <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
  <T.MeshToonMaterial color={boxCursor.hovering.current ? 'hotpink' : 'gray'} />
</T.Mesh>

<T.Mesh
  bind:ref={meshes[1]}
  position={[viewport.current.width / 2 - 2, viewport.current.height / 2 - 1, 0]}
  onpointerenter={torusCursor.onPointerEnter}
  onpointerleave={torusCursor.onPointerLeave}
  onclick={() => onselect('torus')}
  scale={torusCursor.hovering.current ? 1.1 : 1}
>
  <T.TorusGeometry args={[0.25, 0.1]} />
  <T.MeshToonMaterial color={torusCursor.hovering.current ? 'hotpink' : 'gray'} />
</T.Mesh>

<T.Mesh
  bind:ref={meshes[2]}
  position={[viewport.current.width / 2 - 3, viewport.current.height / 2 - 1, 0]}
  onpointerover={torusKnotCursor.onPointerEnter}
  onpointerleave={torusKnotCursor.onPointerLeave}
  onclick={() => onselect('torusknot')}
  scale={torusKnotCursor.hovering.current ? 1.1 : 1}
>
  <T.TorusKnotGeometry args={[0.215, 0.08, 256]} />
  <T.MeshToonMaterial color={torusKnotCursor.hovering.current ? 'hotpink' : 'gray'} />
</T.Mesh>
