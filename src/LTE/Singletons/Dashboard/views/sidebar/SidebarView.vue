<template>
  <div class="container-sidebar-view">
    <title-caps class="sidebar-view-header-title">
      <template>пользователь</template>
    </title-caps>
    <search :placeholder="'Поиск'"/>
    <sidebar-structure />
  </div>
</template>

<script>
import TitleCaps from "@Facade/Title/Caps";
import Search from "@Facade/Input/Search";
import SidebarStructure from "../../facades/SidebarStructure";

export default {
  name: 'SidebarView',
  props: {
    levels: Array
  },
  components: {
    TitleCaps,
    Search,
    SidebarStructure,
  },
}
</script>

<style lang="scss" scoped>
.container-sidebar-view {
  padding: 20px;
  height: 100%;
  overflow-y: scroll;
  .sidebar-view-header-title {
    margin-bottom: 4.8%;
  }
}

</style>