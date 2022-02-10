<template>
  <div class="container-sidebar-structure-unit">
        <div v-for="(men, i) in data"
             :key="i"
             class="structure-unit-level-context"
             :style="{background: men.color}">
          <div class="level-context-main">
            <img :src="men.avatar"/>
            <div class="level-context-main-description">
              <span class="main-description-name">{{ men.name }}</span>
              <span class="main-description-position">{{ men.position }}</span>
            </div>
          </div>
          <div>
            <checkbox :model="men.checkedPosition"
                      @onClick="changeStatusPosition(i)"></checkbox>
          </div>
        </div>
    </div>
</template>

<script>
import Checkbox from '@Facade/Input/Checkbox';

export default {
  name: "StructureUnit",
  props: {
    data: Array
  },
  components: {
    Checkbox
  },
  methods: {
    changeStatusPosition(i) {
      this.data[i].checkedPosition = !this.data[i].checkedPosition
    },
  }
}
</script>

<style lang="scss" scoped>
.container-sidebar-structure-unit {
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
    }
  }

  .checkbox {
    margin-right: 8px;
  }
}

</style>