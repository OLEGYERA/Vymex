<template>
  <div class="container-vx-navigation" :vx-navigation-mini="isTiny">
    <sketch-header @onToggle="isTiny = !$event" :tiny="isTiny"/>
    <div class="navigation-main">
      <div class="main-base">
        <div class="navigation-accounts">
          <div class="profile-group">
            <sketch-title :tiny="isTiny">
              <template #title>Мой профиль</template>
              <template #icon><icon-profile/></template>
            </sketch-title>
            <sketch-plate-account :tiny="isTiny" category="profile" :data="{name: 'Oleg', lastname: 'Gerasimenko', id: 1}" />
          </div>
          <div class="company-group">
            <sketch-title :tiny="isTiny">
              <template #title>Мои компании</template>
              <template #icon><icon-company/></template>
            </sketch-title>
            <transition name="vx-only-show">
              <!--Выводить только когда нет компаний!-->
              <text-base v-if="!isTiny">Вы можете создать новую <br> компанию прямо здесь</text-base>
            </transition>
            <sketch-plate-account :tiny="isTiny" category="company" :data="{name: 'Vintage', id: 2}"/>
            <sketch-plate-account :tiny="isTiny"/>
          </div>
        </div>
        <div class="navigation-settings">
          <div class="setting-list">
            <sketch-plate-setting :tiny="isTiny">
              <template #icon><icon-setting/></template>
              <template #title>Настройки профиля</template>
            </sketch-plate-setting>
            <sketch-plate-setting :tiny="isTiny">
              <template #icon><icon-help/></template>
              <template #title>Техническая поддержка</template>
            </sketch-plate-setting>
            <sketch-plate-setting :tiny="isTiny">
              <template #icon><icon-info/></template>
              <template #title>База знаний</template>
            </sketch-plate-setting>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TextBase from '@Facade/Text/Base'
  import IconProfile from '@Icon/Profile'
  import IconCompany from '@Icon/Company'
  import IconSetting from '@Icon/Setting'
  import IconHelp from '@Icon/Help'
  import IconInfo from '@Icon/Info'
  import SketchHeader from '@Sketch/Navigation/Header'
  import SketchTitle from '@Sketch/Navigation/Title'
  import SketchPlateAccount from '@Sketch/Navigation/PlateAccount'
  import SketchPlateSetting from '@Sketch/Navigation/PlateSetting'

  import {mapGetters} from "vuex";

  export default {
    name: 'Container.Vx.Navigation',
    components: {
      TextBase,
      IconProfile,
      IconCompany,
      IconSetting,
      IconHelp,
      IconInfo,
      SketchHeader,
      SketchTitle,
      SketchPlateAccount,
      SketchPlateSetting
    },
    data(){
      return {
        isTiny: false,
      }
    },
    computed: {
      ...mapGetters({
        userID: 'getUserID',
        userName: 'getUserName',
        userLastname: 'getUserLastname',
      }),
    }
  }
</script>

<style lang="scss" scoped>
  .container-vx-navigation{
    min-width: 280px;
    width: 280px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: $grey-scale-700;
    transition: $vx-nav-time all ease; // animation
    .navigation-main{
      height: 100%;
      padding: 24px 0 20px;
      .main-base{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .navigation-accounts{
          .sketch-navigation-title{
            margin-bottom: 8px;
          }
          .facade-text-base{
            flex-shrink: 0;
            white-space: nowrap;
            min-width: 100%;
            padding: 0 20px 16px;
          }
          .profile-group{
            margin-bottom: 36px;
          }
          .company-group{
            .sketch-navigation-plate-account{
              margin-bottom: 16px;
              &:last-child{
                margin-bottom: 0;
              }
            }
          }
        }
        .navigation-settings{
          border-top: 1px solid $grey;
          .setting-list{
            padding-top: 12px;
          }
        }
      }
    }
    &[vx-navigation-mini]{
      min-width: 72px;
      width: 72px;
      transition: $vx-nav-time all ease $vx-nav-time-delay; // animation
    }
  }
</style>