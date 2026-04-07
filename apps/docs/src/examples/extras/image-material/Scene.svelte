<script
  lang="ts"
  module
>
  const urls: string[] = [
    '/textures/paintings/caravaggio.jpg',
    '/textures/paintings/vangogh.jpg',
    '/textures/paintings/klimt.jpg',
    '/textures/paintings/seghers.jpg',
    '/textures/paintings/vollon.jpg',
    '/textures/paintings/swan.jpg'
  ]

  const count = 5 // 4 for each channel + 1 for the texture of all channels
  const names: string[] = ['Hue(R)', 'Saturation(G)', 'Lightness(B)', 'Alpha(A)']
</script>

<script lang="ts">
  import { fragmentShader, vertexShader } from './rgbaProcessingTexture'
  import { BentPlaneGeometry } from './BentPlaneGeometry'
  import { Card } from './Card.svelte'
  import {
    DoubleSide,
    OrthographicCamera,
    PerspectiveCamera,
    Scene,
    Texture,
    Uniform,
    WebGLRenderTarget
  } from 'three'
  import {
    HTML,
    HUD,
    ImageMaterial,
    OrbitControls,
    Suspense,
    interactivity,
    useTexture,
    useViewport
  } from '@threlte/extras'
  import { T, useTask, useThrelte } from '@threlte/core'

  let {
    alphaSmoothing = 0.15,
    alphaThreshold = 0.5,
    brightness = 0,
    contrast = 0,
    hue = 0,
    lightness = 0,
    monochromeColor = '#ed8922',
    monochromeStrength = 0,
    negative = false,
    saturation = 0,
    textureOverrideEnabled = false
  }: {
    alphaSmoothing?: number
    alphaThreshold?: number
    brightness?: number
    contrast?: number
    hue?: number
    lightness?: number
    monochromeColor?: string
    monochromeStrength?: number
    negative?: boolean
    saturation?: number
    textureOverrideEnabled?: boolean
  } = $props()

  const viewport = useViewport()

  const { autoRenderTask, renderer } = useThrelte()

  interactivity()

  const radius = 1.4
  const TAU = 2 * Math.PI

  const cards = $derived(urls.map((url) => new Card(url)))

  const uTime = new Uniform(0)
  const uAlphaTexture = new Uniform<Texture | null>(null)
  useTexture('/textures/alpha.jpg').then((texture) => {
    uAlphaTexture.value = texture
  })

  const scene = new Scene()
  const orthoCamera = new OrthographicCamera(-1, 1, 1 - 1, -1, 1)

  const rgbaTextureTarget = new WebGLRenderTarget(256, 256, {
    count
  })

  const colorProcessingTexture = $derived.by(() => {
    if (!textureOverrideEnabled) return
    return rgbaTextureTarget.textures[0]
  })

  for (let i = 0, l = names.length; i < l; i += 1) {
    const texture = rgbaTextureTarget.textures[i + 1]
    if (texture) texture.name = names[i] ?? ''
  }

  useTask(
    (delta) => {
      uTime.value += delta
      const lastRenderTarget = renderer.getRenderTarget()
      renderer.setRenderTarget(rgbaTextureTarget)
      renderer.render(scene, orthoCamera)
      renderer.setRenderTarget(lastRenderTarget)
    },
    {
      running: () => textureOverrideEnabled,
      before: autoRenderTask
    }
  )

  const camera = new PerspectiveCamera()
</script>

<T
  is={camera}
  makeDefault
  fov={20}
  position={[2, 2, 10]}
>
  <OrbitControls
    autoRotate
    enableDamping
    enableZoom={false}
    enablePan={false}
  />
</T>

<T.Mesh attach={scene}>
  <T.PlaneGeometry args={[2, 2]} />
  <T.ShaderMaterial
    {fragmentShader}
    {vertexShader}
    uniforms.uTime={uTime}
    uniforms.uAlphaTexture={uAlphaTexture}
  />
</T.Mesh>

<HUD>
  <T.OrthographicCamera
    makeDefault
    position.z={10}
    zoom={100}
  />
  <T.Group
    position.x={-1 * $viewport.width + 1}
    position.y={1 * 0.5 * $viewport.height + 1}
    visible={textureOverrideEnabled}
  >
    {#each names as text, index}
      <T.Group position.x={index}>
        <T.Mesh>
          <T.MeshBasicMaterial map={rgbaTextureTarget.textures[index + 1] ?? null} />
          <T.PlaneGeometry />
        </T.Mesh>
        <HTML center>
          <span
            style:color="white"
            style:opacity={+textureOverrideEnabled}>{text}</span
          >
        </HTML>
      </T.Group>
    {/each}
  </T.Group>
</HUD>

<Suspense>
  {#each cards as card, index}
    {@const r = index / cards.length}
    {@const v = r * TAU}
    <T.Mesh
      scale={card.scale.current}
      position={[radius * Math.sin(v), 0, radius * Math.cos(v)]}
      rotation={[0, Math.PI + v, 0]}
      onpointerenter={(e) => {
        e.stopPropagation()
        card.radius.set(0.25)
        card.scale.set(1.3)
        card.zoom.set(1.25)
      }}
      onpointerleave={(e) => {
        e.stopPropagation()
        card.radius.set(0.1)
        card.scale.set(1)
        card.zoom.set(1)
      }}
    >
      <T
        is={BentPlaneGeometry}
        args={[0.1, 1, 1, 20, 20]}
      />
      <ImageMaterial
        radius={card.radius.current}
        side={DoubleSide}
        transparent
        url={card.url}
        zoom={card.zoom.current}
        {alphaSmoothing}
        {alphaThreshold}
        {brightness}
        {colorProcessingTexture}
        {contrast}
        {hue}
        {lightness}
        {monochromeColor}
        {monochromeStrength}
        {negative}
        {saturation}
      />
    </T.Mesh>
  {/each}
</Suspense>
