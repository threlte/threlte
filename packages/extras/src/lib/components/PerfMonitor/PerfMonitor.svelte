<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import { Pane, AutoValue, FpsGraph } from 'svelte-tweakpane-ui'

  const { renderer } = useThrelte()

  let calls = $state(0)

  let geometries = $state(0)
  let textures = $state(0)
  let triangles = $state(0)
  let points = $state(0)
  let lines = $state(0)

  useTask(() => {
    const { geometries: geo, textures: t } = renderer.info.memory
    const { triangles: tri, points: p, calls: c, lines: l } = renderer.info.render
    geometries = geo
    textures = t
    triangles = tri
    points = p
    calls = c
    lines = l
  })
</script>

<Pane
  title="Performance Monitor"
  position="fixed"
>
  <FpsGraph
    disabled
    rows={2}
  />
  <AutoValue
    value={geometries.toFixed(0)}
    label="geometries"
    disabled
  />
  <AutoValue
    value={textures.toFixed(0)}
    label="textures"
    disabled
  />
  <AutoValue
    value={triangles.toFixed(0)}
    label="triangles"
    disabled
  />
  <AutoValue
    value={points.toFixed(0)}
    label="points"
    disabled
  />
  <AutoValue
    value={lines.toFixed(0)}
    label="lines"
    disabled
  />
  <AutoValue
    value={calls.toFixed(0)}
    label="draw calls"
    disabled
  />
</Pane>
