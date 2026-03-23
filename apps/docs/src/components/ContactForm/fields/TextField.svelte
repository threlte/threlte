<script lang="ts">
  import Field from './Field.svelte'

  interface Props {
    label: string
    id?: string
    required?: boolean
    value?: string
  }

  let {
    label,
    id = label.toLowerCase().replace(' ', '-'),
    required = false,
    value = $bindable()
  }: Props = $props()
</script>

<Field
  {label}
  {id}
  {required}
>
  <input
    type="text"
    name={id}
    {required}
    bind:value
  />
</Field>
