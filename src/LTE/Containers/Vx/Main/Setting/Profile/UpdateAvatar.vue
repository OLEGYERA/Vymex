<template>
  <div class="container-profile-update-avatar">
    <image-upload-avatar :logo="avatar" :color-code="avatarColor" @onAvatarFile="handleNewAvatarFile">
      <template #title>Загрузите фото профиля</template>
      <template #description>Загрузите фото профиля которое будут видеть другие пользователи</template>
    </image-upload-avatar>
  </div>
</template>

<script>
  import ImageUploadAvatar from "@Facade/Image/UploadAvatar";
  import {mapGetters} from 'vuex'

  export default {
    name: 'Container.Vx.Setting.Profile.UpdateAvatar',
    components: {
      ImageUploadAvatar
    },
    computed: {
      ...mapGetters({
        avatar: 'getUserAvatar',
        avatarColor: 'getUserAvatarColor'
      })
    },
    methods: {
      async handleNewAvatarFile(avatarFile){
        const avatarNewFile = new File([avatarFile.result], `${avatarFile.name}.png`, {type:"image/png", lastModified:new Date()});

        this.$engine.Predictor
            .prepareComponentManually('uploader', 'init',[
              avatarNewFile,
              this.handleUploadOnprogress, null,
              this.handleUploaderOnload
            ]).runPredictedData()
      },
      handleUploadOnprogress(progress){
        console.log(progress)
      },
      handleUploaderOnload(fileId){
        this.$engine.Predictor
          .prepareComponentManually('setting', 'editAvatar', fileId)
          .runPredictedData()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container-profile-update-avatar{
    .facade-image-upload-avatar{

    }
  }
</style>