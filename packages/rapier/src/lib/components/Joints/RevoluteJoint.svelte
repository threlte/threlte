<script lang="ts">
  import { useRevoluteJoint } from '../../hooks/useRevoluteJoint'
  export const { joint, rigidBodyA, rigidBodyB } = useRevoluteJoint()
</script>

<slot {rigidBodyA} {rigidBodyB} />
