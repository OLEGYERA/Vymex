<template>
  <div class="support-modules-context-view" v-if="status">
    <div class="modules-context-view-body">
      <div v-for="(section, sectionKey) in sections" :key="sectionKey" class="context-view-body-items"
           @click="handleClickOnItem(sectionKey)">
        <div class="context-view-body-item">
          <img class="body-item-icon" :src="section.icon"/>
          <span class="body-item-title">{{ section.title }}</span>
        </div>
      </div>
    </div>
    <div class="action-list-outside" v-if="status"
         @click="changeStatus"></div>
  </div>
</template>
<script>

export default {
  name: 'support.modules.context',
  data: () => ({
    sections: [
      {isActive: true, icon: require('@/assets/img/my/dashboard.svg'), title: 'Дашборд'},
      {isActive: false, icon: require('@/assets/img/my/process.svg'), title: 'Процессы'},
      {isActive: false, icon: require('@/assets/img/my/resource.svg'), title: 'Склад ресурсов'},
      {isActive: false, icon: require('@/assets/img/my/structure.svg'), title: 'Структура компании'},
      {isActive: false, icon: require('@/assets/img/my/share-management.svg'), title: 'Управление долей'},
      {isActive: false, icon: require('@/assets/img/my/team.svg'), title: 'Команда'},
      {isActive: false, icon: require('@/assets/img/my/task.svg'), title: 'Задачи'},
      {isActive: false, icon: require('@/assets/img/my/result.svg'), title: 'Результат компании'},
      {isActive: false, icon: require('@/assets/img/my/co-queues.svg'), title: 'Соучредители'},
      {isActive: false, icon: require('@/assets/img/my/control-center.svg'), title: 'Центр управления'},
      {isActive: false, icon: require('@/assets/img/my/calendar.svg'), title: 'Календарь'},
      {isActive: false, icon: require('@/assets/img/my/storage.svg'), title: 'Склад ресурсов'},
      {isActive: false, icon: require('@/assets/img/my/settings.svg'), title: 'Настройки'},
      {isActive: false, icon: require('@/assets/img/my/assumptions.svg'), title: 'Предположения'},
      {isActive: false, icon: require('@/assets/img/my/costs.svg'), title: 'Расходы С.Е.'},
      {isActive: false, icon: require('@/assets/img/my/result-c-e.svg'), title: 'Результаты С.Е.'},
    ]
  }),
  props: {
    status: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClickOnItem(id) {
      this.$emit('on-list', this.sections[id].title);
      this.changeStatus()
    },
    changeStatus() {
      this.$emit('change-status');
    }
  }
}
</script>

<style lang="scss" scoped>
.support-modules-context-view {
  position: relative;
  width: 100%;

  .modules-context-view-body {
    color: #fff;
    background: $grey-scale-700;
    border-radius: 8px;
    position: absolute;
    margin-bottom: 4px;
    z-index: 2;
    width: 100%;
    height: rem(260);
    overflow-y: scroll;

    .context-view-body-items {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      padding: rem(14) 0;

      .context-view-body-item {
        display: inherit;
        align-items: center;

        .body-item-icon {
          width: rem(24);
          height: rem(24);
          margin-left: rem(20);
        }

        .body-item-title {
          margin-left: rem(12);
          font-weight: 400;
          font-size: rem(17);
          line-height: rem(24);
        }
      }
      &:hover {
        background: $grey;
      }
    }
  }
  .modules-context-view-body::-webkit-scrollbar{
    width: 4px;
  }
}
.action-list-outside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: auto;
}

</style>