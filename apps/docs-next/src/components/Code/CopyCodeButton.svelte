<script lang="ts">
  import { c } from '../../lib/classes'

  export let code: string = ''

  let copying = false
  let success = false
</script>

<button
  class={c(
    'absolute right-0 flex items-center gap-1 p-1 group/copybtn max-md:hidden',
    success ? 'text-green-300' : 'text-white/30 hover:text-orange-400',
    copying && 'scale-90'
  )}
  on:click={() => {
    copying = true
    navigator.clipboard.writeText(code)
    setTimeout(() => {
      copying = false
      success = true
      setTimeout(() => {
        success = false
      }, 1500)
    }, 150)
  }}
>
  <span class={c('group-hover:opacity-100', !success && 'opacity-0')}>
    {success ? 'Success' : 'Copy'}
  </span>

  <svg
    viewBox="-3.5 0 19 19"
    xmlns="http://www.w3.org/2000/svg"
    class={c('h-5 w-5 fill-green-300', success ? 'block' : 'hidden')}
  >
    <path
      d="M4.63 15.638a1.028 1.028 0 0 1-.79-.37L.36 11.09a1.03 1.03 0 1 1 1.58-1.316l2.535 3.043L9.958 3.32a1.029 1.029 0 0 1 1.783 1.03L5.52 15.122a1.03 1.03 0 0 1-.803.511.89.89 0 0 1-.088.004z"
    />
  </svg>

  <svg
    class={c(
      'h-5 w-5 fill-white/20 group-hover/copybtn:fill-orange-400',
      success ? 'hidden' : 'block'
    )}
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"
    />
    <path
      d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"
    />
  </svg>
</button>
