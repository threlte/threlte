<script lang="ts">
  import { Canvas, OrbitControls, T } from '@threlte/core'
  import { ContactShadows, Float, Grid } from '@threlte/extras'
  import {
    BoxGeometry,
    Color,
    IcosahedronGeometry,
    MeshStandardMaterial,
    TorusKnotGeometry
  } from 'three'

  let _class = ''
  export { _class as class }
</script>

<div class={_class}>
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[-10, 10, 10]}
      fov={15}
    >
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        target={{ y: 1.5 }}
      />
    </T.PerspectiveCamera>

    <T.DirectionalLight
      intensity={0.8}
      position.x={5}
      position.y={10}
    />
    <T.AmbientLight intensity={0.2} />

    <Grid
      position.y={-0.001}
      cellColor="#ffffff"
      sectionColor="#ffffff"
      sectionThickness={0}
      fadeDistance={25}
      cellSize={2}
    />

    <ContactShadows
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
          color: new Color('#0059BA').convertSRGBToLinear()
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
          color: new Color('#F85122').convertSRGBToLinear()
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
          color: new Color('#F8EBCE').convertSRGBToLinear()
        })}
      />
    </Float>
  </Canvas>
</div>
