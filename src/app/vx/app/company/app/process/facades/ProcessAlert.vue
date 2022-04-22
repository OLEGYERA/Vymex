<template>
  <div class="facade-process-alert">
    <div class="process-alert-container">
      <span class="process-alert-title">Оповещение</span>
      <div class="process-alert-container-view">
        <span class="process-alert-text">{{currentPeriod}}</span>
        <div @click="changeStatus">
          <dropdown-arrow class="process-alert-dropdown" v-if="!status"/>
          <up-arrow class="process-alert-up" v-else/>
        </div>
      </div>
    </div>
    <div class="process-alert-border"></div>
    <transition>
      <periodicity-processes
          @onList="onList"
          :status="status"
          :actions="items"
          v-if="status"
      />
    </transition>
  </div>
</template>

<script>
import DropdownArrow from "@Icon/DropdownArrow";
import UpArrow from "@Icon/UpArrow";
import PeriodicityProcesses from "../view/PeriodicityProcesses";

export default {
  name: 'vx.process.facade.process.alert',
  props:{
    currentAlertWorker: Number || null
  },
  created(){
    if(this.currentAlertWorker <= 1 || this.currentAlertWorker === null){
      this.currentPeriod = 'За день до начала'
    } else if(this.currentAlertWorker === 2){
      this.currentPeriod = 'За неделю до начала'
    } else if(this.currentAlertWorker === 3) {
      this.currentPeriod = 'За две недели до начала'
    }
  },
  data() {
    return {
      status: false,
      currentPeriod: 'За день до начала',
      items: [
        {title: 'За день до начала', checked: true},
        {title: 'За неделю до начала', checked: false},
        {title: 'За две недели до начала', checked: false}
      ]
    }
  },
  components: {
   DropdownArrow,
    PeriodicityProcesses,
    UpArrow
  },
  methods: {
    changeStatus() {
      this.status = !this.status
    },
    onList(i){
      this.items.map(el => el.checked = false)
      this.items[i].checked = !this.items[i].checked
      this.currentPeriod = this.items[i].title
      this.$emit('alert-worker', i + 1)
      this.status = !this.status
    }
  }
}
</script>

<style lang="scss" scoped>
.facade-process-alert {
  display: flex;
  flex-direction: column;
  margin: 24px 0;

  .process-alert-container {
    display: inherit;
    flex-direction: column;

    .process-alert-title {
      font-size: rem(12);
      line-height: rem(16);
      margin: 2px 0;
      color: $grey-scale-200;
    }

    .process-alert-container-view {
      display: inherit;
      justify-content: space-between;

      .process-alert-text {
        font-size: rem(15);
        line-height: rem(20);
        color: #FFFFFF;
        margin: 2px 0;
      }
      .process-alert-dropdown {
        color: #FFF;
      }
      .process-alert-up{
       position: relative;
        top: 5px;
        right: -5px;
      }
    }
  }

  .process-alert-border {
    width: 100%;
    height: 1px;
    background: $grey-scale-300;
    margin: 7px 0;
  }
}

</style>