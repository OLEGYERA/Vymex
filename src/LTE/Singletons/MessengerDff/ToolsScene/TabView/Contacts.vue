<template>
  <div class="tab-view-contacts">
    <tab-view :search-placeholder="'Поиск по контактам и чатам'"
              @onSearchClick="$emit('routerAdd', {name: 'search'})">
      <template #list-header>
        <list-header :title="'Контакты'" :title-count="contacts.length" @onAction="statusAction = true"/>
        <modal-action-list disableDelete
                           :status="statusAction"
                           :actions="actions"
                           @onClose="statusAction = false"
                           @onList="makeAction"
        />
      </template>
      <template #content>
        <div class="chats-table">
          <person v-for="(contact, key) in searchedContacts"
                  :data="contact" :key="key"
                  @onClick="openPersonData"
                  @openProfile="openPersonData"
                  @deleteContact="statusBase=true"
          /> ///@deleteContact="ttt"
        </div>
        <modal-base :status="statusBase" @onClose="statusBase = false" @onOk="statusBase=false">
          <template #title>Удалить из контактов?</template>
          <template #description>
            Контакт будет удален вместе со всеми медиа данными без возможности восстановления
          </template>
          <template #button-accept>Удалить</template>
        </modal-base>
      </template>
    </tab-view>
  </div>
</template>

<script>
  import TabView from "../../facade/TabView"
  import Person from "@/LTE/Singletons/Messenger/facades/Person";
  import ListHeader from "@Facade/Navigation/ListHeader";
  import ModalBase from '@Facade/Modal/Base'
  import ModalActionList from '@Facade/Modal/ActionList'

  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: 'Singleton.Messenger.ToolsScene.TabView.Contacts',
    components: {
      TabView, Person, ListHeader, ModalBase, ModalActionList
    },
    data() {
      return {
        statusBase: false,
        statusAction: false,
        actions: ['Найти контакт', 'Пригласить в VYMEX'],
        contacts: [
          {
            title: 'Татьяна Булатова',
            alias: '@lable_kers'
          },
          {
            title: 'Дария Шевченко',
            alias: '@lable_kers'
          },
          {
            title: 'Анастасия Куликова',
            alias: '@lable_kers'
          },
          {
            title: 'Андрей Вашуленко',
            alias: '@lable_kers'
          },
          {
            title: 'Дмитрий Погодин',
            alias: '@lable_kers'
          },
          {
            title: 'Андрей Вашуленко',
            alias: '@lable_kers'
          },
          {
            title: 'Дария Шевченко',
            alias: '@lable_kers'
          },
          {
            title: 'Дмитрий Погодин',
            alias: '@lable_kers'
          },
          {
            title: 'Андрей Вашуленко',
            alias: '@lable_kers'
          },
          {
            title: 'Дмитрий Погодин',
            alias: '@lable_kers'
          },
          {
            title: 'Андрей Вашуленко',
            alias: '@lable_kers'
          },
          {
            title: 'Дария Шевченко',
            alias: '@lable_kers'
          },
          {
            title: 'Дмитрий Погодин',
            alias: '@lable_kers'
          },
          {
            title: 'Андрей Вашуленко',
            alias: '@lable_kers'
          },
        ],
      }
    },
    computed: {
      ...mapGetters({
        // sidebarView: 'Messenger/sidebarView',
        searchedContacts: 'Messenger/getSearchedContacts',
      }),
    },
    methods: {
      ...mapMutations({
        routerNext: 'Messenger/ToolsScene/routerNext'
      }),
      openPersonData(personID){
        console.log(personID, 'idddd')
        this.$core.execViaComponent('MsgUser', 'full', personID);
        this.routerNext({name: 'contact-info'})
      },
      makeAction(id){
        if(id === 0){
          this.routerNext({name: 'search'})
        } else{
          this.routerNext({name: 'invite'})
        }

      }
    },
    created() {
      this.$core.execViaComponent('MsgUser', 'search', '');
    }
  }
</script>


<style lang="scss" scoped>
  .tab-view-contacts{
    //background-color: #EA5455;
    .facade-modal-action-list::v-deep {
      .action-list-body{
        left: 132px; /// говно
        top: 4px;
      }
    }
  }
</style>