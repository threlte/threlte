<script lang="ts">
  import { T, useTask, useThrelte, useParent } from '@threlte/core'
  import { Color, Vector2, Matrix4, ShaderMaterial, Mesh } from 'three'

  import { MeshBVHUniformStruct, MeshBVH, SAH } from 'three-mesh-bvh'
  import { onMount } from 'svelte'

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

  const isCubeTexture = (def: THREE.CubeTexture | THREE.Texture): def is THREE.CubeTexture =>
    def && (def as THREE.CubeTexture).isCubeTexture

  let defines = {} as { [key: string]: string }

  const updateDefines = (
    envMap: $$Props['envMap'],
    aberrationStrength: $$Props['aberrationStrength'],
    fastChroma: $$Props['fastChroma']
  ) => {
    const tempDefines = {} as { [key: string]: string }
    // Sampler2D and SamplerCube need different defines
    const isCubeMap = isCubeTexture(envMap)
    const w = (isCubeMap ? envMap.image[0]?.width : envMap.image.width) ?? 1024
    const cubeSize = w / 4
    const lodMax = Math.floor(Math.log2(cubeSize))
    const cubeSize = Math.pow(2, lodMax)
    const width = 3 * Math.max(cubeSize, 16 * 7)
    const height = 4 * cubeSize
    if (isCubeMap) tempDefines.ENVMAP_TYPE_CUBEM = ''
    tempDefines.CUBEUV_TEXEL_WIDTH = `${1.0 / width}`
    tempDefines.CUBEUV_TEXEL_HEIGHT = `${1.0 / height}`
    tempDefines.CUBEUV_MAX_MIP = `${lodMax}.0`
    // Add defines from chromatic aberration
    if (aberrationStrength > 0) tempDefines.CHROMATIC_ABERRATIONS = ''
    if (fastChroma) tempDefines.FAST_CHROMA = ''
    return tempDefines
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


  useTask(() => {
    material.uniforms.viewMatrixInverse.value = camera.current.matrixWorld
    material.uniforms.projectionMatrixInverse.value = camera.current.projectionMatrixInverse
  }, { autoInvalidate: false })
  
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
