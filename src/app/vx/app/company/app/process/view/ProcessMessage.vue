<template>
  <div class="container-process-message">
      <div class="text-group-text" @click="clickedMessage">{{ createElipsis }}</div>
      <process-event v-if="message.regular"
                     :message="message"/>
      <icon-points-vertical @click.native="actionListStatus = true"/>
      <div class="action-list-outside" v-if="actionListStatus" @click="actionListStatus = false"></div>
      <action-list :status="actionListStatus" :actions="items" @onList="changePage"/>
    </div>
</template>

<script>
import IconPointsVertical from "@Icon/PointsVertical";
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
      setEditMode: 'setIsEditMode',
    }),
    changePage() {
      this.actionListStatus = false;
      this.setEditMode(true)
      this.$router.push({name: 'vx.process.create.process'})
    },
    clickedMessage() {
      this.setProcessIndex(this.index)
      this.$router.push({name: 'vx.process.selected.process'})
    }
  },
  computed:{
    createElipsis(){
      let ArrayCounter = this.message.text.split('')
      if(ArrayCounter.length > 85){
        let ArrayCountSlice = ArrayCounter.slice(0,85)
        let finalString = ''
        for(let i = 0; i < ArrayCountSlice.length; i++){
          finalString += ArrayCountSlice[i]
        }
        finalString += '...'
        return finalString
      } else {
        return this.message.text
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
  justify-content: space-between;
  border-radius: 12px;
  background-color: $grey-scale-400;
  cursor: pointer;
  height: 48px;
  margin-bottom: 8px;

    .text-group-text {
      display: inherit;
      align-items: flex-start;
      width: 71.9%;
      font-weight: 600;
      font-size: rem(15);
      line-height: rem(20);
      color: #FFF;
      margin: 0 12px;
      //-ms-text-overflow: ellipsis;
      //-o-text-overflow: ellipsis;
      //text-overflow: ellipsis;
      //overflow: hidden;
      //-webkit-line-clamp: 2;
      //display: -webkit-box;
      //word-wrap: break-word;
      //-webkit-box-orient: vertical;
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