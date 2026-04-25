<script lang="ts">
  import { T } from '@threlte/core'
  import { Container, Text } from 'threlte-uikit'
  import { Button } from 'threlte-uikit/kit'

  interface Props {
    onstart: () => void
  }

  let { onstart }: Props = $props()
</script>

<T.Group position={[0, 1.4, -0.8]}>
  <Container
    pixelSize={0.002}
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    gap={16}
    padding={32}
    backgroundColor="#0e1625"
    backgroundOpacity={0.92}
    borderColor="hotpink"
    borderWidth={3}
    borderRadius={16}
  >
    <Text
      text="bonksaber!"
      fontSize={48}
      fontWeight={700}
      color="red"
    />
    <Text
      text="slice the cubes as they fly by"
      fontSize={16}
      color="white"
    />
    <Button
      onclick={onstart}
      size="lg"
    >
      <Text
        text="Start"
        fontSize={22}
        color="white"
      />
    </Button>
  </Container>
</T.Group>
