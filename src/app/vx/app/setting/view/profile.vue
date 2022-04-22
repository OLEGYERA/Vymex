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
        <input-base class="profile-setting-row"
          :model="name" placeholder="Имя" labeled
          @onInput="newName = $event" @onBlur="updateName"
          disable-debounce
        /><input-base class="profile-setting-row"
          :model="lastname" placeholder="Фамилия" labeled
          @onInput="newLastname = $event" @onBlur="updateLastname"
          disable-debounce
        /><input-alias class="profile-setting-row"
          :model="alias" placeholder="Никнейм" labeled
          :validation-status="aliasErrorStatus" :validation-text="aliasError || 'Имя свободно'"
          @onAlias="verifyAlias" @onBlur="updateAlias"
        /><input-date class="profile-setting-row"
          :model="birthday" placeholder="Дата рождения"
          @onDate="updateBirthday"
        /><input-area class="profile-setting-row"
          :model="about" placeholder="О себе" labeled
          @onArea="newAbout = $event" @onBlur="updateAbout"
      />
      </div>
      <div class="profile-validation-setting">
        <title-caps class="profile-setting-row">Валидация профиля</title-caps>
        <div class="profile-validator-box profile-setting-row">
          <div class="validator-info">
            <title-caption>Телефон</title-caption>
            <text-base>+{{phoneIdent.phoneIdent}} {{phoneLth.withMask.replace(/-/g, ' ')}}</text-base>
          </div>
          <div class="validator-change" @click="$router.push({name: 'vx.setting.phone'})">
            <icon-edit/>
          </div>
        </div>
        <div class="profile-validator-box">
          <div class="validator-info">
            <title-caption>Email</title-caption>
            <text-base>Добавить Email</text-base>
          </div>
          <div class="validator-change" @click="$router.push({name: 'vx.setting.mail'})">
            <icon-edit/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /*eslint-disable*/
  import NavigationComeback from '@Facade/Navigation/Comeback'
  import TitleBase from '@Facade/Title/Base'
  import TitleCaption from '@Facade/Title/Caption'
  import TitleCaps from '@Facade/Title/Caps'
  import TextBase from '@Facade/Text/Base'
  import {UploadAvatarUi} from '@Providers'
  import InputBase from '@Facade/Input/Base'
  import InputAlias from '@Facade/Input/Alias'
  import InputDate from '@Facade/Input/Date'
  import InputArea from '@Facade/Input/Area'
  import IconEdit from '@Icon/Edit'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'vx.setting.profile',
    components: {
      NavigationComeback,
      TitleBase, TitleCaption, TitleCaps, TextBase,
      UploadAvatarUi,
      InputBase, InputAlias, InputDate, InputArea,
      IconEdit
    },
    data: () => ({
      newName: null,
      newLastname: null,
      newAlias: null,
      newBirthdate: null,
      newAbout: ''
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
        about: 'getUserAbout',
        phoneIdent: 'getChooseCountry',
        phoneLth: 'getPhoneLthNumber',
      }),
      aliasErrorStatus(){
        return (this.newAlias && this.alias !== this.newAlias) ? this.aliasError === null : null;
      }
    },
    methods: {
      ...mapMutations(['setUserAvatar']),
      updateName(){
        if(this.newName) this._updateProfile('editName',this.newName);
      },
      updateLastname(){
        if(this.newLastname) this._updateProfile('editLastname',this.newLastname);
      },
      updateAlias(){
        if(this.newAlias && this.aliasError === null) this._updateProfile('editAlias', this.newAlias);
      },
      updateBirthday(date){
        this._updateProfile('editBirthDate', date);
      },
      updateAbout(){
        if(this.newAbout) this._updateProfile('editAbout', this.newAbout || '');
      },

      verifyAlias(alias){
        this.newAlias = alias
        this.$core.execViaComponent('Setting', 'checkAlias', this.newAlias);
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
      },

      _updateProfile(method, data){
        this.$core.execViaComponent('Setting', method, data)
      },
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
      padding: 26px 164px 52px;
      box-sizing: border-box;
      border-radius: 16px;
      background-color: $grey-scale-500;
      .profile-setting-row{
        margin-bottom: 18px;
      }
      .profile-validation-setting{
        .profile-validator-box{
          width: 100%;
          display: flex;
          align-items: center;
          .validator-info{
            width: 100%;
            .facade-title-caption{
              font-size: rem(15);
              line-height: rem(20);
              margin-bottom: 4px;
            }
            .facade-text-base{
              color: #fff;
            }
          }
          .validator-change{
            cursor: pointer;
            .icon{
              height: 16px;
            }
          }
        }
      }
    }
  }
  .icon-edit {
    color: $grey-scale-200;
  }
</style>