<script lang="ts">
  import anime from 'animejs'
  import { clamp, mapLinear } from 'three/src/math/MathUtils.js'

  export let type: 'fade-up-skew-individual' | 'fade' | 'fade-individual' | 'fade-up' = 'fade'
  export let progress: number

  export let id: string
  let _in: {
    start: number
    end: number
  }
  let _out:
    | {
        start: number
        end: number
      }
    | undefined = undefined
  export { _in as in, _out as out }

  let timeline: anime.AnimeTimelineInstance | undefined

  let completeDuration = 0

  const initializeTimeline = () => {
    timeline = anime.timeline({ autoplay: false })

    if (type === 'fade-up-skew-individual') {
      // get all letter elements
      timeline.add({
        targets: `#${id} .letter`,
        translateY: [30, 0],
        skewY: [10, 0],
        opacity: [0, 1],
        easing: 'easeOutCubic',
        duration: 1000,
        delay: (_el, i) => 50 * (i + 1)
      })
    } else if (type === 'fade-individual') {
      timeline.add({
        targets: `#${id} .letter`,
        opacity: [0, 1],
        easing: 'easeOutCubic',
        duration: 1000,
        delay: (_el, i) => 150 * (i + 1)
      })
    } else if (type === 'fade') {
      timeline.add({
        targets: `#${id} .letter`,
        opacity: [0, 1],
        easing: 'easeOutCubic',
        duration: 1000
      })
    } else if (type === 'fade-up') {
      timeline.add({
        targets: `#${id} .letter`,
        opacity: [0, 1],
        translateY: [5, 0],
        easing: 'easeOutCubic',
        duration: 1000
      })
    }

    completeDuration = timeline.duration

    timeline = timeline
  }

  const transform = (node: HTMLDivElement) => {
    const originalInnerHTML = node.innerHTML

    node.innerHTML =
      node.textContent?.replace(
        /\S/g,
        "<span class='letter' style='display: inline-block'>$&</span>"
      ) ?? ''
    initializeTimeline()
    return {
      destroy() {
        timeline?.pause()
        timeline = undefined
        node.innerHTML = originalInnerHTML
      }
    }
  }

  $: if (timeline)
    timeline.seek(
      clamp(mapLinear(progress, _in.start, _in.end, 0, completeDuration), 0, completeDuration)
    )

  $: opacity = _out ? clamp(mapLinear(progress, _out.start, _out.end, 1, 0), 0, 1) : 1
</script>

<div
  {id}
  {...$$restProps}
  use:transform
  style="opacity: {opacity}"
>
  <slot />
</div>
