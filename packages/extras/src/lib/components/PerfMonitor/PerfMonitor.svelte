<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import { Pane, AutoValue, Element } from 'svelte-tweakpane-ui'
  import Stats from 'stats-gl'
  import type { PerfMonitorProps } from './types'

  let { extraInfo = false, ...rest }: PerfMonitorProps = $props()
  const { renderer, dom } = useThrelte()

  const stats = new Stats(rest)

  stats.init(renderer)

  let el: HTMLDivElement | undefined = $state()
  let calls = $state(0)
  let geometries = $state(0)
  let textures = $state(0)
  let triangles = $state(0)
  let points = $state(0)
  let lines = $state(0)

  $effect(() => {
    if (extraInfo) {
      el?.appendChild(stats.dom)
    } else {
      dom.append(stats.dom)
    }
  })

  useTask(() => {
    const { geometries: geo, textures: t } = renderer.info.memory
    const { triangles: tri, points: p, calls: c, lines: l } = renderer.info.render
    geometries = geo
    textures = t
    triangles = tri
    points = p
    calls = c
    lines = l
    stats.update()
  })
</script>

{#if extraInfo}
  <Pane
    title="Performance Monitor"
    position="fixed"
  >
    <Element>
      <div bind:this={el}></div>
    </Element>
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
