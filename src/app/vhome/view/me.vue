<template>
  <div class="me-view">
    <aside class="me-aside">
      <div class="choose-profile-box">
        <text-caps-title>Мой профиль</text-caps-title>
        <plate-profile>
          <template #logo>
            <img-avatar :user-id="String(meID)" :user-name="meName" :user-lastname="meLastname" />
          </template>
          <template #title>{{meName}} {{meLastname}}</template>
        </plate-profile>
        <text-caps-title>Мои компании</text-caps-title>
        <text-short-description>Вы можете создать новую компанию прямо здесь</text-short-description>
        <plate-create-company />
      </div>
      <div class="choose-other-link">
        <button-link-icon link-name="vhome.settings">
          <template #icon><icon-setting/></template>
          <template #title>Настройки профиля</template>
        </button-link-icon>
        <button-link-icon>
          <template #icon><icon-help/></template>
          <template #title>Техническая поддержка</template>
        </button-link-icon>
        <button-link-icon>
          <template #icon><icon-info/></template>
          <template #title>База знаний</template>
        </button-link-icon>
      </div>

    </aside>
    <div class="me-content">

    </div>
  </div>
</template>

<script>
  import TextCapsTitle from '@/components/text/caps-title'
  import PlateProfile from '@/components/plate/profile'
  import ImgAvatar from '@/components/img/avatar'
  import TextShortDescription from '@/components/text/short-description'
  import PlateCreateCompany from '@/components/plate/create-company'
  import ButtonLinkIcon from '@/components/button/link-icon'
  import IconSetting from '@/components/icon/setting'
  import IconHelp from '@/components/icon/help'
  import IconInfo from '@/components/icon/info'


  import {mapGetters} from 'vuex'

  export default {
    name: 'vhome.me',
    components: {
      TextCapsTitle,
      PlateProfile,
      ImgAvatar,
      TextShortDescription,
      PlateCreateCompany,
      ButtonLinkIcon,
      IconSetting,
      IconHelp,
      IconInfo
    },
    computed: {
      ...mapGetters({
        meID: 'getUserID',
        meName: 'getUserName',
        meLastname: 'getUserLastname'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .me-view{
    display: flex;
    justify-content: space-between;
    height: calc(100% - 80px);
    box-sizing: border-box;

    .me-aside{
      width: 30%;
      padding-right: 42px;
      box-sizing: border-box;
      border-right: 2px solid $grey-scale-500;
      .text-caps-title,
      .text-short-description{
        margin-left: 15px;
        margin-bottom: 20px;
      }

      .choose-profile-box{
        height: calc(100% - 210px);
        .plate-profile{
          margin-bottom: 30px;
        }
      }

      .choose-other-link{
        border-top: 1px solid $grey-scale-500;
        padding: 30px 0;
        height: 210px;
        box-sizing: border-box;
        .button-link-icon{
          margin-bottom: 8px;
          &:last-child{
            margin-bottom: 0;
          }
        }
      }
    }

    .me-content{
      width: 70%;
      height: 40px;

      padding-left: 52px;
      box-sizing: border-box;
    }
  }
</style>