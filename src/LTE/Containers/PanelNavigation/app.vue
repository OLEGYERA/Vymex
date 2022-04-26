<template>
  <div class="container-navigation-panel">
    <div v-for="(section, i) in companySections"
         :key="i"
         class="navigation-panel-item"
         @click="makeSmt(i)"
         :class="section.isActive ? 'panel-active-item' : ''"
         >
      <img :src="section.icon" class="panel-body-icon"/></div>
  </div>
</template>


<script>

import {mapGetters, mapMutations} from "vuex";

export default {
  name: "NavigationPanel",
  data() {
    return {
      // sections: [
      //   {isActive: true, icon: require('@/assets/img/my/dashboard.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/process.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/resource.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/share-management.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/team.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/task.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/structure.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/result.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/co-queues.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/control-center.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/calendar.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/storage.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/settings.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/assumptions.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/costs.svg')},
      //   {isActive: false, icon: require('@/assets/img/my/result-c-e.svg')},
      // ],
    }
  },
  computed: {
    ...mapGetters({
      companySections: 'Company/getSections'
    }),
  },
  methods: {
    ...mapMutations({
      changeStatus: 'Company/changeStatus'
    }),
    makeSmt(i){
      this.changeStatus(i)
      if(i === 0) {
        this.$router.push({name: 'vx.co'})
      }
      if(i === 1) {
        this.$router.push({name: 'vx.process'})
      }
      if(i === 2){
        this.$router.push({name: 'vx.resource'})
      }
    }
    // changeStatus(i) {
    //   this.sections.map(el => el.isActive = false)
    //   this.sections[i].isActive = !this.sections[i].isActive
    //   if(i === 2){
    //     this.$router.push({name: 'vx.resource'})
    //   }
    // },
  },
}
</script>

<style lang="scss" scoped>
  .container-navigation-panel {
    width: 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $grey-scale-500;
    box-sizing: border-box;
    padding: 20px 10px;
    overflow-y: scroll;
    .navigation-panel-item {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 16px;
      border-radius: 17px;
      transition: .2s background-color linear;

      &:hover{
        background-color: $grey-scale-300;
        cursor: pointer;
      }

      &.panel-active-item {
        background-color: #fff;
      }

      &:last-child{
        margin-bottom: 0;
      }
    }


  }
  .panel-body-icon{
    width: 26px;
    height: 26px;
  }
  .container-navigation-panel::-webkit-scrollbar {
    width: 0;
  }

</style>