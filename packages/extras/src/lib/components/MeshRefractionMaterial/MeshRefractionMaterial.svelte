<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, useThrelte } from '@threlte/core'
  import { Color, Matrix4, ShaderMaterial, Texture, Uniform, Vector2 } from 'three'
  import { MeshBVH, MeshBVHUniformStruct, SAH } from 'three-mesh-bvh'
  import type { MeshRefractionMaterialProps } from './types.js'
  import { fragmentShader } from './fragment.js'
  import { vertexShader } from './vertex.js'

  let {
    envMap,
    bounces = 2,
    ior = 2.4,
    fresnel = 0,
    aberrationStrength = 0,
    color = 'white',
    fastChroma = true,
    ref = $bindable(),
    ...props
  }: MeshRefractionMaterialProps = $props()

  const { size, invalidate, camera } = useThrelte()
  const parent = useParent()

  const uniforms = {
    envMap: new Uniform<Texture | undefined>(undefined),
    bounces: new Uniform(2),
    ior: new Uniform(2.4),
    aberrationStrength: new Uniform(0),
    fresnel: new Uniform(0),
    correctMips: new Uniform(true),
    bvh: new Uniform(new MeshBVHUniformStruct()),
    color: new Uniform(new Color('white')),
    resolution: new Uniform(new Vector2()),
    viewMatrixInverse: new Uniform(new Matrix4()),
    projectionMatrixInverse: new Uniform(new Matrix4())
  }

  let defines: Record<string, string> = {}

  const material = new ShaderMaterial({
    fragmentShader,
    vertexShader,
    uniforms,
    defines
  })

  $effect(() => {
    // Sampler2D and SamplerCube need different defines
    const isCubeMap = isInstanceOf(envMap, 'CubeTexture')
    const w = (isCubeMap ? envMap.image[0]?.width : envMap?.image.width) ?? 1024
    const cubeSize = w / 4
    const lodMax = Math.floor(Math.log2(cubeSize))
    const _cubeSize = Math.pow(2, lodMax)
    const width = 3 * Math.max(_cubeSize, 16 * 7)
    const height = 4 * _cubeSize

    if (isCubeMap) defines.ENVMAP_TYPE_CUBEM = ''

    defines.CUBEUV_TEXEL_WIDTH = `${1.0 / width}`
    defines.CUBEUV_TEXEL_HEIGHT = `${1.0 / height}`
    defines.CUBEUV_MAX_MIP = `${lodMax}.0`
  })

  $effect(() => {
    // Update the BVH
    if (isInstanceOf(parent.current, 'Mesh')) {
      uniforms.bvh.value = new MeshBVHUniformStruct()
      uniforms.bvh.value.updateFrom(
        new MeshBVH(parent.current.geometry.clone().toNonIndexed(), {
          strategy: SAH
        })
      )
    }
  })

  useTask(
    () => {
      uniforms.viewMatrixInverse.value = camera.current.matrixWorld
      uniforms.projectionMatrixInverse.value = camera.current.projectionMatrixInverse
    },
    { autoInvalidate: false }
  )

  $effect(() => {
    if (aberrationStrength > 0) {
      defines.CHROMATIC_ABERRATIONS = ''
    } else {
      delete defines.CHROMATIC_ABERRATIONS
    }
    invalidate()
  })
  $effect(() => {
    if (fastChroma) {
      defines.FAST_CHROMA = ''
    } else {
      delete defines.FAST_CHROMA
    }
    invalidate()
  })
  $effect(() => {
    uniforms.envMap.value = envMap
    invalidate()
  })
  $effect(() => {
    uniforms.bounces.value = bounces
    invalidate()
  })
  $effect(() => {
    uniforms.ior.value = ior
    invalidate()
  })
  $effect(() => {
    uniforms.fresnel.value = fresnel
    invalidate()
  })
  $effect(() => {
    uniforms.aberrationStrength.value = aberrationStrength
    invalidate()
  })
  $effect(() => {
    uniforms.color.value.set(color)
    invalidate()
  })
  $effect(() => {
    uniforms.resolution.value.set(size.current.width, size.current.height)
    invalidate()
  })
</script>

<T
  is={material}
  bind:ref
  {...props}
/>
