<script lang="ts">
  import Field from './Field.svelte'

  interface Props {
    label: string
    id?: string
    required?: boolean
    value?: number
  }

  let {
    label,
    id = label.toLowerCase().replace(' ', '-'),
    required = false,
    value = $bindable(undefined)
  }: Props = $props()
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
