<template>
  <div :class="[hideWidget === 'structure'
  ? (index + 1) % 2 === 0
  ? 'hide-right-widget'
  : 'hide-left-widget' : '',
  'container-dashboard-structure']">
    <widgets-header @show-context="showContext"
                    :title="data.title"
                    :icon="data.icon"/>
    <div class="structure-body">
      <div v-for="(man, i) of processedData"
           :key="i"
           class="body-part"
           :class="{
         level1: man.level === 1,
         level2: man.level === 2,
         level3: man.level === 3,
         level4: man.level === 4
         }">
        <span class="part-level">{{ man.level }} УР.</span>
        <div class="part-mens">
          <span class="part-num">{{ man.numMens }}</span>
          <img :src="require('@/assets/img/icons/human.svg')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetsHeader from "../../facades/WidgetsHeader";
import {mapGetters} from "vuex";

export default {
  name: "structure",
  methods: {
    showContext(value) {
      this.$emit('show-context', value, this.data.name)
    },
  },
  components: {
    WidgetsHeader
  },
  computed: {
    ...mapGetters({
      hideWidget: 'getHideWidget'
    }),
    processedData() {
      let widgetKeys = Object.keys(this.data.widget)
      let widgetValues = Object.values(this.data.widget)
      let finalData = []
      for(let i = 0; i < widgetKeys.length; i++){
        finalData.push({level: +widgetKeys[i].split('')[5], numMens: widgetValues[i]})
      }
      return finalData
    },
  },
  props: {
    data: Object,
    index: Number
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/animations.module';

.container-dashboard-structure {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;
  cursor: pointer;

  .structure-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2%;

    .body-part {
      display: flex;
      justify-content: space-between;
      border-radius: 12px;
      width: 100%;
      margin: 4px;

      .part-level {
        font-weight: 600;
        font-size: rem(12);
        line-height: rem(16);
        letter-spacing: 0.05em;
        color: $grey-scale-700;
        height: 16px;
        margin: 10px;
      }

      .part-mens {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 8px;
        height: 16px;
        top: 10px;
        background: rgba($grey-scale-700, 0.2);
        border-radius: 10px;
        margin: 10px;

        .part-num {
          color: #FFFFFF;
          font-weight: 600;
          font-size: rem(12);
          line-height: rem(16);
          margin-right: 15%;
        }
      }
    }
  }
}
</style>