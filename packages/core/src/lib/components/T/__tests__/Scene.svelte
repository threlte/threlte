<script lang="ts">
  import { T, injectPlugin } from '@threlte/core'

  interface Props {
    plugin?: {
      fn: (args: any) => void
      props?: string[]
    }
    attached?: boolean
  }

  let { attached = true, plugin }: Props = $props()

  if (plugin) {
    injectPlugin('plugin-name', (args) => {
      plugin.fn(args)

      if (plugin.props) {
        return {
          pluginProps: plugin.props
        }
      }

      return
    })
  }
</script>

{#if attached}
  <T.Group name="parent">
    <T.Mesh
      name="child"
      lookat={[0, 0, 0]}
    >
      <T.BufferGeometry name="geometry" />
      <T.MeshBasicMaterial name="material">
        <T.Texture
          attach="map"
          name="texture"
        />
      </T.MeshBasicMaterial>
    </T.Mesh>
  </T.Group>
{/if}
