<template>
  <transition name="blocks">
    <component :is="componentName" @onNewRoute="setRouterName($event)"/>
  </transition>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  /*eslint-disable*/
  import TabChats from './sidebar/TabChats.atom'
  import TabContacts from './sidebar/TabContacts.atom'
  import TabVolumes from './sidebar/TabVolumes.atom'


  import RouterPersonal from './sidebar/RouterPersonal.atom'


  export default {
    name: 'Singleton.Messenger.SidebarView',
    components: {
      TabChats, TabContacts, TabVolumes,
      RouterPersonal
    },
    computed: {
      ...mapGetters({sidebarView: 'Messenger/sidebarView'}),
      componentName(){
        const tabActive = this.sidebarView.tabActive;
        return tabActive.routerName ?'router-' + tabActive.routerName : 'tab-' + tabActive.name;
      }
    },
    methods: {
      ...mapMutations({setRouterName: 'Messenger/setRouterName'}),
    }
  }
</script>