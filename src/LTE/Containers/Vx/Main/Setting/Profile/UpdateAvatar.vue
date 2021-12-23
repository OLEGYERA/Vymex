<template>
  <div class="container-profile-update-avatar">
    <image-upload-avatar logo="BS" color-code="1"/>
  </div>
</template>

<script>
  import ImageUploadAvatar from "@Facade/Image/UploadAvatar";
  export default {
    name: 'Container.Vx.Setting.Profile.UpdateAvatar',
    components: {
      ImageUploadAvatar
    }
  }
</script>

<style lang="scss" scoped>
  .container-profile-update-avatar{
    .facade-image-upload-avatar{

    }
  }
</style>