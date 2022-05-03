<template>
  <div class="process-create-process-view">
    <comeback @onClick="$router.push({name: 'vx.process.company.processes'})"/>
    <title-base>Создать процесс</title-base>
    <div class="create-process-view-main">
      <radio-slot :model="processModel === 'official-processes'"
                  :disable="processModel === 'company-processes'" @onClick="changeStatusProcess">
        <template #title>Процессы должностного лица</template>
      </radio-slot>
      <radio-slot :model="processModel === 'company-processes'"
                  :disable="processModel === 'official-processes'" @onClick="changeStatusProcess">
        <template #title>Процессы для уровней компании</template>
      </radio-slot>
      <text-area
          @onInput="textAreaTitle = $event"
          :model="textAreaTitle"
          placeholder="Название процесса"
          class="text-area-title"
          labeled/>
      <text-area :max-length="1000"
                 @onInput="textAreaDescription = $event"
                 :num-rows="4"
                 :model="textAreaDescription"
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
        <file class="view-main-files-margin"
              v-for="(file, key) in files"
              :file="file"
              :key="key"
              :index="key"
              @deleteFile="onDeleteFile"/>
      </div>
      <radio-slot :model="regularModel"
                  :disable="!regularDisable" @onClick="changeStatusRegular">
        <template #title>Регулярный</template>
      </radio-slot>
      <start-process @onDate="onDate" :regularModel="regularModel"/>
      <radio-slot :model="!regularModel"
                  :disable="regularDisable" @onClick="changeStatusRegular">
        <template #title>Не регулярный</template>
      </radio-slot>
      <process-alert @alert-worker="alertWorker = $event"/>
      <header-add
          @create="isOfficialProcesses = !isOfficialProcesses"
          :class="processModel === 'official-processes' && subdivisions[0] ? 'hide-add-icon' : ''
          || processModel === 'company-processes' && subdivisions.length > 3 ? 'hide-add-icon' : ''">
        <template #header-title>исполнители</template>
        <template #header-amount>{{ subdivisions[0] ? performersCounter : '' }}</template>
      </header-add>
      <process-performer class="view-main-performer"
                         @show-sidebar="isOfficialProcesses = !isOfficialProcesses"
                         :performers="subdivisions"
                         @onDelete="deletePerformer"/>
    </div>
    <div class="create-resource-buttons">
      <button-secondary class="create-resource-button"
                        @onClick="$router.push({name: 'vx.process.company.processes'})"
      >Отмена
      </button-secondary>
      <button-base class="create-resource-button" @onClick="createProcess">Создать процесс</button-base>
    </div>
    <create-process-modals @closeModalUpload="modalUpload = !modalUpload"
                           :modalUpload="modalUpload"
                           :modalUploadResource="modalUploadResource"
                           :modalUploadResourceFolder="modalUploadResourceFolder"
                           :modalChooseFiles="modalChooseFiles"/>
    <sidebar v-if="isOfficialProcesses"
             :status="isOfficialProcesses"
             :disable="disableStatusCount === 0"
             @on-close="closeSidebar"
             @handle-access="handleAccessOfficial">
      <template #head-title>Назначить исполнителя</template>
      <template #button-title>Сохранить</template>
    </sidebar>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'vx.process.create.process',
  components: {
    Comeback: () => import('@Facade/Navigation/Comeback'),
    TitleBase: () => import('@Facade/Title/Base'),
    TextArea: () => import('@Facade/Input/TextArea'),
    HeaderAdd: () => import('@/LTE/Singletons/facades/HeaderAdd'),
    ButtonSecondary: () => import('@Facade/Button/Secondary'),
    ButtonBase: () => import('@Facade/Button/Base'),
    RadioSlot: () => import('../facades/RadioSlot'),
    File: () => import('@/LTE/Providers/Company/Resource/file.ui'),
    ProcessAlert: () => import('../facades/ProcessAlert'),
    StartProcess: () => import('../facades/StartProcess'),
    ProcessPerformer: () => import('../facades/ProcessPerformer'),
    CreateProcessModals: () => import('./CreateProcessModals'),
    Sidebar: () => import('@/LTE/Singletons/Dashboard/views/sidebar/Sidebar')
  },
  data: () => ({
    regularModel: true,
    regularDisable: true,
    modalUpload: false,
    modalUploadResource: false,
    modalUploadResourceFolder: false,
    modalChooseFiles: false,
    isOfficialProcesses: false,
    textAreaDescription: '',
    textAreaTitle: '',
    alertWorker: 0,
    selectedDate: '',
  }),
  mounted() {
    this.setSubdivisions([])
    this.setFiles([])
    this.setFileIds([])
  },
  computed: {
    ...mapGetters({
      files: 'getFiles',
      subdivisions: 'getSubdivisions',
      messages: 'getMessages',
      processIndex: 'getProcessIndex',
      folders: 'getFolders',
      disableStatusCount: 'getDisableStatusCount',
      levelsStructure: 'getLevelsStructure',
      processModel: 'getProcessModel',
      performerCount: 'getPerformerCount',
      levels: 'getLevels',
      periods: 'getPeriods',
      selectedProcess: 'getSelectedProcess',
      fileIds: 'getFileIds',
      selectedCompany: 'Company/getSelectedCompany'
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
      setFiles: 'setNewFiles',
      setFileIds: 'setNewFileIds'
    }),
    changeStatusProcess() {
      if (this.processModel === 'official-processes') {
        this.setProcessModel('company-processes')
      } else {
        this.setProcessModel('official-processes')
      }
    },
    changeStatusRegular() {
      this.regularModel = !this.regularModel
      this.regularDisable = !this.regularDisable
    },
    createProcess() {
      const arrayLevelsWorkers = this.subdivisions.map(el => el.level)
      const currentPeriod = this.periods.find(el => el.isActive)
      let today = new Date();
      let yyyy = today.getFullYear();
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let dd = String(today.getDate()).padStart(2, '0');
      let hh = String(today.getHours()).padStart(2, '0');
      let minmin = String(today.getMinutes()).padStart(2, '0');
      let ss = String(today.getSeconds()).padStart(2, '0');
      today = this.selectedDate
          ? this.selectedDate + ' ' + hh + ':' + minmin + ':' + ss
          : yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + minmin + ':' + ss;
      this.$core.execViaComponent('Processes', 'create', {
        title: this.textAreaTitle,
        description: this.textAreaDescription,
        isRegular: this.regularModel ? 1 : 0,
        isExecutor: this.processModel === 'official-processes' ? 1 : 0,
        creatorId: this.selectedCompany.workerId,
        unitId: this.processModel === 'official-processes' ? this.subdivisions[0] && this.subdivisions[0].id : null,
        level: this.processModel === 'company-processes' ? arrayLevelsWorkers : null,
        repeatDate: !this.regularModel && !this.selectedDate ? '' : today,
        alertWorker: this.alertWorker,
        repeatInterval: currentPeriod.isActive ? currentPeriod.id : null,
        fileIds: this.fileIds,
        companyId: this.selectedCompany.companyId
      });
      this.setPerformers(this.subdivisions)
      if (!this.textAreaTitle) {
        this.$notify({text: 'Введите название процесса!', type: 'error', duration: 3000, speed: 500})
      } else if (!this.textAreaDescription) {
        this.$notify({text: 'Введите описание процесса!', type: 'error', duration: 3000, speed: 500})
      } else if (!this.subdivisions.length && this.processModel === 'official-processes') {
        this.$notify({text: 'Назначте исполнителя процесса!', type: 'error', duration: 3000, speed: 500})
      } else if (!this.subdivisions.length && this.processModel === 'company-processes') {
        this.$notify({
          text: 'Выберете уровень С.Е для которого назначен процесс!',
          type: 'error',
          duration: 3000,
          speed: 500
        })
      }
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
    },
    onDate(date) {
      this.selectedDate = date
    },
    deletePerformer(e) {
      let newSubdivisions = this.subdivisions.filter(el => el.level !== e)
      this.setSubdivisions(newSubdivisions)
    },
    onDeleteFile(index) {
      let newFiles = this.files.filter((el, i) => i !== index)
      this.setFiles(newFiles)
      let newFileIds = this.fileIds.filter((el, i) => i !== index)
      this.setFileIds(newFileIds)
    },
    closeSidebar() {
      this.isOfficialProcesses = !this.isOfficialProcesses
      this.setDisableStatusCount(0)
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