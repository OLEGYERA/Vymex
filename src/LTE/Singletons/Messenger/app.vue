<template>
  <div class="singleton-messenger-app">
    <div class="messenger-app-block">
      <main class="messenger-app-main">
        <div>
          <messages-header @changeMessenger="changeMessenger" :name="user.name"/>
          <div class="messenger-app-info">
            <transition name="blocks">
              <personal-info :user="user" v-if="open==='owner'"/>
              <dialogs-block v-if="open==='dialogs'"/>
              <contacts-block v-if="open==='contacts'"/>
            </transition>
          </div>
        </div>
      </main>
      <aside class="messenger-app-sidebar">
        <side-panel
          :type="type"
          @changeMessenger="changeMessenger"
          :open="open"
        />
      </aside>
    </div>
  </div>
</template>

<script>
  import MessagesHeader from "@/LTE/Singletons/Messenger/MessagesHeader"
  import ContactsBlock from '@/LTE/Singletons/Messenger/ContactsBlock'
  import DialogsBlock from '@/LTE/Singletons/Messenger/DialogsBlock'
  import PersonalInfo from '@/LTE/Singletons/Messenger/PersonalInfo'
  import SidePanel from "@/LTE/Singletons/Facades/SidePanel"

  export default {
    name: 'Singleton.Messenger.app',
    components: {
      MessagesHeader,
      ContactsBlock,
      DialogsBlock,
      PersonalInfo,
      SidePanel
    },
    data() {
      return {
        user: {
          name: 'Александр Ким',
          nickname: '@arnoldino22',
          phone: '+380(63)-222-33-44',
          mail: 'makaroni@mail.com',
          birthday: '2 апреля',
          about: 'Короткий но емкий текст о том насколько я хорош, профессионален, и самое главное — скромен до глубины души.'
        },
        type: 'messenger'
      };
    },
    props: {
      open: String,
    },
    methods: {
      changeMessenger(type) {
        this.$emit('change-messenger', type)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .singleton-messenger-app{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    background-color: rgba($grey-scale-700, .8);
    z-index: 3;
    .messenger-app-block {
      display: flex;
      height: 100%;
      background-color: $grey;
      .messenger-app-main {
        height: 100%;
        background-color: $grey;
        width: 372px;
        .messenger-app-info {
          padding: rem(24) rem(20);
          width: 100%;
          box-sizing: border-box;
          height: 100%;
          overflow-y: scroll;
        }
      }
    }
  }
  .blocks {
    &-enter{
      transform: translateX(15%);
    }
    &-leave-to{
      opacity: 0;
    }
    &-enter-active{
      transition: $vx-tab-time all ease;
    }
    &-enter-to{
      transform: translateX(0);
    }
  }
</style>