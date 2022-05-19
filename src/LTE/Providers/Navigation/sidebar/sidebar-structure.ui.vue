<template>
  <div class="navigation-sidebar-structure-ui">
    <div class="level-plate-grp" v-if="structure.level1.length">
      <div class="sidebar-level-header">
        <title-caps><slot>1 уровень</slot></title-caps>
        <input-checkbox v-if="multiply" @onClick="checkLevel('1')" :model="multiply1" :view-type="viewType"/>
      </div>
      <unit-checkbox-ui
          v-for="(unit, unitKey) in structure.level1"
          :key="unitKey"
          :model="chosenUnits.includes(unit.id)"
          :view-type="viewType"
          :unit-level="unit.unitLevel"
          :unit-data="unit"
          :unit-position="unit.unitName"
          @onClick="choosePerson(unit.id)"/>
    </div>

    <div class="level-plate-grp">
      <div class="sidebar-level-header header-arrow" v-if="structure.level2.length" >
        <div class="title-right-part" @click="onClick('2')">
          <div class="level-title-arrow">
            <arrow-right :class="{'open-units': open2}"/>
          </div>
          <title-caps>2 уровень</title-caps>
        </div>
        <input-checkbox v-if="multiply" @onClick="checkLevel('2')" :model="multiply2" :view-type="viewType"/>
      </div>

      <div class="sidebar-level-units" v-if="open2">
        <unit-checkbox-ui
            v-for="(unit, unitKey) in structure.level2"
            :key="unitKey"
            :model="chosenUnits.includes(unit.id)"
            :view-type="viewType"
            :unit-level="unit.unitLevel"
            :unit-data="unit"
            :unit-position="unit.unitName"
            @onClick="choosePerson(unit.id)"/>
      </div>
    </div>

    <div class="level-plate-grp">
      <div class="sidebar-level-header header-arrow" v-if="structure.level3.length">
        <div class="title-right-part" @click="onClick('3')">
          <div class="level-title-arrow">
            <arrow-right :class="{'open-units': open3}"/>
          </div>
          <title-caps>3 уровень</title-caps>
        </div>
        <input-checkbox v-if="multiply" @onClick="checkLevel('3')" :model="multiply3" :view-type="viewType"/>
      </div>

      <div class="sidebar-level-units" v-if="open3">
        <unit-checkbox-ui
            v-for="(unit, unitKey) in structure.level3"
            :key="unitKey"
            :model="chosenUnits.includes(unit.id)"
            :view-type="viewType"
            :unit-level="unit.unitLevel"
            :unit-data="unit"
            :unit-position="unit.unitName"
            @onClick="choosePerson(unit.id)"/>
      </div>
    </div>

    <div class="level-plate-grp">
      <div class="sidebar-level-header header-arrow" v-if="structure.level4.length">
        <div class="title-right-part" @click="onClick('4')">
          <div class="level-title-arrow">
            <arrow-right :class="{'open-units': open4}"/>
          </div>
          <title-caps>4 уровень</title-caps>
        </div>
        <input-checkbox v-if="multiply" @onClick="checkLevel('4')" :model="multiply4" :view-type="viewType"/>
      </div>

      <div class="sidebar-level-units" v-if="open4">
        <unit-checkbox-ui
            v-for="(unit, unitKey) in structure.level4"
            :key="unitKey"
            :model="!!chosenUnits.includes(unit.id)"
            :view-type="viewType"
            :unit-level="unit.unitLevel"
            :unit-data="unit"
            :unit-position="unit.unitName"
            @onClick="choosePerson(unit.id)"/>
      </div>
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
    data(){
      return{
        open2: false,
        open3: false,
        open4: false,
        multiply1: false,
        multiply2: false,
        multiply3: false,
        multiply4: false,
      }
    },
    props:{
      structure: {
        type: Object,
        required: true
      },
      viewType: Number,
      multiply:{
        type: Boolean,
        default:() => false
      },
      chosenUnits: Array
    },
    computed: {
    },
    methods:{
      onClick(key){
        this[`open${key}`] = !this[`open${key}`]
      },
      checkLevel(key){
        this[`multiply${key}`] = !this[`multiply${key}`]

        if (this[`multiply${key}`] === true) {
          this[`open${key}`] = true
          this.$emit('selectAllLevel', key)
          // this.structure[`level${key}`].map(unit => {
          //   if (!this.chosenUnits.includes(unit.id)) {
          //     this.chosenUnits.push(unit.id)
          //   }
          // })
        } else {
          this[`open${key}`] = false
          this.$emit('deleteAllLevel', key)
          // this.structure[`level${key}`].map(unit => {
          //     this.chosenUnits.splice(this.chosenUnits.indexOf(unit.id), 1)
          // })
        }

      },
      choosePerson(id){
        this.$emit('onClick', id)
        // if (!this.chosenUnits.includes(id)) {
        //   this.chosenUnits.push(id)
        // } else {
        //   this.chosenUnits.splice(this.chosenUnits.indexOf(id), 1)
        // }
      }
    },
    mounted() {
      console.log(this.structure, 'structure111')
    }
  }
</script>

<style lang="scss" scoped>
  .navigation-sidebar-structure-ui{
    height: 100%;
    overflow-y: scroll;
    padding: 0 0 20px;
    box-sizing: border-box;

    .level-plate-grp{
      margin-bottom: 12px;
    }

    .sidebar-level-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 28px;
      padding-right: rem(8);
      margin-bottom: 8px;
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
</style>
