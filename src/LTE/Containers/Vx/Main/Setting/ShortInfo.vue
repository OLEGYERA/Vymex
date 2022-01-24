<template>
  <div class="container-setting-short-info">
    <div class="short-info-avatar">
      <image-avatar
        :logo="avatar"
        :color-code="avatarColor"
        class="l-size"/>
    </div>
    <div class="short-info-names">
      <title-base>{{ name + ' ' + lastname }}</title-base>
      <text-base>{{alias}}</text-base>
    </div>
  </div>
</template>

<script>
  import ImageAvatar from '@Facade/Image/Avatar'
  import TitleBase from '@Facade/Title/Base'
  import TextBase from '@Facade/Text/Base'
  // import PlateFaq from '@Facade/Plate/Faq'
  // import IconProcess from '@Icon/Colored/Process'
  // import ButtonSecondary from '@Facade/Button/Secondary'
  // import IconArrowLeft from '@Icon/ArrowLeft'
  // import IconArrowRight from '@Icon/ArrowRight'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Container.Vx.Setting.ShortInfo',
    components: {
      ImageAvatar,
      TitleBase,
      TextBase
    },
    computed: {
      ...mapGetters({
        name: 'getUserName',
        lastname: 'getUserLastname',
        alias: 'getUserAlias',
        avatar: 'getUserAvatar',
        avatarColor: 'getUserAvatarColor'
      }),
    }
  }
</script>

<style lang="scss" scoped>
  .container-setting-short-info{
    display: flex;
    height: min-content;
    .short-info-avatar{
      width: 88px;
      height: 88px;
      margin-right: 24px;
      cursor: default;
      .l-size{
        ::v-deep .avatar-body{
          font-size: rem(34);
          line-height: rem(40);
        }
      }
    }
    .short-info-names{
      display: flex;
      flex-direction: column;
      .facade-title-base{
        margin: 0 0 12px;
      }
      .facade-text-base{
        color: #fff;
      }
    }

  }
</style>