<template>
  <div class="container-setting-main-list">
    <plate-setting @click.native="$router.push({name: 'vx.setting.profile'})">
      <template #icon><icon-profile/></template>
      <template #title>Личные данные</template>
    </plate-setting>
    <plate-setting>
      <template #icon><icon-language/></template>
      <template #title>Язык</template>
      <template #additional><text-base class="lang">Русский</text-base></template>
    </plate-setting>
    <plate-setting>
      <template #icon><icon-setting/></template>
      <template #title>Конфиденциальность</template>
    </plate-setting>
    <title-caps>Внешние ссылки</title-caps>
    <plate-setting>
      <template #icon><icon-file/></template>
      <template #title>Пользовательское соглашение</template>
    </plate-setting>
    <plate-setting>
      <template #icon><icon-confidential/></template>
      <template #title>Политика конфиденциальности</template>
    </plate-setting>
    <plate-setting>
      <template #icon><icon-info/></template>
      <template #title>О приложении</template>
    </plate-setting>

    <plate-setting class="plate-exit">
      <template #icon><icon-exit/></template>
      <template #title>Выйти</template>
    </plate-setting>
  </div>
</template>

<script>
  import PlateSetting from '@Facade/Plate/Setting'
  import IconProfile from '@Icon/Profile'
  import IconLanguage from '@Icon/Language'
  import TextBase from '@Facade/Text/Base'
  import IconSetting from '@Icon/Setting'
  import TitleCaps from '@Facade/Title/Caps'
  import IconFile from '@Icon/File'
  import IconConfidential from '@Icon/Confidential'
  import IconInfo from '@Icon/Info'
  import IconExit from '@Icon/Exit'

  export default {
    name: 'Container.Vx.Setting.MainList',
    components: {
      PlateSetting,
      IconProfile,
      IconLanguage,
      TextBase,
      IconSetting,
      TitleCaps,
      IconFile,
      IconConfidential,
      IconInfo,
      IconExit
    },
  }
</script>

<style lang="scss" scoped>
  .container-setting-main-list{
    .facade-plate-setting{
      padding: 0 20px;
      transition: .2s all linear;
      cursor: pointer;
      .lang{
        color: $blue;
      }
      &.plate-exit{
        margin-top: 52px;
        ::v-deep .plate-setting-body{
          .setting-left-group{
            .setting-avatar{
              background-color: $red-opacity-2;
              .icon{
                color: $red;
              }
            }
          }
        }
      }
      &:hover{
        background-color: $grey-scale-400;
      }
    }
    .facade-title-caps{
      margin: 24px 0 12px;
      padding: 0 20px;
    }
  }
</style>