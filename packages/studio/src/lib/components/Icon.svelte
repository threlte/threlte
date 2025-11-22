<script
  module
  lang="ts"
>
  import type * as AllIcons from '@mdi/js'
  export type Icons = Exclude<keyof typeof AllIcons, "default">
</script>

<script lang="ts">
  interface Props {
    name: Icons
    size?: string | undefined
    viewBox?: string | undefined
    flip?: string
    rotate?: number
    [key: string]: any
  }

  let {
    name,
    size = '24',
    viewBox = '0 0 24 24',
    flip = 'none',
    rotate = 0,
    ...rest
  }: Props = $props()

  let sx = $derived(['both', 'horizontal'].includes(flip) ? '-1' : '1')
  let sy = $derived(['both', 'vertical'].includes(flip) ? '-1' : '1')
  let r = $derived(Number.isNaN(rotate) ? rotate : `${rotate}deg`)
</script>

{#await import(`@mdi/js`) then paths}
  <svg
    width={size}
    height={size}
    {viewBox}
    style="--sx:{sx}; --sy:{sy}; --r:{r}"
    class:spin={name === 'mdiLoading'}
    {...rest}
  >
    <path d={paths[name]} />
  </svg>
{/await}

<style>
  svg {
    transform: rotate(var(--r, 0deg)) scale(var(--sx, 1), var(--sy, 1));
  }

  path {
    fill: currentColor;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spin {
    animation: spin 1s linear infinite;
  }
</style>
