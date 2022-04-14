<template>
  <div class="process-create-process-view">
    <comeback @onClick="$router.push({name: 'vx.process.company.processes'})"/>
    <title-base>Редактировать процесс</title-base>
    <div class="create-process-view-main">
      <radio-slot :model="processModel === 'official-processes'"
                  :disable="!processDisable" @onClick="changeStatusProcess">
        <template #title>Процессы должностного лица</template>
      </radio-slot>
      <radio-slot :model="processModel === 'company-processes'"
                  :disable="processDisable" @onClick="changeStatusProcess">
        <template #title>Процессы для уровней компании</template>
      </radio-slot>
      <text-area
          @text-area-model="textAreaTitle = $event"
          :max-length="1000"
          :model="selectedProcess.title"
          placeholder="Название процесса"
          class="text-area-title"
          labeled/>
      <text-area :max-length="1000"
                 @text-area-model="textAreaDescription = $event"
                 :model="selectedProcess.description"
                 :num-rows="4"
                 placeholder="Описание"
                 labeled
                 count/>
      <header-add v-if="!files.length"
                  class="view-main-files"
                  @create="modalUpload = !modalUpload"
      >
        <template #header-title>файлы</template>
      </header-add>
      <div v-else class="view-main-files">
        <header-add @create="modalUpload = !modalUpload">
          <template #header-title>файлы</template>
          <template #header-amount>{{ files.length }}</template>
        </header-add>
        <file class="view-main-files-margin" v-for="(file, key) in files" :file="file" :key="key"/>
      </div>
      <radio-slot :model="selectedProcess.isRegular === 1"
                  :disable="selectedProcess.isRegular === 1" @onClick="changeStatusRegular">
        <template #title>Регулярный</template>
      </radio-slot>
      <start-process v-if="selectedProcess.isRegular === 1"/>
      <radio-slot :model="selectedProcess.isRegular === 0"
                  :disable="selectedProcess.isRegular === 0" @onClick="changeStatusRegular">
        <template #title>Не регулярный</template>
      </radio-slot>
      <process-alert @alert-worker="alertWorker = $event" :currentAlertWorker="selectedProcess.alertWorker"/>
      <header-add
          @create="isOfficialProcesses = !isOfficialProcesses"
          :class="processModel && subdivisions[0] ? 'hide-add-icon' : ''
          || !processModel && subdivisions.length > 3 ? 'hide-add-icon' : ''">
        <template #header-title>исполнители</template>
        <template #header-amount>{{ subdivisions[0] ? performersCounter : '' }}</template>
      </header-add>
      <process-performer class="view-main-performer"
                         @show-sidebar="isOfficialProcesses = !isOfficialProcesses"
                         :performers="subdivisions"/>
    </div>
    <div class="create-resource-buttons">
      <button-secondary class="create-resource-button"
                        @onClick="this.$router.push({name: 'vx.process.company.processes'})"
      >Отмена
      </button-secondary>
      <button-base class="create-resource-button" @onClick="editProcess">Сохранить</button-base>
    </div>
    <create-process-modals @closeModalUpload="modalUpload = !modalUpload"
                           :modalUpload="modalUpload"
                           :modalUploadResource="modalUploadResource"
                           :modalUploadResourceFolder="modalUploadResourceFolder"
                           :modalChooseFiles="modalChooseFiles"/>
    <sidebar v-if="isOfficialProcesses"
             :status="isOfficialProcesses"
             :disable="disableStatusCount === 0"
             @on-close="handleAccessOfficial"
             @handle-access="handleAccessOfficial">
      <template #head-title>Назначить исполнителя</template>
      <template #button-title>Сохранить</template>
    </sidebar>
  </div>
</template>

<script>
import Comeback from "@Facade/Navigation/Comeback";
import TitleBase from "@Facade/Title/Base";
import TextArea from "@Facade/Input/TextArea";
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import ButtonSecondary from "@Facade/Button/Secondary";
import ButtonBase from "@Facade/Button/Base";
import StartProcess from "../facades/StartProcess";
import RadioSlot from "../facades/RadioSlot";
import ProcessAlert from "../facades/ProcessAlert";
import {mapGetters, mapMutations} from "vuex";
import File from "@/LTE/Singletons/Resources/facades/File";
import ProcessPerformer from "@/app/vx/app/company/app/process/facades/ProcessPerformer";
import CreateProcessModals from "./CreateProcessModals";
import Sidebar from "@/LTE/Singletons/Dashboard/views/sidebar/Sidebar";

