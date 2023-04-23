<script lang="ts">
  import * as theatreCore from '@theatre/core'
  import { T, injectPlugin, useFrame, useThrelte } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Editable, Sheet } from '@threlte/theatre'
  import { Color, Object3D } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import ObjectA from './ObjectA.svelte'

  const { types } = theatreCore

  let cameraTargetA: Object3D
  let cameraTargetB: Object3D
  let cameraTargetC: Object3D

  const { scene, renderer } = useThrelte()
  renderer!.physicallyCorrectLights = true

  const backgroundColor = new Color()
  scene.background = backgroundColor

  injectPlugin('lookAt', ({ ref, props }) => {
    // skip injection if ref is not an Object3D
    if (!(ref instanceof Object3D)) return
    let currentRef = ref
    let currentLookAt: [number, number, number] | Object3D | undefined = props.lookAt

    useFrame(() => {
      if (currentLookAt) {
        if (currentLookAt instanceof Object3D) {
          currentRef.lookAt(currentLookAt.position)
        } else {
          currentRef.lookAt(...currentLookAt)
        }
      }
    })
    return {
      onRefChange(ref) {
        currentRef = ref
      },
      onRestPropsChange(props) {
        currentLookAt = props.lookAt
      },
      pluginProps: ['lookAt']
    }
  })
</script>

<Sheet let:sequence>
  <!-- Attaches to the scene as background color -->
  <T.Color
    attach="background"
    args={['blue']}
  />
  <Editable
    name="Scene"
    background
  />

  <!-- Camera Target A -->
  <T.Object3D bind:ref={cameraTargetA}>
    <Editable
      name="Camera / Target A"
      transform
      controls
    />
  </T.Object3D>

  <!-- Camera Target B -->
  <T.Object3D bind:ref={cameraTargetB}>
    <Editable
      name="Camera / Target B"
      transform
      controls
    />
  </T.Object3D>

  <!-- Camera Target C -->
  <T.Object3D bind:ref={cameraTargetC}>
    <Editable
      name="Camera / Target C"
      transform
      controls
    />
  </T.Object3D>

  <Editable
    name="Camera / Manager"
    props={{
      camera: {
        a: true,
        b: false,
        c: false,
        editor: true
      }
    }}
    let:values
  >
    <!-- Editor Camera -->
    <T.PerspectiveCamera
      position={[10, 10, 10]}
      makeDefault={values.camera.editor}
    >
      <OrbitControls enableDamping />
    </T.PerspectiveCamera>

    <!-- Camera A -->
    <T.Group let:ref>
      <T.PerspectiveCamera
        position.z={10}
        position.y={3}
        near={0.05}
        makeDefault={values.camera.a && !values.camera.editor}
        lookAt={cameraTargetA}
      >
        <Editable
          name="Camera / A"
          fov
          transform
          controls
          props={{
            fade: types.number(0, { range: [0, 1] })
          }}
          let:values={{ fade }}
        >
          <T.Mesh
            rotation.z={-90 * DEG2RAD}
            position.z={-0.1}
          >
            <T.PlaneGeometry />
            <T.MeshBasicMaterial
              color="black"
              transparent
              opacity={fade}
            />
          </T.Mesh>
        </Editable>
      </T.PerspectiveCamera>
      <T.CameraHelper args={[ref.children[0]]} />
    </T.Group>

    <!-- Camera B -->
    <T.Group let:ref>
      <T.Group>
        <Editable
          name="Camera / B / Group"
          transform
          controls
        />

        <T.PerspectiveCamera
          position.z={10}
          position.y={10}
          position.x={10}
          near={0.05}
          makeDefault={values.camera.b && !values.camera.editor}
          lookAt={cameraTargetB}
        >
          <Editable
            name="Camera / B"
            fov
            transform
            controls
            props={{
              fade: types.number(0, { range: [0, 1] })
            }}
            let:values={{ fade }}
          >
            <T.Mesh
              rotation.z={-90 * DEG2RAD}
              position.z={-0.1}
            >
              <T.PlaneGeometry />
              <T.MeshBasicMaterial
                color="black"
                transparent
                opacity={fade}
              />
            </T.Mesh>
          </Editable>
        </T.PerspectiveCamera>
      </T.Group>
      <T.CameraHelper args={[ref.children[0]?.children[0]]} />
    </T.Group>

    <!-- Camera C -->

    <T.Group let:ref>
      <T.PerspectiveCamera
        position.z={10}
        near={0.05}
        makeDefault={values.camera.c && !values.camera.editor}
        lookAt={cameraTargetC}
      >
        <Editable
          name="Camera / C"
          transform
          controls
          fov
          props={{
            fade: types.number(0, { range: [0, 1] })
          }}
          let:values={{ fade }}
        >
          <T.Mesh
            rotation.z={-90 * DEG2RAD}
            position.z={-0.1}
          >
            <T.PlaneGeometry />
            <T.MeshBasicMaterial
              color="black"
              transparent
              opacity={fade}
            />
          </T.Mesh>
        </Editable>
      </T.PerspectiveCamera>
      <T.CameraHelper args={[ref.children[0]]} />
    </T.Group>
  </Editable>

  <T.DirectionalLight position.y={1}>
    <Editable
      name="Lights / Top"
      color
      intensity
      transform
      controls
    />
  </T.DirectionalLight>

  <T.DirectionalLight position.y={-1}>
    <Editable
      name="Lights / Bottom"
      color
      intensity
      transform
      controls
    />
  </T.DirectionalLight>

  <T.AmbientLight>
    <Editable
      name="Lights / Ambient"
      color
      intensity
    />
  </T.AmbientLight>

  <ObjectA />
</Sheet>
