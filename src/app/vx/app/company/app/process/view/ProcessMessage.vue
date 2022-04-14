<template>
  <div class="container-process-message">
    <div class="text-group-text" @click="clickedMessage">{{ createElipsis }}</div>
    <div class="text-group-action">
      <process-event :message="message"/>
      <icon-points-vertical @click.native="actionListStatus = true"/>
    </div>
    <div class="action-list-outside" v-if="actionListStatus" @click="actionListStatus = false"></div>
    <action-list :status="actionListStatus" :actions="items" @onList="editProcess" @onDelete="deleteProcess"/>
  </div>
</template>

<script>
import IconPointsVertical from "@Icon/PointsVertical";
import ActionList from "@Facade/Modal/ActionList";
import {mapGetters, mapMutations} from "vuex";
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
      items: ['Редактировать']
    }
  },
  props: {
    message: Object,
    index: Number
  },
  methods: {
    ...mapMutations({
      setProcessIndex: 'setChooseProcessIndex',
      setSelectedProcess: 'setClickedSelectedProcess'
    }),
    editProcess() {
      this.actionListStatus = false;
      this.setProcessIndex(this.index)
      this.setSelectedProcess(this.message)
      this.$router.push({name: 'vx.process.edit.process'})
      this.$core.execViaComponent('Processes', 'get', this.index);
    },
    clickedMessage() {
      this.$core.execViaComponent('Processes', 'get', this.index);
      this.$router.push({name: 'vx.process.selected.process'})
    },
    deleteProcess() {
      this.actionListStatus = false;
      this.$core.execViaComponent('Processes', 'delete', this.index);
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
    }
  },
  computed: {
    ...mapGetters({
      currentWorkerId: 'getCurrentWorkerId',
      processModel: 'getProcessModel',
      currentCompany: 'Company/getCurrentCompany'
    }),
    createElipsis() {
      let ArrayCounter = this.message.title.split('')
      if (ArrayCounter.length > 85) {
        let ArrayCountSlice = ArrayCounter.slice(0, 85)
        let finalString = ''
        for (let i = 0; i < ArrayCountSlice.length; i++) {
          finalString += ArrayCountSlice[i]
        }
        finalString += '...'
        return finalString
      } else {
        return this.message.title
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container-process-message {
  position: relative;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 12px;
  background-color: $grey-scale-400;
  cursor: pointer;
  height: 48px;
  margin-bottom: 8px;

  .text-group-text {
    display: inherit;
    align-items: flex-start;
    width: 69.2%;
    font-weight: 600;
    font-size: rem(15);
    line-height: rem(20);
    color: #FFF;
    margin: 12px 12px 12px 8px;
  }
  .text-group-action{
    display: flex;
    justify-content: space-between;
    width: 28%;
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
  right: 144px;
  top: 50px;
}
</style>