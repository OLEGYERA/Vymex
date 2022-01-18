<template>
  <pan-zoom selector="#s1">
  <div id="s1" class="company-structure-table">
    <div class="company-structure-level1">
      <unit category="level1" v-bind:key="key" v-for="(val, key) in plainStructure.level1" :data="val"/>
    </div>
    <div class="company-structure-level2">
      <unit category="level1" v-bind:key="key" v-for="(val, key) in plainStructure.level2" :data="val"/>
    </div>
    <div class="company-structure-level3" >
      <unit category="level1" v-bind:key="key" v-for="(val, key) in plainStructure.level3" :data="val"/>
    </div>
    <div class="company-structure-level4">
      <unit category="level1" v-bind:key="key" v-for="(val, key) in plainStructure.level4" :data="val"/>
    </div>
  </div>
  </pan-zoom>
<!--  <div style="height: 600px; width: 600px">-->
<!--    {{structure[0]}}-->
<!--    <tree :data="structure[0]" node-text="name" layoutType="horizontal" >-->
<!--    </tree>-->
<!--  </div>-->
</template>

<script>
import Unit from '@Facade/Plate/Unit'
import {mapGetters} from "vuex";
// import {tree} from 'vued3tree'

export default {
  name: "vx.company.structure",
  components: {
    Unit,
    // tree
  },
  created() {
    this.getPlainStructure();
  },
  computed: {
    ...mapGetters({
      plainStructure: 'getPlainStructure',
    })
  },
  methods: {
    async getPlainStructure(){
      this.$engine.Predictor
          .prepareComponentManually('company', 'getPlainStructure', 8)
          .runPredictedData()
    }
  }
}
</script>

<style lang="scss" scoped>
  .company-structure-table{
    display: flex;
    .company-structure-level1{
    }
    .company-structure-level2{
    }
    .company-structure-level3{
    }
    .company-structure-level4{
    }
  }
</style>