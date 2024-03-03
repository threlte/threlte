<script lang="ts">
  import { createSheetObjectAction, useSequence } from '@threlte/theatre'

  const sheetObjectAction = createSheetObjectAction()

  const { position, playing, pause, play } = useSequence()

  const toggle = () => ($playing ? pause() : play())
</script>

<div>
  <button
    on:click={toggle}
    use:sheetObjectAction={{
      key: 'button',
      props: { x: 0, y: 0, bold: false },
      callback: (node, { x, y, bold }) => {
        node.style.transform = `translateX(${x}px) translateY(${y}px)`
        node.style.fontWeight = bold ? 'bold' : 'normal'
      }
    }}
  >
    Click Me!
    {$position.toFixed(2)}
  </button>
</div>

<style>
  div {
    height: 100%;
    display: flex;
    place-items: center;
    justify-content: center;
  }

  button {
    background-color: white;
    padding: 0.5rem;
    border-radius: 0.5rem;
    height: fit-content;
  }
</style>
