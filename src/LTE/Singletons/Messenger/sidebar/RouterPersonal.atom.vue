<template>
  <div class="sidebar-router-personal">
    <button @click="$emit('onNewRoute', null)">Закрыть</button>
  </div>
</template>

<script>

export default {
  name: 'Singleton.Messenger.Sidebar.RouterPersonal',
}
</script>

<style lang="scss" scoped>
  .sidebar-router-personal{
    width: 100%;
    height: 100%;
    background-color: $green;
  }
</style>