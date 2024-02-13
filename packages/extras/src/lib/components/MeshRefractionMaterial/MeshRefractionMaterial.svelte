<script lang="ts">
  import { T, useParent, useTask, useThrelte } from '@threlte/core'
  import { Color, CubeTexture, Matrix4, Mesh, ShaderMaterial, Texture, Vector2 } from 'three'
  import { onMount } from 'svelte'
  import { MeshBVH, MeshBVHUniformStruct, SAH } from 'three-mesh-bvh'
  import type {
    MeshRefractionMaterialEvents,
    MeshRefractionMaterialProps,
    MeshRefractionMaterialSlots
  } from './MeshRefractionMaterial.svelte'
  import { fragmentShader } from './fragment'
  import { vertexShader } from './vertex'

  type $$Props = Required<MeshRefractionMaterialProps>
  type $$Events = MeshRefractionMaterialEvents
  type $$Slots = MeshRefractionMaterialSlots

  export let envMap: $$Props['envMap']
  export let bounces: $$Props['bounces'] = 2
  export let ior: $$Props['ior'] = 2.4
  export let fresnel: $$Props['fresnel'] = 0
  export let aberrationStrength: $$Props['aberrationStrength'] = 0
  export let color: $$Props['color'] = 'white'
  export let fastChroma: $$Props['fastChroma'] = true

  let material = new ShaderMaterial({
    fragmentShader,
    vertexShader,
    uniforms: {
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
  })

  const { size, invalidate, camera } = useThrelte()
  const parent = useParent()

  const isCubeTexture = (def: CubeTexture | Texture): def is CubeTexture =>
    def && (def as CubeTexture).isCubeTexture

  let defines = {} as { [key: string]: string }

  const updateDefines = (
    envMap: $$Props['envMap'],
    aberrationStrength: $$Props['aberrationStrength'],
    fastChroma: $$Props['fastChroma']
  ) => {
    const temp = {} as { [key: string]: string }
    // Sampler2D and SamplerCube need different defines
    const isCubeMap = isCubeTexture(envMap)
    const w = (isCubeMap ? envMap.image[0]?.width : envMap.image.width) ?? 1024
    const cubeSize = w / 4
    const lodMax = Math.floor(Math.log2(cubeSize))
    const _cubeSize = Math.pow(2, lodMax)
    const width = 3 * Math.max(_cubeSize, 16 * 7)
    const height = 4 * _cubeSize
    if (isCubeMap) temp.ENVMAP_TYPE_CUBEM = ''
    temp.CUBEUV_TEXEL_WIDTH = `${1.0 / width}`
    temp.CUBEUV_TEXEL_HEIGHT = `${1.0 / height}`
    temp.CUBEUV_MAX_MIP = `${lodMax}.0`
    // Add defines from chromatic aberration
    if (aberrationStrength > 0) temp.CHROMATIC_ABERRATIONS = ''
    if (fastChroma) temp.FAST_CHROMA = ''
    return temp
  }

  $: defines = updateDefines(envMap, aberrationStrength, fastChroma)

  onMount(() => {
    // Update the BVH
    if ($parent && $parent instanceof Mesh && $parent.geometry) {
      material.uniforms.bvh.value = new MeshBVHUniformStruct()
      material.uniforms.bvh.value.updateFrom(
        new MeshBVH($parent?.geometry.clone().toNonIndexed(), {
          strategy: SAH
        })
      )
    }
  })

  useTask(
    () => {
      material.uniforms.viewMatrixInverse.value = camera.current.matrixWorld
      material.uniforms.projectionMatrixInverse.value = camera.current.projectionMatrixInverse
    },
    { autoInvalidate: false }
  )

  const colorObj = new Color(color)
  $: {
    colorObj.set(color)
    invalidate()
  }
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
/>
