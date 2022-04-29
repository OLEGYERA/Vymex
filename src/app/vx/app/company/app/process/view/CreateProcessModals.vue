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
            @onClick="openResourcesFolders"
            class="upload-files-recourse"
            :performers="uploadResource"/>
        <upload-files @onUpload="$emit('closeModalUpload')"/>
      </template>
      <template #button-accept>Загрузить</template>
    </modal>
    <modal :disable="true"
           class="modal-upload-resource"
           :status="modalUploadResource"
           @onClose="$emit('closeModalUpload')">
      <template #title>Загрузить файлы из "Ресурсы"</template>
      <template #description>Файлы которые вы выберете будут прикреплены к ресурсу</template>
      <template #content>
        <div class="modal-upload-resource-text">Ресурсы /</div>
        <folder v-for="(folder, folderKey) in resourceFolders" :folder="folder" :key="folderKey"
                @onClick="insideWorkFiles"/>
      </template>
      <template #button-accept>Загрузить</template>
    </modal>
    <modal :disable="checkedFile"
           @onOk="chooseFiles"
           class="upload-files-recourse-folder"
           :status="modalUploadResourceFolder"
           @onClose="closeModals">
      <template #title>Загрузить файлы из "Ресурсы"</template>
      <template #description>Файлы которые вы выберете будут прикреплены к ресурсу</template>
      <template #content>
        <div class="modal-upload-resource-text">
          <span class="modal-upload-resource-text-root">Ресурсы / Рабочие файлы </span>
          <span v-for="(breadCrumb, key) in breadCrumbs"
                :key="key"
                :class="breadCrumbs.length - 1 === key ? '' : 'modal-upload-resource-text-root'">
           / {{breadCrumb}}
          </span>
        </div>
        <header-add class="hide-add-icon" :style="{margin: '15px 0 12px'}">
          <template #header-title>папки</template>
          <template #header-amount>{{ newFolder.length }}</template>
        </header-add>
        <folder v-for="(folder, folderKey) in newFolder" :folder="folder" :key="folderKey" @onClick="currentFolder"/>
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
        <file-shower class="upload-from-app-file" v-for="(file, fileKey) in images" :file="file" :key="fileKey"/>
      </template>
      <template #button-accept>Сохранить</template>
    </modal>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'vx.process.create.process.modals',
  components: {
    HeaderAdd: () => import('@/LTE/Singletons/facades/HeaderAdd'),
    FileShower: () => import('@/LTE/Providers/Company/Resource/file.ui'),
    ProcessPerformer: () => import('../facades/ProcessPerformer'),
    Modal: () => import('@Facade/Modal/Base'),
    Folder: () => import('@/LTE/Providers/Company/Resource/folder.ui'),
    FileCheckbox: () => import('../facades/FileCheckbox'),
    UploadFiles: () => import('@/app/vx/app/company/app/process/facades/UploadFiles')
  },
  props: {
    modalUpload: {
      type: Boolean,
      required: true
    },
    modalUploadResource: {
      type: Boolean,
      required: true
    },
    modalUploadResourceFolder: {
      type: Boolean,
      required: true
    },
    modalChooseFiles: {
      type: Boolean,
      required: true
    },
  },
  data: () => ({
    images: [],
    uploadDevice: false,
    uploadResource: [
      {avatar: require('@/assets/img/my/resource.svg'), position: 'Ресурсы'},
    ],
  }),
  computed: {
    ...mapGetters({
      resourceFolders: 'getResourceFolders',
      newFolder: 'getNewFolder',
      filesToUpload: 'getFilesToUpload',
      files: 'getFiles',
      fileIds: 'getFileIds',
      workFiles: 'getWorkFiles',
      breadCrumbs: 'getBreadCrumbs',
      selectedCompany: 'Company/getSelectedCompany',
      selectedFolder: 'getSelectedFolder'
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
      setFileIds: 'setNewFileIds',
      setNewFolder: 'setWorkerNewFolder',
      setBreadCrumbs: 'setWhiteBreadCrumbs',
      setResourceFolders: 'setWorkerResourceFolders'
    }),
    insideWorkFiles() {
      this.modalUploadResource = !this.modalUploadResource
      this.modalUploadResourceFolder = !this.modalUploadResourceFolder
      let workersFolders = this.workFiles.folders.map(el => ({
        id: el.id,
        title: el.name,
        content: {
          folders: el.childFoldersCount,
          files: el.filesCount
        },
        group: el.isShared,
        trash: null
      }))
      this.setNewFolder(workersFolders)
      let workersFiles = this.workFiles.files.map(el => ({
        id: el.id,
        fileId: el.fileId,
        label: el.label,
        extension: el.extension,
        content: {
          size: el.size,
          date: el.createdAt.split(' ')[0]
        },
        group: el.isShared,
        checked: false
      }))
      this.setFilesToUpload(workersFiles)
    },
    closeModals(){
      this.modalUploadResourceFolder = !this.modalUploadResourceFolder
      this.setBreadCrumbs([])
      this.$emit('closeModalUpload')
    },
    currentFolder(data) {
     this.$core.execViaComponent('Resources', 'getFolder', data.id);
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
      let filesForUpload = this.images.map(el => el.fileId)
      this.setFileIds(filesForUpload)
      this.$emit('closeModalUpload')
      if (this.images.length) {
        this.$notify({text: 'Файл успешно загружен!', type: 'success', duration: 3000, speed: 500})
      }
    },
    modalChooseFilesClose() {
      this.modalChooseFiles = !this.modalChooseFiles
      this.modalUploadResourceFolder = !this.modalUploadResourceFolder
    },
    openResourcesFolders() {
      this.modalUpload = !this.modalUpload
      this.modalUploadResource = !this.modalUploadResource
     this.$core.execViaComponent('Resources', 'getWorkFolder', this.selectedCompany.workerId);
    }
  },
  watch: {
    workFiles(data){
        let resourceFolders = [
          {
            title: 'Рабочие файлы',
            content: {
              folders: data.folders.length,
              files: data.files.length,
            },
            group: null,
            trash: null
          }
        ]
        this.setResourceFolders(resourceFolders);
    },
    selectedFolder(data) {
      let breadCrumbs = this.breadCrumbs
      breadCrumbs.push(data.name)
      this.setBreadCrumbs(breadCrumbs);
      let workersFolders = data.childFolders && data.childFolders.map(el => ({
        id: el.id,
        title: el.name,
        content: {
          folders: el.childFolders ? el.childFolders.length : el.childFoldersCount,
          files: el.files ? el.files.length : el.filesCount
        },
        group: el.isShared,
        trash: null
      }))
      this.setNewFolder(workersFolders);
      let workersFiles = data.files && data.files.map(el => ({
        id: el.id,
        fileId: el.fileId,
        label: el.label,
        extension: el.extension,
        content: {
          size: el.size,
          date: el.createdAt.split(' ')[0]
        },
        group: el.isShared,
        checked: false
      }))
      this.setFilesToUpload(workersFiles);
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