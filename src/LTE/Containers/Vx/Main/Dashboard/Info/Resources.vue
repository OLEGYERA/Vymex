<template>
  <div class="container-dashboard-resources">
    <div class="resources-header">
      <img :src="icon"/>
      <span class="header-title">Склад ресурсов</span>
      <div class="resources-header-menu-button" @click="actionListStatus = !actionListStatus">
        <img :src="context" :class="{active: actionListStatus}"/>
        <transition name="fade">
          <action-list
              :items="items"
              v-if="actionListStatus"
              v-bind:id="id"
              v-on:hide-item="hideItem"
          />
        </transition>
      </div>
    </div>
    <div class="resources-body">
      <div class="body-coast"
           :style="{ marginRight: '8px' }">
        <span class="coast-total">Общая стоимость ресурсов</span>
        <span class="coast-sum">{{ data.coastSum }}₴</span>
      </div>
      <div class="body-coast"
           :style="{ marginLeft: '8px' }">
        <span class="coast-total">Количество свободных ресурсов</span>
        <span class="coast-sum">{{ data.resourcesSum }}</span>
      </div>
    </div>
    <div class="resources-footer">
      <span>Запросы на ресурс</span>
      <span class="footer-num">{{ data.requests }}</span>
    </div>
  </div>
</template>

<script>
import ActionList from "@/LTE/Singletons/Messenger/facades/ActionList";

export default {
  name: "Resources",
  data() {
    return {
      icon: require('@/assets/img/my/storage.svg'),
      context: require('@/assets/img/icons/context.svg'),
      actionListStatus: false,
    }
  },
  methods: {
    hideItem(id) {
      this.$emit('hide-item', id)
    }
  },
  components: {
    ActionList,
  },
  props: {
    data: Object,
    items: Array,
    id: Number
  }
}
</script>

<style lang="scss" scoped>
.container-dashboard-resources {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 16px;
  background-color: $grey-scale-500;
  padding: 16px;
  height: 224px;

  .resources-header {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 8%;

    .header-title {
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      color: #FFF;
      margin: 1% 43% 0% 2%;
    }

    .resources-header-menu-button {
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

  .resources-body {
    display: flex;

    .body-coast {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8px;
      background: $grey-scale-400;
      border-radius: 12px;
      width: 100%;

      .coast-total {
        font-size: 12px;
        line-height: 16px;
        color: $grey-scale-200;
      }

      .coast-sum {
        font-weight: 600;
        font-size: 20px;
        color: #FFF;
        margin-top: 5%;
      }
    }
  }

  .resources-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    padding: 12px;
    height: 40px;
    background: $grey-scale-400;
    border-radius: 12px;
    margin-top: 6.4%;

    .footer-num {
      text-align: center;
      background: $red;
      border-radius: 10px;
      width: 24px;
      height: 16px;
      font-weight: 600;
      font-size: 12px;
      margin-left: 2%;
    }
  }
}
</style>

