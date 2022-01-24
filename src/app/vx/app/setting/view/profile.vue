<template>
  <div class="setting-profile-view">
    <navigation-comeback @onClick="$router.push({name: 'vx.setting'})"/>
    <title-base>Личные данные</title-base>
    <div class="profile-change-box">
      <upload-avatar-ui
        :avatar="{logo, colorCode}"
        title="Загрузите фото профиля"
        description="Загрузите фото профиля которое будут видеть другие пользователи"
        :size-warning="{warning: 'JPG or PNG. Max size of 4MB', maxSize: 4, allowedTypes: '.jpg,.jpeg,.png'}"
        @onUploadFile="handleNewAvatarFile"
      />
      <div class="profile-public-setting">
        <input-base
          :model="name"
          placeholder="Имя"
          labeled
          @onInput="newName = $event"
          @onBlur="updateName"
          disable-debounce
        /><input-base
          :model="lastname"
          placeholder="Фамилия"
          labeled
          @onInput="newLastname = $event"
          @onBlur="updateLastname"
          disable-debounce
        /><input-alias
          :model="alias"
          placeholder="Никнейм"
          labeled
          :validation-status="aliasError === null"
          :validation-text="aliasError || 'Имя свободно'"
          @onBlur="updateAlias"
          @onAlias="verifyAlias"
        /><input-date
          :model="birthday"
          placeholder="Дата рождения"
          @onDate="updateBirthday"
        /><input-area
          :model="about"
          placeholder="О себе"
          labeled
        />
      </div>


    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationComeback from '@Facade/Navigation/Comeback'
  import TitleBase from '@Facade/Title/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import {UploadAvatarUi} from '@Providers'
  import InputBase from '@Facade/Input/Base'
  import InputAlias from '@Facade/Input/Alias'
  import InputDate from '@Facade/Input/Date'
  import InputArea from '@Facade/Input/Area'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'vx.setting.profile',
    components: {
      NavigationComeback,
      TitleBase, TitleCaption,
      UploadAvatarUi,
      InputBase, InputAlias, InputDate, InputArea,
    },
    data: () => ({
      newName: null,
      newLastname: null,
      newAlias: null,
      newBirthdate: null,
      about: ''
    }),
    computed: {
      ...mapGetters({
        logo: 'getUserAvatar',
        colorCode: 'getUserAvatarColor',
        name: 'getUserName',
        lastname: 'getUserLastname',
        alias: 'getUserAlias',
        aliasError: 'getUserAliasError',
        birthday: 'getUserBirthday',
      })
    },
    methods: {
      ...mapMutations(['setUserAvatar']),
      updateProfile(method, data){
        this.$core.execViaComponent('Setting', method, data)
      },
      updateName(){
        if(this.newName) this.updateProfile('editName',this.newName);
      },
      updateLastname(){
        if(this.newLastname) this.updateProfile('editLastname',this.newLastname);
      },
      updateAlias(){
        if(this.newAlias && this.aliasError === null) this.updateProfile('editAlias', this.newAlias);
      },
      verifyAlias(alias){
        this.newAlias = alias
        this.$core.execViaComponent('Setting', 'checkAlias', alias);
      },
      updateBirthday(date){
        this.updateProfile('editBirthDate', date);
      },
      async handleNewAvatarFile(avatarFile){
        const avatarNewFile = new File([avatarFile.result], `${avatarFile.name}.png`, {type:"image/png", lastModified:new Date()});
        this.$core.execViaComponent('Uploader', 'init',[
          avatarNewFile,
          this.handleUploadOnprogress, null,
          this.handleUploaderOnload
        ])
      },
      handleUploadOnprogress(progress){
        console.log(progress)
      },
      handleUploaderOnload(fileId){
        this.$core.execViaComponent('Setting', 'editAvatar', fileId)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .setting-profile-view{
    .facade-title-base{
      text-align: center;
      margin-bottom: 36px;
    }
    .profile-change-box{
      width: 100%;
      padding: 26px 164px;
      box-sizing: border-box;
      border-radius: 16px;
      background-color: $grey-scale-500;
      .profile-public-setting{
        .facade-input-base{
          margin-bottom: 16px;
        }
        .facade-input-date{
          margin: 16px 0;
        }
      }
    }
  }
</style>