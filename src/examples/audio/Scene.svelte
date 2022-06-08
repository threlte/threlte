<script lang="ts">
  import { spring } from 'svelte/motion'
  import {
    CircleBufferGeometry,
    Color,
    EquirectangularReflectionMapping,
    MeshStandardMaterial
  } from 'three'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import {
    AudioListener,
    DirectionalLight,
    HemisphereLight,
    Mesh,
    OrbitControls,
    OrthographicCamera,
    useLoader,
    useThrelte,
    useThrelteRoot
  } from 'threlte'
  import Speaker from './Speaker.svelte'
  import Turntable from './Turntable.svelte'

  let volume = 0
  let isPlaying = false

  const smoothVolume = spring(0)
  $: smoothVolume.set(volume)

  const { size } = useThrelte()

  const rgbeLoader = useLoader(RGBELoader, () => new RGBELoader())
  const { scene, invalidate } = useThrelte()
  rgbeLoader.load('/hdr/shanghai_riverside_1k.hdr', (texture) => {
    texture.mapping = EquirectangularReflectionMapping
    scene.environment = texture
    scene.environment.rotation = 180
    invalidate('texture loaded')
  })
  scene.background = new Color('white')

  let zoom = $size.width / 18
  $: zoom = $size.width / 18
</script>

<OrthographicCamera {zoom} position={{ z: 9, y: 9, x: 6 }}>
  <OrbitControls
    autoRotate={isPlaying}
    autoRotateSpeed={0.5}
    enableDamping
    maxPolarAngle={DEG2RAD * 80}
    target={{ y: 1.5 }}
  />
  <AudioListener />
</OrthographicCamera>

<!-- FLOOR -->
<Mesh
  receiveShadow
  geometry={new CircleBufferGeometry(10, 64)}
  material={new MeshStandardMaterial({
    color: 0x333333
  })}
  rotation={{ x: DEG2RAD * -90 }}
/>

<Turntable bind:isPlaying bind:volume />

<Speaker position={{ x: 6 }} rotation={{ y: DEG2RAD * -7 }} {volume} />
<Speaker position={{ x: -6 }} rotation={{ y: DEG2RAD * 7 }} {volume} />

<DirectionalLight
  shadow={{
    mapSize: [1024, 1024],
    camera: {
      left: -9,
      right: 9,
      top: 9,
      bottom: -9
    }
  }}
  position={{ x: 10, y: 20, z: 8 }}
  intensity={0.3}
/>
<HemisphereLight intensity={0} skyColor={0xffbd08} groundColor={0x323973} />
