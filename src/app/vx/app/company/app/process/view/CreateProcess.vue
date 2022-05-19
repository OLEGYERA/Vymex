<template>
  <div class="process-create-process-view">
    <comeback @onClick="$router.push({name: 'vx.process.company.processes'})"/>
    <title-base>Создать процесс</title-base>
    <div class="create-process-view-main">
      <radio-slot :model="processModel"
                  :disable="processDisable" @onClick="changeStatusProcess">
        <template #title>Процессы должностного лица</template>
      </radio-slot>
      <radio-slot :model="!processModel"
                  :disable="!processDisable" @onClick="changeStatusProcess">
        <template #title>Процессы для уровней компании</template>
      </radio-slot>
      <input-base v-if="processModel" :placeholder="'Серийный номер'"/>
      <text-area v-else
                 :textAreaValue="editMode ? messages[processIndex].text : ''"
                 :max-length="1000"
                 placeholder="Название процесса"
                 labeled/>
      <text-area :max-length="1000"
                 class="text-area-description"
                 placeholder="Описание"
                 labeled
                 count/>
      <header-add v-if="regularModel"
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
      <radio-slot :model="!regularModel"
                  :disable="!regularDisable" @onClick="changeStatusRegular">
        <template #title>Регулярный</template>
      </radio-slot>
      <start-process v-if="!regularModel"/>
      <radio-slot :model="regularModel"
                  :disable="regularDisable" @onClick="changeStatusRegular">
        <template #title>Не регулярный</template>
      </radio-slot>
      <process-alert/>
      <header-add
          :class="subdivisions[0] ? '' : 'hide-add-icon'">
        <template #header-title>исполнители</template>
        <template #header-amount>{{ subdivisions[0] ? subdivisions.length : '' }}</template>
      </header-add>
      <process-performer class="view-main-performer" :performers="subdivisions"/>
    </div>
    <div class="create-resource-buttons">
      <button-secondary class="create-resource-button"
                        @onClick="createProcessCancel"
      >Отмена
      </button-secondary>
      <button-base class="create-resource-button" @onClick="createProcess">Создать процесс</button-base>
    </div>
    <create-process-modals :modalUpload="modalUpload"
                           :modalUploadResource="modalUploadResource"
                           :modalUploadResourceFolder="modalUploadResourceFolder"
                           :modalChooseFiles="modalChooseFiles"/>
  </div>
</template>

<script>
import Comeback from "@Facade/Navigation/Comeback";
import TitleBase from "@Facade/Title/Base";
import InputBase from "@Facade/Input/Base";
import TextArea from "@Facade/Input/TextArea";
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import ButtonSecondary from "@Facade/Button/Secondary";
import ButtonBase from "@Facade/Button/Base";
import StartProcess from "../facades/StartProcess";
import RadioSlot from "../facades/RadioSlot";
import ProcessAlert from "../facades/ProcessAlert";
import {mapGetters, mapMutations} from "vuex";
// import File from "@/LTE/Singletons/Resources/facades/File";
import ProcessPerformer from "@/app/vx/app/company/app/process/facades/ProcessPerformer";
import CreateProcessModals from "./CreateProcessModals"

export default {
  name: 'vx.process.create.process',
  components: {
    Comeback,
    TitleBase,
    InputBase,
    TextArea,
    HeaderAdd,
    ButtonSecondary,
    ButtonBase,
    RadioSlot,
    // File,
    ProcessAlert,
    StartProcess,
    ProcessPerformer,
    CreateProcessModals,
  },
  data() {
    return {
      processModel: true,
      processDisable: true,
      regularModel: true,
      regularDisable: true,
      modalUpload: false,
      modalUploadResource: false,
      modalUploadResourceFolder: false,
      modalChooseFiles: false,
    }
  },
  computed: {
    ...mapGetters({
      files: 'getFiles',
      subdivisions: 'getSubdivisions',
      messages: 'getMessages',
      processIndex: 'getProcessIndex',
      editMode: 'getEditMode',
      folders: 'getFolders',
    }),
  },
  methods: {
    ...mapMutations({
      setMessages: 'setNewMessages',
      setEditMode: 'setIsEditMode',
    }),
    changeStatusProcess() {
      this.processModel = !this.processModel
      this.processDisable = !this.processDisable
    },
    changeStatusRegular() {
      this.regularModel = !this.regularModel
      this.regularDisable = !this.regularDisable
    },
    createProcess() {
      if (!this.editMode) {
        let newMessages = [{
          text: 'Длинное название процесса которое занимает 2, а то и все 3 строки. Больше - троеточие, но здесь его нет.',
          calendarIcon: true,
          date: '15 янв. 2021',
          panel: true,
          sortIcon: true
        }, ...this.messages]
        this.setMessages(newMessages)
        this.$notify({text: 'Процесс успешно создан!', type: 'success', duration: 3000, speed: 500})
      } else {
        this.$notify({text: 'Изменения сохранены!', type: 'success', duration: 3000, speed: 500})
      }
      this.setEditMode(false)
      this.$router.push({name: 'vx.process.company.processes'})

    },
    createProcessCancel() {
      this.setEditMode(false)
      this.$router.push({name: 'vx.process.company.processes'})
    },
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

    .facade-text-area::v-deep {
      margin-bottom: rem(8);

      .textarea-title {
        font-weight: 400;
        font-size: rem(14);
        line-height: rem(16);
      }

      .textarea-container {
        min-height: 96px;
      }
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
    }

    .facade-button-base::v-deep {
      font-size: rem(15);

      &[disable] {
        background-color: $grey-scale-400;
      }
    }
  }
}
</style>