<template>
  <div class="header-module">
    <div class="header-nav-box">
      <img-avatar :user-name="Name" :user-lastname="Lastname" :user-id="String(ID)"/>
      <div class="nav-col-group">
        <div class="nav-toggle">
          <span class="nav-title">Навигация</span>
          <icon-arrow-close-down />
        </div>
        <div class="nav-user-name">{{ Name }} {{Lastname}}</div>
      </div>
    </div>
    <div class="header-notification-box">
      <notification-alert />
      <notification-message />
    </div>
  </div>
</template>

<script>
  import ImgAvatar from '@/components/img/avatar'
  import IconArrowCloseDown from '@/components/icon/arrow-close-down'
  import NotificationAlert from '@/components/notification/alert'
  import NotificationMessage from '@/components/notification/message'

  import {mapGetters} from 'vuex'

  export default {
    name: 'header.module',
    components: {
      ImgAvatar,
      IconArrowCloseDown,
      NotificationAlert,
      NotificationMessage
    },
    computed: {
      ...mapGetters({
        ID: 'getUserID',
        Name: 'getUserName',
        Lastname: 'getUserLastname'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .header-module{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    border-radius: 24px;
    padding: 14px 20px;
    box-sizing: border-box;
    background-color: $grey-scale-500;

    .header-nav-box{
      display: flex;
      align-items: center;
      cursor: pointer;
      width: fit-content;
      .img-avatar{
        width: 35px;
        height: 35px;
        margin-right: 10px;
      }
      .nav-col-group{
        display: flex;
        flex-direction: column;
        .nav-toggle{
          display: flex;
          align-items: center;
          line-height: 14px;
          .nav-title{
            font-weight: 500;
            font-size: 13px;
            color: $grey-scale-200;
          }
          .icon-arrow-close-down{
            color: #fff;
            padding-top: 2px;
            height: 14px;
            box-sizing: border-box;
            ::v-deep svg{
              height: 14px;
            }
          }
        }
        .nav-user-name{
          font-weight: 700;
          color: #fff;
          font-size: 15px;
          line-height: 20px;

        }

      }
    }

    .header-notification-box{
      display: flex;
      align-items: center;
      width: fit-content;
      .notification-alert{
        margin-right: 30px;
      }
      .notification-message{
        margin-right: 12px;
      }
    }
  }
</style>

