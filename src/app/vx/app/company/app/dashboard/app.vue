<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <span class="dashboard-header-title">Дашборд</span>
      <img :src="require('@/assets/img/icons/context.svg')"/>
    </div>
    <div class="dashboard-body">
      <component v-for="(component, i) in components"
                 :is="component.name"
                 :data="component"
                 :key="i"
                 :index="i"
                 @show-context="showContext"
      />
      <sidebar v-if="grantAccess"
               :status="grantAccess"
               @on-close="onClose"
               @handle-access="handleAccess"/>
      <modal
          :status="showModal"
          @onClose="onClose"
          @onOk="toHide"
      >
        <template #title>Скрыть виджет?</template>
        <template #description>Вернуть виджет на дашборд можно в настройках С.Е.</template>
        <template #button-accept>Скрыть</template>
      </modal>
      <modal class="owner"
             :status="showAccessModal"
             @onClose="onClose"
             @onOk="handleAccess"
      >
        <template #title>Предоставить доступ</template>
        <template #content>
          <modal-data :data="modalData"/>
        </template>
        <template #button-accept>Сохранить изменения</template>
      </modal>
    </div>
    <template>
      <div>
        <div @click="$router.push({name: 'vx.co.task', params: {companyID: $route.params.companyID}})"></div>
      </div>
    </template>
  </div>
</template>

<script>


import Sidebar from "@/LTE/Singletons/Dashboard/views/sidebar/Sidebar";
import ModalData from "@/LTE/Singletons/Dashboard/views/sidebar/ModalData";
import Modal from "@Facade/Modal/Base";
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: "Dashboard",
  components: {
    Structure: () => import('@/LTE/Singletons/Dashboard/views/widgets/Structure'),
    Resources: () => import('@/LTE/Singletons/Dashboard/views/widgets/Resources'),
    Result: () => import('@/LTE/Singletons/Dashboard/views/widgets/Result'),
    Costs: () => import('@/LTE/Singletons/Dashboard/views/widgets/Costs'),
    Calendar: () => import('@/LTE/Singletons/Dashboard/views/widgets/Calendar'),
    ResourcesCE: () => import('@/LTE/Singletons/Dashboard/views/widgets/ResourcesCE'),
    Processes: () => import('@/LTE/Singletons/Dashboard/views/widgets/Processes'),
    Tasks: () => import('@/LTE/Singletons/Dashboard/views/widgets/Tasks'),
    Team: () => import('@/LTE/Singletons/Dashboard/views/widgets/Team'),
    CoQueues: () => import('@/LTE/Singletons/Dashboard/views/widgets/CoQueues'),
    ControlCenter: () => import('@/LTE/Singletons/Dashboard/views/widgets/ControlCenter'),
    Sidebar,
    ModalData,
    Modal
  },
  data() {
    return {
      showModal: false,
      showAccessModal: false,
      grantAccess: false,
    }
  },
  computed: {
    ...mapGetters({
      components: 'getComponents',
      componentsName: 'getComponentsName',
      modalData: 'getModalData',
      levels: 'getLevels',
      hideWidget: 'getHideWidget'
    })
  },
  methods: {
    ...mapMutations({
      setComponents: 'setWidgetComponents',
      setComponentsName: 'setWidgetComponentsName',
      setModalData: 'setWidgetModalData',
      setLevels: 'setWidgetLevels',
      setHideWidget: 'setWidgetHideWidget',
    }),
    showContext(value, name) {
      this.setComponentsName(name)
      if (value === 1) this.showModal = true
      if (value === 0) this.grantAccess = true
    },
    onClose() {
      this.showModal = false
      this.showAccessModal = false
      this.grantAccess = false
    },
    toHide() {
      this.setHideWidget(this.componentsName)
      this.showModal = false
      setTimeout(() => {
        this.showAccessModal = false
        const mutationDashboard = this.components.filter(el => el.name !== this.componentsName)
        this.setComponents(mutationDashboard)
        this.showMessage()
      }, 350)
    },
    showMessage() {
      this.$notify({text: 'Виджет скрыт!', type: 'success', duration: 3000, speed: 500})
    },
    handleAccess() {
      this.grantAccess = false
      this.showAccessModal = !this.showAccessModal
      this.typesOfModals()
    },
    typesOfModals() {
      let statusObserverLevels = this.levels.filter(el => el.checkedLevel === true)
      let men = {lvl: 0, num: 0}
      for (let i = 0; i < this.levels.length; i++) {
        for (let j = 0; j < this.levels[i].data.length; j++) {
          if (this.levels[i].data[j]) {
            if (this.levels[i].data[j].checkedPosition === true) {
              men.num += 1
              men.lvl = this.levels[i].level
            }
          }
        }
      }
      if (statusObserverLevels.length === 4) {
        this.setModalData({
          men: 'Все',
          position: 'Все 256 СЕ',
          level: 3,
          levelText: '3 уровень'
        })
      } else if (men.num === 1) {
        this.setModalData({
          men: 'Мишель Довер',
          position: 'Занимает должности',
          level: men.lvl,
          levelText: `Должность ${men.lvl} уровня`
        })
      } else {
        this.setModalData({
          men: 'Graphic Designer',
          position: 'Все должности',
          level: 4,
          levelText: '4 уровень'
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>

.dashboard {
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    margin: 48px 0 24px 0;

    .dashboard-header-title {
      font-weight: 600;
      font-size: rem(28);
      line-height: rem(34);
      color: #FFF;
    }
  }

  .dashboard-body {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    margin: 12px auto;
    grid-gap: 24px;
    display: grid;
  }
}

.facade-modal-base {
  &::v-deep {
    .modal-base-body {
      width: 632px;
      height: 224px;
      justify-content: space-between;
    }
  }

  .modal-base-content {
    display: none;
  }
}

.owner.facade-modal-base {
  &::v-deep {
    .modal-base-body {
      width: 632px;
      height: 544px;
      justify-content: space-between;
    }
  }
}

.messenger-app-sidebar ::v-deep {
  display: flex;
  height: 100%;
  background-color: $grey;

  .sidebar-main {
    width: 372px;
  }
}
</style>