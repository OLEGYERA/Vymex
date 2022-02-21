<template>
  <div class="navigation-sidebar-structure-ui">
    <div class="level-plate" v-for="(unit, unitKey) in levels" :key="unitKey">

      <div class="sidebar-level-header" v-if="unit.level === 1">
        <title-caps>Для себя</title-caps>
      </div>
      <div class="sidebar-level-header header-arrow" @click="onClick(unitKey)" v-else>
        <div class="level-title-arrow">
          <arrow-right :class="{'open-units': !unit.disable}"/>
        </div>
        <title-caps>{{ unit.level }} уровень</title-caps>
      </div>

      <transition name="fade">
        <div class="sidebar-level-units" v-if="!unit.disable">
          <unit-checkbox-ui
              v-for="(person, personKey) in unit.data"
              :key="personKey"
              :view-type="2"
              :model="person.checked"
              :unit-data="person.unitData"
              :unit-level="person.unitLevel"
              :unit-position="person.unitPosition"
              @onClick="person.checked = !person.checked"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import {UnitUi, UnitSettingUi} from '@Providers'
  import TitleCaps from "@Facade/Title/Caps";
  import ArrowRight from "@Icon/ArrowRight";
  import UnitCheckboxUi from "@/LTE/Providers/Company/Structure/unit-checkbox.ui";

  export default {
    name: 'Providers.Navigation.Sidebar.Structure.Ui',
    components:{
      TitleCaps,
      UnitCheckboxUi,
      UnitSettingUi,
      UnitUi,
      ArrowRight
    },
    props:{
      levels: {
        type: Array,
        required: true
      },
    },
    methods:{
      onClick(key){
        this.levels.find((el, i) => {
          if (i === key){
            el.disable = !el.disable
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navigation-sidebar-structure-ui{
    height: 100%;
    overflow-y: scroll;
    padding: 0 0 20px;
    box-sizing: border-box;
    .level-plate{
      margin-bottom: 12px;
      .sidebar-level-header{
        display: flex;
        padding: rem(6) 0;
        margin-bottom: 8px;
        align-items: center;
        .level-title-arrow{
          border-right: 1px solid $grey-scale-200;
          margin-right: 8px;
          .icon-arrow-right{
            display: flex;
            color: $grey-scale-200;
            height: 16px;
            margin-right: 12px;
            transition: transform .2s;
            svg {
              align-self: center;
              height: 14px;
            }
          }
          .open-units{
            transform: rotate(90deg);
          }
        }
      }
      .header-arrow{
        cursor: pointer;
      }
      .structure-unit-ui{
        margin-bottom: 8px;
      }
    }
  }
</style>