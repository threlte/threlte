<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { interactivity } from '@threlte/extras'
  import { Mesh, Quaternion } from 'three'

  interface Props {
    quaternion: Quaternion
    onSelect: (arg: string) => void
  }

  let { quaternion, onSelect }: Props = $props()

  const { viewport } = useThrelte()

  let meshes: Mesh[] = []

  let highlighted = $state('')

  interactivity()

  const highlight = (arg: string) => {
    highlighted = arg
  }

  useTask(() => {
    for (const mesh of meshes) {
      mesh.quaternion.copy(quaternion)
    }
  })
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
  on:pointerover={() => highlight('box')}
  on:pointerleave={() => highlight('')}
  on:click={() => onSelect('box')}
  scale={highlighted === 'box' ? 1.1 : 1}
>
  <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
  <T.MeshToonMaterial color={highlighted === 'box' ? 'hotpink' : 'gray'} />
</T.Mesh>

<T.Mesh
  bind:ref={meshes[1]}
  position={[$viewport.width / 2 - 2, $viewport.height / 2 - 1, 0]}
  on:pointerover={() => highlight('torus')}
  on:pointerleave={() => highlight('')}
  on:click={() => onSelect('torus')}
  scale={highlighted === 'torus' ? 1.1 : 1}
>
  <T.TorusGeometry args={[0.25, 0.1]} />
  <T.MeshToonMaterial color={highlighted === 'torus' ? 'hotpink' : 'gray'} />
</T.Mesh>

<T.Mesh
  bind:ref={meshes[2]}
  position={[$viewport.width / 2 - 3, $viewport.height / 2 - 1, 0]}
  on:pointerover={() => highlight('torusknot')}
  on:pointerleave={() => highlight('')}
  on:click={() => onSelect('torusknot')}
  scale={highlighted === 'torusknot' ? 1.1 : 1}
>
  <T.TorusKnotGeometry args={[0.215, 0.08, 256]} />
  <T.MeshToonMaterial color={highlighted === 'torusknot' ? 'hotpink' : 'gray'} />
</T.Mesh>
