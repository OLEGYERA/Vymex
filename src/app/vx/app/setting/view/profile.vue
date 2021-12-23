<template>
  <div class="setting-profile-view">
    <navigation-comeback @onClick="$router.push({name: 'vx.setting'})"/>
    <title-base>Личные данные</title-base>
    <update-avatar/>
    
  </div>
</template>

<script>
  import NavigationComeback from '@Facade/Navigation/Comeback'
  import TitleBase from '@Facade/Title/Base'
  import UpdateAvatar from '@Container/Vx/Main/Setting/Profile/UpdateAvatar'

  export default {
    name: 'vx.setting.profile',
    components: {
      NavigationComeback,
      TitleBase,
      UpdateAvatar
    }
  }
</script>

<style lang="scss" scoped>
  .setting-profile-view{
    .facade-title-base{
      text-align: center;
      margin-bottom: 36px;
    }
  }
</style>