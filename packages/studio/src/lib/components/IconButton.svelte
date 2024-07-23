<script lang="ts">
  import Icon, { type Icons } from './Icon.svelte'

  export let icon: Icons
  export let label: string

  export let activityColor: 'transparent' | 'red' | 'orange' | 'green' = 'transparent'
  export let active: boolean = false
  export let warn: boolean = false
  export let success: boolean = false
  export let disabled: boolean = false
  export let error: boolean = false

  const activityColors: Record<Exclude<typeof activityColor, undefined>, string> = {
    red: '#dc2626',
    orange: '#f97316',
    green: '#16a34a',
    transparent: 'transparent'
  }

  const backgroundColors: Record<'active' | 'warn' | 'default' | 'success' | 'error', string> = {
    active: '#2563eb',
    warn: '#f97316',
    success: '#16a34a',
    default: 'var(--btn-bg);',
    error: '#dc2626'
  }

  const backgroundColorsHover: Record<'active' | 'warn' | 'default' | 'success' | 'error', string> =
    {
      active: '#1d4ed8',
      warn: '#ea580c',
      success: '#15803d',
      default: 'var(--btn-bg-h)',
      error: '#D03838'
    }

  const backgroundColorsFocus: Record<'active' | 'warn' | 'default' | 'success' | 'error', string> =
    {
      active: '#1d4ed8',
      warn: '#ea580c',
      success: '#15803d',
      default: 'var(--btn-bg-f);',
      error: '#C73030'
    }

  const backgroundColorsActive: Record<
    'active' | 'warn' | 'default' | 'success' | 'error',
    string
  > = {
    active: '#1d4ed8',
    warn: '#ea580c',
    success: '#15803d',
    default: 'var(--btn-bg-a);',
    error: '#C73030'
  }

  const textColor: Record<'active' | 'warn' | 'default' | 'success' | 'error', string> = {
    active: 'white',
    warn: 'white',
    success: 'white',
    default: 'black',
    error: 'white'
  }

  $: state = error
    ? 'error'
    : warn
      ? 'warn'
      : success
        ? 'success'
        : active
          ? 'active'
          : ('default' as 'active' | 'warn' | 'default' | 'success' | 'error')
  $: colors = {
    activityColor: activityColors[activityColor],
    backgroundColor: backgroundColors[state],
    backgroundColorHover: backgroundColorsHover[state],
    backgroundColorFocus: backgroundColorsFocus[state],
    backgroundColorActive: backgroundColorsActive[state],
    textColor: textColor[state]
  }
</script>

<button
  aria-label={label}
  on:click
  style="--activityColor: {colors.activityColor}; --background-color: {colors.backgroundColor}; --background-color-hover: {colors.backgroundColorHover}; --background-color-focus: {colors.backgroundColorFocus}; --background-color-active: {colors.backgroundColorActive}; --text-color: {colors.textColor};"
  {disabled}
  {...$$restProps}
>
  <Icon
    size="15"
    name={icon}
  />
</button>

<style>
  button {
    display: grid;
    place-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border: 0;
    padding: 0;
    margin: 0;
    background-color: var(--background-color);
    color: var(--text-color);
    border-radius: var(--bs-br);
    position: relative;
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  button::after {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background-color: var(--activityColor);
    border-radius: 1000px;
    z-index: 1;
  }

  button:not(:disabled):hover {
    background-color: var(--background-color-hover);
  }

  button:not(:disabled):focus {
    background-color: var(--background-color-focus);
  }

  button:not(:disabled):active {
    background-color: var(--background-color-active);
  }
</style>
