<template>
  <div class="widgets-header">
    <div class="widgets-header-container">
      <img :src="icon"/>
      <span class="header-title">{{ title }}</span>
    </div>
    <div class="header-menu-button" @click="actionListStatus = !actionListStatus">
      <img :src="require('@/assets/img/icons/context.svg')" :class="{active: actionListStatus}"/>
      <transition>
        <action-list
            class="show-context-animation"
            :status="actionListStatus"
            :actions="items"
            v-if="actionListStatus"
            @onList="showContext"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import ActionList from "@Facade/Modal/ActionList";

export default {
  name: "WidgetsHeader",
  data() {
    return {
      actionListStatus: false,
      items: ['Выдать доступ', 'Скрыть виджет'],
    }
  },
  methods: {
    showContext(value) {
      this.$emit('show-context', value)
    },
  },
  components: {
    ActionList,
  },
  props: {
    title: String,
    icon: String,
  }
}
</script>

<style lang="scss" scoped>

.widgets-header {
  display: flex;
  margin-bottom: 7%;
  justify-content: space-between;

  .widgets-header-container {
    display: inherit;

    .header-title {
      white-space: nowrap;
      font-weight: 600;
      font-size: rem(17);
      line-height: rem(17);
      color: #FFF;
      margin: 4% 0 0 4%;
    }
  }

  .header-menu-button {
    position: relative;

    .facade-modal-action-list {
      position: absolute;
      z-index: 1;
      right: 140px;
      transform: translateY(100%);
    }
  }
}
.facade-modal-action-list::v-deep{
  .action-item-del{
    display: none;
  }
}

//.show-context-animation{
//  animation: show-context;
//  animation-duration: $vx-nav-time;
//}
//@keyframes show-context{
//  0%{
//    font-size: 0;
//    right: 0;
//    width: 0;
//    height: 0;
//  }
//  50%{
//    font-size: 0;
//  }
//  90%{
//    font-size: 0;
//  }
//  99%{
//    font-size: 0;
//  }
//  100%{
//    bottom: 0;
//    width: 155px;
//    height: 96px;
//  }
//}
</style>