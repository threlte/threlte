<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { Grid, Text } from '@threlte/extras'

  interface Props {
    text: string
    fontSize: number
  }

  let { text, fontSize }: Props = $props()

  let rotation = $state(0)

  useTask((delta) => {
    const f = 1 / 60 / delta // ~1 at 60fps
    rotation += 0.0005 * f
  })
</script>

<T.Group rotation.y={rotation}>
  <T.OrthographicCamera
    zoom={80}
    position={[0, 5, 10]}
    makeDefault
    oncreate={(ref) => {
      ref.lookAt(0, 0, 0)
    }}
  />
</T.Group>

<Text
  {text}
  color="white"
  {fontSize}
  anchorX="50%"
  anchorY="100%"
/>

<Grid sectionColor="#FF3E00" />
