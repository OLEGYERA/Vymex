<template>
  <div class="company-processes-files">
    <comeback @onClick="$router.push({name: 'vx.process'})"/>
    <div class="header-text-group">
      <title-base>{{
          processModel === 'official-processes'
              ? 'Процессы должностного лица'
              : 'Процессы компании'
        }}
      </title-base>
      <icon-points-vertical/>
    </div>
    <input-search :placeholder="'Поиск'"/>
    <header-add v-if="messages[0]"
                settingSlider
                @create="$router.push({name: 'vx.process.create.process'})"
    >
      <template #header-title>процессы</template>
      <template #header-amount>{{
          processModel === 'company-processes'
              ? countProcesses.company
              : countProcesses.unit
        }}
      </template>
    </header-add>
    <header-add v-else @create="$router.push({name: 'vx.process.create.process'})">
      <template #header-title>процессы</template>
    </header-add>
    <div v-if="messages[0]">
      <process-message v-for="(message, key) in messages"
                       :message="message"
                       :key="key"
                       :index="message.id"
      />
    </div>
    <div v-else class="empty-processes">
      <div class="image-circle-big">
        <img src="@/assets/img/my/empty-process.svg">
      </div>
      <div class="image-circle-small"></div>
      Процессов нет
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'vx.process.company.processes',
  data: () => ({
    createProcess: false
  }),
  components: {
    Comeback: () => import('@Facade/Navigation/Comeback'),
    HeaderAdd: () => import('@/LTE/Singletons/facades/HeaderAdd'),
    TitleBase: () => import('@Facade/Title/Base'),
    InputSearch: () => import('@Facade/Input/Search'),
    ProcessMessage: () => import('./ProcessMessage')
  },
  mounted() {
    if (this.processModel === 'company-processes') {
      this.$core.execViaComponent('Processes', 'getLevel',
          {
            creatorId: this.selectedCompany.workerId,
            levelId: this.selectedCompany.unitLevel,
            companyId: this.selectedCompany.companyId
          });
    } else {
      this.$core.execViaComponent('Processes', 'getUnit',
          {creatorId: this.selectedCompany.workerId, unitId: this.selectedCompany.unitId, search: ''});
    }
    this.$core.execViaComponent('Processes', 'getUnits', this.selectedCompany.unitId);
  },
  computed: {
    ...mapGetters({
      messages: 'getMessages',
      countProcesses: 'getCountProcesses',
      processModel: 'getProcessModel',
      selectedCompany: 'Company/getSelectedCompany',
      unitsRes: 'getUnitsRes',
      levelsStructure: 'getLevelsStructure'
    })
  },
  methods: {
    ...mapMutations({
      setLevels: 'setWidgetLevels'
    })
  },
  watch: {
    unitsRes(data) {
      console.log(data)
      let arrayLevels = Object.values(data)
      if (this.processModel === 'official-processes') {
        let ceo = {}
        let currentUnits = []
        if (this.selectedCompany.unitLevel === 1) {
          ceo = {
            level: 1, showContext: true, data: [{
              avatar: arrayLevels[0][0].avatar,
              numberPeople: 1,
              id: arrayLevels[0][0].id,
              name: arrayLevels[0][0].unitName,
              checkedPosition: false,
              checkboxType: 2,
              actionListStatus: false
            }]
          }
          arrayLevels = arrayLevels.slice(1, 4)
          currentUnits = arrayLevels.map((level, index) => ({
            level: index + 2, showContext: level.length && true, data: level.map(el => ({
              numberPeople: el.workersCount,
              id: el.id,
              position: el.unitName,
              checkedPosition: false,
              checkboxType: 2,
              actionListStatus: false
            }))
          }))
          currentUnits.unshift(ceo)
        } else {
          currentUnits = arrayLevels.map((lvl, i) => this.selectedCompany.unitLevel < i + 1 ? ({
            level: i + 1, showContext: lvl.length && true, data: lvl.map(el => ({
              numberPeople: el.workersCount,
              id: el.id,
              position: el.unitName,
              checkedPosition: false,
              checkboxType: 2,
              actionListStatus: false
            }))
          }) : lvl = {level: i + 1, data: []})
        }
        this.setLevels(currentUnits);
      } else {
        if (this.selectedCompany.unitLevel === 1 || this.selectedCompany.unitLevel === 2) {
          let curLevels = this.levelsStructure.map((el, i) => ({
            ...el, data: [{
              ...el.data[0],
              numberPeople: arrayLevels[i].length && this.selectedCompany.unitLevel < i + 1
                  ? arrayLevels[i].length
                  : 0
            }]
          }))
          this.setLevels(curLevels);
        } else {
          this.setLevels([]);
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.company-processes-files {
  width: 100%;
  padding-bottom: rem(266);

  .header-text-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .icon {
      color: #fff;
    }
  }

  .facade-input-search {
    margin-bottom: rem(16);
  }

  .facade-header-add {
    padding: rem(8) 0;
    margin-bottom: 8px;
  }

  .empty-processes {
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $grey-scale-500;
    border-radius: 12px;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    color: $grey-scale-300;

    .image-circle-big {
      position: relative;
      height: 36px;
      width: 36px;
      border-radius: 18px;
      background: linear-gradient(45deg, $grey-scale-300 40%, #69C0FF 80%);
      z-index: 1;
      margin-bottom: 4px;
    }

    .image-circle-small {
      position: absolute;
      height: 30px;
      width: 30px;
      border-radius: 15px;
      background: #69C0FF;
      margin-bottom: 34px;
      margin-left: 22px;
      z-index: 0;
    }
  }
}
</style>