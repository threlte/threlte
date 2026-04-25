<script lang="ts">
  import { T } from '@threlte/core'
  import { Text as TitleText } from '@threlte/extras'
  import { Container, Content, Text, type VanillaContent } from 'threlte-uikit'
  import { Button } from 'threlte-uikit/kit'

  interface Props {
    onstart: () => void
  }

  let { onstart }: Props = $props()

  let titleRef = $state.raw<VanillaContent>()
</script>

<T.Group position={[0, 1.5, -0.8]}>
  <Container
    anchorX="center"
    anchorY="center"
    pixelSize={0.002}
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    gap={16}
    padding={32}
    backgroundColor="#0e1625"
    borderColor="hotpink"
    borderWidth={3}
    borderRadius={16}
  >
    <Content
      bind:ref={titleRef}
      width={320}
      height={80}
    >
      <TitleText
        anchorX="center"
        anchorY="middle"
        text="bonksaber!"
        font="/fonts/adrip1.ttf"
        color="red"
        fontSize={1}
        onsync={() => titleRef?.notifyAncestorsChanged()}
      />
    </Content>
    <Text
      text="objective: bonk the cubes as they fly by"
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
        color="#555"
      />
    </Button>
  </Container>
</T.Group>
