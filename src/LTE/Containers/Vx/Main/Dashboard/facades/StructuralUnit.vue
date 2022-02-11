<template>
  <div class="container-sidebar-structure-unit">
    <div class="structure-unit-level-context" :class="{level1: user.level===1, level2: user.level===2, level3: user.level===3, level4: user.level===4}">
      <div class="level-context-main">
        <img class="user-image" :src="user.img"/>
        <div class="level-context-main-description">
          <span class="main-description-name">{{ user.name }}</span>
          <span class="main-description-position">{{ user.position }}</span>
        </div>
      </div>
      <div class="right-side">
        <slot><checkbox/></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from '@Facade/Input/Checkbox';


export default {
  name: "StructureUnit",
  props: {
    user: Object
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
  width: 100%;
  .structure-unit-level-context {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 36px;
    border-radius: 8px;
    padding: 8px;

    .level-context-main {
      display: inherit;

      .user-image {
        height: 36px;
        width: 36px;
      }

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
  .right-side {
    cursor: pointer;
  }
  .checkbox {
    margin-right: 8px;
  }
}

</style>