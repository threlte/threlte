<script lang="ts">
  import { type Vector3Tuple, DoubleSide } from 'three'
  import { T } from '@threlte/core'
  import {
    interactivity,
    Decal,
    TransformControls,
    useTexture,
    ContactShadows,
    Grid,
    OrbitControls,
    VirtualEnvironment,
    SoftShadows
  } from '@threlte/extras'
  import { AutoColliders, Debug, RigidBody } from '@threlte/rapier'

  let { controls = false, debug = false } = $props()

  if (debug) {
    helper.position.copy(_position)
    helper.rotation.copy(_rotation)
    helper.scale.copy(_scale)
  }

  interactivity()

  const svelteIcon = useTexture('/icons/svelte.png')

  let bodies = $state([])

  let position = $state([0.5, 0, 0.5])

  let current = 0
  setInterval(() => {
    current += 1
    current %= bodies.length
    const body = bodies[current]

    body.setLinvel({ x: 0, y: 0, z: 0 })
    body.setAngvel({ x: 0, y: 0, z: 0, w: 1 })
    body.setTranslation(
      { x: (Math.random() - 0.5) * 0.1, y: 5, z: (Math.random() - 0.5) * 0.1 },
      true
    )
  }, 400)
</script>

<T.PerspectiveCamera
  makeDefault
  position={[5, 1, 4]}
  oncreate={(ref) => ref.lookAt(0, 1, 0)}
>
  <OrbitControls
    enablePan={false}
    enableDamping
    target={[0, 1, 0]}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  position={[5, 5, 5]}
/>

<AutoColliders>
  <T.Mesh receiveShadow>
    <T.SphereGeometry args={[1, 256, 128]} />
    <!-- <T.BoxGeometry args={[3, 0.2, 3]} /> -->
    <T.MeshStandardMaterial roughness={0.1} />

    {#if $svelteIcon}
      <Decal {position}>
        {#snippet children({ ref })}
          <T.MeshStandardMaterial
            map={$svelteIcon}
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
                if (event.target.object) event.target.object.position.toArray(position)
              }}
            />
          {/if}
        {/snippet}
      </Decal>
    {/if}
  </T.Mesh>
</AutoColliders>

{#each { length: 20 } as _, index (index)}
  <RigidBody
    bind:rigidBody={bodies[index]}
    oncreate={(ref) => {
      ref.setTranslation({ x: 0, y: -10 + index, z: 0 })
    }}
  >
    <AutoColliders
      shape="ball"
      restitution={0.2}
    >
      <T.Mesh castShadow>
        <T.SphereGeometry args={[0.3, 256, 128]} />
        <T.MeshStandardMaterial roughness={0.2} />

        <Decal
          position={[0.35, 0.35, 0.35]}
          rotation={Math.PI / 4}
          scale={1}
          src="/icons/mstile-150x150.png"
          depthTest
        >
          {#snippet children({ ref })}
            {#if debug}
              <T.Mesh raycast={() => null}>
                <T.BoxGeometry />
                <T.MeshNormalMaterial wireframe={true} />
                <T.AxesHelper raycast={() => null} />
              </T.Mesh>
            {/if}
          {/snippet}
        </Decal>
      </T.Mesh>
    </AutoColliders>
  </RigidBody>
{/each}

{#snippet lightformer(
  color: string,
  shape: 'circle' | 'plane',
  size: number,
  position: [number, number, number],
  visible: boolean
)}
  <T.Group {position}>
    {#snippet children({ ref })}
      {#if visible}
        <TransformControls object={ref} />
      {/if}

      <T.Mesh lookAt={[0, 0, 0]}>
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
    {/snippet}
  </T.Group>
{/snippet}

<VirtualEnvironment visible={debug}>
  {@render lightformer('#FF4F4F', 'plane', 20, [0, 0, -20], debug)}
  {@render lightformer('#FFD0CB', 'circle', 5, [0, 5, 0], debug)}
  {@render lightformer('#2223FF', 'plane', 8, [-3, 0, 4], debug)}
</VirtualEnvironment>
