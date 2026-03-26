<script lang="ts">
  import { isInstanceOf, T, useTask } from '@threlte/core'
  import {
    Bounds,
    CameraControls,
    OrbitControls,
    Sparkles,
    TrackballControls,
    useGltf,
    useTexture
  } from '@threlte/extras'
  import {
    Color,
    DoubleSide,
    MeshBasicMaterial,
    MeshPhongMaterial,
    ShaderMaterial,
    Uniform
  } from 'three'
  import vertexShader from './vertex'
  import fragmentShader from './fragment'

  interface Props {
    camera: 'orthographic' | 'perspective'
    controls: 'camera' | 'orbit' | 'trackball' | 'none'
    margin: number
    animate: boolean
    enabled: boolean
  }

  let { camera, controls, margin, animate, enabled }: Props = $props()

  const poleLightMaterial = new MeshBasicMaterial({ color: 0xff_ff_e5 })
  const bakedMaterial = new MeshPhongMaterial()

  const portalLightMaterial = new ShaderMaterial({
    uniforms: {
      uTime: new Uniform(0),
      uColorStart: new Uniform(new Color('#1E88E5')),
      uColorEnd: new Uniform(new Color('#5E35B1'))
    },
    side: DoubleSide,
    vertexShader,
    fragmentShader
  })

  const [gltf] = await Promise.all([
    useGltf('/models/portal/portal.glb').then((model) => {
      model.scene.traverse((child) => {
        if (!isInstanceOf(child, 'Mesh')) {
          return
        }

        if (child.name === 'Portal') {
          child.material = portalLightMaterial
        } else if (child.name === 'LampLight1' || child.name === 'LampLight2') {
          child.material = poleLightMaterial
        } else {
          child.material = bakedMaterial
        }
      })

      return model
    }),
    useTexture('/models/portal/portal_baked.jpg', {
      transform(result) {
        result.flipY = false
        bakedMaterial.map = result
        return result
      }
    })
  ])

  useTask((dt) => {
    portalLightMaterial.uniforms.uTime.value += dt
  })
</script>

{#snippet Controls()}
  {#if controls === 'orbit'}
    <OrbitControls
      enableDamping
      enableZoom={false}
      enablePan={false}
    />
  {:else if controls === 'camera'}
    <CameraControls />
  {:else if controls === 'trackball'}
    <TrackballControls />
  {/if}
{/snippet}

{#if camera === 'perspective'}
  <T.PerspectiveCamera
    makeDefault
    position.x={20}
    position.y={10}
    position.z={-20}
    fov={50}
  >
    {@render Controls()}
  </T.PerspectiveCamera>
{:else if camera === 'orthographic'}
  <T.OrthographicCamera
    makeDefault
    position.x={20}
    position.y={10}
    position.z={-20}
    zoom={50}
  >
    {@render Controls()}
  </T.OrthographicCamera>
{/if}

<T.DirectionalLight
  position.y={10}
  position.z={10}
/>

<T.AmbientLight />

<Bounds
  {margin}
  {animate}
  {enabled}
>
  <T is={gltf.scene}>
    <Sparkles
      position={[0, 0.8, 0]}
      size={4}
      scale={[4, 1.5, 4]}
    />
  </T>
</Bounds>
