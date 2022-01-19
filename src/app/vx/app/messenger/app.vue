<template>
  <div class="app-msg">
    <div class="msg-body-space">
      <router-view/>
    </div>
    <div class="msg-sidebar-space">
      <div class="sidebar-tabs">
        <div class="sidebar-tab contact-tab">
          <div class="contact-tab-header">
            <input-base
              :model="contactSearchModel"
              placeholder="Поиск контактов"
              labeled
              @onInput="handleContactSearchModel"
            />
          </div>
          <div class="contact-tab-main">
            <title-caps>Контакты</title-caps>
            <div class="contacts-list">
              <template v-for="(searchContact, searchContactKey) in searchContacts">
                <div class="contact-card"
                     v-if="searchContact.name !== null && searchContact.lastname !== null" :key="searchContactKey"
                     @click="chooseDialog(searchContact)"
                >
                  <div class="contact-card-body">
                    <image-avatar
                      :logo="searchContact.avatar || (searchContact.name.substr(0, 1) + searchContact.lastname.substr(0, 1))"
                      :color-code="String(searchContact.id).substr(searchContact.id.length - 1, 1)"/>
                    <div class="contact-card-info">
                      <title-sub>{{ searchContact.name }} {{ searchContact.lastname }} </title-sub>
                      <title-caption>@{{ searchContact.alias }}</title-caption>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
  import InputBase from '@Facade/Input/Base'
  import TitleCaps from '@Facade/Title/Caps'
  import TitleCaption from '@Facade/Title/Caption'
  import TitleSub from '@Facade/Title/Sub'
  import ImageAvatar from '@Facade/Image/Avatar'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'app.vx.msg',
    created() {
      this.predictSearch();
    },
    data: () => ({
      contactSearchModel: null
    }),
    computed: {
      ...mapGetters({
        searchContacts: 'getMsgSearchContacts'
      })
    },
    methods: {
      ...mapMutations({
        chooseDialog: 'setMsgChooseDialog'
      }),
      handleContactSearchModel(model){
        console.log(model)
        this.predictSearch(model);
      },
      predictSearch(query = ''){
        this.$core.predictor.manualProcess('MsgContact', 'search', query);
      }
    },
    components: {
      InputBase, TitleCaps, ImageAvatar, TitleSub, TitleCaption
    },
  }
</script>


<style lang="scss" scoped>
  .app-msg{
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-color: $grey-scale-700;
    .msg-body-space{
      height: 100%;
      width: 100%;
    }
    .msg-sidebar-space{
      flex-shrink: 0;
      width: 380px;
      height: 100%;
      border-left: 1px solid $grey-scale-700;
      background: $grey;
      .sidebar-tabs{
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        .sidebar-tab{
          height: 100%;
          display: flex;
          flex-direction: column;
          &.contact-tab{
            .contact-tab-header{
              height: 52px;
            }
            .contact-tab-main{
              padding-top: 12px;
              height: 100%;
              overflow: hidden;
              display: inherit;
              flex-direction: inherit;
              .facade-title-caps{
                margin: 8px 0;
              }
              .contacts-list{
                height: 100%;
                overflow-y: scroll;
                .contact-card{
                  cursor: pointer;
                  background-color: $grey-scale-400;
                  transition: .15s background-color linear;
                  padding: 12px;
                  border-radius: 12px;
                  margin: 2px 0 4px;
                  .contact-card-body{
                    display: flex;
                    align-items: center;
                    .facade-image-avatar{
                      width: 40px;
                      height: 40px;
                    }
                    .contact-card-info{
                      padding-left: 8px;
                      display: flex;
                      flex-direction: column;
                    }
                  }
                  &:hover{
                    background-color: $grey-scale-300;
                  }
                }
              }
            }
          }

        }
      }
    }

  }
</style>