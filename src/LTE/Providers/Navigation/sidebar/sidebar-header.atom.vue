<template>
  <div class="sidebar-header-atom">
    <title-sub><slot/></title-sub>
  </div>
</template>

<script>
  import TitleSub from '@Facade/Title/Sub'

  export default {
    name: 'Providers.SidebarHeaderAtom',
    components: {
      TitleSub
    }
  }

</script>

<style lang="scss" scoped>
  .sidebar-header-atom{
    padding: 0 rem(20);
    height: 65px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-color: $grey-scale-500;
    border-bottom: $grey-scale-700 solid 1px;
  }
</style>