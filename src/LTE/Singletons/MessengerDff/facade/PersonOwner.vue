<template>
  <div class="facade-messenger-person" :class="{'user': user}" @click="onClick">
    <div class="private-info">
      <div class="dialog-image">
        <image-avatar :logo="$core.traits.ImageLogo(data.avatar, data.name, data.lastname)" :color-code="$core.traits.ImageColorCode(data.id)"/>
      </div>
      <div class="info-text">
        <div class="name">
          {{contact.title || `${contact.name} ${contact.lastname}`}}
        </div>
        <title-caption>{{contact.alias}}</title-caption>
      </div>
    </div>
    <points-vertical v-if="!user"/>
  </div>
</template>
<!--<img src="@/assets/img/my/crown.svg">-->


<script>
/*eslint-disable*/
  import TitleCaption from '@Facade/Title/Caption'
  import PointsVertical from '@Icon/PointsVertical'
  import ImageAvatar from '@Facade/Image/Avatar'

  export default {
    name: 'Singleton.Messenger.Facades.Person',
    components: {
      TitleCaption,
      PointsVertical,
      ImageAvatar
    },
    props: {
      data: {
        type: Object,
        validator: function (value) {
          return value === null
            || typeof value.id === "number"
            || typeof value.alias === "string"
            || typeof value.name === "string"
            || (typeof value.avatar === "string" && value.avatar === null)
            || typeof value.details === "string";
        }
      }
    },
    methods: {
      ...mapMutations({
        setRouterName: 'Messenger/setRouterName',
        changePersonalRouterType: 'Messenger/changePersonalRouterType'
      }),
      onClick() {
        this.setRouterName('personal')
        this.changePersonalRouterType('user')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .facade-messenger-person {
    margin-bottom: 4px;
    padding: rem(16) rem(12);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $grey-scale-400;
    border-radius: 12px;
    cursor: pointer;
    .private-info {
      display: inherit;
      align-items: center;
      .dialog-image {
        margin-right: 8px;
        height: 40px;
        width: 40px;
      }
      .name {
        font-weight: 600;
        font-size: rem(17);
        line-height: rem(22);
        color: #fff;
      }
    }
    .icon-points-vertical {
      padding: 10px;
      color: #fff;
      cursor: pointer;
    }

    &.user {
      margin-bottom: 8px;
      padding: rem(10) rem(12);
    }
  }
</style>