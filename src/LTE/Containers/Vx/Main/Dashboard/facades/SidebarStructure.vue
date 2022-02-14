<template>
  <div>
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
        <checkbox-round v-if="round" :model="level.checkedLevel"
                        class="checkbox"
                        @onClick="changeStatusLevel(index)"/>
        <checkbox v-else :model="level.checkedLevel"
                  class="checkbox"
                  @onClick="changeStatusLevel(index)"/>
      </div>
      <div v-if="level.showContext">
        <div v-for="(men, i) in level.data"
             :key="i"
             class="sidebar-structure-level-context"
             :style="{background: men.color}">
          <div class="level-context-main">
            <img :src="men.avatar"/>
            <div class="level-context-main-description">
              <span class="main-description-name">{{ men.name }}</span>
              <span class="main-description-position">{{ men.position }}</span>
            </div>
          </div>
          <div>
            <checkbox-round v-if="round" :model="men.checkedPosition"
                            @onClick="changeStatusPosition(index, i)"/>
            <checkbox v-else :model="men.checkedPosition"
                      @onClick="changeStatusPosition(index, i)"></checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleCaps from "@Facade/Title/Caps";
import Checkbox from '@Facade/Input/Checkbox';
import CheckboxRound from "@Facade/Input/CheckboxRound";


export default {
  name: "SidebarStructure",
  components: {
    TitleCaps,
    Checkbox,
    CheckboxRound
  },
  data() {
    return {
    }
  },
  props: {
    round: Boolean,
    levels: Array,
  },
  methods: {
    changeStatus(index) {
      this.levels = this.levels.map((el, i) => i === index ? {...el, showContext: !el.showContext} : el)
    },
    changeStatusPosition(index, i) {
      this.levels[index].data[i].checkedPosition = !this.levels[index].data[i].checkedPosition
    },
    changeStatusLevel(index) {
      this.levels[index].checkedLevel = !this.levels[index].checkedLevel
    },
    // computed: {
    //   chooseModal(){
    //     let a = this.levels.find(el => el.data.includes(el.data.checkedPosition))
    //     console.log(a)
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
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
.sidebar-structure-level-context {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95.2%;
  height: 36px;
  border-radius: 8px;
  margin-top: 8px;
  padding: 8px;
  .level-context-main {
    display: inherit;
    .level-context-main-description {
      display: inherit;
      flex-direction: column;
      margin-left: 12px;
      .main-description-name {
        font-weight: 600;
        font-size: rem(15);
        line-height: rem(20);
        color: #212A33;
        flex: none;
      }
      .main-description-position {
        font-weight: normal;
        font-size: rem(12);
        line-height: rem(16);
        color: #4A5A6A;
        flex: none;
      }
    }
  }
}
.checkbox {
  margin-right: 8px;
}
</style>