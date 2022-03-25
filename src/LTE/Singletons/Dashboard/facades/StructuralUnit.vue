<template>
  <div class="container-sidebar-structure-unit">
    <div v-for="(men, i) in data"
         :key="i"
         class="structure-unit-level-context"
         :class="{
         level1: level === 1,
         level2: level === 2,
         level3: level === 3,
         level4: level === 4
         }">
      <div v-if="!men.name" class="level-context-main">
        <div class="performer-context-main">
          <img v-if="men.avatar" :src="men.avatar" class="context-main-avatar"/>
          <div v-else class="context-main-num">{{ men.numberPeople }}</div>
          <span class="context-main-position">{{ men.position }}</span>
        </div>
        </div>
        <div v-else class="level-context-main">
          <img :src="men.avatar"/>
          <div class="level-context-main-description">
            <span class="main-description-name">{{ men.name }}</span>
            <span class="main-description-position">{{ men.position }}</span>
          </div>
        </div>
      <div>
        <checkbox :viewType="men.checkboxType"
                  :model="men.checkedPosition"
                  @onClick="changeStatusPosition(i)"></checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from '@Facade/Input/Checkbox';
import {mapMutations, mapGetters} from "vuex";

export default {
  name: "StructuralUnit",
  props: {
    data: Array,
    level: Number
  },
  components: {
    Checkbox
  },
    computed: {
    ...mapGetters({
      levels: 'getLevels',
      disableStatusCount: 'getDisableStatusCount'
    }),
  },
  methods: {
        ...mapMutations({
          setDisableStatusCount: 'setCheckDisableStatusCount',
          setLevels: 'setWidgetLevels'
        }),
    changeStatusPosition(index) {
      if(this.data[index].checkboxType === 2){
        let newLevels = this.levels.map(el => ({...el, data: el.data.map(el => ({...el, checkedPosition: false}))}))
        this.setLevels(newLevels)
      }
      let newLevels = this.levels.map((el, i) => i === this.level - 1
            ? ({...el, data: el.data.map((el, i) => i === index
                  ? ({...el, checkedPosition: !el.checkedPosition})
                  : el)})
            : el)
        this.setLevels(newLevels)
      this.data[index].checkedPosition === true
          ? this.setDisableStatusCount(this.disableStatusCount + 1)
          : this.setDisableStatusCount(this.disableStatusCount - 1)
    },
  }
}
</script>

<style lang="scss" scoped>
.container-sidebar-structure-unit {
  width: 100%;

  .structure-unit-level-context {
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

      .performer-context-main {
        display: inherit;
        justify-content: center;
        align-items: center;

        .context-main-avatar {
          margin-right: rem(12);
        }

        .context-main-num {
          display: inherit;
          justify-content: center;
          align-items: center;
          color: #FFF;
          width: 22px;
          height: 22px;
          background: rgba($grey-scale-700, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          font-weight: 600;
          font-size: rem(12);
          line-height: rem(16);
          text-align: center;
          text-transform: uppercase;
          margin-right: rem(22);
        }

        .context-main-position {
          font-size: rem(15);
          line-height: rem(20);
        }
      }
    }
  }

  .checkbox {
    margin-right: 8px;
  }
}

</style>