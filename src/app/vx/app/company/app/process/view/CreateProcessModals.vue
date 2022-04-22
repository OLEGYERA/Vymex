<template>
  <div>
    <modal :disable="true"
           :status="modalUpload"
           @onClose="$emit('closeModalUpload')">
      <template #title>Загрузить файлы</template>
      <template #description>Выберете вариант загрузки файлов</template>
      <template #content>
        <header-add class="hide-add-icon">
          <template #header-title>приложение</template>
        </header-add>
        <process-performer
            @onClick="modalUploadResource = !modalUploadResource"
            class="upload-files-recourse"
            :performers="uploadResource"/>
        <upload-files @onUpload="handleUploadFile"/>
      </template>
      <template #button-accept>Загрузить</template>
    </modal>
    <modal :disable="true"
           class="modal-upload-resource"
           :status="modalUploadResource"
           @onClose="modalUploadResource = !modalUploadResource">
      <template #title>Загрузить файлы из "Ресурсы"</template>
      <template #description>Файлы которые вы выберете будут прикреплены к ресурсу</template>
      <template #content>
        <div class="modal-upload-resource-text">Ресурсы /</div>
        <folder v-for="(folder, folderKey) in resourceFolders" :folder="folder" :key="folderKey" @getId="changePage"/>
      </template>
      <template #button-accept>Загрузить</template>
    </modal>
    <modal :disable="checkedFile"
           @onOk="chooseFiles"
           class="upload-files-recourse-folder"
           :status="modalUploadResourceFolder"
           @onClose="modalUploadResourceFolder = !modalUploadResourceFolder">
      <template #title>Загрузить файлы из "Ресурсы"</template>
      <template #description>Файлы которые вы выберете будут прикреплены к ресурсу</template>
      <template #content>
        <div class="modal-upload-resource-text">
          <span class="modal-upload-resource-text-root">Ресурсы / Ресурсы С.Е. / </span>
          <span>Новая папка</span>
        </div>
        <header-add class="hide-add-icon" :style="{margin: '15px 0 12px'}">
          <template #header-title>папки</template>
          <template #header-amount>{{ newFolder.length }}</template>
        </header-add>
<!--        <folder v-for="(folder, folderKey) in newFolder" :folder="folder" :key="folderKey" @getId="changePage"/>-->
        <header-add class="hide-add-icon" :style="{margin: '13px 0'}">
          <template #header-title>Файлы</template>
          <template #header-amount>{{ filesToUpload.length }}</template>
        </header-add>
        <file-checkbox v-for="(file, key) in filesToUpload"
                       :file="file"
                       :key="key"
                       :index="key"
                       class="files-to-upload"
                       @onClick="changeFileStatus"/>
      </template>
      <template #button-accept>Загрузить</template>
    </modal>
    <modal
        @onOk="saveFiles"
        class="upload-from-app"
        :status="modalChooseFiles"
        @onClose="modalChooseFilesClose">
      <template #title>Загрузить из приложения</template>
      <template #description>Выбранные файлы будут прикреплены к ресурсу</template>
      <template #content>
        <header-add @create="modalChooseFilesClose">
          <template #header-title>файлы</template>
          <template #header-amount>{{ images.length }}</template>
        </header-add>
<!--        <file class="upload-from-app-file" v-for="(file, fileKey) in images" :file="file" :key="fileKey"/>-->
      </template>
      <template #button-accept>Сохранить</template>
    </modal>
  </div>
</template>

<script>
import HeaderAdd from "@/LTE/Singletons/facades/HeaderAdd";
import FileCheckbox from "../facades/FileCheckbox";
import {mapGetters, mapMutations} from "vuex";
// import FileShower from "@/LTE/Singletons/Resources/facades/File";
import ProcessPerformer from "@/app/vx/app/company/app/process/facades/ProcessPerformer";
import Modal from "@Facade/Modal/Base";
// import Folder from "@/LTE/Singletons/Resources/facades/Folder";
import UploadFiles from "@/app/vx/app/company/app/process/facades/UploadFiles";

