<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import {
    Color,
    Group,
    Mesh,
    MeshBasicMaterial,
    MeshDepthMaterial,
    OrthographicCamera,
    PlaneGeometry,
    ShaderMaterial,
    WebGLRenderTarget
  } from 'three'
  import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader.js'
  import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js'
  import type { ContactShadowsProps } from './types.js'

  let {
    opacity = 1,
    width = 1,
    height = 1,
    blur = 1,
    far = 10,
    smooth = true,
    resolution = 512,
    frames = Infinity,
    scale = 10,
    color = '#000000',
    depthWrite = false,
    ref = $bindable(),
    children,
    ...props
  }: ContactShadowsProps = $props()

  const { scene, renderer } = useThrelte()

  const group = new Group()
  const scaledWidth = $derived(width * (Array.isArray(scale) ? scale[0] : scale || 1))
  const scaledHeight = $derived(height * (Array.isArray(scale) ? scale[1] : scale || 1))

  const renderTarget = $derived.by(() => {
    const rt = new WebGLRenderTarget(resolution, resolution)
    rt.texture.generateMipmaps = false
    rt.texture.colorSpace = renderer.outputColorSpace
    return rt
  })

  const renderTargetBlur = $derived.by(() => {
    const rt = new WebGLRenderTarget(resolution, resolution)
    rt.texture.generateMipmaps = false
    return rt
  })

  const planeGeometry = $derived(new PlaneGeometry(scaledWidth, scaledHeight).rotateX(Math.PI / 2))
  const blurPlane = $derived(new Mesh(planeGeometry))

  const depthMaterial = $derived.by(() => {
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

      shader.fragmentShader = `uniform vec3 uColor;\n${shader.fragmentShader}`

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

  const horizontalBlurMaterial = new ShaderMaterial({
    ...HorizontalBlurShader,
    depthTest: false
  })

  const verticalBlurMaterial = new ShaderMaterial({
    ...VerticalBlurShader,
    depthTest: false
  })

  const shadowCamera = $derived(
    new OrthographicCamera(
      -scaledWidth / 2,
      scaledWidth / 2,
      scaledHeight / 2,
      -scaledHeight / 2,
      0,
      far
    )
  )
  $effect.pre(() => shadowCamera.updateProjectionMatrix())

  const shadowMaterial = $derived(
    new MeshBasicMaterial({
      map: renderTarget.texture,
      transparent: true,
      opacity,
      depthWrite
    })
  )

  const blurShadows = (blur: number) => {
    // separate from store to not call store setter
    blurPlane.visible = true

    blurPlane.material = horizontalBlurMaterial
    horizontalBlurMaterial.uniforms.tDiffuse.value = renderTarget.texture
    horizontalBlurMaterial.uniforms.h.value = (blur * 1) / 256

    renderer.setRenderTarget(renderTargetBlur)
    renderer.render(blurPlane, shadowCamera)

    blurPlane.material = verticalBlurMaterial
    verticalBlurMaterial.uniforms.tDiffuse.value = renderTargetBlur.texture
    verticalBlurMaterial.uniforms.v.value = (blur * 1) / 256

    renderer.setRenderTarget(renderTarget)
    renderer.render(blurPlane, shadowCamera)

    blurPlane.visible = false
  }

  const renderShadows = () => {
    // remove the background
    const initialBackground = scene.background
    scene.background = null

    // force the depthMaterial to everything
    const initialOverrideMaterial = scene.overrideMaterial
    scene.overrideMaterial = depthMaterial

    // set renderer clear alpha
    const initialClearAlpha = renderer.getClearAlpha()
    renderer.setClearAlpha(0)

    // render to the render target to get the depths
    renderer.setRenderTarget(renderTarget)
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

  /**
   * Renders the shadows.
   */
  export const refresh = () => {
    renderShadows()
  }

  const task = useTask(
    () => {
      renderShadows()
    },
    { autoStart: false }
  )

  let count = 0
  const countTask = useTask(
    () => {
      renderShadows()
      count += 1
      if (count >= frames) countTask.stop()
    },
    { autoStart: false }
  )

  $effect.pre(() => {
    if (frames === Number.POSITIVE_INFINITY) {
      task.start()
    } else if (count < frames) {
      countTask.start()
    }
  })

  onDestroy(() => {
    renderTarget.dispose()
    renderTargetBlur.dispose()
    planeGeometry.dispose()
    depthMaterial.dispose()
    horizontalBlurMaterial.dispose()
    verticalBlurMaterial.dispose()
    shadowMaterial.dispose()
  })
</script>

<T
  is={group}
  bind:ref
  {...props}
>
  <T.Group rotation.x={Math.PI / 2}>
    <T.Mesh
      scale.y={-1}
      rotation.x={-Math.PI / 2}
      material={shadowMaterial}
      geometry={planeGeometry}
    />
    <T
      is={shadowCamera}
      manual
    />
    {@render children?.({ ref: group })}
  </T.Group>
</T>
