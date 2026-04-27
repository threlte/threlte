<script
  module
  lang="ts"
>
  import { BufferGeometry, Mesh, WireframeGeometry, BufferAttribute, Uniform, Color } from 'three'

  import type { WireframeProps } from './types.js'
  import { setWireframeOverride } from './material.js'
  import { isInstanceOf, useParent } from '@threlte/core'

  const getBarycentricCoordinates = (geometry: BufferGeometry, removeEdge?: boolean) => {
    const position = geometry.getAttribute('position')
    const array = new Float32Array(position.count * 3)
    const Q = removeEdge ? 1 : 0

    for (let i = 0, l = array.length; i < l; i += 9) {
      const even = (i / 9) % 2 === 0
      if (even) {
        array[i + 2] = 1
        array[i + 4] = 1
        array[i + 6] = 1
        array[i + 8] = Q
      } else {
        array[i + 1] = 1
        array[i + 5] = 1
        array[i + 6] = 1
        array[i + 8] = Q
      }
    }

    return new BufferAttribute(array, 3)
  }

  const createWireframeGeometry = (geometry: BufferGeometry, simplify: boolean) => {
    const wireframeGeometry = geometry.index ? geometry.toNonIndexed() : geometry.clone()

    if (!wireframeGeometry.getAttribute('position')) {
      wireframeGeometry.dispose()
      return undefined
    }

    const newBarycentric = getBarycentricCoordinates(wireframeGeometry, simplify)

    wireframeGeometry.setAttribute('barycentric', newBarycentric)

    return wireframeGeometry
  }
</script>

<script lang="ts">
  let { simplify = false, ...rest }: WireframeProps = $props()

  const parent = useParent()
  const fillOpacity = new Uniform(0)
  const strokeOpacity = new Uniform(0)
  const fillMix = new Uniform(0)
  const thickness = new Uniform(0)
  const colorBackfaces = new Uniform(false)
  const dashInvert = new Uniform(true)
  const dash = new Uniform(false)
  const dashRepeats = new Uniform(0)
  const dashLength = new Uniform(0)
  const squeeze = new Uniform(false)
  const squeezeMin = new Uniform(0)
  const squeezeMax = new Uniform(0)
  const stroke = new Uniform(new Color())
  const backfaceStroke = new Uniform(new Color())
  const fill = new Uniform(new Color())

  $effect.pre(() => {
    fillOpacity.value = rest.fillOpacity ?? 0
  })
  $effect.pre(() => {
    fillMix.value = rest.fillMix ?? 0
  })
  $effect.pre(() => {
    strokeOpacity.value = rest.strokeOpacity ?? 1
  })
  $effect.pre(() => {
    thickness.value = rest.thickness ?? 1
  })
  $effect.pre(() => {
    colorBackfaces.value = rest.colorBackfaces ?? false
  })
  $effect.pre(() => {
    dash.value = rest.dash ?? false
  })
  $effect.pre(() => {
    dashInvert.value = rest.dashInvert ?? true
  })
  $effect.pre(() => {
    dashRepeats.value = rest.dashRepeats ?? 4
  })
  $effect.pre(() => {
    dashLength.value = rest.dashLength ?? 0.5
  })
  $effect.pre(() => {
    squeeze.value = rest.squeeze ?? false
  })
  $effect.pre(() => {
    squeezeMin.value = rest.squeezeMin ?? 0.2
  })
  $effect.pre(() => {
    squeezeMax.value = rest.squeezeMax ?? 1
  })
  $effect.pre(() => {
    stroke.value.set(rest.stroke ?? '#ff0000')
  })
  $effect.pre(() => {
    fill.value.set(rest.fill ?? '#00ff00')
  })
  $effect.pre(() => {
    backfaceStroke.value.set(rest.backfaceStroke ?? '#0000ff')
  })

  $effect.pre(() => {
    const parentMesh = $parent as Mesh

    if (!isInstanceOf(parentMesh, 'Mesh')) {
      return
    }

    if (!parentMesh.geometry) {
      console.error('Wireframe: Must be a child of a Mesh with a geometry.')
      return
    }

    // Disallow WireframeGeometry
    if ((parentMesh.geometry as WireframeGeometry).type === 'WireframeGeometry') {
      console.error('Wireframe: WireframeGeometry is not supported.')
      return
    }

    const originalGeometry = parentMesh.geometry
    const wireframeGeometry = createWireframeGeometry(originalGeometry, simplify)

    if (!wireframeGeometry) {
      console.error('Wireframe: Geometry must have a position attribute.')
      return
    }

    const materials = Array.isArray(parentMesh.material)
      ? parentMesh.material
      : [parentMesh.material]
    const restoreMaterials = materials.map((material) =>
      setWireframeOverride(material, {
        fillOpacity,
        strokeOpacity,
        fillMix,
        thickness,
        colorBackfaces,
        dashInvert,
        dash,
        dashRepeats,
        dashLength,
        squeeze,
        squeezeMin,
        squeezeMax,
        stroke,
        backfaceStroke,
        fill
      })
    )

    parentMesh.geometry = wireframeGeometry

    return () => {
      restoreMaterials.forEach((restoreMaterial) => restoreMaterial())
      if (parentMesh.geometry === wireframeGeometry) {
        parentMesh.geometry = originalGeometry
      }
      wireframeGeometry.dispose()
    }
  })
</script>
