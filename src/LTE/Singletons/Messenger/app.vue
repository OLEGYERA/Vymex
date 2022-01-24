<template>
  <div class="singleton-messenger-app">
    <main class="messenger-app-main">

    </main>
    <aside class="messenger-app-sidebar">

    </aside>
  </div>
</template>

<script>
  export default {
    name: 'Singleton.Messenger.app',
  }
</script>

<style lang="scss" scoped>
  .singleton-messenger-app{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba($grey, .8);
    z-index: 3;
  }
</style>