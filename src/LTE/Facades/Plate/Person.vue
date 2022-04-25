<template>
  <div class="facade-messenger-person" :class="{'user': user}" @click="onClick">
    <div class="private-info">
      <div class="dialog-image">
        <avatar :logo="logo" :colorCode="color"/>
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

<script>
import TitleCaption from '@Facade/Title/Caption'
import PointsVertical from '@Icon/PointsVertical'
import Avatar from '@Facade/Image/Avatar'
import {mapMutations} from "vuex";
export default {
  name: 'Facade.Plate.Person',
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
  props: {
    contact: {
      type: Object,
      default: ()=> {}
    }, 
    user: {
      type: Boolean, 
      default: false
    }
  },
  computed: {
    logo: function () {
      let initials = ''
      if (this.contact.avatar) {
        return this.contact.avatar
      } else if (this.contact.title) {
        for (const char of this.contact.title) {
          if (char === char.toUpperCase() && char !== ' ') {
            initials += char
          }
        }
        return initials.slice(0, 2);
      } else if (this.contact.name && this.contact.lastname) {
        return this.contact.name[0]+this.contact.lastname[0]
      } else {
        return ''
      }
    },
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