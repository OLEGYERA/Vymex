<template>
  <div class="app-vhome">
    <header-module />
    <router-view />
  </div>
</template>


<script>
  import HeaderModule from '@/app/vhome/modules/header'


  export default {
    name: 'vhome.app',
    components: {
      HeaderModule
    },
    created() {
      this.$router.push({name: 'vhome.me'})
    }
  }
</script>


<style lang="scss" scoped>
  .app-vhome{
    width: 100%;
    height: 100%;
    padding: 20px 7%;
    box-sizing: border-box;
    .header-module{
      margin-bottom: 35px;
    }
  }
</style>