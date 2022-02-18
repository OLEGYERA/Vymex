<template>
  <div class="container-process-message">
    <div class="process-message-text-group" @click="clickedMessage">
      <div class="text-group-text">{{ message.text }}</div>
      <process-event  v-if="message.panel"
                      :message="message"/>
    </div>
    <icon-points-vertical @click.native="actionListStatus=true"/>
    <div class="action-list-outside" v-if="actionListStatus" @click="actionListStatus = false"></div>
    <action-list :action-list-status="actionListStatus" :items="items" @onClick="changePage"/>
  </div>
</template>

<script>
import IconPointsVertical from "@Icon/PointsVertical"
import ActionList from "@Facade/Modal/ActionList";
import {mapMutations} from "vuex";
import ProcessEvent from "@/app/vx/app/company/app/process/facades/ProcessEvent";

export default {
  name: 'vx.process.process.message',
  components: {
    IconPointsVertical,
    ActionList,
    ProcessEvent
  },
  data() {
    return {
      actionListStatus: false,
      items: ['Редактировать', 'Удалить ']
    }
  },
  props: {
    message: Object,
    index: Number
  },
  methods: {
    ...mapMutations({
      setProcessIndex: 'setChooseProcessIndex'
    }),
    changePage() {
      this.actionListStatus = false;
    },
    clickedMessage() {
      this.setProcessIndex(this.index)
      this.$router.push({name: 'vx.process.selected.process'})
    }
  },
}
</script>
<style lang="scss" scoped>
.container-process-message {
  position: relative;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background-color: $grey-scale-400;
  cursor: pointer;
  height: 48px;
  margin-bottom: 8px;

  .process-message-text-group {
    display: inherit;
    align-items: inherit;
    justify-content: space-between;

    .text-group-text {
      display: inherit;
      align-items: flex-start;
      width: 560px;
      font-weight: 600;
      font-size: rem(15);
      line-height: rem(20);
      color: #FFF;
      margin: 0 12px;
      -ms-text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-box-orient: vertical;
    }
  }

  .icon-points {
    padding: 0 10px;
    color: #fff;
    height: 16px;
  }

  .icon {
    color: #fff;
    margin-right: 10px;
  }

  .action-list-outside {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    cursor: auto;
  }

  .facade-modal-action-list {
    position: absolute;
    right: 14px;
    top: 40px;
  }
}
</style>