<template>
  <div class="sidebar-container" v-if="status">
    <sidebar-right
        class="notifications-dashboard-sidebar"
        @onClose="$emit('on-close')">
      <template #main-header>
        <sidebar-header><slot name="head-title"/></sidebar-header>
      </template>
      <template #main-content>
        <sidebar-view>
          <template #title-caps-child><slot name="title-caps-parent"/></template>
        </sidebar-view>
      </template>
    </sidebar-right>
    <button-base class="button"
                 :disable="disable"
                 @onClick="$emit('handle-access')"><slot name="button-title"/></button-base>
  </div>
</template>

<script>
import SidebarRight from "@Facade/Navigation/SidebarRight";
import SidebarHeader from "./SidebarHeader";
import SidebarView from "./SidebarView";
import ButtonBase from "@Facade/Button/Base";

export default {
  name: "Sidebar",
  props: {
    status: Boolean,
    disable: Boolean,
    levels: Array
  },
  components: {
    SidebarRight,
    SidebarHeader,
    SidebarView,
    ButtonBase
  },
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  background-color: rgba($grey-scale-700, .8);
  z-index: 3;
  overflow: hidden;
  .notifications-dashboard-sidebar ::v-deep {
    display: inherit;
    height: 100%;
    background-color: $grey;

    .sidebar-main {
      width: 372px;
    }
  }
}

.button{
  display: flex;
  align-items: center;
  position: fixed;
  width: 332px;
  height: 52px;
  bottom: 20px;
  right: 93px;
}
</style>