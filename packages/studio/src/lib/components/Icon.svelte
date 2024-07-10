<script
  context="module"
  lang="ts"
>
  import type * as AllIcons from '@mdi/js'
  export type Icons = keyof typeof AllIcons
</script>

<script lang="ts">
  export let name: Icons
  export let size: string | undefined = '24'
  export let viewBox: string | undefined = '0 0 24 24'
  export let flip = 'none'
  export let rotate = 0

  $: sx = ['both', 'horizontal'].includes(flip) ? '-1' : '1'
  $: sy = ['both', 'vertical'].includes(flip) ? '-1' : '1'
  $: r = Number.isNaN(rotate) ? rotate : `${rotate}deg`
</script>

{#await import(`@mdi/js`) then paths}
  <svg
    width={size}
    height={size}
    {viewBox}
    style="--sx:{sx}; --sy:{sy}; --r:{r}"
    class:spin={name === 'mdiLoading'}
    {...$$restProps}
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
