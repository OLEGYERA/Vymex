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
                 class="view-main-process-title"
                 placeholder="Название процесса"
                 labeled/>
      <text-area :max-length="1000"
                 placeholder="Описание"
                 labeled
                 count/>
      <header-add v-if="regularModel"
                  class="view-main-files"
                  @create="showModal = !showModal"
      >
        <template #header-title>файлы</template>
      </header-add>
      <div v-else class="view-main-files">
        <header-add>
          <template #header-title>файлы</template>
          <template #header-amount>{{ files.length }}</template>
        </header-add>
        <file v-for="(file, key) in files" :file="file" :key="key"/>
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
    <upload-file-modal
        :status="showModal"
        @onClose="showModal = !showModal">
      <template #title>Загрузить файлы</template>
      <template #description>Выберете вариант загрузки файлов</template>
      <template #content>
        <header-add class="hide-add-icon">
          <template #header-title>приложение</template>
        </header-add>
        <process-performer
            class="upload-files-recourse"
            :performers="uploadResource"/>
        <process-performer
            class="upload-files-local"
            :performers="uploadFromDevice"/>
      </template>
      <template #button-accept>Загрузить</template>
    </upload-file-modal>
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
import File from "@/LTE/Singletons/Resources/facades/File";
import ProcessPerformer from "@/app/vx/app/company/app/process/facades/ProcessPerformer";
import UploadFileModal from "@Facade/Modal/Base";

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
    File,
    ProcessAlert,
    StartProcess,
    ProcessPerformer,
    UploadFileModal,

  },
  data() {
    return {
      processModel: true,
      processDisable: true,
      regularModel: true,
      regularDisable: true,
      showModal: false,
      uploadResource: [
        {avatar: require('@/assets/img/my/resource.svg'), position: 'Ресурсы'},
      ],
      uploadFromDevice: [
        {avatar: require('@/assets/img/icons/add-file.svg'), position: 'Загрузить с локального устройсва'},
      ],
    }
  },
  computed: {
    ...mapGetters({
      files: 'getFiles',
      subdivisions: 'getSubdivisions',
      messages: 'getMessages',
      processIndex: 'getProcessIndex',
      editMode: 'getEditMode'
    }),
  },
  methods: {
    ...mapMutations({
      setMessages: 'setNewMessages',
      setEditMode: 'setIsEditMode'
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
    }
  },
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
        font-size: 14px;
        line-height: 16px;
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

      ::v-deep {
        .icon-points-vertical {
          color: #fff;
          margin-right: 8px;
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
      font-size: 15px;

      &[disable] {
        background-color: $grey-scale-400;
      }
    }
  }

  .hide-add-icon.facade-header-add::v-deep {
    padding: rem(8) 0;
    margin-bottom: rem(4);

    .icon-add {
      display: none;
    }
  }

  .facade-modal-base {
    &::v-deep {
      .modal-base-body {
        width: 632px;
        height: 379px;
        justify-content: space-between;
        padding-bottom: 24px;
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

.upload-files-recourse.facade-process-performer::v-deep {
  background: $grey-scale-400;
  border-radius: 12px;

  .icon-points-vertical {
    display: none;
  }

  .context-main-position {
    color: #FFF;
    margin-left: 12px;
  }

  .performer-context-main {
    padding-left: 10px;
  }
}

.upload-files-local.facade-process-performer::v-deep {
  background: $grey-scale-400;
  border-radius: 12px;

  .icon-points-vertical {
    display: none;
  }

  .context-main-position {
    color: #FFF;
    margin-left: 12px;
  }
}

</style>