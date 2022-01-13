<template>
  <div>
    <unit category="level1" :data="{name: 'Александр', lastname: 'Ким', id: 2}"/>
  </div>
</template>

<script>
import Unit from '@Facade/Plate/Unit'

export default {
  name: "vx.company.structure",
  components: {
    // SketchPlateAccount,
    Unit
  },
}
</script>

<style scoped>

</style>