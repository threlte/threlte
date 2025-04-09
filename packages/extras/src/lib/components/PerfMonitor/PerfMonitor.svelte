<script lang="ts">
  import type { PerfMonitorProps } from './types'
  import { useTask, useThrelte, useStage } from '@threlte/core'
  import { Pane, AutoValue } from 'svelte-tweakpane-ui'
  import { onMount } from 'svelte'
  import Stats from 'stats-gl'

  let { extraInfo = false, ...rest }: PerfMonitorProps = $props()
  const { renderer, dom, renderStage } = useThrelte()

  const stats = new Stats(rest)

  let calls = $state(0)
  let geometries = $state(0)
  let textures = $state(0)
  let triangles = $state(0)
  let points = $state(0)
  let lines = $state(0)

  onMount(() => {
    stats.init(renderer)
    dom.appendChild(stats.dom)
    return () => {
      dom.removeChild(stats.dom)
    }
  })

  useTask(
    () => {
      stats.update()
      if (extraInfo) {
        const { geometries: geo, textures: t } = renderer.info.memory
        const { triangles: tri, points: p, calls: c, lines: l } = renderer.info.render
        geometries = geo
        textures = t
        triangles = tri
        points = p
        calls = c
        lines = l
      }
    },
    {
      stage: useStage('monitor-end', {
        after: renderStage
      })
    }
  )
</script>

{#if extraInfo}
  <Pane
    title="Performance Monitor"
    position="fixed"
  >
    <AutoValue
      value={calls.toFixed(0)}
      label="draw calls"
      disabled
    />
    <AutoValue
      value={triangles.toFixed(0)}
      label="triangles"
      disabled
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
      value={points.toFixed(0)}
      label="points"
      disabled
    />
    <AutoValue
      value={lines.toFixed(0)}
      label="lines"
      disabled
    />
  </Pane>
{/if}
