<template>
  <div class="setting-profile-view">
    <navigation-comeback @onClick="$router.push({name: 'vx.setting'})"/>
    <title-base>Личные данные</title-base>
    <div class="profile-change-box">
      <update-avatar/>
      <update-personal/>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationComeback from '@Facade/Navigation/Comeback'
  import TitleBase from '@Facade/Title/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import UpdateAvatar from '@Container/Vx/Main/Setting/Profile/UpdateAvatar'
  import UpdatePersonal from '@Container/Vx/Main/Setting/Profile/UpdatePersonal'

  export default {
    name: 'vx.setting.profile',
    components: {
      NavigationComeback,
      TitleBase,
      TitleCaption,
      UpdateAvatar,
      UpdatePersonal
    }
  }
</script>

<style lang="scss" scoped>
  .setting-profile-view{
    .facade-title-base{
      text-align: center;
      margin-bottom: 36px;
    }
    .profile-change-box{
      width: 100%;
      padding: 26px 164px;
      box-sizing: border-box;
      border-radius: 16px;
      background-color: $grey-scale-500;
      .profile-personal-data-box{

      }
    }
  }
</style>