<script lang="ts">
  import { forwardEventHandlers, T, useTask, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import {
    Color,
    Mesh,
    MeshBasicMaterial,
    MeshDepthMaterial,
    OrthographicCamera,
    PlaneGeometry,
    ShaderMaterial,
    WebGLRenderTarget
  } from 'three'
  import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader'
  import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader'
  import { useMemo } from '../../lib/useMemo'
  import type {
    ContactShadowsProps,
    ContactShadowsEvents,
    ContactShadowsSlots
  } from './ContactShadows.svelte'

  type $$Props = ContactShadowsProps
  type $$Events = ContactShadowsEvents
  type $$Slots = ContactShadowsSlots

  // self
  export let opacity: NonNullable<$$Props['opacity']> = 1
  export let width: NonNullable<$$Props['width']> = 1
  export let height: NonNullable<$$Props['height']> = 1
  export let blur: NonNullable<$$Props['blur']> = 1
  export let far: NonNullable<$$Props['far']> = 10
  export let smooth: NonNullable<$$Props['smooth']> = true
  export let resolution: NonNullable<$$Props['resolution']> = 512
  export let frames: NonNullable<$$Props['frames']> = Infinity
  export let scale: NonNullable<$$Props['scale']> = 10
  export let color: NonNullable<$$Props['color']> = '#000000'
  export let depthWrite: NonNullable<$$Props['depthWrite']> = false

  const { scene, renderer } = useThrelte()

  const scaledWidth = useMemo(() => {
    return width * (Array.isArray(scale) ? scale[0] : scale || 1)
  })
  $: scaledWidth.memoize([width, scale])

  const scaledHeight = useMemo(() => {
    return height * (Array.isArray(scale) ? scale[1] : scale || 1)
  })
  $: scaledHeight.memoize(height, scale)

  const renderTarget = useMemo(() => {
    const rt = new WebGLRenderTarget(resolution, resolution)
    rt.texture.generateMipmaps = false
    if ('colorSpace' in rt.texture) {
      rt.texture.colorSpace = renderer.outputColorSpace
    } else {
      // deprecated in three.js r152
      rt.texture.encoding = renderer.outputEncoding
    }
    return rt
  })
  $: renderTarget.memoize(resolution)

  const renderTargetBlur = useMemo(() => {
    const rt = new WebGLRenderTarget(resolution, resolution)
    rt.texture.generateMipmaps = false
    return rt
  })
  $: renderTargetBlur.memoize(resolution)

  const planeGeometry = useMemo(() => {
    return new PlaneGeometry($scaledWidth, $scaledHeight).rotateX(Math.PI / 2)
  })
  $: planeGeometry.memoize($scaledWidth, $scaledHeight)

  const blurPlane = useMemo(() => {
    return new Mesh($planeGeometry)
  })
  $: blurPlane.memoize($planeGeometry)

  const depthMaterial = useMemo(() => {
    const dm = new MeshDepthMaterial({
      depthTest: false,
      depthWrite: false
    })
    dm.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        uColor: {
          value: new Color(color).convertSRGBToLinear()
        }
      }

      shader.fragmentShader = 'uniform vec3 uColor;\n' + shader.fragmentShader

      shader.fragmentShader = shader.fragmentShader.replace(
        'vec4( vec3( 1.0 - fragCoordZ ), opacity );',
        'vec4( uColor, ( 1.0 - fragCoordZ ) * 1.0 );'
      )

      // minified replace, https://github.com/yushijinhun/three-minifier also minifies GLSL files
      shader.fragmentShader = shader.fragmentShader.replace(
        'vec4(vec3(1.0-fragCoordZ),opacity);',
        'vec4(uColor,(1.0-fragCoordZ)*1.0);'
      )
    }
    return dm
  })
  $: depthMaterial.memoize(color)

  const horizontalBlurMaterial = new ShaderMaterial({
    ...HorizontalBlurShader,
    depthTest: false
  })

  const verticalBlurMaterial = new ShaderMaterial({
    ...VerticalBlurShader,
    depthTest: false
  })

  const shadowCamera = new OrthographicCamera(
    -$scaledWidth / 2,
    $scaledWidth / 2,
    $scaledHeight / 2,
    -$scaledHeight / 2,
    0,
    far
  )
  shadowCamera.updateProjectionMatrix()

  const shadowMaterial = new MeshBasicMaterial({
    map: $renderTarget.texture,
    transparent: true,
    opacity,
    depthWrite
  })

  const blurShadows = (blur: number) => {
    // separate from store to not call store setter
    const bp = $blurPlane
    bp.visible = true

    bp.material = horizontalBlurMaterial
    horizontalBlurMaterial.uniforms.tDiffuse.value = $renderTarget.texture
    horizontalBlurMaterial.uniforms.h.value = (blur * 1) / 256

    renderer.setRenderTarget($renderTargetBlur)
    renderer.render(bp, shadowCamera)

    bp.material = verticalBlurMaterial
    verticalBlurMaterial.uniforms.tDiffuse.value = $renderTargetBlur.texture
    verticalBlurMaterial.uniforms.v.value = (blur * 1) / 256

    renderer.setRenderTarget($renderTarget)
    renderer.render(bp, shadowCamera)

    bp.visible = false
  }

  const renderShadows = () => {
    // remove the background
    const initialBackground = scene.background
    scene.background = null

    // force the depthMaterial to everything
    const initialOverrideMaterial = scene.overrideMaterial
    scene.overrideMaterial = $depthMaterial

    // set renderer clear alpha
    const initialClearAlpha = renderer.getClearAlpha()
    renderer.setClearAlpha(0)

    // render to the render target to get the depths
    renderer.setRenderTarget($renderTarget)
    renderer.render(scene, shadowCamera)

    // and reset the override material
    scene.overrideMaterial = initialOverrideMaterial

    blurShadows(blur)
    // a second pass to reduce the artifacts
    if (smooth) blurShadows(blur * 0.4)

    // reset
    renderer.setRenderTarget(null)
    scene.background = initialBackground
    renderer.setClearAlpha(initialClearAlpha)
  }

  export const refresh = () => {
    renderShadows()
  }

  let count = 0
  useTask(() => {
    if (frames === Infinity || count < frames) {
      renderShadows()
      count += 1
    }
  })

  onDestroy(() => {
    $renderTarget.dispose()
    $renderTargetBlur.dispose()
    $planeGeometry.dispose()
    $depthMaterial.dispose()
    horizontalBlurMaterial.dispose()
    verticalBlurMaterial.dispose()
    shadowMaterial.dispose()
  })

  const components = forwardEventHandlers()
</script>

<T.Group
  {...$$restProps}
  let:ref
  bind:this={$components}
>
  <T.Group rotation.x={Math.PI / 2}>
    <T.Mesh
      scale.y={-1}
      rotation.x={-Math.PI / 2}
      material={shadowMaterial}
      geometry={$planeGeometry}
    />

    <T
      is={shadowCamera}
      manual
    />

    <slot {ref} />
  </T.Group>
</T.Group>
