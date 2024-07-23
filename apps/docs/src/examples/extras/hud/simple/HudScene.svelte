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

  const boxCursor = useCursor('pointer')
  const torusCursor = useCursor('pointer')
  const torusKnotCursor = useCursor('pointer')

  interactivity()

  useTask(
    () => {
      for (const mesh of meshes) {
        mesh.quaternion.copy(quaternion)
      }
    },
    { autoInvalidate: false }
  )

  const boxHovering = boxCursor.hovering
  const torusHovering = torusCursor.hovering
  const torusKnotHovering = torusKnotCursor.hovering
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
  position={[$viewport.width / 2 - 1, $viewport.height / 2 - 1, 0]}
  onpointerenter={boxCursor.onPointerEnter}
  onpointerleave={boxCursor.onPointerLeave}
  onclick={() => onselect('box')}
  scale={$boxHovering ? 1.1 : 1}
>
  <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
  <T.MeshToonMaterial color={$boxHovering ? 'hotpink' : 'gray'} />
</T.Mesh>

<T.Mesh
  bind:ref={meshes[1]}
  position={[$viewport.width / 2 - 2, $viewport.height / 2 - 1, 0]}
  onpointerenter={torusCursor.onPointerEnter}
  onpointerleave={torusCursor.onPointerLeave}
  onclick={() => onselect('torus')}
  scale={$torusHovering ? 1.1 : 1}
>
  <T.TorusGeometry args={[0.25, 0.1]} />
  <T.MeshToonMaterial color={$torusHovering ? 'hotpink' : 'gray'} />
</T.Mesh>

<T.Mesh
  bind:ref={meshes[2]}
  position={[$viewport.width / 2 - 3, $viewport.height / 2 - 1, 0]}
  onpointerover={torusKnotCursor.onPointerEnter}
  onpointerleave={torusKnotCursor.onPointerLeave}
  onclick={() => onselect('torusknot')}
  scale={$torusKnotHovering ? 1.1 : 1}
>
  <T.TorusKnotGeometry args={[0.215, 0.08, 256]} />
  <T.MeshToonMaterial color={$torusKnotHovering ? 'hotpink' : 'gray'} />
</T.Mesh>