export default {
  name: 'vx.process.create.process.modals',
  components: {
    HeaderAdd,
    // File, syswar-r3we21
    ProcessPerformer,
    Modal,
    //Folder, // syswar-r3we22
    FileCheckbox,
    UploadFiles
  },
  props: {
    modalUpload: Boolean,
    modalUploadResource: Boolean,
    modalUploadResourceFolder: Boolean,
    modalChooseFiles: Boolean,
  },
  data() {
    return {
      images: [],
      uploadDevice: false,
      uploadResource: [
        {avatar: require('@/assets/img/my/resource.svg'), position: 'Ресурсы'},
      ],
    }
  },
  computed: {
    ...mapGetters({
      resourceFolders: 'getResourceFolders',
      newFolder: 'getNewFolder',
      filesToUpload: 'getFilesToUpload',
      files: 'getFiles',
      fileIds: 'getFileIds'
    }),
    checkedFile() {
      let isCheck = this.filesToUpload.filter(el => el.checked)
      if (isCheck.length) return false
      else return true
    }
  },
  methods: {
    ...mapMutations({
      setEditMode: 'setIsEditMode',
      setFilesToUpload: 'setNewFilesToUpload',
      setFiles: 'setNewFiles',
      setFileIds: 'setNewFileIds'
    }),
    changePage(key) {
      if (key.id === 1) {
        this.modalUploadResource = !this.modalUploadResource
        this.modalUploadResourceFolder = !this.modalUploadResourceFolder
      }
    },
    changeFileStatus(index) {
      let newData = this.filesToUpload.map((el, i) => i === index ? {...el, checked: !el.checked} : el)
      this.setFilesToUpload(newData)
    },
    chooseFiles() {
      this.modalUploadResourceFolder = !this.modalUploadResourceFolder
      this.modalChooseFiles = !this.modalChooseFiles
      this.images = this.filesToUpload.filter(el => el.checked === true)
    },
    saveFiles() {
      this.setFiles(this.images)
      this.$emit('closeModalUpload')
      if (this.images.length) {
        this.$notify({text: 'Файл успешно загружен!', type: 'success', duration: 3000, speed: 500})
      }
    },
    modalChooseFilesClose() {
      this.modalChooseFiles = !this.modalChooseFiles
      this.modalUploadResourceFolder = !this.modalUploadResourceFolder
    },
    async handleUploadFile(newFileData) {
      let file = newFileData.name.split('.')
      let yyyy = new Date().getFullYear();
      let mm = String(new Date().getMonth() + 1).padStart(2, '0');
      let dd = String(new Date().getDate()).padStart(2, '0');
      let date = dd + '.' + mm + '.' + yyyy

      const newFile = new File([newFileData.result], `${newFileData.name}.png`,
          {type: file[1], lastModified: new Date()});

      this.$core.execViaComponent('Uploader', 'init', [
        newFile,
        this.handleUploadOnprogress, null,
        this.handleUploaderOnload
      ])

      this.setFiles([...this.files, {
        title: file[0],
        content: {
          size: (newFileData.size/1000000).toFixed(3),
          date
        },
        type: file[1],
        group: false,
        checked: false
      }])
      this.$emit('closeModalUpload')
    },
    handleUploadOnprogress(progress) {
      console.log(progress)
    },
    handleUploaderOnload(fileId) {
      let newFileIds = [...this.fileIds, fileId]
      this.setFileIds(newFileIds)
    }
  }
}
</script>

<style lang="scss" scoped>
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
      padding-bottom: rem(24);
    }
  }
}


.modal-upload-resource-text {
  font-size: rem(12);
  line-height: rem(16);
  color: #FFF;
  margin-bottom: rem(11);
  margin-top: rem(8);

  .modal-upload-resource-text-root {
    color: $grey-scale-200;
  }
}

.modal-upload-resource.facade-modal-base {
  &::v-deep {
    .modal-base-body {
      width: 632px;
      height: 456px;
      justify-content: space-between;
      padding-bottom: 24px;
    }

    .modal-base-header {
      margin-bottom: 8px;
    }
  }
}

.upload-files-recourse-folder.facade-modal-base {
  &::v-deep {
    .modal-base-body {
      width: 632px;
      height: auto;
      justify-content: space-between;
      padding-bottom: rem(43);
    }

    .modal-base-content {
      margin-bottom: rem(31);
    }
  }
}

.upload-from-app.facade-modal-base {
  &::v-deep {
    .modal-base-body {
      width: 632px;
      height: auto;
      justify-content: space-between;
      padding-bottom: rem(48);
    }

    .modal-base-content {
      margin-top: 16px;
    }

    .modal-base-footer {
      margin-top: 16px;
    }
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

.files-to-upload::v-deep {
  margin-top: 9px;

  .icon-points-vertical {
    display: none;
  }
}

.facade-input-text-area::v-deep {
  margin-top: 24px;
}

.text-area-description.facade-input-text-area::v-deep {
  margin-top: 32px;
}

.upload-from-app {
  .upload-from-app-file {
    margin-top: 8px;
  }
}

.upload-input {
  display: none;
}
</style>