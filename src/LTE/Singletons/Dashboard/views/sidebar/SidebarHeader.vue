<template>
  <div class="container-sidebar-header">
    <div class="info">
      <title-sub><slot/></title-sub>
    </div>
  </div>
</template>

<script>
import TitleSub from '@Facade/Title/Sub'

export default {
  name: 'SidebarHeader',
  components: {
    TitleSub,
  },
}
</script>

<style lang="scss" scoped>
.container-sidebar-header {
  padding: rem(20);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  background-color: $grey-scale-500;
  border-bottom: $grey-scale-700 solid 1px;
  height: 24px;
  .info {
    display: inherit;
    align-items: center;
    .facade-title-sub {
      margin-right: 16px;
    }
  }
}
</style>