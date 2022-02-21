<template>
<!--  <panZoom>-->
    <div id="s1" class="company-structure-table">
      <div class="company-structure-level1">
        <unit category="level1" v-bind:key="key" v-for="(val, key) in plainStructure.level1" :data="val"/>
      </div>
      <div class="company-structure-level2">
        <unit category="level1" v-bind:key="key" v-for="(val, key) in plainStructure.level2" :data="val"/>
      </div>
      <div class="company-structure-level3">
        <unit category="level1" v-bind:key="key" v-for="(val, key) in plainStructure.level3" :data="val"/>
      </div>
      <div class="company-structure-level4">
        <unit category="level1" v-bind:key="key" v-for="(val, key) in plainStructure.level4" :data="val"/>
      </div>
    </div>
<!--  </panZoom>-->
</template>

<script>
import Unit from '@Facade/Plate/Unit'
import {mapGetters} from "vuex";

export default {
  name: "vx.company.structure",
  components: {
    Unit,
  },
  beforeCreate() {
    this.$core.execViaComponent('Company', 'getPlainStructure', 6);
  },
  computed: {
    ...mapGetters({
      plainStructure: 'CompanyInfo/getPlainStructure',
    })
  }
}
</script>

<style lang="scss" scoped>
.company-structure-table {
  display: flex;

  .company-structure-level1 {
  }

  .company-structure-level2 {
  }

  .company-structure-level3 {
  }

  .company-structure-level4 {
  }
}
</style>