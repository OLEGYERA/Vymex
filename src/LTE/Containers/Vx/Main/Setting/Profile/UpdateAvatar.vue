<template>
  <div class="container-profile-update-avatar">
    <image-upload-avatar :logo="avatar" :color-code="avatarColor" @onAvatarFile="handleNewAvatarFile">
      <template #title>Загрузите фото профиля</template>
      <template #description>Загрузите фото профиля которое будут видеть другие пользователи</template>
    </image-upload-avatar>
    <title-caption>JPG or PNG. Max size of 4MB</title-caption>
  </div>
</template>

<script>
  import ImageUploadAvatar from "@Facade/Image/UploadAvatar";
  import TitleCaption from '@Facade/Title/Caption'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'Container.Vx.Setting.Profile.UpdateAvatar',
    components: {
      ImageUploadAvatar,
      TitleCaption
    },
    computed: {
      ...mapGetters({
        avatar: 'getUserAvatar',
        avatarColor: 'getUserAvatarColor'
      })
    },
    methods: {
      ...mapMutations(['setUserAvatar']),
      async handleNewAvatarFile(avatarFile){
        const avatarNewFile = new File([avatarFile.result], `${avatarFile.name}.png`, {type:"image/png", lastModified:new Date()});

        this.$core.predictor
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
        this.$core.predictor
          .prepareComponentManually('setting', 'editAvatar', fileId)
          .runPredictedData()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container-profile-update-avatar{
    display: flex;
    flex-direction: column;
    align-items: center;
    .facade-title-caption{
      margin: 18px 0 24px;
    }
  }
</style>