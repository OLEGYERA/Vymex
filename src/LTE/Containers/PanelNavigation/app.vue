<template>
  <div class="container-navigation-panel">
    <div v-for="(section, i) in sections"
         :key="i"
         class="navigation-panel-body"
         @click="changeStatus(i)"
         :class="section.isActive ? 'active-class' : ''"
         >
      <img :src="section.icon" class="panel-body-icon"/></div>
  </div>
</template>


<script>

export default {
  name: "NavigationPanel",
  data() {
    return {
      sections: [
        {isActive: true, icon: require('@/assets/img/my/dashboard.svg')},
        {isActive: false, icon: require('@/assets/img/my/process.svg')},
        {isActive: false, icon: require('@/assets/img/my/resource.svg')},
        {isActive: false, icon: require('@/assets/img/my/share-management.svg')},
        {isActive: false, icon: require('@/assets/img/my/team.svg')},
        {isActive: false, icon: require('@/assets/img/my/task.svg')},
        {isActive: false, icon: require('@/assets/img/my/structure.svg')},
        {isActive: false, icon: require('@/assets/img/my/result.svg')},
        {isActive: false, icon: require('@/assets/img/my/co-queues.svg')},
        {isActive: false, icon: require('@/assets/img/my/control-center.svg')},
        {isActive: false, icon: require('@/assets/img/my/calendar.svg')},
        {isActive: false, icon: require('@/assets/img/my/storage.svg')},
        {isActive: false, icon: require('@/assets/img/my/settings.svg')},
        {isActive: false, icon: require('@/assets/img/my/assumptions.svg')},
        {isActive: false, icon: require('@/assets/img/my/costs.svg')},
        {isActive: false, icon: require('@/assets/img/my/result-c-e.svg')},
      ],
    }
  },
  methods: {
    changeStatus(i) {
      this.sections.map(el => el.isActive = false)
      this.sections[i].isActive = !this.sections[i].isActive
    },
  },
}
</script>

<style lang="scss" scoped>
.container-navigation-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  background: $grey-scale-500;
  padding-top: 4px;
  height: 1772px;
  overflow-y: scroll;
  .navigation-panel-body {
    margin: 12px 14px;
  }

  .active-class {
    display: inherit;
    align-items: center;
    justify-content: center;
    padding: 7px;
    background: #FFF;
    border-radius: 20px;
    margin: 5px 7px;
  }
}
.panel-body-icon{
  width: 28px;
  height: 28px;
}
.container-navigation-panel::-webkit-scrollbar {
  width: 0;
}

</style>