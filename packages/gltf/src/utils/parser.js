import THREE from 'three'
import isVarName from './isVarName.js'

function parse(fileName, gltf, options = {}) {
  const url = fileName
  const animations = gltf.animations
  const hasAnimations = animations.length > 0

  // Collect all objects
  const objects = []
  gltf.scene.traverse((child) => objects.push(child))

  // Browse for duplicates
  const duplicates = {
    names: {},
    materials: {},
    geometries: {}
  }

  function uniqueName(attempt, index = 0) {
    const newAttempt = index > 0 ? attempt + index : attempt
    if (Object.values(duplicates.geometries).find(({ name }) => name === newAttempt) === undefined)
      return newAttempt
    else return uniqueName(attempt, index + 1)
  }

  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      if (child.material) {
        if (!duplicates.materials[child.material.name]) {
          duplicates.materials[child.material.name] = 1
        } else {
          duplicates.materials[child.material.name]++
        }
      }
    }
  })

  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      if (child.geometry) {
        const key = child.geometry.uuid + child.material?.name ?? ''
        if (!duplicates.geometries[key]) {
          let name = (child.name || 'Part').replace(/[^a-zA-Z]/g, '')
          name = name.charAt(0).toUpperCase() + name.slice(1)
          duplicates.geometries[key] = {
            count: 1,
            name: uniqueName(name),
            node: 'nodes' + sanitizeName(child.name)
          }
        } else {
          duplicates.geometries[key].count++
        }
      }
    }
  })

  // Prune duplicate geometries
  for (let key of Object.keys(duplicates.geometries)) {
    const duplicate = duplicates.geometries[key]
    if (duplicate.count === 1) delete duplicates.geometries[key]
  }

  function sanitizeName(name) {
    return isVarName(name) ? `.${name}` : `['${name}']`
  }

  const rNbr = (number) => {
    return parseFloat(number.toFixed(Math.round(options.precision || 2)))
  }

  const rDeg = (number) => {
    const abs = Math.abs(Math.round(parseFloat(number) * 100000))
    for (let i = 1; i <= 10; i++) {
      if (abs === Math.round(parseFloat(Math.PI / i) * 100000))
        return `${number < 0 ? '-' : ''}Math.PI${i > 1 ? ' / ' + i : ''}`
    }
    for (let i = 1; i <= 10; i++) {
      if (abs === Math.round(parseFloat(Math.PI * i) * 100000))
        return `${number < 0 ? '-' : ''}Math.PI${i > 1 ? ' * ' + i : ''}`
    }
    return rNbr(number)
  }

  function printThrelteTypes(objects, animations) {
    let meshes = objects.filter((o) => o.isMesh && o.__removed === undefined)
    let bones = objects.filter(
      (o) => o.isBone && !(o.parent && o.parent.isBone) && o.__removed === undefined
    )
    let materials = [
      ...new Set(objects.filter((o) => o.material && o.material.name).map((o) => o.material))
    ]

    /** @type {string[]} */
    const types = []

    if (animations.length) {
      types.push(`type ActionName = ${animations.map((clip, i) => `"${clip.name}"`).join(' | ')};`)
    }

    types.push(`type GLTFResult = {
    nodes: {
      ${meshes
        .map(({ name, type }) => (isVarName(name) ? name : `['${name}']`) + ': THREE.' + type)
        .join(',')}
      ${bones
        .map(({ name, type }) => (isVarName(name) ? name : `['${name}']`) + ': THREE.' + type)
        .join(',')}
    }
    materials: {
      ${materials
        .map(({ name, type }) => (isVarName(name) ? name : `['${name}']`) + ': THREE.' + type)
        .join(',')}
    }
  }`)

    return types.join('\n')
  }

  function getType(obj) {
    let type = obj.type.charAt(0).toLowerCase() + obj.type.slice(1)
    // Turn object3d's into groups, it should be faster according to the threejs docs
    if (type === 'object3D') type = 'group'
    if (type === 'perspectiveCamera') type = 'PerspectiveCamera'
    if (type === 'orthographicCamera') type = 'OrthographicCamera'
    return type
  }

  function handleThrelteProps(obj) {
    let { type, node, instanced } = getInfo(obj)

    let result = ''
    let isCamera = type === 'PerspectiveCamera' || type === 'OrthographicCamera'
    // Handle cameras
    if (isCamera) {
      result += `makeDefault={false} `
      if (obj.zoom !== 1) result += `zoom={${rNbr(obj.zoom)}} `
      if (obj.far !== 2000) result += `far={${rNbr(obj.far)}} `
      if (obj.near !== 0.1) result += `near={${rNbr(obj.near)}} `
    }
    if (type === 'PerspectiveCamera') {
      if (obj.fov !== 50) result += `fov={${rNbr(obj.fov)}} `
    }

    if (!instanced) {
      // Shadows
      if ((type === 'mesh' || type === 'skinnedMesh') && options.shadows)
        result += `castShadow receiveShadow `

      // Write out geometry first
      if (obj.geometry) {
        result += `geometry={gltf.${node}.geometry} `
      }

      // Write out materials
      if (obj.material) {
        if (obj.material.name)
          result += `material={gltf.materials${sanitizeName(obj.material.name)}} `
        else result += `material={gltf.${node}.material} `
      }

      if (obj.skeleton) result += `skeleton={gltf.${node}.skeleton} `
      if (obj.visible === false) result += `visible={false} `
      if (obj.castShadow === true) result += `castShadow `
      if (obj.receiveShadow === true) result += `receiveShadow `
      if (obj.morphTargetDictionary)
        result += `morphTargetDictionary={gltf.${node}.morphTargetDictionary} `
      if (obj.morphTargetInfluences)
        result += `morphTargetInfluences={gltf.${node}.morphTargetInfluences} `
      if (obj.intensity && rNbr(obj.intensity)) result += `intensity={${rNbr(obj.intensity)}} `
      //if (obj.power && obj.power !== 4 * Math.PI) result += `power={${rNbr(obj.power)}} `
      if (obj.angle && obj.angle !== Math.PI / 3) result += `angle={${rDeg(obj.angle)}} `
      if (obj.penumbra && rNbr(obj.penumbra) !== 0) result += `penumbra={${rNbr(obj.penumbra)}} `
      if (obj.decay && rNbr(obj.decay) !== 1) result += `decay={${rNbr(obj.decay)}} `
      if (obj.distance && rNbr(obj.distance) !== 0) result += `distance={${rNbr(obj.distance)}} `
      if (obj.up && obj.up.isVector3 && !obj.up.equals(new THREE.Vector3(0, 1, 0)))
        result += `up={[${rNbr(obj.up.x)}, ${rNbr(obj.up.y)}, ${rNbr(obj.up.z)},]} `
    }

    if (obj.color && obj.color.getHexString() !== 'ffffff')
      result += `color="#${obj.color.getHexString()}" `
    if (obj.position && obj.position.isVector3 && rNbr(obj.position.length()))
      result += `position={[${rNbr(obj.position.x)}, ${rNbr(obj.position.y)}, ${rNbr(
        obj.position.z
      )},]} `
    if (
      obj.rotation &&
      obj.rotation.isEuler &&
      rNbr(new THREE.Vector3(...obj.rotation.toArray()).length())
    )
      result += `rotation={[${rDeg(obj.rotation.x)}, ${rDeg(obj.rotation.y)}, ${rDeg(
        obj.rotation.z
      )},]} `
    if (
      obj.scale &&
      obj.scale.isVector3 &&
      !(rNbr(obj.scale.x) === 1 && rNbr(obj.scale.y) === 1 && rNbr(obj.scale.z) === 1)
    ) {
      const rX = rNbr(obj.scale.x)
      const rY = rNbr(obj.scale.y)
      const rZ = rNbr(obj.scale.z)
      if (rX === rY && rX === rZ) {
        result += `scale={${rX}} `
      } else {
        result += `scale={[${rX}, ${rY}, ${rZ},]} `
      }
    }
    if (options.meta && obj.userData && Object.keys(obj.userData).length)
      result += `userData={${JSON.stringify(obj.userData)}} `

    return result
  }

  function getInfo(obj) {
    let type = getType(obj)
    let node = 'nodes' + sanitizeName(obj.name)

    // TODO: @threlte/gltf does not support instancing yet
    let instanced = false
    let animated = gltf.animations && gltf.animations.length > 0
    return { type, node, instanced, animated }
  }

  function equalOrNegated(a, b) {
    return (
      (a.x === b.x || a.x === -b.x) &&
      (a.y === b.y || a.y === -b.y) &&
      (a.z === b.z || a.z === -b.z)
    )
  }

  function prune(obj, children, result, oldResult, silent) {
    let { type, animated } = getInfo(obj)
    // Prune ...
    if (
      !obj.__removed &&
      !options.keepgroups &&
      !animated &&
      (type === 'group' || type === 'scene')
    ) {
      /** Empty or no-property groups
       *    <T.Group>
       *      <T.Mesh geometry={nodes.foo} material={materials.bar} />
       *  Solution:
       *    <T.Mesh geometry={nodes.foo} material={materials.bar} />
       */
      if (result === oldResult || obj.children.length === 0) {
        if (!silent) console.log(`group ${obj.name} removed (empty)`)
        obj.__removed = true
        return children
      }

      // More aggressive removal strategies ...
      const first = obj.children[0]
      const firstProps = handleThrelteProps(first)
      const regex = /([a-z-A-Z]*)={([a-zA-Z0-9\.\[\]\-\,\ \/]*)}/g
      const keys1 = [...result.matchAll(regex)].map(([, match]) => match)
      const values1 = [...result.matchAll(regex)].map(([, , match]) => match)
      const keys2 = [...firstProps.matchAll(regex)].map(([, match]) => match)

      /** Double negative rotations
       *    <T.Group rotation={[-Math.PI / 2, 0, 0]}>
       *      <T.Group rotation={[Math.PI / 2, 0, 0]}>
       *        <T.Mesh geometry={nodes.foo} material={materials.bar} />
       *  Solution:
       *    <T.Mesh geometry={nodes.foo} material={materials.bar} />
       */
      if (
        obj.children.length === 1 &&
        getType(first) === type &&
        equalOrNegated(obj.rotation, first.rotation)
      ) {
        if (
          keys1.length === 1 &&
          keys2.length === 1 &&
          keys1[0] === 'rotation' &&
          keys2[0] === 'rotation'
        ) {
          if (!silent)
            console.log(`group ${obj.name} removed (aggressive: double negative rotation)`)
          obj.__removed = first.__removed = true
          children = ''
          if (first.children)
            first.children.forEach((child) => (children += printThrelte(child, true)))
          return children
        }
      }

      /** Double negative rotations w/ props
       *    <T.Group rotation={[-Math.PI / 2, 0, 0]}>
       *      <T.Group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
       *        <T.Mesh geometry={nodes.foo} material={materials.bar} />
       *  Solution:
       *    <T.Group scale={0.01}>
       *      <T.Mesh geometry={nodes.foo} material={materials.bar} />
       */
      if (
        obj.children.length === 1 &&
        getType(first) === type &&
        equalOrNegated(obj.rotation, first.rotation)
      ) {
        if (
          keys1.length === 1 &&
          keys2.length > 1 &&
          keys1[0] === 'rotation' &&
          keys2.includes('rotation')
        ) {
          if (!silent)
            console.log(`group ${obj.name} removed (aggressive: double negative rotation w/ props)`)
          obj.__removed = true
          // Remove rotation from first child
          first.rotation.set(0, 0, 0)
          children = printThrelte(first, true)
          return children
        }
      }

      /** Transform overlap
       *    <T.Group position={[10, 0, 0]} scale={2} rotation={[-Math.PI / 2, 0, 0]}>
       *      <T.Mesh geometry={nodes.foo} material={materials.bar} />
       *  Solution:
       *    <T.Mesh geometry={nodes.foo} material={materials.bar} position={[10, 0, 0]} scale={2} rotation={[-Math.PI / 2, 0, 0]} />
       */
      const isChildTransformed =
        keys2.includes('position') || keys2.includes('rotation') || keys2.includes('scale')
      const hasOtherProps = keys1.some((key) => !['position', 'scale', 'rotation'].includes(key))
      if (obj.children.length === 1 && !first.__removed && !isChildTransformed && !hasOtherProps) {
        if (!silent)
          console.log(`group ${obj.name} removed (aggressive: ${keys1.join(' ')} overlap)`)
        // Move props over from the to-be-deleted object to the child
        // This ensures that the child will have the correct transform when pruning is being repeated
        keys1.forEach((key) => obj.children[0][key].copy(obj[key]))
        // Insert the props into the result string
        children = printThrelte(first, true)
        obj.__removed = true
        return children
      }

      /** Lack of content
       *    <T.Group position={[10, 0, 0]} scale={2} rotation={[-Math.PI / 2, 0, 0]}>
       *      <T.Group position={[10, 0, 0]} scale={2} rotation={[-Math.PI / 2, 0, 0]}>
       *        <T.Group position={[10, 0, 0]} scale={2} rotation={[-Math.PI / 2, 0, 0]} />
       * Solution:
       *   (delete the whole sub graph)
       */
      const empty = []
      obj.traverse((o) => {
        const type = getType(o)
        if (type !== 'group' && type !== 'object3D') empty.push(o)
      })
      if (!empty.length) {
        if (!silent) console.log(`group ${obj.name} removed (aggressive: lack of content)`)
        empty.forEach((child) => (child.__removed = true))
        return ''
      }
    }
  }

  /**
   * Transforms a type like "mesh" into "T.Mesh".
   * @param {string} type
   * @returns
   */
  function getThrelteComponentName(type) {
    return `T.${type[0].toUpperCase()}${type.slice(1)}`
  }

  function printThrelte(obj, silent = false) {
    let result = ''
    let children = ''
    let { type, node, animated } = getInfo(obj)

    // Check if the root node is useless
    if (obj.__removed && obj.children.length) {
      obj.children.forEach((child) => (result += printThrelte(child)))
      return result
    }

    // Bail out on lights and bones
    if (type === 'bone') {
      return `<T is={gltf.${node}} />\n`
    }

    // Collect children
    if (obj.children) obj.children.forEach((child) => (children += printThrelte(child)))

    // TODO: Instances are currently not supported for Threlte components

    result = `<${getThrelteComponentName(type)} `

    // Include names when output is uncompressed or morphTargetDictionaries are present
    if (obj.name.length && (options.keepnames || obj.morphTargetDictionary || animated))
      result += `name="${obj.name}" `

    const oldResult = result
    result += handleThrelteProps(obj)

    const pruned = prune(obj, children, result, oldResult, silent)
    // Bail out if the object was pruned
    if (pruned !== undefined) return pruned

    // Close tag
    result += `${children.length ? '>' : '/>'}\n`

    // Add children and return
    if (children.length) result += children + `\n</${getThrelteComponentName(type)}>\n`
    return result
  }

  function parseExtras(extras) {
    if (extras) {
      return (
        Object.keys(extras)
          .map((key) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${extras[key]}`)
          .join('\n') + '\n'
      )
    } else return ''
  }

  function p(obj, line) {
    console.log(
      [...new Array(line * 2)].map(() => ' ').join(''),
      obj.type,
      obj.name,
      'pos:',
      obj.position.toArray().map(rNbr),
      'scale:',
      obj.scale.toArray().map(rNbr),
      'rot:',
      [obj.rotation.x, obj.rotation.y, obj.rotation.z].map(rNbr),
      'mat:',
      obj.material ? `${obj.material.name}-${obj.material.uuid.substring(0, 8)}` : ''
    )
    obj.children.forEach((o) => p(o, line + 1))
  }

  if (options.debug) p(gltf.scene, 0)

  if (!options.keepgroups) {
    // Dry run to prune graph
    printThrelte(gltf.scene)

    // Move children of deleted objects to their new parents
    objects.forEach((o) => {
      if (o.__removed) {
        let parent = o.parent
        // Making sure we don't add to a removed parent
        while (parent && parent.__removed) parent = parent.parent
        // If no parent was found it must be the root node
        if (!parent) parent = gltf.scene
        o.children.slice().forEach((child) => parent.add(child))
      }
    })
    // Remove deleted objects
    objects.forEach((o) => {
      if (o.__removed && o.parent) o.parent.remove(o)
    })
  }

  // 2nd pass to eliminate hard to swat left-overs
  const scene = printThrelte(gltf.scene)

  const useGltfOptions =
    options.transform && options.draco
      ? {
          useDraco: options.draco
        }
      : options.transform
      ? {
          useDraco: true
        }
      : undefined

  const imports = `
	${options.types ? `\nimport type * as THREE from 'three'` : ''}
  ${options.stype && !options.isolated ? `import type { Snippet } from 'svelte'` : ''}
        import { ${[
          'T',
          options.types && !options.isolated ? 'type Props' : ''
        ]
          .filter(Boolean)
          .join(', ')} } from '@threlte/core'
        import { ${[
          'useGltf',
          hasAnimations ? 'useGltfAnimations' : '',
          options.suspense ? 'useSuspense' : ''
        ]
          .filter(Boolean)
          .join(', ')} } from '@threlte/extras'
	`

  const useGltf = `${options.suspense ? 'suspend(' : ''}useGltf${
    options.types ? '<GLTFResult>' : ''
  }('${url}'${useGltfOptions ? `, ${JSON.stringify(useGltfOptions)}` : ''})${
    options.suspense ? ')' : ''
  }`

  // Output
  return `
    <!--
${
  options.header
    ? options.header
    : 'Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf'
}
${parseExtras(gltf.parser.json.asset && gltf.parser.json.asset.extras)}-->

${
  options.preload
    ? `
<script context="module"${options.types ? ' lang="ts"' : ''}>
	${imports}

	${options.types ? printThrelteTypes(objects, animations) : ''}

	const load = () => {
		${options.suspense ? 'const suspend = useSuspense()' : ''}
		return ${useGltf}
	}

	export const preload = async () => {
		await load()
	}
</script>
`
    : ''
}


    <script${options.types ? ' lang="ts"' : ''}>
				${!options.preload ? imports : ''}

        let {
          ref = $bindable(),
          fallback,
          error,
          children,
          ...props
        }${options.types && !options.isolated ? `: Props<THREE.Group> & {
          ref?: THREE.Group
          children?: Snippet<[{ ref: THREE.Group }]>
          fallback?: Snippet
          error?: Snippet<[{ error: Error }]>
        }` : ''} = $props()

				${!options.preload && options.suspense ? 'const suspend = useSuspense()' : ''}

        ${options.types && !options.preload ? printThrelteTypes(objects, animations) : ''}

        ${!options.preload ? `const gltf = ${useGltf}` : 'const gltf = load()'}
    ${
      hasAnimations
        ? `export const { actions, mixer } = useGltfAnimations${
            options.types ? '<ActionName>' : ''
          }(gltf, ref)`
        : ''
    }
    </script>

		<T.Group bind:ref dispose={false} ${!options.isolated ? '{...props}' : ''}>
			{#await gltf}
        {@render fallback?.()}
			{:then gltf}
				${scene}
			{:catch error}
        {@render error?.({ error })}
			{/await}

      {@render children?.({ ref })}
		</T>
	`
}

export default parse
