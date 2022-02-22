<template>
  <div class="navigation-sidebar-structure-ui">
    <div class="level-plate" v-for="(unit, unitKey) in levels" :key="unitKey">

      <div class="sidebar-level-header" v-if="unit.level === 1">
        <title-caps><slot>Для себя</slot></title-caps>
        <input-checkbox v-if="multiply" :model="unit.levelChecked" :view-type="viewType" @onClick="checkLevel(unitKey)"/>
      </div>
      <div class="sidebar-level-header header-arrow" v-else>
        <div class="title-right-part" @click="onClick(unitKey)">
          <div class="level-title-arrow">
            <arrow-right :class="{'open-units': !unit.disable}"/>
          </div>
          <title-caps>{{ unit.level }} уровень</title-caps>
        </div>
        <input-checkbox v-if="multiply" :model="unit.levelChecked" :view-type="viewType" @onClick="checkLevel(unitKey)"/>
      </div>

      <transition name="fade">
        <div class="sidebar-level-units" v-if="!unit.disable">
          <unit-checkbox-ui
              v-for="(person, personKey) in unit.data"
              :key="personKey"
              :view-type="viewType"
              :model="person.unitChecked"
              :unit-data="person.unitData"
              :unit-level="person.unitLevel"
              :unit-position="person.unitPosition"
              @onClick="choosePerson(unitKey, personKey)"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import TitleCaps from "@Facade/Title/Caps";
  import ArrowRight from "@Icon/ArrowRight";
  import UnitCheckboxUi from "@/LTE/Providers/Company/Structure/unit-checkbox.ui";
  import InputCheckbox from "@Facade/Input/Checkbox"

  export default {
    name: 'Providers.Navigation.Sidebar.Structure.Ui',
    components:{
      TitleCaps,
      UnitCheckboxUi,
      ArrowRight,
      InputCheckbox
    },
    props:{
      levels: {
        type: Array,
        required: true
      },
      viewType: Number,
      multiply: Boolean
    },
    methods:{
      onClick(key){
        this.levels[key].disable = !this.levels[key].disable
      },
      checkLevel(key){
        this.levels[key].levelChecked = !this.levels[key].levelChecked
        if(this.levels[key].levelChecked === true){
          this.levels[key].data.map(el => el.unitChecked = true)
        } else {
          this.levels[key].data.map(el => el.unitChecked = false)
        }
      },
      choosePerson(personKey, unitKey){
        this.$emit('onClick', unitKey, personKey)
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
        justify-content: space-between;
        align-items: center;
        height: 28px;
        padding-right: rem(8);
        margin-bottom: 8px;
        align-items: center;
        .title-right-part{
          display: inherit;
          align-items: inherit;
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