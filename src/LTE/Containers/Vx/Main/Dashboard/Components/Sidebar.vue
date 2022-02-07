<template>
  <div class="dashboard-sidebar-container" v-if="status">
    <sidebar-right
        class="notifications-dashboard-sidebar"
        @onClose="$emit('on-close')">
      <template #main-header>
        <sidebar-header/>
      </template>
      <template #main-content>
        <sidebar-view @handle-access="$emit('handle-access')"/>
      </template>
    </sidebar-right>
  </div>
</template>

<script>
import SidebarRight from "@Facade/Navigation/SidebarRight";
import SidebarHeader from "./SidebarHeader";
import SidebarView from "../Components/SidebarView";

export default {
  name: "Dashboard",
  props: {
    status: Boolean,
  },
  components: {
    SidebarRight,
    SidebarHeader,
    SidebarView
  },
}
</script>

<style lang="scss" scoped>
.dashboard-sidebar-container {
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

</style>