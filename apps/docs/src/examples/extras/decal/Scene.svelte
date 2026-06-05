<script lang="ts">
  import { type Vector3Tuple, DoubleSide, Vector3 } from 'three'
  import { T } from '@threlte/core'
  import {
    Decal,
    TransformControls,
    useTexture,
    OrbitControls,
    VirtualEnvironment,
    useSuspense
  } from '@threlte/extras'
  import { RigidBody as RigidBodyRef } from '@dimforge/rapier3d-compat'
  import { Attractor, Collider, RigidBody } from '@threlte/rapier'

  let { controls = false, debug = false } = $props()

  const [svelteIcon, threlteIcon] = await Promise.all([
    useTexture('/icons/svelte.png'),
    useTexture('/icons/mstile-150x150.png')
  ])

  let position = $state<Vector3Tuple>([0.5, 0, 0.5])

  const vec3 = new Vector3()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 1, 4]}
>
  <OrbitControls
    enablePan={false}
    enableZoom={false}
    enableDamping
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  position={[5, 5, 5]}
  shadow.mapSize.width={2 ** 11}
  shadow.mapSize.height={2 ** 11}
  intensity={1.25}
/>

<Attractor />

<T.Mesh receiveShadow>
  <Collider
    shape={'ball'}
    args={[1]}
  />
  <T.SphereGeometry args={[1, 256, 128]} />
  <T.MeshStandardMaterial roughness={0.1} />

  <Decal
    {position}
    {debug}
  >
    {#snippet children()}
      <T.MeshStandardMaterial
        map={svelteIcon}
        transparent
        roughness={0.2}
        polygonOffset
        polygonOffsetFactor={-10}
      />
      {#if controls}
        <TransformControls
          oncreate={(ref) => {
            ref.position.fromArray(position)
          }}
          onchange={(event) => {
            if (event.target.object) {
              event.target.object.position.toArray(position)
            }
          }}
        />
      {/if}
    {/snippet}
  </Decal>
</T.Mesh>

{#each { length: 20 }, index (index)}
  <RigidBody
    bind:rigidBody={bodies[index]}
    oncreate={(ref) => {
      vec3.randomDirection()
      ref.setTranslation(vec3, true)
    }}
  >
    <T.Mesh castShadow>
      <Collider
        shape="ball"
        args={[0.3]}
        restitution={0.2}
      />
      <T.SphereGeometry args={[0.3, 256, 128]} />
      <T.MeshStandardMaterial roughness={0.2} />

      <Decal
        position={[0.35, 0.35, 0.35]}
        rotation={Math.PI / 4}
        scale={0.8}
        depthTest
        {debug}
      >
        <T.MeshStandardMaterial
          map={threlteIcon}
          transparent
          roughness={0.2}
          polygonOffset
          polygonOffsetFactor={-10}
        />
      </Decal>
    </T.Mesh>
  </RigidBody>
{/each}

<Attractor strength={0.1} />

{#snippet lightformer(
  color: string,
  shape: 'circle' | 'plane',
  size: number,
  position: [number, number, number]
)}
  <T.Group {position}>
    <T.Mesh oncreate={(ref) => ref.lookAt(0, 0, 0)}>
      {#if shape === 'circle'}
        <T.CircleGeometry args={[size / 2]} />
      {:else}
        <T.PlaneGeometry args={[size, size]} />
      {/if}
      <T.MeshBasicMaterial
        {color}
        side={DoubleSide}
      />
    </T.Mesh>
  </T.Group>
{/snippet}

<VirtualEnvironment frames={10}>
  {@render lightformer('#FF4F4F', 'plane', 20, [0, 0, -20])}
  {@render lightformer('#FFD0CB', 'circle', 5, [0, 5, 0])}
  {@render lightformer('#2223FF', 'plane', 8, [-3, 0, 4])}
</VirtualEnvironment>
