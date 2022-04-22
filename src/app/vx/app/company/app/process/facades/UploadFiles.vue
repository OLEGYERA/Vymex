<template>
  <div class="facade-upload-files" :class="{'coverBy': isAnimationIncluded}">
    <label class="upload-files-body" :class="{'shake-animation': isAnimationIncluded}"
           for="assetsFieldHandle">
      <process-performer
          class="upload-files-local"
          :performers="uploadFromDevice"/>
      <input class="upload-files-input" ref="uploadedFile"
             type="file" id="assetsFieldHandle"
             @change="onChange"
             :accept="allowedTypes"
             multiple
      />
    </label>
  </div>
</template>

<script>
import ProcessPerformer from "@/app/vx/app/company/app/process/facades/ProcessPerformer";

export default {
  name: 'vx.process.facade.upload.files',
  components: {ProcessPerformer},
  data: () => ({
    allowedTypes: '.jpg,.png,.pdf,.txt,.doc,.docx,.rtf',
    isAnimationIncluded: false,
    uploadFromDevice: [
      {avatar: require('@/assets/img/icons/add-file.svg'), position: 'Загрузить с локального устройсва'},
    ],
    filesData: null
  }),
  methods: {
    onChange() {
      const uploadedFiles = Object.values(this.$refs.uploadedFile.files)
      uploadedFiles.map(el => {
        let uploadReader = new FileReader();
        this.$refs.uploadedFile.value = null
        uploadReader.onload = e => {
          this.filesData = {result: e.target.result, name: this.getClearName(el), size: el.size};
        }
        uploadReader.readAsDataURL(el);
      })
    },
    getClearName(file) {
      let type = file.type.replace('image/', '');
      return file.name.replace('.' + type, '')
    }
  },
  watch: {
    filesData(data) {
      if (data) {
        this.filesData = null
        this.$emit('onUpload', data)
      }
    }
  }
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

  &.coverBy {
    position: relative;

    &:before {
      z-index: 1;
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}

</style>