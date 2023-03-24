<script
  lang="ts"
  context="module"
>
  const geometry = new SphereGeometry(1)
  const material = new MeshBasicMaterial({ color: 'red' })
</script>

<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Attractor, Collider, RigidBody } from '@threlte/rapier'
  import type { GravityType } from '@threlte/rapier/src/lib/types/components'
  import { MeshBasicMaterial, SphereGeometry } from 'three'

  export let type: GravityType = 'static'
  let hide = false
  export const reset = () => {
    hide = true
    setTimeout(() => (hide = false))
  }

  const config: any = {
    static: {
      type: 'static',
      strength: 3,
      range: 100,
      gravitationalConstant: undefined
    },
    linear: {
      type: 'linear',
      strength: 1,
      range: 100,
      gravitationalConstant: undefined
    },
    newtonian: {
      type: 'newtonian',
      strength: 10,
      range: 100,
      gravitationalConstant: 10
    }
  }
</script>

<T.PerspectiveCamera
  position.y={50}
  position.z={100}
  makeDefault
  fov={70}
  far={10000}
>
  <OrbitControls
    enableZoom={true}
    target.y={20}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  position={[8, 20, -3]}
/>

<T.GridHelper args={[100]} />

{#if !hide}
  <T.Group position={[-50, 0, 0]}>
    <RigidBody linearVelocity={[5, -5, 0]}>
      <Collider
        shape="ball"
        args={[1]}
        mass={config[type].strength}
      />
      <T.Mesh
        {geometry}
        {material}
      />
      <Attractor
        range={config[type].range}
        gravitationalConstant={config[type].gravitationalConstant}
        strength={config[type].strength}
        gravityType={type}
      />
    </RigidBody>
  </T.Group>

  <RigidBody linearVelocity={[0, 5, 0]}>
    <Collider
      shape="ball"
      args={[1]}
      mass={config[type].strength}
    />
    <T.Mesh
      {geometry}
      {material}
    />
    <Attractor
      range={config[type].range}
      gravitationalConstant={config[type].gravitationalConstant}
      strength={config[type].strength}
      gravityType={type}
    />
  </RigidBody>

  <T.Group position={[50, 0, 0]}>
    <RigidBody linearVelocity={[-5, 0, 5]}>
      <Collider
        shape="ball"
        args={[1]}
        mass={config[type].strength}
      />
      <T.Mesh
        {geometry}
        {material}
      />
      <Attractor
        range={config[type].range}
        gravitationalConstant={config[type].gravitationalConstant}
        strength={config[type].strength}
        gravityType={type}
      />
    </RigidBody>
  </T.Group>
{/if}
