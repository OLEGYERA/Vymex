<template>
  <div class="facade-process-alert">
    <div class="process-alert-container">
      <span class="process-alert-title">Оповещение</span>
      <div class="process-alert-container-view">
        <span class="process-alert-text">За 10 минут до начала</span>
        <div class="process-alert-header-menu" @click="actionListStatus = !actionListStatus">
          <dropdown-arrow
              class="process-alert-select-icon"
              :class="{active: actionListStatus}"/>
          <transition>
x            <action-list
                class="process-alert-context"
                :status="actionListStatus"
                :actions="items"
                v-if="actionListStatus"
            />
          </transition>
        </div>
      </div>
    </div>
    <div class="action-list-outside" v-if="actionListStatus" @click="actionListStatus = false"></div>
    <div class="process-alert-border"></div>
  </div>
</template>

<script>
import DropdownArrow from "@Icon/DropdownArrow";
import ActionList from "@Facade/Modal/ActionList"

export default {
  name: 'vx.process.facade.process.alert',
  data() {
    return {
      actionListStatus: false,
      items: ['Заменить']
    }
  },
  components: {
    DropdownArrow,
    ActionList
  },
}
</script>

<style lang="scss" scoped>
.facade-process-alert {
  display: flex;
  flex-direction: column;
  margin: 24px 0;

  .process-alert-container {
    display: inherit;
    flex-direction: column;

    .process-alert-title {
      font-size: rem(12);
      line-height: rem(16);
      margin: 2px 0;
      color: $grey-scale-200;
    }

    .process-alert-container-view {
      display: inherit;
      justify-content: space-between;

      .process-alert-text {
        font-size: rem(15);
        line-height: rem(20);
        color: #FFFFFF;
        margin: 2px 0;
      }

      .process-alert-select-icon {
        color: #FFF;
      }

      .process-alert-header-menu {
        position: relative;

        .facade-modal-action-list {
          position: absolute;
          bottom: 8px;
          z-index: 1;
          right: 110px;
          transform: translateY(100%);
        }
      }
    }
  }

  .process-alert-border {
    width: 100%;
    height: 1px;
    background: $grey-scale-300;
    margin: 7px 0;
  }
}
.action-list-outside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: auto;
}
</style>