<script lang="ts">
  import { Sequence } from '@threlte/theatre'
  import { onMount } from 'svelte'
  import FadeOut from '../FadeOut.svelte'
  import { springScrollPos } from '../scrollPos'
  import TheatreTextBox from './TheatreTextBox.svelte'
  import { types } from '@theatre/core'
  import { useSheetObject } from '@threlte/theatre'
  import Button from '../../Button/Button.svelte'

  const sheetObject = useSheetObject()

  let play = false
  onMount(() => {
    const timeout = setTimeout(() => {
      play = true
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  })
</script>

{#if play}
  <Sequence autoplay />
{/if}

<FadeOut
  progress={$springScrollPos}
  from={0.3}
  to={0.6}
>
  <div
    class="fixed top-0 left-0 mt-[40vh] flex w-screen flex-col items-center justify-center"
    style="transform: translateY({$springScrollPos * -50}px)"
  >
    <TheatreTextBox key="mission">
      <div class="mb-2 text-xl text-white/60">The Mission:</div>
    </TheatreTextBox>

    <TheatreTextBox key="statement">
      <div class="text-center text-4xl font-bold text-white/90">
        Rapidly build interactive<br />
        <span class="relative inline-block"
          ><div
            use:sheetObject={{
              key: 'underline',
              props: {
                scaleX: types.number(0, {
                  range: [0, 1]
                })
              },
              callback(node, props) {
                node.style.transform = `scaleX(${props.scaleX})`
              }
            }}
            class="bg-orange absolute bottom-0 left-0 -z-10 h-4 w-full origin-left will-change-transform"
          />
          3D apps
        </span> for the web.
      </div>
    </TheatreTextBox>

    <TheatreTextBox key="start-building">
      <div
        class="mt-12 flex flex-col-reverse items-center justify-center gap-6 md:flex-row md:gap-3"
      >
        <code class="px-7 py-4 text-sm text-[1em] md:text-base">
          <span class="text-orange mr-2 select-none font-bold">{'>'}</span>npm create threlte
        </code>

        <Button
          href="/docs/learn/getting-started/introduction"
          color="orange"
        >
          Start Building →
        </Button>
      </div>
    </TheatreTextBox>
  </div>
</FadeOut>

<div class="fixed bottom-0 left-0 flex w-screen justify-center pb-[20vh]">
  <FadeOut
    progress={$springScrollPos}
    from={0}
    to={0.2}
  >
    <div
      class="will-change-auto"
      use:sheetObject={{
        key: 'scroll',
        callback(node, props) {
          node.style.transform = `translateY(${props.translateY}%)`
          node.style.opacity = props.opacity
        },
        props: {
          opacity: types.number(0, {
            range: [0, 1]
          }),
          translateY: types.number(0, {
            range: [-100, 100]
          })
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="#fff"
        viewBox="0 0 256 256"
        ><path
          d="M200.12,55.87A102,102,0,0,0,55.87,200.12,102,102,0,1,0,200.12,55.87Zm-8.48,135.77a90,90,0,1,1,0-127.28A90.1,90.1,0,0,1,191.64,191.64ZM164.24,83.76a6,6,0,0,1,0,8.48l-32,32a6,6,0,0,1-8.48,0l-32-32a6,6,0,0,1,8.48-8.48L128,111.51l27.76-27.75A6,6,0,0,1,164.24,83.76Zm0,56a6,6,0,0,1,0,8.48l-32,32a6,6,0,0,1-8.48,0l-32-32a6,6,0,0,1,8.48-8.48L128,167.51l27.76-27.75A6,6,0,0,1,164.24,139.76Z"
        /></svg
      >
    </div>
  </FadeOut>
</div>
