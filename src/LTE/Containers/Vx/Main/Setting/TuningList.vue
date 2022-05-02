<template>
  <div class="container-setting-main-list">
    <plate-setting @click.native="$router.push({name: 'vx.setting.profile'})">
      <template #icon><icon-profile/></template>
      <template #title>Личные данные</template>
    </plate-setting>
    <plate-setting @click.native="modalLanguages = true">
      <template #icon><icon-language/></template>
      <template #title>Язык</template>
      <template #additional><text-base class="lang">Русский</text-base></template>
    </plate-setting>
    <plate-setting @click.native="$router.push({name: 'vx.setting.confidentiality'})">
      <template #icon><icon-setting/></template>
      <template #title>Конфиденциальность</template>
    </plate-setting>
    <title-caps>Внешние ссылки</title-caps>
    <a href="https://vymex.com/en/privacy" target="_blank">
      <plate-setting>
        <template #icon><icon-file/></template>
        <template #title>Пользовательское соглашение</template>
      </plate-setting>
    </a>
    <a href="https://vymex.com/en/privacy" target="_blank">
      <plate-setting>
        <template #icon><icon-confidential/></template>
        <template #title>Политика конфиденциальности</template>
      </plate-setting>
    </a>
    <a href="https://vymex.com/en/privacy" target="_blank">
      <plate-setting>
        <template #icon><icon-info/></template>
        <template #title>О приложении</template>
      </plate-setting>
    </a>
    <plate-setting class="plate-exit" @click.native="modalLogout = true">
      <template #icon><icon-exit/></template>
      <template #title>Выйти</template>
    </plate-setting>

    <modal :status="modalLanguages" @onClose="modalLanguages = false">
			<template #title>Выберите язык</template>
			<template #content>
      <radio-slot 
        lang 
        v-for="lang in languages" 
        :key="lang.code" 
        :model="language === lang.code" 
        @onClick="language = lang.code"
      >
        <template #title>
          <div class="language-checkbox">
            <img :src="require(`@/assets/img/flags/${lang.code}.png`)" :alt="lang.code">
            {{lang.title}}
          </div>
        </template>
      </radio-slot>
			</template>
			<template #button-accept>Сохранить</template>
		</modal>
    <modal :status="modalLogout" @onClose="modalLogout = false" @onOk="logout()">
			<template #title>Выйти из профиля?</template>
      <template #description>Подтвердите пожалуйста что хотите выйти</template>
			<template #button-accept>Выйти</template>
		</modal>
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
  import IconInfo from '@Icon/Info'
  import IconExit from '@Icon/Exit'
  import Modal from "@Facade/Modal/Base";
  import RadioSlot from '@/app/vx/app/company/app/process/facades/RadioSlot'

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
      IconInfo,
      IconExit,
      Modal,
      RadioSlot,
    },
    data() {
      return {
        modalLanguages: false,
        modalLogout: false,
        languages:[
          {title: 'English', code: 'english'},
          {title: 'Español', code: 'espan'},
          {title: 'Português', code: 'portugalies'},
          {title: 'Deutsch', code: 'germany'},
          {title: 'Français', code: 'france'},
          {title: 'Русский', code: 'russian'},
          {title: 'Українська', code: 'ukraine'},
          {title: 'Italiano', code: 'italy'},
          {title: 'Polski', code: 'poland'}
        ],
        language: 'russian'
      }
    },
    methods: {
      logout() {
        this.$core.execViaComponent('Auth', 'logout')
      }
    }
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
  .language-checkbox {
    display: flex;
    align-items: center;
    & img {
      margin-right: 12px;
    }
  }
  a {
    text-decoration: none;
  }
</style>