<script lang="ts">
  import Field from './Field.svelte'

  export let label: string
  export let id: string = label.toLowerCase().replace(' ', '-')
  export let required: boolean = false
  export let value: number | undefined = undefined
</script>

<Field
  {label}
  {id}
  {required}
>
  <input
    type="number"
    name={id}
    {required}
    bind:value
  />
</Field>

<style>
  input {
  }
</style>
