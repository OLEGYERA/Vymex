<template>
  <div class="container-sidebar-structure">
    <div v-for="(level, index) in levels"
         :key="index">
      <div class="sidebar-structure-level">
        <div class="sidebar-structure-level-main">
          <div v-if="index !== 0" class="level-main-items">
            <img v-if="!level.showContext"
                 @click="changeStatus(index)"
                 :style="{margin: '0 3px'}"
                 :src="require('@/assets/img/icons/vector-right.svg')"/>
            <img v-else
                 @click="changeStatus(index)"
                 :src="require('@/assets/img/icons/vector-bottom.svg')"/>
            <div class="level-main-border"></div>
          </div>
          <title-caps class="level-main-title">
            <template>{{ level.level }} уровень</template>
          </title-caps>
        </div>
        <checkbox v-if="level.showCheckbox"
                  :model="level.checkedLevel"
                  class="checkbox"
                  @onClick="changeStatusLevel(index)"/>
      </div>
      <div v-if="level.showContext">
        <structure-unit :data="level.data"
                        :level="level.level"/>
      </div>
    </div>
  </div>
</template>

<script>
import TitleCaps from "@Facade/Title/Caps";
import Checkbox from '@Facade/Input/Checkbox';
import StructureUnit from './StructuralUnit'
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: "SidebarStructure",
  components: {
    TitleCaps,
    Checkbox,
    StructureUnit
  },
  computed: {
    ...mapGetters({
      levels: 'getLevels',
    })
  },
  methods: {
    ...mapMutations({
      setLevels: 'setWidgetLevels',
    }),
    changeStatus(index) {
      const newLevels = this.levels.map((el, i) => i === index
          ? {...el, showContext: !el.showContext}
          : el)
      this.setLevels(newLevels)
    },
    changeStatusLevel(index) {
      this.levels[index].checkedLevel = !this.levels[index].checkedLevel
    },
  }
}
</script>

<style lang="scss" scoped>
.container-sidebar-structure {
  margin-bottom: 148px;

  .sidebar-structure-level {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;

    .sidebar-structure-level-main {
      display: inherit;
      flex-wrap: wrap;

      .level-main-items {
        display: inherit;

        .level-main-border {
          width: 1px;
          height: 16px;
          background: $grey-scale-200;
          flex: none;
          margin: 0 8px 0 16px;
        }
      }
    }
  }
  .checkbox {
    margin-right: 8px;
  }
}

</style>