export default {
  name: 'vx.process.edit.process',
  components: {
    Comeback,
    TitleBase,
    TextArea,
    HeaderAdd,
    ButtonSecondary,
    ButtonBase,
    RadioSlot,
    File,
    ProcessAlert,
    StartProcess,
    ProcessPerformer,
    CreateProcessModals,
    Sidebar
  },
  data() {
    return {
      processDisable: true,
      regularModel: true,
      regularDisable: true,
      modalUpload: false,
      modalUploadResource: false,
      modalUploadResourceFolder: false,
      modalChooseFiles: false,
      isOfficialProcesses: false,
      textAreaTitle: '',
      textAreaDescription: '',
      alertWorker: 0

    }
  },
  computed: {
    ...mapGetters({
      files: 'getFiles',
      subdivisions: 'getSubdivisions',
      messages: 'getMessages',
      processIndex: 'getProcessIndex',
      folders: 'getFolders',
      levelsProcess: 'getLevelsProcess',
      disableStatusCount: 'getDisableStatusCount',
      levelsStructure: 'getLevelsStructure',
      processModel: 'getProcessModel',
      performerCount: 'getPerformerCount',
      levels: 'getLevels',
      currentWorkerId: 'getCurrentWorkerId',
      periods: 'getPeriods',
      currentCompany: 'Company/getCurrentCompany',
      selectedProcess: 'getSelectedProcess',
    }),
    performersCounter() {
      let count = 0
      for (let i = 0; i < this.subdivisions.length; i++) {
        this.subdivisions[i].numberPeople ? count += this.subdivisions[i].numberPeople : count += 1
      }
      this.setPerformerCount(count)
      return count
    },
  },
  destroyed() {
    this.setSubdivisions([])
    this.setSelectedProcess({})
  },
  methods: {
    ...mapMutations({
      setLevels: 'setWidgetLevels',
      setMessages: 'setNewMessages',
      setPerformers: 'setCurrentPerformers',
      setSubdivisions: 'setChooseSubdivisions',
      setProcessModel: 'setChangeProcessModel',
      setPerformerCount: 'setNewPerformerCount',
      setDisableStatusCount: 'setCheckDisableStatusCount',
      setSelectedProcess: 'setClickedSelectedProcess',
    }),
    changeStatusProcess() {
      if (this.processModel === 'official-processes') {
        this.setProcessModel('company-processes')
      } else {
        this.setProcessModel('official-processes')
      }
      this.processDisable = !this.processDisable
    },
    changeStatusRegular() {
      if (this.selectedProcess.isRegular === 1) {
        this.setSelectedProcess({...this.selectedProcess, isRegular: 0})
      } else {
        this.setSelectedProcess({...this.selectedProcess, isRegular: 1})
      }
    },
    editProcess() {
      const arrayLevelsWorkers = this.subdivisions.map(el => el.level)
      const currentPeriod = this.periods.find(el => el.isActive)
      let today = new Date();
      let yyyy = today.getFullYear();
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let dd = String(today.getDate()).padStart(2, '0');
      let hh = String(today.getHours()).padStart(2, '0');
      let minmin = String(today.getMinutes()).padStart(2, '0');
      let ss = String(today.getSeconds()).padStart(2, '0');
      today = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + minmin + ':' + ss;
      this.$core.execViaComponent('Processes', 'edit', {
        title: this.textAreaTitle ? this.textAreaTitle : this.selectedProcess.title,
        description: this.textAreaDescription ? this.textAreaDescription : this.selectedProcess.description,
        isRegular: this.selectedProcess.isRegular,
        isExecutor: this.processModel === 'official-processes' ? 1 : 0,
        creatorId: this.currentWorkerId.userId,
        unitId: this.processModel === 'official-processes' ? this.subdivisions[0].id : this.currentWorkerId.unitId,
        level: this.subdivisions.length ? arrayLevelsWorkers : [1],
        repeatDate: today,
        alertWorker: this.alertWorker,  //пока так, позже исправлю
        repeatInterval: currentPeriod.id,
        fileIds: [],
        id: this.processIndex
      });
      this.$notify({text: 'Изменения сохранены!', type: 'success', duration: 3000, speed: 500})
      this.$router.push({name: 'vx.process.selected.process'})
      this.setPerformers(this.subdivisions)
    },
    handleAccessOfficial() {
      this.isOfficialProcesses = !this.isOfficialProcesses
      if (this.processModel === 'official-processes') {
        let newSubdivisions = []
        for (let i = 0; i < this.levels.length; i++) {
          for (let j = 0; j < this.levels[i].data.length; j++) {
            if (this.levels[i].data[j]) {
              if (this.levels[i].data[j].checkedPosition === true) {
                newSubdivisions.push({...this.levels[i].data[j], level: this.levels[i].level})
              }
              this.setSubdivisions(newSubdivisions)
            }
          }
        }
        this.setSubdivisions(newSubdivisions)
        this.setDisableStatusCount(0)
      } else {
        let filteredSubdivisions = this.levels.filter(el => el.data[0].checkedPosition === true)
        let newSubdivisions = filteredSubdivisions.map(el => ({...el.data[0], level: el.level}))
        this.setSubdivisions(newSubdivisions)
        this.setDisableStatusCount(0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.process-create-process-view {
  width: 100%;

  .facade-title-base {
    text-align: center;
    margin-bottom: rem(36);
  }

  .create-process-view-main {
    width: 100%;
    margin-bottom: rem(36);
    padding: rem(48) rem(164) rem(52);
    box-sizing: border-box;
    background-color: $grey-scale-500;
    border-radius: 16px;

    .facade-text-area::v-deep {
      .textarea-text-length {
        color: $grey-scale-300;
      }
    }

    .facade-input-base {
      border-width: 1px;
      margin-top: rem(16);
    }

    .text-area-title.facade-input-text-area::v-deep {
      margin-bottom: rem(32);
    }

    .view-main-process-title.facade-text-area {
      ::v-deep {
        .textarea-container {
          min-height: 66px;
        }
      }
    }

    .facade-title-caps {
      margin-bottom: rem(16);
    }

    .view-main-files {
      margin: rem(24) 0;

      .view-main-files-margin {
        margin-top: 8px;
      }

      ::v-deep {
        .icon-points-vertical {
          color: #fff;
          margin-right: rem(8);
        }
      }
    }

    .facade-resource-company {
      margin-bottom: rem(24);
    }
  }

  .create-resource-buttons {
    display: flex;
    justify-content: space-between;

    .create-resource-button {
      width: 222px;
      margin-bottom: rem(80);
    }

    .facade-button-base::v-deep {
      font-size: rem(15);

      &[disable] {
        background-color: $grey-scale-400;
      }
    }
  }
}

.view-main-performer.facade-process-performer::v-deep {
  .context-main-position {
    color: $grey-scale-500;
    margin-left: 25px;
  }
}

.hide-add-icon.facade-header-add::v-deep {
  .icon-add {
    display: none;
  }
}
</style>