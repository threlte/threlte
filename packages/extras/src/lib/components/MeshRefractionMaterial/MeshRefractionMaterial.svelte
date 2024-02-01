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

  export let envMap: $$Props['envMap'];
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

	const { size } = useThrelte();
  const parent = useParent()

  const isCubeTexture = (def: THREE.CubeTexture | THREE.Texture): def is THREE.CubeTexture =>
    def && (def as THREE.CubeTexture).isCubeTexture

  let defines = {} as { [key: string]: string }

  const updateDefines = () => {
    const temp = {} as { [key: string]: string }
    // Sampler2D and SamplerCube need different defines
    const isCubeMap = isCubeTexture(envMap)
    const w = (isCubeMap ? envMap.image[0]?.width : envMap.image.width) ?? 1024
    const cubeSize = w / 4
    const _lodMax = Math.floor(Math.log2(cubeSize))
    const _cubeSize = Math.pow(2, _lodMax)
    const width = 3 * Math.max(_cubeSize, 16 * 7)
    const height = 4 * _cubeSize
    if (isCubeMap) temp.ENVMAP_TYPE_CUBEM = ''
    temp.CUBEUV_TEXEL_WIDTH = `${1.0 / width}`
    temp.CUBEUV_TEXEL_HEIGHT = `${1.0 / height}`
    temp.CUBEUV_MAX_MIP = `${_lodMax}.0`
    // Add defines from chromatic aberration
    if (aberrationStrength > 0) temp.CHROMATIC_ABERRATIONS = ''
    if (fastChroma) temp.FAST_CHROMA = ''
    return temp
  }

  $: if (envMap && aberrationStrength != null && fastChroma != null) {
    defines = updateDefines()
  }

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

  const { camera } = useThrelte()

  useTask(() => {
    material.uniforms.viewMatrixInverse.value = $camera.matrixWorld
    material.uniforms.projectionMatrixInverse.value = $camera.projectionMatrixInverse
  })
</script>

<T
  is={material}
  uniforms.envMap.value={envMap}
	uniforms.bounces.value={bounces}
	uniforms.ior.value={ior}
	uniforms.fresnel.value={fresnel}
  uniforms.aberrationStrength.value={aberrationStrength}
	uniforms.color.value={new Color(color)}
	resolution={[$size.width, $size.height]}
  defines={defines}
/>
