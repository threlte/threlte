<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, Environment, Float, OrbitControls } from '@threlte/extras'
  import {
    BoxGeometry,
    Color,
    IcosahedronGeometry,
    MeshStandardMaterial,
    TorusKnotGeometry
  } from 'three'
</script>

<Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" />

<T.PerspectiveCamera
  makeDefault
  position={[-10, 10, 10]}
  fov={25}
>
  <OrbitControls
    enabled={false}
    autoRotate
    autoRotateSpeed={0.5}
    target.y={1}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={0.8}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={0.2} />

<T.GridHelper
  args={[10, 10]}
  position.y={-0.001}
/>

<ContactShadows
  frames={200}
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5}
/>

<Float
  floatIntensity={1}
  floatingRange={[0, 1]}
>
  <T.Mesh
    position.y={1.2}
    position.z={-0.75}
    geometry={new BoxGeometry(1, 1, 1)}
    material={new MeshStandardMaterial({
      color: new Color('#0059BA')
    })}
  />
</Float>

<Float
  floatIntensity={1}
  floatingRange={[0, 1]}
>
  <T.Mesh
    position={[1.2, 1.5, 0.75]}
    rotation.x={5}
    rotation.y={71}
    geometry={new TorusKnotGeometry(0.5, 0.15, 100, 12, 2, 3)}
    material={new MeshStandardMaterial({
      color: new Color('#F85122')
    })}
  />
</Float>

<Float
  floatIntensity={1}
  floatingRange={[0, 1]}
>
  <T.Mesh
    position={[-1.4, 1.5, 0.75]}
    rotation={[-5, 128, 10]}
    geometry={new IcosahedronGeometry(1, 0)}
    material={new MeshStandardMaterial({
      color: new Color('#F8EBCE')
    })}
  />
</Float>
