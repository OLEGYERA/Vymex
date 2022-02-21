<template>
  <div class="facade-button-upload" :class="{'coverBy': isAnimationIncluded}"
       @dragover="dragOver" @dragleave="dragLeave" @drop="onDrop">
    <label class="button-upload-body" :class="{'shake-animation': isAnimationIncluded}"
           for="assetsFieldHandle">
      <icon-camera/>
      <input class="button-upload-input" ref="uploadedFile"
             type="file" id="assetsFieldHandle"
             @change="onChange"
             :accept="allowedTypes"
      />
    </label>
  </div>
</template>

<script>
  import IconCamera from '@Icon/Camera'

  export default {
    name: 'Facade.Button.Upload',
    components: {IconCamera},
    props: {
      maxSize: {
        type: Number,
        default: () => {
          return 20;
        }
      },
      allowedTypes: {
        type: String,
        default: () => {
          return null;
        }
      },
      disable: Boolean,
    },
    data: () => ({
      isAnimationIncluded: false,
      imageData: null
    }),
    methods: {
      onChange() {
        const uploadedFile = this.$refs.uploadedFile.files[0],
              uploadReader = new FileReader();
        if(uploadedFile.size > this.maxSize * 1000000){
          alert(`File Size is Greater than ${this.maxSize}MB`);
          return false;
        }

        this.$refs.uploadedFile.value = null
        uploadReader.onload = e => {
          console.log(uploadedFile)
          this.imageData = {result: e.target.result, name: this.getClearName(uploadedFile)};
        }

        uploadReader.readAsDataURL(uploadedFile);
      },
      onDrop(e){
        e.preventDefault()
        this.$refs.uploadedFile.files = e.dataTransfer.files;
        this.isAnimationIncluded = false;
        this.onChange();
      },
      dragOver(event){
        event.preventDefault();
        this.isAnimationIncluded = true
      },
      dragLeave(event){
        event.preventDefault();
        this.isAnimationIncluded = false
      },
      getClearName(file){
        let type = file.type.replace('image/', '');
        return file.name.replace('.' + type, '')
      }
    },
    watch: {
      imageData(data){
        if(data){
          this.imageData = null;
          this.$emit('onUpload', data)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .facade-button-upload{
    width: 46px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $grey-scale-500;
    border-radius: 50%;
    .button-upload-body{
      cursor: pointer;
      width: 70%;
      height: 70%;
      display: flex;
      align-items: inherit;
      justify-content: inherit;
      background-color: $blue;
      border-radius: 50%;
      overflow: hidden;
      .icon-camera{
        color: #fff;
        height: 16px;
      }
      .button-upload-input{
        display: none;
      }
    }
    &.coverBy{
      position: relative;
      &:before{
        z-index: 1;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }

</style>