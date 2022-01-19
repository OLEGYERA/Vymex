<template>
  <div class="msg-dialog-view" v-if="dialog">
    <div class="dialog-header">
      <div class="dialog-contact-card">
        <image-avatar
          :logo="dialog.avatar || (dialog.name.substr(0, 1) + dialog.lastname.substr(0, 1))"
          :color-code="String(dialog.id).substr(dialog.id.length - 1, 1)"/>
        <div class="contact-card-info">
          <text-base>{{ dialog.name }} {{ dialog.lastname }} </text-base>
        </div>
      </div>
    </div>
    <div class="dialog-main">
      <div class="dialog-msg-space">
        <div class="msg-space-group">
          <div class="msg-plate me-msg-plate">
            <div class="msg-plate-body">
              <text-base>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, maxime, quibusdam! Aperiam at consequatur culpa dolore dolores eligendi magnam perspiciatis praesentium qui, repudiandae saepe sequi voluptas. Ea laudantium tempore veritatis.
              </text-base>
            </div>
          </div>
          <div class="msg-plate">
            <div class="msg-plate-body">
              <text-base>
                {{ newMsgModel.length }}
              </text-base>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-msg-tools">
        <input-base :model="newMsgModel" placeholder="Введите сообщение" @onInput="newMsgModel=$event"/>
        <button-base
          :disable="newMsgModel.length===0"
          @onClick="sendMessage">
          Отправить
        </button-base>
      </div>
    </div>
  </div>
</template>

<script>
  import ImageAvatar from '@Facade/Image/Avatar'
  import TextBase from '@Facade/Text/Base'
  import InputBase from '@Facade/Input/Base'
  import ButtonBase from '@Facade/Button/Base'

  import {mapGetters} from 'vuex'
  export default {
    name: 'vx.msg.dialog.view',
    data: () => ({
      newMsgModel: ''
    }),
    computed: {
      ...mapGetters({
        dialog: 'getMsgChooseDialog'
      })
    },
    methods: {
      sendMessage(){
        this.$core.predictor.ManualProcess('msgDlg', 'create', this.dialog);
      }
    },
    components: {
      ImageAvatar, TextBase, InputBase, ButtonBase
    }
  }
</script>

<style lang="scss" scoped>
  .msg-dialog-view{
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: $grey;
    .dialog-header{
      width: 100%;
      padding: 12px 20px;
      height: 64px;
      box-sizing: border-box;
      background-color: $grey-scale-400;
      .dialog-contact-card{
        display: flex;
        align-items: center;
        .facade-image-avatar{
          width: 40px;
          height: 40px;
        }
        .contact-card-info{
          padding-left: 12px;
          .facade-text-base{
            color: #fff;
          }
        }
      }
    }
    .dialog-main{
      height: 100%;
      display: inherit;
      flex-direction: inherit;
      box-sizing: border-box;
      padding: 0 20px 24px;
      overflow: hidden;
      .dialog-msg-space{
        height: 100%;
        padding: 12px 0 24px;
        display: inherit;
        flex-direction: inherit;
        justify-content: flex-end;
        overflow: hidden;
        .msg-space-group{
          margin-top: 24px;
          .msg-plate{
            display: flex;
            margin-top: 12px;
            .msg-plate-body{
              max-width: 70%;
              padding: 32px 12px 12px;
              border-radius: 2px 12px 12px 12px;
              background-color: $grey-scale-400;
              .facade-text-base{
                color: #fff;
              }
            }


            &.me-msg-plate{
              justify-content: flex-end;
              .msg-plate-body{
                border-radius: 12px 2px 12px 12px;
                background-color: $blue;
              }
            }
            &:first-child{
              margin-top: 0;
            }
          }
        }
      }
      .dialog-msg-tools{
        height: 70px;
        width: 100%;
        display: flex;
        .facade-button-base{
          margin-left: 10px;
          width: 150px;
          height: 52px;
        }
      }
    }

  }
</style>