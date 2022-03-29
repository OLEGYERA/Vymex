<template>
  <div class="facade-messenger-person" @click="$emit('onClick', data.id)">
    <div class="private-info">
      <div class="dialog-image">
        <image-avatar :logo="$core.traits.ImageLogo(data.avatar, data.name, data.lastname)" :color-code="$core.traits.ImageColorCode(data.id)"/>
      </div>
      <div class="info-text">
        <div class="name">{{data.name}} {{data.lastname}}</div>
        <title-caption>@{{data.alias}}</title-caption>
      </div>
    </div>
    <img v-if="data.id === 1 || data.id === 3 || data.id === 8" src="@/assets/img/my/hands.svg">
  </div>
</template>

<script>
/*eslint-disable*/
import TitleCaption from '@Facade/Title/Caption'
import ImageAvatar from '@Facade/Image/Avatar'

export default {
  name: 'Singleton.Messenger.Facades.Person',
  components: {
    TitleCaption,
    ImageAvatar,
  },
  data(){
    return{
      statusAction: false,
      actions: ['Профиль', 'Написать', 'Отлючить уведомления'],
      statusBase: false,
    }
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
}
</style>