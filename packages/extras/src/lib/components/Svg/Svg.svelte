<script lang="ts">
  import { T, useLoader, type Props as ThrelteProps } from '@threlte/core'
  import { DoubleSide, type Group, type Mesh, type MeshBasicMaterial } from 'three'
  import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
  import { useSuspense } from '../../suspense/useSuspense.js'

  interface Props extends ThrelteProps<typeof Group> {
    /** Can be a URL or SVG data */
    src: string
    skipFill?: boolean
    skipStrokes?: boolean
    fillMaterialProps?: ThrelteProps<typeof MeshBasicMaterial>
    strokeMaterialProps?: ThrelteProps<typeof MeshBasicMaterial>
    fillMeshProps?: ThrelteProps<typeof Mesh>
    strokeMeshProps?: ThrelteProps<typeof Mesh>
  }

  let {
    src,
    skipFill = false,
    skipStrokes = false,
    fillMaterialProps,
    strokeMaterialProps,
    fillMeshProps,
    strokeMeshProps,
    ref = $bindable(),
    ...rest
  }: Props = $props()

  const suspend = useSuspense()
  const loader = useLoader(SVGLoader)
  const svg = $derived(
    suspend(loader.load(src.startsWith('<svg') ? `data:image/svg+xml;utf8,${src}` : src))
  )
  const paths = $derived($svg?.paths ?? [])

  const strokeGeometries = $derived.by(() =>
    skipStrokes
      ? []
      : paths.map((path) =>
          path.userData?.style.stroke === undefined || path.userData.style.stroke === 'none'
            ? null
            : path.subPaths.map((subPath) =>
                SVGLoader.pointsToStroke(subPath.getPoints(), path.userData?.style)
              )
        )
  )

  $effect.pre(() => {
    return () => {
      for (const group of strokeGeometries) {
        if (group) {
          group.map((g) => g.dispose())
        }
      }
    }
  })

  // svelte-ignore non_reactive_update
  let renderOrder = 0
</script>

<T.Group
  bind:ref
  {...rest}
>
  <T.Group scale.y={-1}>
    {#each paths as path, p (path)}
      {#if !skipFill && path.userData?.style.fill !== undefined && path.userData.style.fill !== 'none'}
        {#each SVGLoader.createShapes(path) as shape (shape)}
          <T.Mesh
            {...fillMeshProps}
            renderOrder={renderOrder++}
          >
            <T.ShapeGeometry args={[shape]} />
            <T.MeshBasicMaterial
              color={path.userData?.style.fill}
              opacity={path.userData?.style.fillOpacity}
              transparent={true}
              side={DoubleSide}
              depthWrite={false}
              {...fillMaterialProps}
            />
          </T.Mesh>
        {/each}
      {/if}

      {#if !skipStrokes && path.userData?.style.stroke !== undefined && path.userData.style.stroke !== 'none'}
        {#each path.subPaths as _subPath, s (_subPath)}
          {#if strokeGeometries[p]}
            <T.Mesh
              geometry={strokeGeometries[p]?.[s]}
              {...strokeMeshProps}
              renderOrder={renderOrder++}
            >
              <T.MeshBasicMaterial
                color={path.userData?.style.stroke}
                opacity={path.userData?.style.strokeOpacity}
                transparent={true}
                side={DoubleSide}
                depthWrite={false}
                {...strokeMaterialProps}
              />
            </T.Mesh>
          {/if}
        {/each}
      {/if}
    {/each}
  </T.Group>
</T.Group>
