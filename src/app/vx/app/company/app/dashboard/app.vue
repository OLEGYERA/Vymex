<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <span class="dashboard-header-title">Дашборд</span>
      <div class="dashboard-header-main">
        <icon-notification-off v-if="isNotificationsOn"/>
        <div @click="actionListStatus = !actionListStatus" class="header-main-context">
          <icon-points-vertical class="context-icons-points"/>
          <transition>
            <action-list
                @onList="showSidebar($event)"
                :status="actionListStatus"
                :actions="items"
                v-if="actionListStatus"/>
          </transition>
        </div>
      </div>
    </div>
    <div class="dashboard-body">
      <component v-for="(component, i) in components"
                 :is="widgetsArray.includes(component.name) && component.isVisible && component.name"
                 :data="component"
                 :key="i"
                 :index="i"
                 @show-context="showContext"
      />
      <sidebar v-if="grantAccess"
               :status="grantAccess"
               @on-close="onClose"
               @handle-access="handleAccess">
        <template #head-title>Выдать доступ</template>
        <template #title-caps-parent class="title-caps">пользователь</template>
        <template #button-title>Выдать доступ</template>
      </sidebar>
      <onboarding-app/>
      <sidebar-widget-display
          :status="isShowWidgetDisplay"
          @onClose="onClose"/>
      <modal
          :status="showModal"
          @onClose="onClose"
          @onOk="toHide">
        <template #title>Скрыть виджет?</template>
        <template #description>Вернуть виджет на дашборд можно в настройках С.Е.</template>
        <template #button-accept>Скрыть</template>
      </modal>
      <modal class="owner"
             :status="showAccessModal"
             @onClose="onClose"
             @onOk="handleAccess">
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
    <div class="action-list-outside" v-if="actionListStatus"
         @click="actionListStatus = false"></div>
  </div>
</template>

<script>


import Sidebar from "@/LTE/Singletons/Dashboard/views/sidebar/Sidebar";
import ModalData from "@/LTE/Singletons/Dashboard/views/sidebar/ModalData";
import Modal from "@Facade/Modal/Base";
import OnboardingApp from "@/LTE/Singletons/Dashboard/onboarding/app";
import ActionList from "@Facade/Modal/ActionList";
import SidebarWidgetDisplay from "@/LTE/Singletons/Dashboard/views/sidebar/SidebarWidgetDisplay";
import DashboardMixin from "@/LTE/Singletons/Dashboard/mixin";

import {mapGetters, mapMutations} from 'vuex';

export default {
  name: "Dashboard",
  components: {
    //закомментированные модули будут выкачены в будущих версиях
    Structure: () => import('@/LTE/Singletons/Dashboard/views/widgets/Structure'),
    Warehouse: () => import('@/LTE/Singletons/Dashboard/views/widgets/Warehouse'),
    //CompanyResults: () => import('@/LTE/Singletons/Dashboard/views/widgets/CompanyResults'),
    //Expenses: () => import('@/LTE/Singletons/Dashboard/views/widgets/Expenses'),
    // Calendar: () => import('@/LTE/Singletons/Dashboard/views/widgets/Calendar'),
    Resources: () => import('@/LTE/Singletons/Dashboard/views/widgets/Resources'),
    Processes: () => import('@/LTE/Singletons/Dashboard/views/widgets/Processes'),
    Tasks: () => import('@/LTE/Singletons/Dashboard/views/widgets/Tasks'),
    //Team: () => import('@/LTE/Singletons/Dashboard/views/widgets/Team'),
    //Cofounders: () => import('@/LTE/Singletons/Dashboard/views/widgets/Сofounders'),
    // ControlCenter: () => import('@/LTE/Singletons/Dashboard/views/widgets/ControlCenter'),
    ActionList,
    Sidebar,
    ModalData,
    Modal,
    OnboardingApp,
    SidebarWidgetDisplay,
    DashboardMixin
  },
  data() {
    return {
      showModal: false,
      showAccessModal: false,
      grantAccess: false,
      actionListStatus: false,
      items: ['Отображение виджетов', 'Отключить уведомления'],
      widgetsArray: ['structure', 'warehouse', 'resources', 'processes', 'tasks'],
      // otherWidgets: ['companyResults', 'expenses', 'calendar', 'team', 'cofounders'],
      isShowWidgetDisplay: false,
      isNotificationsOn: false
    }
  },
  mounted() {
    this.$core.execViaComponent('Dashboard', 'get', this.selectedCompany.workerId);
  },
  computed: {
    ...mapGetters({
      components: 'getComponents',
      componentsName: 'getComponentsName',
      modalData: 'getModalData',
      levels: 'getLevels',
      hideWidget: 'getHideWidget',
      selectedCompany: 'Company/getSelectedCompany'
    })
  },
  mixins: [DashboardMixin],
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
      this.isShowWidgetDisplay = false
    },
    toHide() {
      this.setHideWidget(this.componentsName)
      this.showModal = false
      setTimeout(() => {
        this.showAccessModal = false
        const mutationDashboard = this.components.map(el => el.name === this.componentsName
            ? {...el, isVisible: false}
            : el)
        console.log(mutationDashboard, 'this.componentsName')
        this.setComponents(mutationDashboard)
        this.showMessage()
      }, 350)
      let hideWidget = this.components.find(el => el.name === this.componentsName)
      this.$core.execViaComponent('Widgets', 'setWidgetInvisible', {
        workerId: this.selectedCompany.workerId,
        widgetId: hideWidget.widgetId
      })
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
    showSidebar(e) {
      e === 0 ? this.isShowWidgetDisplay = !this.isShowWidgetDisplay : null
      if (e === 1) {
        this.isNotificationsOn = !this.isNotificationsOn
        if (this.items[1] === 'Отключить уведомления') {
          this.items[1] = 'Включить уведомления'
          this.$notify({text: 'Уведомления отключены', type: 'success', duration: 3000, speed: 500})
        } else {
          this.items[1] = 'Отключить уведомления'
        }
      }
      this.actionListStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>

.dashboard {
  padding-bottom: 80px;

  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 48px 0 24px 0;

    .dashboard-header-title {
      font-weight: 600;
      font-size: rem(28);
      line-height: rem(34);
      color: #FFF;
    }

    .dashboard-header-main {
      display: flex;

      .header-main-context {
        position: relative;
        margin-left: rem(26);

        .context-icons-points {
          cursor: pointer;
        }

        .facade-modal-action-list {
          position: absolute;
          top: 21px;
          z-index: 1;
          right: 198px;
          transform: translateY(100%);

          ::v-deep {
            .action-item-del {
              display: none;
            }
          }
        }

        .icon-points-vertical {
          color: #FFF;
        }
      }
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

.action-list-outside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: auto;
}
</style>