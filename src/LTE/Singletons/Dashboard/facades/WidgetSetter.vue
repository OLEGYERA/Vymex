<template>
  <div class="dashboard-facade-widget-setter">
    <div class="widget-setter-static"
         @dragstart="startDrag($event, widget.widgetId)"
         @dragenter="enterDrag"
         draggable="true"
         :id="widget.name"
         v-if="draggingWidget !== widget.widgetId">
      <div class="widget-setter-main">
        <img class="main-icon" :src="widget.icon"/>
        <span>{{ widget.title }}</span>
      </div>
      <icon-burger/>
    </div>
    <div v-else class="widget-setter-dragging"></div>
  </div>
</template>

<script>

export default {
  name: "dashboard.facade.widget.setter",
  props: {
    widget: {
      type: Object,
      required: true
    },
    draggingWidget: {
      type: Number || null
    }
  },
  methods: {
    startDrag(event, item) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemID', item)
      setTimeout(() => {
        this.$emit('dragging-widget', item)
      }, 50)
    },
    enterDrag(e){
      e.preventDefault()
      this.$emit('target-widget', e.target.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-facade-widget-setter {

  .widget-setter-static {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $grey-scale-400;
    border-radius: rem(12);
    margin-top: rem(12);
    padding: rem(18) rem(16) rem(18) rem(10);
    cursor: grab;

    .widget-setter-main {
      display: inherit;
      align-items: inherit;
      color: #FFF;

      .main-icon {
        width: rem(28);
        height: rem(28);
        margin-right: rem(10);
      }
    }
  }

  .widget-setter-dragging {
    border-radius: rem(12);
    margin-top: rem(12);
    padding: rem(18) rem(16) rem(18) rem(10);
    border: 1px dashed $grey-scale-400;
    height: rem(28);
  }
}

.icon-burger {
  color: $grey-scale-200;
  width: rem(15);
  height: rem(12);
}
</style>