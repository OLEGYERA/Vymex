<template>
  <div class="tools-scene-app" @click="close()">
    456
  </div>
</template>

<script>
  /*eslint-disable*/
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'Singleton.Messenger.ToolsScene.app',
    computed: {
      // ...mapGetters({
      //   close: 'Messenger/close'
      // })
    },
    methods: {
      ...mapMutations({
        close: 'Messenger/close'
      })
    }
  }
</script>


<style lang="scss">
  .tools-scene-app{
    width: 372px;
    height: 100%;
    display: flex;
    flex-shrink: 0;
    background-color: $grey;
  }
</style>