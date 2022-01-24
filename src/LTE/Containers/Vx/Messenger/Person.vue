<template>
  <div class="container-vx-person">
    <div class="private-info">
      <div class="dialog-image">
        <avatar :logo="logo" :colorCode="color"/>
      </div>
      <div class="info-text">
        <div class="name">{{contact.name}}</div>
        <title-caption>{{contact.nickname}}</title-caption>
      </div>
    </div>
    <points-vertical/>
  </div>
</template>

<script>
import TitleCaption from '@Facade/Title/Caption'
import PointsVertical from '@Icon/PointsVertical'
import Avatar from '@Facade/Image/Avatar'

export default {
  name: 'Container.Vx.Person',
  components: {
    TitleCaption,
    PointsVertical,
    Avatar
  },
  data() {
    return {
      color: '4'
    }
  },
  props: ['contact'],
  computed: {
    logo: function () {
      let initials = ''
      for (const char of this.contact.name) {
        if (char === char.toUpperCase() && char !== ' ') {
          initials += char
        }
      }
      return initials.slice(0, 2);
    },
  }
}
</script>

<style lang="scss" scoped>
  .container-vx-person {
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
    .icon-points {
      padding: 10px;
      color: #fff;
      cursor: pointer;
    }
  }
</style>