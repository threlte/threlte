<script lang="ts">
  import { Sequence, createSheetObjectAction } from '@threlte/theatre'
  import Button from '$components/Button/Button.svelte'
  import FadeOut from '../FadeOut.svelte'
  import { springScrollPos } from '../scrollPos'
  import TheatreTextBox from './TheatreTextBox.svelte'

  const sheetObject = createSheetObjectAction()
</script>

<Sequence autoplay />

<FadeOut
  progress={$springScrollPos}
  from={0.3}
  to={0.6}
>
  <div
    class="fixed left-0 top-0 mt-[18vh] flex w-screen flex-col items-center justify-center gap-12 px-8 sm:mt-[25vh] md:mt-[30vh]"
    style="transform: translateY({$springScrollPos * -50}px)"
  >
    <div>
      <TheatreTextBox key="mission">
        <div class="text-faded mb-2 text-center text-xl">The Mission:</div>
      </TheatreTextBox>

      <TheatreTextBox key="statement">
        <h1 class="max-w-[450px] text-center text-4xl font-bold text-white/90">
          Rapidly build interactive
          <span class="relative inline-block"
            ><div
              use:sheetObject={{
                key: 'underline',
                props: {
                  scaleX: 0
                },
                callback(node, props) {
                  node.style.transform = `scaleX(${props.scaleX})`
                }
              }}
              class="bg-orange absolute bottom-0 left-0 -z-10 h-4 w-full origin-left will-change-transform"
            ></div>
            3D apps
          </span> for the web.
        </h1>
      </TheatreTextBox>
    </div>

    <TheatreTextBox key="start-building">
      <div class="flex flex-col-reverse items-center justify-center gap-6 md:flex-row md:gap-3">
        <code class="rounded-xs bg-[#ffffff1a] px-7 py-4 text-[1em] text-sm md:text-base">
          <span class="text-orange mr-2 select-none font-bold">{'>'}</span>npm i @threlte/core
        </code>

        <Button
          href="/docs/learn/getting-started/introduction"
          color="orange"
        >
          Start Building →
        </Button>
      </div>
    </TheatreTextBox>

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
            opacity: 0,
            translateY: 0
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          class="pulse-1 -mb-[20px]"
          fill="#fff"
          viewBox="0 0 256 256"
        >
          <path
            d="M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          class="pulse-2 -mb-[20px]"
          fill="#fff"
          viewBox="0 0 256 256"
        >
          <path
            d="M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          class="pulse-3 -mb-[20px]"
          fill="#fff"
          viewBox="0 0 256 256"
        >
          <path
            d="M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z"
          />
        </svg>
      </div>
    </FadeOut>
  </div>
</FadeOut>

<style>
  @keyframes custom-pulse {
    50% {
      opacity: 0;
    }
  }
  .pulse-1 {
    animation: custom-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .pulse-2 {
    animation: custom-pulse 2s 0.3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .pulse-3 {
    animation: custom-pulse 2s 0.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
