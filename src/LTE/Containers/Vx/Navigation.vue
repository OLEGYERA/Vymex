<template>
  <div class="container-vx-navigation" :vx-navigation-mini="!isFull">
    <sketch-header @onToggle="setNavigationFull($event)" :tiny="!isFull"/>
    <div class="navigation-main">
      <div class="main-base">
        <div class="navigation-accounts">
          <div class="profile-group">
            <sketch-title :tiny="!isFull">
              <template #title>Мой профиль</template>
              <template #icon><icon-profile/></template>
            </sketch-title>
            <sketch-plate-account :tiny="!isFull"
                                  :router="{name: 'vx'}"
                                  category="profile"
                                  :data="{name: userName, lastname: userLastname, logo: userAvatar, colorCode: userAvatarColor}"
                                  active
            />
          </div>
          <div class="company-group">
            <sketch-title :tiny="!isFull">
              <template #title>Мои компании</template>
              <template #icon><icon-company/></template>
            </sketch-title>
            <sketch-plate-account :tiny="!isFull" category="company" v-for="(company, companyIndex) in companies" :data="{name: company.name, id: company.id}" :router="{name: 'vx.co', params: {companyID: company.id}}" :key="companyIndex"/>
            <sketch-plate-account :tiny="!isFull"/>
          </div>
        </div>
        <div class="navigation-settings">
          <div class="setting-list">
            <sketch-plate-setting :tiny="!isFull" @click.native="$router.push({name: 'vx.setting'})">
              <template #icon><icon-setting/></template>
              <template #title>Настройки профиля</template>
            </sketch-plate-setting>
            <sketch-plate-setting :tiny="!isFull">
              <template #icon><icon-help/></template>
              <template #title>Техническая поддержка</template>
            </sketch-plate-setting>
            <sketch-plate-setting :tiny="!isFull">
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
  import IconProfile from '@Icon/Profile'
  import IconCompany from '@Icon/Company'
  import IconSetting from '@Icon/Setting'
  import IconHelp from '@Icon/Help'
  import IconInfo from '@Icon/Info'
  import SketchHeader from '@Sketch/Navigation/Header'
  import SketchTitle from '@Sketch/Navigation/Title'
  import SketchPlateAccount from '@Sketch/Navigation/PlateAccount'
  import SketchPlateSetting from '@Sketch/Navigation/PlateSetting'

  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'Container.Vx.Navigation',
    components: {
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
    computed: {
      ...mapGetters({
        userName: 'getUserName',
        userLastname: 'getUserLastname',
        userAvatar: 'getUserAvatar',
        userAvatarColor: 'getUserAvatarColor',
        isFull: 'getNavigationFull',
        companies: 'Company/getAll'
      }),
    },
    methods: {
      ...mapMutations(['setNavigationFull'])
    }
  }
</script>

<style lang="scss" scoped>
  .container-vx-navigation{
    flex-shrink: 0;
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
            overflow: auto;
            height: calc(100vh - 380px);
            
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
      width: 72px;
      transition: $vx-nav-time all ease $vx-nav-time-delay; // animation
    }
  }
</style>