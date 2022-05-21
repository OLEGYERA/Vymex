<template>
  <div class="dashboard-sidebar-widget-display" v-if="status" @dragend="endDrag">
    <div class="widget-display-header">
      <span>Отображение виджетов</span>
      <div @click="cancelChanges">
        <icon-error class="header-close"/>
      </div>
    </div>
    <div class="widget-display-body">
      <div @drop="onDrop($event, true)"
           @dragenter.prevent
           @dragover.prevent>
        <title-caps class="display-body-title">Используемые виджеты</title-caps>
        <widget-setter v-for="component in sortWidgets.isVisible"
                       :style="{cursor: draggingWidget && 'grabbing'}"
                       :key="component.widgetId"
                       :widget="component"
                       @target-widget="targetWidget = $event"
                       :draggingWidget="draggingWidget"
                       @dragging-widget="draggingWidget = $event"/>
      </div>
      <div @drop="onDrop($event, false)"
           @dragenter.prevent
           @dragover.prevent>
        <title-caps class="display-body-title">Скрытые виджеты</title-caps>
        <widget-setter class="display-body-hidden"
                       v-for="component in sortWidgets.isHidden"
                       :style="{cursor: draggingWidget && 'grabbing'}"
                       :key="component.widgetId"
                       :widget="component"
                       @target-widget="targetWidget = $event"
                       :draggingWidget="draggingWidget"
                       @dragging-widget="draggingWidget = $event"/>
      </div>
      <button-base class="display-body-button" @onClick="saveChanges">Сохранить</button-base>
    </div>
  </div>
</template>
<script>

import {mapGetters, mapMutations} from "vuex";

export default {
  name: "dashboard.sidebar.widget.display",
  data: () => ({
    mouseMoveEvent: null,
    currentElement: null,
    draggingWidget: null,
    targetWidget: null
  }),
  components: {
    TitleCaps: () => import('@Facade/Title/Caps'),
    WidgetSetter: () => import('../../facades/WidgetSetter'),
    ButtonBase: () => import('@Facade/Button/Base'),
  },
  props: {
    status: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      components: 'getComponents',
      componentsDefault: 'getComponentsDefault',
      selectedCompany: 'Company/getSelectedCompany'
    }),
    sortWidgets() {
      let widgetsUpdated = {isVisible: [], isHidden: []}
      widgetsUpdated.isVisible = this.components.filter(el => el.isVisible && el.title)
      widgetsUpdated.isHidden = this.components.filter(el => !el.isVisible && el.title)
      return widgetsUpdated
    }
  },
  methods: {
    ...mapMutations({
      setComponents: 'setWidgetComponents'
    }),
    onDrop(event, list) {
      const itemID = event.dataTransfer.getData('itemID')
      const item = this.components.find(el => el.widgetId === +itemID)
      item.isVisible = list

      let dragWidget = this.components.find(el => el.widgetId === this.draggingWidget)
      let dropWidget = this.components.find(el => el.name === this.targetWidget)
      let dragWidgetIndex = this.components.indexOf(dragWidget);
      let dropWidgetIndex = this.components.indexOf(dropWidget);

      if (dragWidget && dropWidget) {
        if (dragWidgetIndex > dropWidgetIndex) {
          if (dragWidgetIndex > -1)  this.components.splice(dragWidgetIndex, 1);
          this.components.splice(this.components.indexOf(dropWidget), 0, dragWidget)
        } else {
          this.components.splice(this.components.indexOf(dropWidget) + 1, 0, dragWidget)
          if (dragWidgetIndex > -1) this.components.splice(dragWidgetIndex, 1);
        }
      }
      this.setComponents(this.components)

      this.draggingWidget = null
    },
    saveChanges() {
      let changeVisibleStatus = []
      this.componentsDefault.map(el => {
        this.components.map(item => item.widgetId === el.widgetId && item.isVisible !== el.isVisible && changeVisibleStatus.push(item))
      })

      changeVisibleStatus.map(el => {
        el.isVisible ? this.$core.execViaComponent('Widgets', 'setWidgetVisible', {
          workerId: this.selectedCompany.workerId,
          widgetId: el.widgetId
        }) : this.$core.execViaComponent('Widgets', 'setWidgetInvisible', {
          workerId: this.selectedCompany.workerId,
          widgetId: el.widgetId
        })
      })

      let widgetsArray = this.components.map(el => el.widgetId)
      this.$core.execViaComponent('Widgets', 'setWidgetsOrder', {
        workerId: this.selectedCompany.workerId,
        widgetsArray
      });

      this.$core.execViaComponent('Dashboard', 'get', this.selectedCompany.workerId);

      this.$emit('onClose')
      this.$notify({text: 'Изменения сохранены', type: 'success', duration: 3000, speed: 500})
    },
    cancelChanges() {
      this.$emit('onClose')
      this.setComponents(this.componentsDefault)
    },
    endDrag(e) {
      e.preventDefault()
      this.draggingWidget = null
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-sidebar-widget-display {
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  background-color: rgba($grey-scale-700, .8);
  z-index: 3;

  .widget-display-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: rem(332);
    height: rem(24);
    top: 0;
    right: 0;
    color: #FFF;
    padding: rem(20);
    font-weight: 600;
    font-size: rem(15);
    line-height: rem(20);
    background: $grey-scale-500;
    border-bottom: $grey-scale-700 solid 1px;
    z-index: 3;

    .header-close {
      color: $grey-scale-200;
      margin-right: rem(7);
      cursor: pointer;
    }
  }

  .widget-display-body {
    display: flex;
    flex-direction: column;
    width: rem(332);
    background: #181F26;
    top: rem(65);
    padding: rem(65) rem(20) 0;
    overflow-y: scroll;


    .display-body-title {
      margin-top: rem(32);
    }

    .display-body-hidden::v-deep.dashboard-facade-widget-setter {
      .widget-setter-static {
        background: $grey-scale-500;
      }
    }

    .display-body-button {
      width: 100%;
      margin: rem(20) 0;
    }
  }
}
</style>