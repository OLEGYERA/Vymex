<template>
  <div class="container-selected-process">
    <comeback @onClick="goBack"/>
    <div class="selected-process-header">
      <div class="header-events-panel">
        <process-event :message="selectedProcess"/>
        <div v-if="selectedProcess.isRegular" class="panel-day">
          <span>{{ activePeriod }}</span>
        </div>
      </div>
      <icon-points-vertical/>
    </div>
    <div class="selected-process-text">{{ selectedProcess.title }}</div>
    <div class="selected-process-description">{{ selectedProcess.description }}</div>
    <div class="selected-process-body">
      <div class="body-performers">
        <header-add>
          <template #header-title>исполнители</template>
          <template #header-amount>{{ performerCount }}</template>
        </header-add>
        <process-performer :performers="performers"/>
      </div>
      <div class="body-files">
        <header-add>
          <template #header-title>файлы</template>
          <template #header-amount>{{ files.length }}</template>
        </header-add>
        <file v-for="(file, key) in files" :file="file" :key="key"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'vx.process.selected.process',
  components: {
    Comeback: () => import('@Facade/Navigation/Comeback'),
    ProcessEvent: () => import('../facades/ProcessEvent'),
    HeaderAdd: () => import('@/LTE/Singletons/facades/HeaderAdd'),
    File: () => import('@/LTE/Providers/Company/Resource/file.ui'),
    ProcessPerformer: () => import('../facades/ProcessPerformer')
  },
  methods: {
    ...mapMutations({
      setPerformerCount: 'setNewPerformerCount',
      setSelectedProcess: 'setClickedSelectedProcess',
      setPerformers: 'setCurrentPerformers'
    }),
    goBack(){
      this.$router.push({name: 'vx.process.company.processes'})
      this.setSelectedProcess({})
      this.setPerformers([])
    }
  },
  computed: {
    ...mapGetters({
      files: 'getFiles',
      performers: 'getPerformers',
      periods: 'getPeriods',
      performerCount: 'getPerformerCount',
      selectedProcess: 'getSelectedProcess',
      processModel: 'getProcessModel',
      levels: 'getLevels'
    }),
    activePeriod() {
      if (this.selectedProcess.repeatFrequency.interval === "P1D") {
        return 'Каждый день'
      } else if(this.selectedProcess.repeatFrequency.interval === "P1W"){
        return 'Каждую неделю'
      } else if(this.selectedProcess.repeatFrequency.interval === "P1M"){
        return 'Каждый месяц'
      } else if(this.selectedProcess.repeatFrequency.interval === "P1Y") {
        return 'Каждый год'
      } else {
        return ''
      }
      }
    },
}
</script>
<style lang="scss" scoped>
.container-selected-process {
  width: 100%;

  .selected-process-header {
    display: flex;
    justify-content: space-between;

    .header-events-panel {
      display: flex;
      justify-content: space-between;
      flex-direction: row;

      .panel-day {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        height: rem(16);
        font-size: rem(11);
        color: #FFF;
        margin: 0 8px;
        padding: 0 8px;
        background: $blue;
        border-radius: 14px;
      }
    }
  }

  .selected-process-text {
    width: 84.4%;
    font-size: rem(28);
    line-height: rem(34);
    color: #FFF;
    margin: 8px 0;
  }

  .selected-process-description {
    width: 76%;
    height: 60px;
    font-size: rem(15);
    line-height: rem(20);
    color: #FFF;
    margin: 24px 0;
  }

  .icon {
    color: #fff;
  }

  .selected-process-body {
    display: flex;
    justify-content: space-between;

    .body-performers {
      width: 50%;
      margin-top: rem(26);
    }

    .body-files {
      width: 50%;
      margin-left: rem(24);
      margin-top: rem(26);
    }
  }
}

.facade-header-add {
  &::v-deep {
    .right-part {
      display: none;
    }
  }
}

.facade-resource-file {
  margin-top: 8px;

  &::v-deep {
    .icon-points-vertical {
      color: #fff;
    }
  }
}

.icon {
  color: #fff;
}
</style>