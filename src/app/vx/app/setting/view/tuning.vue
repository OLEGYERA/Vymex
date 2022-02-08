<template>
  <div class="setting-tuning-view">
    <navigation-close @onClick="$router.push({name: 'vx'})"/>
    <setting-short-info/>
    <navigation-tabs :tabs="['Основные', 'Оплата']" :current-tab="currentNavigationTab" @onTab="currentNavigationTab = $event">
      <template #tab-content-0>
        <setting-tuning-list/>
      </template>
      <template #tab-content-1>
        <div style="background-color: red">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, culpa cum dolor ea, eligendi expedita fugiat incidunt magni mollitia, nisi nostrum placeat vel? Ad dicta dolore facilis labore magnam ut?
        </div>
      </template>
    </navigation-tabs>
  </div>
</template>


<script>
  import NavigationClose from '@Facade/Navigation/Close'
  import SettingShortInfo from '@Container/Vx/Main/Setting/ShortInfo'
  import NavigationTabs from '@Facade/Navigation/Tabs'
  import SettingTuningList from '@Container/Vx/Main/Setting/TuningList'

  export default {
    name: 'vx.setting.list',
    components: {
      NavigationClose,
      SettingShortInfo,
      NavigationTabs,
      SettingTuningList
    },
    data(){
      return {
        currentNavigationTab: 0
      }
    },

  }
</script>

<style lang="scss" scoped>
  .setting-tuning-view{
    .container-setting-short-info{
      margin-bottom: rem(32);
    }
    .facade-navigation-tabs{
      background-color: $grey-scale-500;
      border-radius: 16px;
      overflow: hidden;
    }
  }
</style>