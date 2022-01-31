<template>
  <div class="container-dashboard-resourcesCE">
    <div class="resourcesCE-header">
      <img :src="icon"/>
      <span class="header-title">Ресурсы С.Е.</span>
      <div class="resourcesCE-header-menu-button" @click="actionListStatus = !actionListStatus">
        <img :src="context" :class="{active: actionListStatus}"/>
        <transition name="fade">
          <action-list :items="items" v-if="actionListStatus"/>
        </transition>
      </div>
    </div>
    <div class="resourcesCE-body">
      <span class="body-title">Последние</span>
      <div class="body-content">
        <div class="content-item"
             v-for="file in data"
             :key="file.id">
          <img :src="file.picture"/>
          <span class="item-text">{{ file.file }}</span>
          <div class="item-border"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionList from "@/LTE/Singletons/Messenger/facades/ActionList";
export default {
  name: "ResourcesCE",
  data() {
    return {
      icon: require('@/assets/img/my/resource.svg'),
      context: require('@/assets/img/icons/context.svg'),
      actionListStatus: false,
    }
  },
  components: {
    ActionList,
  },
  props: ['data', 'items']
}
</script>

<style lang="scss" scoped>
.container-dashboard-resourcesCE {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .resourcesCE-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 7%;

    .header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
      margin: 1% 52% 0% 2%;
    }
    .resourcesCE-header-menu-button {
      position: relative;
      .singleton-messenger-action-list {
        position: absolute;
        bottom: -1px;
        z-index: 1;
        right: -1px;
        transform: translateY(100%);
      }
    }
  }

  .resourcesCE-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .body-title {
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: $grey-scale-200;
      margin-bottom: 1%;
    }

    .body-content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .content-item {
        margin-top: 3%;

        .item-text {
          color: #FFF;
          font-size: 12px;
          line-height: 16px;
          margin-left: 2%;
        }

        .item-border {
          border-bottom: #313D49 solid 1px;
          margin-top: 2%;
        }
      }
    }
  }
}

</style>

