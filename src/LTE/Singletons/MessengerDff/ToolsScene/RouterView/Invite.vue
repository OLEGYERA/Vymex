<template>
  <div class="router-invite-view">
    <div class="main-info">
      <name :name="'Пригласить в VYMEX'" @onClick="onClose"/>

      <div class="invitation-box">
        <img src="@/assets/img/vymex/vymex.png" class="invitation-image">
        <text-base>
          VYMEX - система управления вашими структурными единицами и ресурсами о которой все мечтали, а мы сделали!
        </text-base>
      </div>

      <div class="invitation-notice">
        <icon-info/>
        <title-caption>
          Ссылка будет скопирована автоматически
        </title-caption>
      </div>

      <div class="invitation-button-group">
        <button-base @onClick="onOk">Пригласить</button-base>
        <button-secondary @onClick="onClose">Отменить</button-secondary>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import Name from "@/LTE/Singletons/MessengerDff/facade/Name";
import TextBase from "@Facade/Text/Base";
import TitleCaption from "@Facade/Title/Caption";
import ButtonBase from '@Facade/Button/Base'
import ButtonSecondary from '@Facade/Button/Secondary'

import {mapMutations} from "vuex";

export default {
  name: 'Singleton.Messenger.Views.Sidebar.RouterPersonal',
  components: {
    Name,
    TextBase,
    TitleCaption,
    ButtonBase,
    ButtonSecondary
  },
  methods: {
    ...mapMutations({
      routerBack: 'Messenger/ToolsScene/routerBack'
    }),
    onOk(){
      this.routerBack()
    },
    onClose(){
      this.routerBack()
    }
  }
}
</script>

<style lang="scss" scoped>
  .router-invite-view{
    width: 100%;
    height: 100%;
    padding: 8px 0;
    box-sizing: border-box;
    overflow: hidden;
    .facade-messenger-name {
      margin-bottom: 12px;
    }
    .invitation-box{
      width: 332px;
      height: 332px;
      padding: 12px;
      box-sizing: border-box;
      background-color: $grey-scale-500;
      margin: 0 auto 24px;
      border-radius: 12px;
      .invitation-image{
        margin-bottom: 24px;
      }
      .facade-text-base{
        color: #fff;
        text-align: center;
      }
    }
    .invitation-notice{
      display: flex;
      padding: 0 20px;
      align-items: center;
      margin-bottom: 44px;

      .icon-info::v-deep{
        padding: 0 3px;
        color: $grey-scale-200;
        margin-right: 5px;
        display: flex;
        align-items: center;
        svg{
          height: 10px;
          width: 10px;
        }
      }
    }
    .invitation-button-group{
      padding: 0 20px;
      .facade-button-base{
        margin-bottom: 24px;
      }
      .facade-button-secondary{
        height: 52px;
      }
    }
  }
</style>