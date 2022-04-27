<template>
  <div class="facade-upload-files">
    <label class="upload-files-body"
           for="assetsFieldHandle">
      <process-performer
          class="upload-files-local"
          :performers="uploadFromDevice"/>
      <input class="upload-files-input" ref="uploadedFile"
             type="file" id="assetsFieldHandle"
             @change="onChange"
             :accept="'.jpg,.png,.pdf,.txt,.doc,.docx,.rtf'"
             multiple
      />
    </label>
  </div>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";

export default {
  name: 'vx.process.facade.upload.files',
  components: {
    ProcessPerformer: () => import('./ProcessPerformer')
  },
  data: () => ({
    uploadFromDevice: [
      {avatar: require('@/assets/img/icons/add-file.svg'), position: 'Загрузить с локального устройсва'},
    ],
    c: null
  }),
  computed: {
    ...mapGetters({
      files: 'getFiles',
      fileIds: 'getFileIds'
    })
  },
  methods: {
    ...mapMutations({
      setFiles: 'setNewFiles',
      setFileIds: 'setNewFileIds'
    }),
    onChange() {
      this.filesData = Object.values(this.$refs.uploadedFile.files)
      this.$refs.uploadedFile.value = null
      this.filesData.map(el => {
        let uploadReader = new FileReader();
        uploadReader.onload = e => {
          this.handleUploadFile({result: e.target.result, name: el.name, size: el.size})
        }
        uploadReader.readAsDataURL(el);
      })
    },
    async handleUploadFile(newFileData) {
      this.$emit('onUpload')
      let file = newFileData.name.split('.')
      const newFile = new File([newFileData.result], `${newFileData.name}.${file[1]}`,
          {type: file[1], lastModified: new Date()});

      this.$core.execViaComponent('Uploader', 'init', [
        newFile,
        this.handleUploadOnprogress, null,
        this.handleUploaderOnload
      ])
    },
    handleUploadOnprogress(progress) {
      console.log(progress)
    },
    handleUploaderOnload(fileId) {
      let file = this.filesData[0].name.split('.')
      let yyyy = new Date().getFullYear();
      let mm = String(new Date().getMonth() + 1).padStart(2, '0');
      let dd = String(new Date().getDate()).padStart(2, '0');
      let date = dd + '.' + mm + '.' + yyyy

      this.setFiles([...this.files, {
        label: file[0],
        extension: file[1],
        size: (this.filesData[0].size / 1000000).toFixed(3),
        date
      }])

      let newFileIds = [...this.fileIds, fileId]
      this.setFileIds(newFileIds)
      this.filesData.shift()
    }
  },
}
</script>

<style lang="scss" scoped>
.facade-upload-files {
  .upload-files-body {
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

    .upload-files-input {
      display: none;
    }
  }
}

</style>