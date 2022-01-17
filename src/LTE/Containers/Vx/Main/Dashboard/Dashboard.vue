<template>
  <div class="dashboard-container">
      <structure/>
      <resources />
  </div>
</template>

<script>
import Structure from "@/LTE/Containers/Vx/Main/Dashboard/Info/Structure";
import Resources from "@/LTE/Containers/Vx/Main/Dashboard/Info/Resources";

export default {
  name: "CompanyStructure",
  components: {
    Structure,
    Resources
  },
}
</script>

<style lang="scss" scoped>
  .dashboard-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>