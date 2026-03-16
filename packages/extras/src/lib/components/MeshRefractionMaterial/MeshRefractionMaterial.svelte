<script lang="ts">
  import { isInstanceOf, T, useParent, useTask, useThrelte } from '@threlte/core'
  import { onMount } from 'svelte'
  import { Color, type CubeTexture, Matrix4, Mesh, ShaderMaterial, Texture, Vector2 } from 'three'
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

  const uniforms = {
    envMap: { value: null },
    bounces: { value: 2 },
    ior: { value: 2.4 },
    correctMips: { value: true },
    aberrationStrength: { value: 0.01 },
    fresnel: { value: 0 },
    bvh: { value: new MeshBVHUniformStruct() },
    color: { value: new Color('white') },
    resolution: { value: new Vector2() },
    viewMatrixInverse: { value: new Matrix4() },
    projectionMatrixInverse: { value: new Matrix4() }
  }

  const material = new ShaderMaterial({
    fragmentShader,
    vertexShader,
    uniforms
  })
  ref = material

  const { size, invalidate, camera } = useThrelte()
  const parent = useParent()

  let defines: Record<string, string> = {}

  const updateDefines = (
    envMap: CubeTexture | Texture | undefined,
    aberrationStrength: number,
    fastChroma: boolean
  ) => {
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

    // Add defines from chromatic aberration
    if (aberrationStrength > 0) defines.CHROMATIC_ABERRATIONS = ''
    if (fastChroma) defines.FAST_CHROMA = ''
  }

  $effect.pre(() => {
    updateDefines(envMap, aberrationStrength, fastChroma)
  })

  onMount(() => {
    // Update the BVH
    if ($parent && $parent instanceof Mesh && $parent.geometry) {
      uniforms.bvh.value = new MeshBVHUniformStruct()
      uniforms.bvh.value.updateFrom(
        new MeshBVH($parent?.geometry.clone().toNonIndexed(), {
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

  const colorObj = new Color(color)
  $effect.pre(() => {
    colorObj.set(color)
    invalidate()
  })
</script>

<T
  is={material}
  uniforms.envMap.value={envMap}
  uniforms.bounces.value={bounces}
  uniforms.ior.value={ior}
  uniforms.fresnel.value={fresnel}
  uniforms.aberrationStrength.value={aberrationStrength}
  uniforms.color.value={colorObj}
  uniforms.resolution.value={[$size.width, $size.height]}
  {defines}
  {...props}
/>
