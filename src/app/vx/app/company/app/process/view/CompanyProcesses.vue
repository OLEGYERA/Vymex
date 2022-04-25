<template>
  <div class="company-processes-files">
    <comeback @onClick="$router.push({name: 'vx.process'})"/>
    <div class="header-text-group">
      <title-base>{{processModel === 'official-processes'
          ? 'Процессы должностного лица'
          : 'Процессы компании'}}</title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>
    <header-add v-if="messages[0]"
                settingSlider
                @create="$router.push({name: 'vx.process.create.process'})"
    >
      <template #header-title>процессы</template>
      <template #header-amount>{{
          processModel === 'company-processes'
              ? countProcesses.company
              : countProcesses.unit
        }}
      </template>
    </header-add>
    <header-add v-else @create="$router.push({name: 'vx.process.create.process'})">
      <template #header-title>процессы</template>
    </header-add>
    <div v-if="messages[0]">
      <process-message v-for="(message, key) in messages"
                       :message="message"
                       :key="key"
                       :index="message.id"
      />
    </div>
    <div v-else class="empty-processes">
      <div class="image-circle-big">
        <img src="@/assets/img/my/empty-process.svg">
      </div>
      <div class="image-circle-small"></div>
      Процессов нет
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'vx.process.company.processes',
  data: () => ({
      createProcess: false
  }),
  components: {
    Comeback: () => import('@Facade/Navigation/Comeback'),
    HeaderAdd: () => import('@/LTE/Singletons/facades/HeaderAdd'),
    TitleBase: () => import('@Facade/Title/Base'),
    InputSearch: () => import('@Facade/Input/Search'),
    ProcessMessage: () => import('./ProcessMessage')
  },
  mounted() {
    if (this.processModel === 'company-processes') {
      this.$core.execViaComponent('Processes', 'getLevel',
          {
            creatorId: this.currentWorkerId.userId,
            levelId: this.currentWorkerId.levelId ? this.currentWorkerId.levelId : 1,
            companyId: this.currentCompany.base.id
          });
    } else {
      this.$core.execViaComponent('Processes', 'getUnit',
          {creatorId: this.currentWorkerId.userId, unitId: this.currentWorkerId.unitId, search: ''});
    }
    this.$core.execViaComponent('Processes', 'count',
        {
          creatorId: this.currentWorkerId.userId,
          unitId: this.currentWorkerId.unitId,
          levelId: this.currentWorkerId.levelId,
          companyId: this.currentCompany.base.id
        });
      this.$core.execViaComponent('Processes', 'getUnits', this.currentWorkerId.unitId);
  },
  computed: {
    ...mapGetters({
      messages: 'getMessages',
      countProcesses: 'getCountProcesses',
      currentWorkerId: 'getCurrentWorkerId',
      currentCompany: 'Company/getCurrentCompany',
      processModel: 'getProcessModel'
    })
  },
}
</script>
<style lang="scss" scoped>
.company-processes-files {
  width: 100%;

  .header-text-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .icon {
      color: #fff;
    }
  }

  .facade-input-search {
    margin-bottom: rem(16);
  }

  .facade-header-add {
    padding: rem(8) 0;
    margin-bottom: 8px;
  }
  .empty-processes {
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $grey-scale-500;
    border-radius: 12px;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    color: $grey-scale-300;

    .image-circle-big {
      position: relative;
      height: 36px;
      width: 36px;
      border-radius: 18px;
      background: linear-gradient(45deg, $grey-scale-300 40%, #69C0FF 80%);
      z-index: 1;
      margin-bottom: 4px;
    }

    .image-circle-small {
      position: absolute;
      height: 30px;
      width: 30px;
      border-radius: 15px;
      background: #69C0FF;
      margin-bottom: 34px;
      margin-left: 22px;
      z-index: 0;
    }
  }
}

</style>