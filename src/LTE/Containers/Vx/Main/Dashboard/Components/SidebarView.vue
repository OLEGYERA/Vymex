<template>
  <div class="container-sidebar-view">
    <title-caps class="sidebar-view-header-title">
      <template>пользователь</template>
    </title-caps>
    <search :placeholder="'Поиск'"/>
    <sidebar-structure />
    <button-base class="button"
                 @onClick="$emit('handle-access')">Выдать доступ</button-base>
  </div>
</template>

<script>
import TitleCaps from "@Facade/Title/Caps";
import Search from "@Facade/Input/Search";
import ButtonBase from "@Facade/Button/Base";
import SidebarStructure from "../facades/SidebarStructure";

export default {
  name: 'SidebarView',
  components: {
    TitleCaps,
    Search,
    SidebarStructure,
    ButtonBase
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
  .button{
    margin-top: 18.95%;
    margin-bottom: 12%;
  }
}
</style>