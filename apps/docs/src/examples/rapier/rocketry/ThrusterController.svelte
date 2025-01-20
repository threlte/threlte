<script lang="ts">
  import { ConstantValue, type ParticleSystem } from 'three.quarks'

  let { system, active }: { system: ParticleSystem; active: boolean } = $props()

  const originalEmission = system.emissionOverTime
  const nullEmission = new ConstantValue(0)

  $effect.pre(() => {
    if (active) {
      system.emissionOverTime = originalEmission
    } else {
      system.emissionOverTime = nullEmission
    }
  })
</script>
