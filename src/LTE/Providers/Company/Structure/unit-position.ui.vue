<template>
  <div class="structure-unit-position-ui" :class="[`su-level-${data.unitLevel}`, {'tiny': tiny, 'active' : active}]">
    <title-caps v-if="!tiny" class="position-title">{{data.unitName}}</title-caps>
    <title-caps v-if="!tiny" class="position-title">{{positionLevel}}</title-caps>
  </div>
</template>

<script>
  import TitleCaps from "@Facade/Title/Caps"

  export default {
    name: 'Providers.Company.Structure.UnitPosition.Ui',
    components: {TitleCaps},
    props: {
      data: {
        validator: (data) => {
          return data !== null
            && (typeof data.unitId === "number" || typeof data.id === "number")
            && typeof data.unitName === "string"
            && typeof data.unitLevel === "number";
        }
      },
      active: {
        type: Boolean,
        default: false
      },
      tiny: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      positionLevel(){
        if(this.data.unitLevel === 0) return `${this.data.share}%`;
        return `${this.data.unitLevel} ур.`;
      },
    }
  };
</script>

<style lang="scss" scoped>
  .structure-unit-position-ui {
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    margin-bottom: 10px;
    border-radius: 4px;
    cursor: pointer;
    border: 3px solid transparent;
    &.tiny {
      width: 26px;
      height: 26px;
      box-sizing: border-box;
      margin: 0 auto 10px auto;
      border-radius: 8px;
      padding: 0;
    }
    &.su-level-0 {
      .position-title {
        color: #fff;
      }
    }
    .position-title {
      color: $grey-scale-700;
    }


    &:hover{
      border-color: $grey-scale-300;
    }
    &.active{
      border-color: $blue;
    }
    &:last-child{
      margin-bottom: 0
    }
  }
</style>