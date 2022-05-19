<template>
  <div class="router-personal-view">
    <div class="main-info">
      <name :name="`${activeUser.name} ${activeUser.lastname}`" @updateRouter="clearUser" />
      <div class="photo">
        <avatar :logo="logo" colorCode="4" />
      </div>
      <div class="info-block">
        <div class="user-info">
          <div class="icon-info"><icon-mail /></div>
          <div class="info-text-group">
            <text-base>{{ activeUser.alias }}</text-base>
            <title-caption>Имя пользователя VYMEX</title-caption>
          </div>
          <icon-copy />
        </div>
        <title-sub>
          <button-base @click.native="addUser()">Выбрать</button-base>
        </title-sub>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/

import Name from "@/LTE/Singletons/MessengerDff/facade/Name";
import Avatar from "@Facade/Image/Avatar";
import TextBase from "@Facade/Text/Base";
import TitleCaption from "@Facade/Title/Caption";
import IconMail from "@Icon/Mail";
import IconCopy from "@Icon/Copy";
import ButtonBase from "@Facade/Button/Base";
import TitleSub from "@Facade/Title/Sub";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Singleton.Messenger.Views.Sidebar.RouterPersonal",
  components: {
    Name,
    Avatar,
    TextBase,
    TitleCaption,
    IconMail,
    IconCopy,
    ButtonBase,
    TitleSub,
  },
  computed: {
    ...mapGetters({
      activeUser: "Users/getActiveUser",

    }),
    logo: function () {
      if (this.activeUser.avatar) {
        return this.activeUser.avatar
      } else if (this.activeUser.name && this.activeUser.lastname) {
        return this.activeUser.name[0]+this.activeUser.lastname[0]
      } else {
        return ''
      }
    },
  },
  methods: {
    ...mapMutations({
      clearUser: "Users/clearActiveUser",
      setShareRecipients: "Users/setShareRecipients",
			close: 'Users/close',
    }),
		addUser() {
			console.log('addUser');
			this.setShareRecipients(this.activeUser)
			this.clearUser()
			this.close()
		}
  },
};
</script>

<style lang="scss" scoped>
.router-personal-view {
  width: 100%;
  height: 100%;
  padding: 8px 0;
  box-sizing: border-box;
  overflow: hidden;
  .main-info {
    height: 100%;
    overflow-y: scroll;
    .container-vx-name {
      margin-bottom: 36px;
    }
    .photo {
      margin: 0 auto 32px;
      height: 120px;
      width: 120px;
    }
    .facade-image-avatar ::v-deep {
      .color {
        font-size: 24px;
      }
    }
    .info-block {
      padding: 0 20px;
      height: calc(100vh - 407px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .user-info {
      display: flex;
      position: relative;
      padding: 12px 0;
      border-bottom: $grey-scale-400 solid 1px;
      cursor: pointer;
      .icon-info {
        margin-right: 12px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: inherit;
        justify-content: center;
        align-items: center;
        background-color: rgba(24, 144, 255, 0.2);
      }
      .icon-copy {
        position: absolute;
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
        display: none;
      }
      .icon {
        height: 16px;
        width: 16px;
        color: $blue;
      }
    }
    .user-info:hover {
      .icon-copy {
        display: block;
      }
    }
  }
}
</style>