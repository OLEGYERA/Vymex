<template>
  <div class="control-center-personal-area-view">
    <navigation-close @onClick="$router.push({name: 'vx.co', params: {companyID: $route.params.companyID}})"/>
    <title-base>Центр управления</title-base>

    <div class="personal-area-box">
      <plate-setting>
        <template #icon><icon-calendar/></template>
        <template #title>Рабочий календарь</template>
      </plate-setting>
      <plate-setting>
        <template #icon><icon-wallet/></template>
        <template #title>Личный кабинет</template>
      </plate-setting>
      <plate-setting>
        <template #icon><icon-file-storage/></template>
        <template #title>Файловое хранилище</template>
      </plate-setting>
      <plate-setting @click.native="$router.push({name: 'vx.co.control-center.privilege', params: {companyID: $route.params.companyID}})">
        <template #icon><icon-privilege/></template>
        <template #title>Привелегии (Ролирование)</template>
      </plate-setting>
      <plate-setting>
        <template #icon><icon-info/></template>
        <template #title>Инфо о компании</template>
      </plate-setting>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationClose from '@Facade/Navigation/Close'
  import TitleBase from '@Facade/Title/Base'
  import PlateSetting from '@Facade/Plate/Setting'


  export default {
    name: 'vx.co.control-center.personal-area.view',
    components: {
      NavigationClose, TitleBase,
      PlateSetting
    },
    data: () => ({
      currentNavigationCoTab: 0
    })
  }
</script>

<style lang="scss" scoped>
  .control-center-personal-area-view{
    .personal-area-box{
      margin-top: 40px;
      padding: 20px;
      background: $grey-scale-500;
      border-radius: 16px;

    }
  }
</style>